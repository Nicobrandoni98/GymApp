import axios from 'axios'

/* const baseUrl = 'https://gymapp-ift3.onrender.com/api/categories/' */
const baseUrl = 'http://localhost:3001/api/categories/'


const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
  }

  export default { getAll }