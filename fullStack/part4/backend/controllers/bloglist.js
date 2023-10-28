const blogListRouter = require('express').Router();
const Blog = require('../models/bloglist');
const User = require('../models/user');
const { error } = require('../utils/logger');
const jwt = require('jsonwebtoken');

function extractToken(req) {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(' ')[0] === 'Bearer'
  ) {
    return req.headers.authorization.split(' ')[1];
  } else if (req.query && req.query.token) {
    return req.query.token;
  }
  return null;
}

blogListRouter.get('/', async (request, response) => {
  try {
    const blogs = await Blog.find({}).populate('user', {
      username: 1,
      name: 1,
      id: 1,
    });
    response.json(blogs);
    console.log('blogs-control ', blogs);
  } catch (err) {
    console.error(error);
  }
});

blogListRouter.post('/', async (request, response, next) => {
  try {
    const body = request.body;
    const token = extractToken(request);
    console.log('Token', token);
    const decodedToken = jwt.verify(token, process.env.SECRET);
    console.log('body', body);
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token invalid' });
    }
    console.log(
      'decode_id: ',
      decodedToken.id,
      'decodedToken ==',
      decodedToken
    )
    const user = await User.findById(decodedToken.id)
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user._id,
    });
    console.log('BLOG ', blog);

    if (!(blog.title && blog.author && blog.url)) {
      response
        .status(400)
        .json({ error: 'title, author, and url are required' })
        .end();
    }
    if (!blog.likes) {
      blog.likes = 0;
    }
    const savedBlog = await blog.save();
    console.log('saveBlog= ', savedBlog);
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();

    response.status(201).json(savedBlog);
  } catch (err) {
    console.error;
  }
});

blogListRouter.get('/:id', (request, response, next) => {
  Blog.findById(request.params.id)
    .then((blog) => {
      if (blog) {
        response.json(blog);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

blogListRouter.delete(
  '/:id',  async (request, response, next) => {
    try {
      const id = request.params.id;
      const token = extractToken(request); //request.body.jwt */
      const decodedToken = jwt.verify(token, process.env.SECRET);
      const userBlog = decodedToken;
      console.log('userBlog = ', userBlog, 'id = ', id, 'TOken', token);
      const blog = await Blog.findById(id);
      console.log('userBlog ', userBlog.id);
      if (blog.user.toString() === userBlog.id.toString()) {
        await Blog.findByIdAndRemove(id);
        response.status(204).end();
      }
    } catch (err) {
      console.error;
    }
  }
);

blogListRouter.put('/:id', async (request, response, next) => {
  const blog = {
    ...request.body,
  };
  const update = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  });
  response.json(update);
});

module.exports = blogListRouter;

