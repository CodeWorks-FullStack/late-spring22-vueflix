import Axios from 'axios'
export const api = Axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  timeout: 8000,
  params :{
    api_key: '545c6ef058e65396849dfbbf381cbca3',
    sort_by: 'popularity.desc',
    'certification.lte' : 'pg-13'
  }
})
