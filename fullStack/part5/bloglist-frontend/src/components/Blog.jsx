
import { useState } from 'react'
import '../App.css'

const Blog = ({ blog, updateBlog, deleteBlog, username }) => {
  const [ show, setShow ] = useState(false)
  const [userLikes, setUserLikes] = useState(blog.likes)
  const showButton = show ? 'Hide' : 'View'

  const updateLikes = {
    title: blog.title,
    author: blog.author,
    url: blog.url,
    user: blog.user.id,
    id: blog.id,
    likes: userLikes + 1
  }
  const addLikes = () => {
    setUserLikes(userLikes + 1)
    updateBlog(updateLikes)
  }

  return (
    <div className="blog" id='blog-container'>
      <div>
        <span> {blog.title} by {blog.author} </span>
        {show && (
          <div id='detail-info'>
            <span>URL:  {blog.url} </span>
            <div>
              <span>Likes: {userLikes}   </span>
              <button id="like_btn" onClick={addLikes}>Like</button>
            </div>
            {blog.user.username === username ? (
              <button type="botton"  id="delete" onClick={ () => deleteBlog(blog.id, blog)}>
      Delete
              </button>
            ) : ('')}
          </div>
        )}
      </div>
      <button type='button' id="view" onClick={ () => setShow(!show)}>
        {showButton}
      </button>
    </div>

  )

}

export default Blog