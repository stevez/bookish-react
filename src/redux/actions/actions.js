import axios from "axios"
import * as types from './types'

export const setSearchTerm = (term) => {
  return {
    type: types.SET_SEARCH_TERM,
    term
  }
}

export const fetchBooks = () => {
  return (dispatch, getState) => {
    const state = getState()
    const url = `http://localhost:8080/books?q=${state.term || ''}`
    dispatch({ type: types.FETCH_BOOKS_PENDING })
    return axios.get(url)
      .then((res) => {
        dispatch({ type: types.FETCH_BOOKS_SUCCESS, books: res.data })
      }).catch((error) => {
        dispatch({ type: types.FETCH_BOOKS_FAILED, err: error.message })
      })
  }
}