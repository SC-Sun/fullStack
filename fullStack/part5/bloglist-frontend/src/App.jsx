import { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/loginForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState('')

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then((initialBlogs) => {
      setBlogs(initialBlogs)
    })
  }, [])

  useEffect(() => {
    const logInUserJson = window.localStorage.getItem('logInUserJson')
    const logUserBlogs = window.localStorage.getItem('userBlogs')
    if (logInUserJson) {
      const user = JSON.parse(logInUserJson)
      setUser(user)
      blogService.setToken(user.token)
      setBlogs(JSON.parse(logUserBlogs))
    }
  }, [])

  const messageHandler = (message, type) => {
    setMessage({ message, type })
    setTimeout(() => {
      setMessage()
    }, 10000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('logInUserJson', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      messageHandler(`Welcome ${user.username}!`, 'success')
      const bList = blogs.sort( (a, b) => b.likes - a.likes)
      const filterList = bList.filter( (blog) => blog.user.username === username)
      window.localStorage.setItem('userBlogs', JSON.stringify(filterList))
      setBlogs(filterList)
      setUsername('')
      setPassword('')
    } catch (err) {
      messageHandler('Wrong username or password', 'error')
      console.log(err)
    }
  }

  const handleLogOut = async () => {
    window.localStorage.clear()
    setUser(null)
    messageHandler('User logged out sucessfully!', 'success')
    const res = await blogService.getAll()
    const blogList = res.sort((a, b) => b.likes - a.likes)
    setBlogs(blogList)
  }

  const createNewBlog = async (object) => {
    blogFormRef.current.toggleVisibility()
    console.log('ref', blogFormRef)
    console.log('object++ ', object)
    try {
      const newBlog =  await blogService.create(object)
      const res = await blogService.getAll(newBlog)
      console.log('RES == ', res)
      setBlogs(res)
      messageHandler(
        `A new blog titled ${newBlog.title} by ${newBlog.author} added`, 'success'
      )
    } catch (err) {
      messageHandler('Posting new blog failed', 'error')
      console.log(err)
    }

  }

  const plusLikes = async (object) => {
    try {
      await blogService.update(object.id, object)
      const res = await blogService.getAll()
      const blogList = res.sort((a, b) => b.likes - a.likes)
      setBlogs(blogList)
    } catch(err) {
      console.log(err)
    }
  }

  const deleteBlog = async (id, object) =>  {
    try {
      if(window.confirm( `Remove blog ${object.title} by ${object.author}`)) {
        await blogService.deleteB(id)
        const response = await blogService.getAll()
        setBlogs(response)
        messageHandler(
          `blog titled ${object.title} by ${object.author} deleted`,
          'success'
        )
        console.log('deleted !! ', object )
      }
    }catch( err ) {
      console.log(err)
    }
  }

  return (
    <>
      {!user && (
        <Togglable buttonLabel="login" blogs={blogs}>
          <Notification message={message} />
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleLogin={handleLogin}
          />
        </Togglable>
      )}
      {user && (
        <div>
          <Notification message={message} />
          <h2>blogs</h2>
          <p> {user.username} logged in   </p>
          <button onClick={handleLogOut} id="logout">logout</button>
          <Togglable
            user={user.username}
            updateBlog={plusLikes}
            deleteBlog={deleteBlog}
            blogs={blogs}
            buttonLabel="New Blog"
            ref={blogFormRef}
          >
            <BlogForm createNewBlog={createNewBlog} />
          </Togglable>
        </div>
      )}
    </>
  )
}

export default App

