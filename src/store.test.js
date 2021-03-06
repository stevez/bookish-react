import axios from 'axios'
import * as actions from './redux/actions/actions'
import store from './store'

describe('Store', () => {
  const books = [{ id: 1, name: 'Refactoring' }]

  it('Fetch books from remote', () => {
    axios.get = jest.fn().mockImplementation(() => Promise.resolve({ data: books }))

    return store.dispatch(actions.fetchBooks())
      .then(() => {
        const state = store.getState();
        expect(state.books.length).toEqual(1)
        expect(state.books).toEqual(books)
      })
  });

  it('Fetch a book from remote', () => {
    axios.get = jest.fn().mockImplementation(() => Promise.resolve({ data: books[0] }))

    return store.dispatch(actions.fetchABook(1))
      .then(() => {
        const state = store.getState();
        expect(state.book).toEqual(books[0])
      })
  });
  it('Search data with term', () => {
    const books = [
      { id: 1, name: 'Refactoring' },
      { id: 2, name: 'Domain-driven design' }
    ]
    axios.get = jest
      .fn()
      .mockImplementation(() => Promise.resolve({ data: books }))

    store.dispatch(actions.setSearchTerm('domain'))
    return store.dispatch(actions.fetchBooks()).then(() => {
      expect(axios.get).toBeCalledWith('http://localhost:8080/books?q=domain')
    })
  });
});

