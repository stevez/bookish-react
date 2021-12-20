import { render } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import BookDetailContainer from './BookDetailContainer';
import { MemoryRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux'
import store from '../store'
import '@testing-library/jest-dom/extend-expect';

describe('BookDetailContainer', () => {
  it('renders', async () => {
    const props = {
      match: {
        params: {
          id: 2
        }
      }
    }

    const mock = new MockAdapter(axios);
    mock.onGet('http://localhost:8080/books/2').reply(200,
      { 'name': 'Acceptance tests driven development with React', 'id': 2 }
    )
    const { findAllByText } = renderWithProvider(<BookDetailContainer {...props} />)
    const found = await findAllByText('Acceptance tests driven development with React')
    expect(found.length).toBeGreaterThanOrEqual(1)
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