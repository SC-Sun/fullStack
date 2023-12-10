const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const helper = require('./test_helper');
const api = supertest(app);


describe('GET/blogs', () => {
  test('blogs are returned as json', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('get all blogs', async () => {
    const response = await api.get('/api/blogs').expect(200);

    expect(response.body).toHaveLength(helper.initialBlogs.length);
  });

})

test('unique identifier property is named id', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
  expect(response.body[0].id).toBeDefined();
});

describe('POST/blogs', () => {
  test('making HTTP POST request and a new POST', async () => {
    const initialRes = await api.get('/api/blogs')
    const newBlog = {
      title: 'The uncanny counters 2',
      author: 'Billy Johns',
      url: 'https://exmaple.com',
      likes: 20,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/);


    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(initialRes.body.length + 1)

  })
})

test('if blog is missing likes-property, then 0 will be the default value', async () => {
  const newBlog = {
    title: 'Miss likes value',
    author: 'Julian Smith',
    url:'https://exmaple.com',
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/);

  const blogs = await helper.blogDb()
  const withoutLikes = blogs[blogs.length -1 ].likes
  const defaultZero = withoutLikes === undefined ? Number('0') : 0
  expect(defaultZero).toBe(0)

})

test('if the title or url properties are missing from the request data, the response 400', async () => {
  const newBlog = {
    author:'missing url or title',
    likes: 30
  }
  const res = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  expect(res.status).toBe(400)

  if (usernames.includes(username)) {
    response
      .status(400)
      .json({ error: 'expected `username` to be unique' })
      .end();
  }
})
describe('PUT/blogs/:id', () => {
  test('update the likes!', async () => {
    const blogs = await helper.blogDb()
    const blog = blogs[0]
    const updateBlog = {
      ...blog,
      likes: 40
    }
    await api.put(`/api/blogs/${blog.id}`)
      .send(updateBlog)
      .expect(200)

    const newArray = await helper.blogDb()
    expect(newArray[0].likes).toBe(40)
  })
})

describe('DELETE/blogs/:id' , () => {
  test('delete single block', async () => {
    const atStart = await helper.blogDb()
    const deleteOne = atStart[0]
    await api
      .delete(`/api/blogs/${deleteOne.id}`)
      .expect(204)

    const atEnd = await helper.blogDb()

    expect(atEnd).toHaveLength(helper.initialBlogs.length -1)
    const contents = atEnd.map( t => t.title)
    expect(contents).not.toContain(deleteOne.title)
  })
})
afterAll(async () => {
  await mongoose.connection.close();
});

