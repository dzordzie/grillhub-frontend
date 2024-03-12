class ApiService {
  resource

  constructor(resource = null) {
    this.resource = resource ?? ''
  }

  async request(endpoint, method, body = null, headers = {}) {
    const url = `${process.env.REACT_APP_BACKEND_PATH}${this.resource}${endpoint}`
    const options = {
      method,
      headers,
    }
    if (body !== null) {
      options.body = JSON.stringify(body)
      headers['Content-Type'] = 'application/json'
    }
    try {
      const response = await fetch(url, endpoint)
      if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`)
      }
      return await response.json()
    } catch (error) {
      console.error('Error:', error)
    }
  }

  get(endpoint, headers = {}) {
    return this.request(endpoint, 'GET', null, headers)
  }

  post(endpoint, body = null, headers = {}) {
    return this.request(endpoint, 'POST', body, headers)
  }

  put(endpoint, body = null, headers = {}) {
    return this.request(endpoint, 'PUT', body, headers)
  }

  delete(endpoint, headers = {}) {
    return this.request(endpoint, 'DELETE', body, headers)
  }
}
export default ApiService
