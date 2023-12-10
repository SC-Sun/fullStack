import axios from 'axios'
const baseUrl = '/api/blogs'

let token


const setToken = newToken => {
  token = `Bearer ${newToken}`
}


const getAll = async () => {
  const request =  axios.get(baseUrl)
  const response = await request
  return response.data
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(baseUrl, newObject, config)

  return response.data
}


const update = async (id, newObject) => {
  const response = await axios.put(`${ baseUrl }/${id}`, newObject)
  console.log('RES-upDate ', response)
  return response.data
}

const deleteB = async (id) => {
  await axios.delete(`${baseUrl}/${id}`)
}

export default { getAll, create, update, setToken, deleteB }