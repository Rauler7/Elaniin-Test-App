import axios from 'axios'
import Auth from './Auth'

export default class Api {
  constructor (callback) {
    this.auth = new Auth('ljasdklajsldkjalskdjalskdjalskjd alsjlaksjdalskjdapsodasidqp', '', callback)
  }
  getRepos () {
    return this.isLoggedIn()
    ? this.getProfile()
    : Promise.reject(new Error('User is not authenticated'))
  }

  async getProfile () {
    const profile = await axios.post('https://snacks-market-api-test.herokuapp.com/auth/login', {id_token: this.auth.getToken()})
    return Promise.all([
      profile.data,
      axios.get('https://snacks-market-api-test.herokuapp.com/products')
    ])
  }

  isLoggedIn () {
    return this.auth.loggedIn()
  }
  login () {
    this.auth.login()
  }
  logout () {
    this.auth.logout()
  }
}