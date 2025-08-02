const API_BASE_URL = 'https://j6h5i7c03eox.manus.space/api'

class ApiClient {
  constructor() {
    this.baseURL = API_BASE_URL
  }

  getToken() {
    return localStorage.getItem('token')
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`
    const token = this.getToken()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
        ...options.headers
      },
      ...options
    }

    try {
      const response = await fetch(url, config)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`)
      }

      return data
    } catch (error) {
      console.error('API request failed:', error)
      throw error
    }
  }

  // Ticket endpoints
  async getTickets(params = {}) {
    const queryString = new URLSearchParams(params).toString()
    return this.request(`/tickets${queryString ? `?${queryString}` : ''}`)
  }

  async getTicket(id) {
    return this.request(`/tickets/${id}`)
  }

  async createTicket(ticketData) {
    return this.request('/tickets', {
      method: 'POST',
      body: JSON.stringify(ticketData)
    })
  }

  async updateTicket(id, ticketData) {
    return this.request(`/tickets/${id}`, {
      method: 'PUT',
      body: JSON.stringify(ticketData)
    })
  }

  async deleteTicket(id) {
    return this.request(`/tickets/${id}`, {
      method: 'DELETE'
    })
  }

  async getTicketStats() {
    return this.request('/tickets/stats')
  }

  // Comment endpoints
  async getComments(ticketId) {
    return this.request(`/tickets/${ticketId}/comments`)
  }

  async createComment(ticketId, commentData) {
    return this.request(`/tickets/${ticketId}/comments`, {
      method: 'POST',
      body: JSON.stringify(commentData)
    })
  }

  async updateComment(commentId, commentData) {
    return this.request(`/comments/${commentId}`, {
      method: 'PUT',
      body: JSON.stringify(commentData)
    })
  }

  async deleteComment(commentId) {
    return this.request(`/comments/${commentId}`, {
      method: 'DELETE'
    })
  }

  // Category endpoints
  async getCategories() {
    return this.request('/categories')
  }

  async createCategory(categoryData) {
    return this.request('/categories', {
      method: 'POST',
      body: JSON.stringify(categoryData)
    })
  }

  async updateCategory(id, categoryData) {
    return this.request(`/categories/${id}`, {
      method: 'PUT',
      body: JSON.stringify(categoryData)
    })
  }

  async deleteCategory(id) {
    return this.request(`/categories/${id}`, {
      method: 'DELETE'
    })
  }

  // User endpoints
  async getUsers(params = {}) {
    const queryString = new URLSearchParams(params).toString()
    return this.request(`/users${queryString ? `?${queryString}` : ''}`)
  }

  async getUser(id) {
    return this.request(`/users/${id}`)
  }

  async createUser(userData) {
    return this.request('/users', {
      method: 'POST',
      body: JSON.stringify(userData)
    })
  }

  async updateUser(id, userData) {
    return this.request(`/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(userData)
    })
  }

  async deleteUser(id) {
    return this.request(`/users/${id}`, {
      method: 'DELETE'
    })
  }

  async getAgents() {
    return this.request('/users/agents')
  }
}

export const api = new ApiClient()
export default api

