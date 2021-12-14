import * as types from '../actions/types'

const reducer = (state = [], action) => {
  switch (action.type) {
    case types.SET_SEARCH_TERM:
      return { ...state, term: action.term }
    case types.FETCH_BOOKS_PENDING:
      return { ...state, loading: true };
    case types.FETCH_BOOKS_SUCCESS:
      return { ...state, books: action.books, loading: false }
    default:
      return state;
  }
}

export default reducer;