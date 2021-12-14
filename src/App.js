import './App.css';
import { Typography } from '@material-ui/core'
import BookListContainer from './BookList/BookListConainer';
import BookDetailContainer from './BookDetail/BookDetailContainer';
import { Route, Switch } from 'react-router-dom';

const App = () => {

  return (
    <div className="App">
      <Typography variant='h2' component='h2' data-test='heading'>
        Bookish
      </Typography>
      <Switch>
        <Route exact path='/' component={BookListContainer} />
        <Route path='/books/:id' component={BookDetailContainer} />
      </Switch>
    </div>
  );
}

export default App;

