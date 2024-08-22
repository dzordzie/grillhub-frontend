class ApiService {
  constructor(resource = '') {
    this.resource = resource
    this.baseUrl = process.env.REACT_APP_BACKEND_PATH
  }

  getAccessToken() {
    return localStorage.getItem('accessToken')
  }

  setAccessToken(token) {
    localStorage.setItem('accessToken', token)
  }

  getRefreshToken() {
    return localStorage.getItem('refreshToken')
  }

  setRefreshToken(token) {
    localStorage.setItem('refreshToken', token)
  }

  removeTokens() {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
  }

  async refreshAccessToken() {
    const refreshToken = this.getRefreshToken()

    try {
      const response = await fetch(`${this.baseUrl}/auth/refresh-token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken }),
      })

      if (!response.ok) {
        throw new Error('Failed to refresh token')
      }

      const { accessToken, refreshToken: newRefreshToken } =
        await response.json()
      this.setAccessToken(accessToken)
      this.setRefreshToken(newRefreshToken)
    } catch (error) {
      console.error('Token refresh error: ', error)
      this.removeTokens()
      window.location.href = '/auth/login'
    }
  }

  async request(endpoint, method, body = null, headers = {}) {
    const url = `${this.baseUrl}${this.resource}${endpoint}`
    let accessToken = this.getAccessToken()

    headers['Content-Type'] = 'application/json'

    if (accessToken) {
      headers['Authorization'] = `Bearer ${accessToken}`
    }

    const options = {
      method,
      headers,
    }
    if (body !== null) {
      options.body = JSON.stringify(body)
    }

    try {
      let response = await fetch(url, options)

      if (response.status === 401) {
        await this.refreshAccessToken()
        accessToken = this.getAccessToken()
        if (accessToken) {
          headers['Authorization'] = `Bearer ${accessToken}`
        }
        response = await fetch(url, options)
      }

      if (!response.ok) {
        const responseText = await response.text()
        try {
          const errorData = JSON.parse(responseText)
          throw new Error(
            errorData.message || `Request failed: ${response.status}`
          )
        } catch {
          throw new Error(
            `Request failed: ${response.status} - ${responseText}`
          )
        }
      }
      const responseText = await response.text()
      return responseText ? JSON.parse(responseText) : {}
    } catch (error) {
      console.error('API request error:', error)
      throw error
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
    return this.request(endpoint, 'DELETE', null, headers)
  }
}
export default ApiService
