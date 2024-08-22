import { useState, useEffect } from 'react'
import ApiService from '../service/ApiService'

const useFetchData = (
  endpoint,
  method = 'GET',
  body = null,
  headers = {},
  id = ''
) => {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    const apiService = new ApiService()

    const fetchData = async () => {
      try {
        let result
        const fullEndpoint = id ? `${endpoint}/${id}` : endpoint

        switch (method) {
          case 'POST':
            result = await apiService.post(fullEndpoint, body, headers)
            break
          case 'PUT':
            result = await apiService.put(fullEndpoint, body, headers)
            break
          case 'DELETE':
            result = await apiService.delete(fullEndpoint, headers)
            break
          default:
          case 'GET':
            result = await apiService.get(fullEndpoint, headers)
            break
        }
        setData(result || [])
      } catch (error) {
        setError(error)
        console.error('Loading data error:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [endpoint, method, body, headers, id])

  return {
    data,
    loading,
    error,
  }
}
export default useFetchData
