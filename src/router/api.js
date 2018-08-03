import axios from 'axios'

export default () => {
  return axios.create({
    baseURL: 'https://www.beardflow.app/api',
    withCredentials: true
  })
}
