import { useState, forwardRef, useImperativeHandle } from 'react'
import Blog from './Blog'
import PropTypes from 'prop-types'

const Togglable = forwardRef( (props, refs) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => setVisible(!visible)
  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
    }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility} >{props.buttonLabel}</button>
        {props.blogs &&
          props.blogs.map((b) => (
            <Blog
              key={b.id}
              blog={b}
              username={props.user}
              updateBlog={props.updateBlog}
              deleteBlog={props.deleteBlog}
            />
          ))}
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  )
})

Togglable.displayName = 'Togglable'

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
}

export default Togglable