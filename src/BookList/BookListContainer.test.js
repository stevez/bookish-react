import { render } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import BookListContainer from './BookListConainer';
import { MemoryRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux'
import store from '../store'
import '@testing-library/jest-dom/extend-expect';

describe('BookListContainer', () => {
  it('renders', async () => {
    const mock = new MockAdapter(axios);
    mock.onGet('http://localhost:8080/books?q=').reply(200, [
      { 'name': 'Refactoring', 'id': 1 },
      { 'name': 'Acceptance tests driven development with React', 'id': 2 }
    ])
    const { findByText } = renderWithProvider(<BookListContainer />)
    const book1 = await findByText('Refactoring')
    const book2 = await findByText('Acceptance tests driven development with React')
    expect(book1).toBeInTheDocument()
    expect(book2).toBeInTheDocument()
  });
});

const renderWithProvider = (component) => {
  return {
    ...render(<Provider store={store}>
      <Router>
        {component}
      </Router>
    </Provider>)
  }
};