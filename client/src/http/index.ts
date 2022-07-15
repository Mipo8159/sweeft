import axios from 'axios'

export const $axios = axios.create({
  withCredentials: true,
  baseURL: 'http://localhost:5000/api',
})

$axios.interceptors.request.use((config) => {
  config.headers!.Authorization = `Bearer ${localStorage.getItem(
    'access_token'
  )}`
  return config
})

$axios.interceptors.response.use(
  (config) => {
    return config
  },
  async (error) => {
    const originalRequest = error.config
    if (
      error.response.status === 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true
      try {
        const response = await axios.get(
          `http://localhost:5000/api/refresh`,
          {
            withCredentials: true,
          }
        )
        localStorage.setItem('access_token', response.data.access_token)
        return $axios.request(originalRequest)
      } catch (e) {
        console.log('Unauthorized')
      }
    }
    throw error
  }
)

export default $axios
