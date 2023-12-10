const blogListRouter = require('express').Router();
const Blog = require('../models/blog');
const { error } = require('../utils/logger');
const {  userExtractor }  = require('../utils/middleware')

 

blogListRouter.get('/', async (request, response) => {
  try {
    const blogs = await Blog.find({}).populate('user', {
      username: 1,
      name: 1
    })
    response.json(blogs)
    console.log('blogs-control ', blogs);
  } catch (err) {
    console.error(error);
  }
})

blogListRouter.post('/', userExtractor, async (request, response) => {
  try {
   if (!request.user) {
    return response.status(401).json({ error: 'token missing or invalid' });
  } 
  const user = request.user
  const newBlog =  new Blog({
   ...request.body,
    user: user._id,
  })
  console.log('BLOG', newBlog)
 if (!(newBlog.title && newBlog.author && newBlog.url)) {
    response
      .status(400)
      .json({ error: 'title, author, and url are required' })
      .end();
  } 

  if (!newBlog.likes) {
    newBlog.likes = 0;
  }

  const savedBlog = await newBlog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  const id = savedBlog._id; 
  console.log( "ID   ", id)
  await user.save();
console.log('SAVED BLOG   =',savedBlog)
  response.status(201).json(savedBlog);
} catch( err ) {
  console.log(err)
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
    const id = request.params.id
    console.log(id)
    await Blog.findByIdAndRemove(id)
    response.status(204).end(); }
);

blogListRouter.put('/:id', async (request, response, next) => {
  const id = request.params.id
  console.log("PUT-id ", id)
  const updateBlog = {
    ...request.body,
  }
  const update = await Blog.findByIdAndUpdate(id, updateBlog, {
    new: true,
  })
  response.json(update)
  console.log('UPDATELIKES  ', update)
})

module.exports = blogListRouter;

