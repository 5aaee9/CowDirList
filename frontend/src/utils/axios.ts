import axios from 'axios'

export const baseURL = 'https://rz2g7h63eg.execute-api.us-east-1.amazonaws.com/production'

const instance = axios.create({
    baseURL,
    timeout: 30e3
})

export default instance
