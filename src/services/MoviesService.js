import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"


class MoviesService{
  async getMovies(){
    AppState.uri = 'discover/movie'
    const res = await api.get('discover/movie')
    logger.log('-getMovies-', res.data)
    AppState.movies = res.data.results
    AppState.currentPage = res.data.page
    AppState.totalPages = res.data.total_pages
  }

  async getMovieById(id){
    const res = await api.get('movie/'+id)
    logger.log('-movieById-', res.data)
    AppState.activeMovie = res.data
  }

  // NOTE you probably wont need the URI part but this api has different end points for discovery and searching
  async changePage(pageNumber){
    let uri = AppState.uri
    let query = AppState.query
    const res = await api.get(`${uri}?${query}&page=${pageNumber}`)
    logger.log('-changePage-', res.data)
    AppState.movies = res.data.results
    AppState.currentPage = res.data.page
    AppState.totalPages = res.data.total_pages
  }

  async searchMovies(query=''){
    AppState.uri = 'search/movie'
    AppState.query = query
    logger.log('searching', query)
    const res = await api.get(`search/movie?${query}`)
    logger.log('-searchMovies-',res.data)
    AppState.movies = res.data.results
    AppState.currentPage = res.data.page
    AppState.totalPages = res.data.total_pages
  }

}

export const moviesService = new MoviesService()
