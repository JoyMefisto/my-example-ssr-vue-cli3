import api from '../../instance'

export default {
  getData () {
    return api.get('/api/users?page=2')
  }
}
