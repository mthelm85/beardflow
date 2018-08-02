import axios from 'axios'

export default () => {
  return axios.create({
    baseURL: 'https://beardflow.herokuapp.com/api',
    withCredentials: true
  })
}
