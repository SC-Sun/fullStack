const _ = require('lodash')


const dummy = (blogs) => 1

const totalLikes = (blogs) => {
  let total = 0
  blogs.forEach( (blog) => (total += blog.likes))
  return total
}


const favoriteBlog = ( blogs ) => {
  if(blogs.length === 0) {
    return [] }
  const likesBox = []
  blogs.map( blog => likesBox.push(blog.likes))
  const maxLike = Math.max(...likesBox)
  const findMost = likesBox.indexOf(maxLike)
  return blogs[findMost]
}

const mostLikes = (blogs) => {
  if( blogs.length === 0) return []
  const groups = _.groupBy(blogs, 'author')
  const boxLikes = []
  const authors = Object.keys(groups)

  for (let group in groups ) {boxLikes.push(groups[group].reduce( (acc, author) => (
    acc += author.likes
  ),0))}
  const maxLikes = Math.max(...boxLikes)
  const findMost = boxLikes.indexOf(maxLikes)
  console.log('max: ', maxLikes, 'findMost: ', findMost)
  return { author: authors[findMost], likes: maxLikes }
}


const mostBlogs = (blogs) => {
  if( blogs.length === 0) return []
  const groups = _.groupBy(blogs, 'author')
  const mostBlogs = []
  const authors = Object.keys(groups)

  for (let group in groups ) {mostBlogs.push(groups[group].length)}
  const maxBlogs = Math.max(...mostBlogs)
  const findMost = mostBlogs.indexOf(maxBlogs)
  return { author: authors[findMost], blogs: maxBlogs }
}

module.exports = {
  dummy,
  totalLikes,
  mostLikes,
  favoriteBlog,
  mostBlogs,
}