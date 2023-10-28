
const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')


usersRouter.get('/', async (request, response, next) => {
  try {
    const users = await User.find({}).populate( 'blogs' ,  { title: 1,
      author:1,
      url:1,
      likes:1,
      _id: 1
    } )
    response.json(users)
  } catch(err) {
    next(err)
  }
})

usersRouter.get('/:id', async (request, response) => {
  const id = request.params.id
  console.log(id)
  const user = await User.findById(id).populate('blogs', { url: 1, title: 1, author: 1, _id: 1 })
  console.log(user)
  response.status(200).json(user)
})

usersRouter.post('/',  async (request, response) => {
  try {
    const { username, name, password } = request.body
    const users = await User.find({})
    const userName = users.map( user => user.username)
    console.log('users contraol ++', userName, password)
    console.log('users', users)
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    if (userName.includes(username)) {
      response
        .status(400)
        .json({ error: 'expected `username` to be unique' })
        .end();
    }   else {
      const user = new User({
        username,
        name,
        passwordHash,
      })
      const savedUser = await user.save()
      console.log('saveUser', savedUser)
      response.status(201).json(savedUser)
    }
  } catch(error) {
    console.error(error)
  }
})


usersRouter.delete('/:id', (request, response, next) => {
  User.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

module.exports = usersRouter
