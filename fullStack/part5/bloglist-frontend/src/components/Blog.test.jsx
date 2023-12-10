import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders title and author by default', () => {
  const blog = {
    title: 'madonna',
    author: 'cher',
    likes: 0,
    url: 'm',
    user: {},
  }

  render(<Blog blog={blog} />)

  const element = screen.getByText('madonna by cher')
  expect(element).toBeDefined()
})

test('clicking the like button twice calls the handler twice', async () => {
  const blog = {
    title: 'madonna',
    author: 'cher',
    likes: 0,
    url: 'm',
    user: {},
  }

  const user = userEvent.setup()

  const updateBlog = jest.fn()
  const { container } = render(<Blog blog={blog} updateBlog={updateBlog} />)

  const button = screen.getByText('View')
  await user.click(button)

  const div = container.querySelector('#detail-info')

  const likeButton = screen.getByText('Like')
  await user.click(likeButton)
  await user.click(likeButton)

  expect(updateBlog).toHaveBeenCalledTimes(2)
  expect(div).toHaveTextContent('Likes:')
  expect(div).toHaveTextContent('URL:')
  expect(button).toHaveTextContent('Hide')
})

