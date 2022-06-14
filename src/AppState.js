import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  account: {},
  movies: [],
  activeMovie: {},
  currentPage: 1,
  totalPages: 1,
  uri: 'discover/movie',
  query: ''
})
