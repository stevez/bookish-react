import reducer from './reducer'
import * as types from '../actions/types'

describe('Reducer', () => {
  it('Shows loading when request is sent', () => {
    const initState = { loading: false }
    const action = { type: types.FETCH_BOOKS_PENDING }
    const state = reducer(initState, action);
    expect(state.loading).toBeTruthy();
  });

  it('Add books to state when request successful', () => {
    const books = [
      { id: 1, name: 'Refactoring' },
      { id: 2, name: 'Domain-driven design' }
    ]
    const action = {
      type: types.FETCH_BOOKS_SUCCESS,
      books
    }

    const state = reducer([], action);
    expect(state.books).toBe(books);
    expect(state.loading).toBeFalsy();
  });

  it('set term', () => {
    const initState = { term: '' }
    const action = { type: types.SET_SEARCH_TERM, term: 'domain' }
    const state = reducer(initState, action);
    expect(state.term).toBe('domain')
  });
});