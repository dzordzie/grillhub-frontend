import ApiService from './ApiService';

class UserService {
  constructor() {
    this.apiService = new ApiService('/auth')
  }

  async registration(user) {
    return this.apiService.post('/registration', user)
  }

  async login(user) {
    return this.apiService.post('/login', user)
  }

}
export default UserService