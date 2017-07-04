import axios from 'axios'

export default {
  get (cb) {
    axios.get('/static/demo/demo.json')
    .then(response => {
      let data = response.data.data || []
      cb(data)
    })
  }
}
