import React from 'react'
import BookList from './BookList'
import { useEffect, useState } from 'react';
import SearchBox from './SearchBox'
import bookListSelector from '../redux/selectors/selector';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../redux/actions/actions'

const BookListContainer = () => {
  const [term, setTerm] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.fetchBooks())
  }, [term, dispatch]);

  const onSearch = (event) => {
    dispatch(actions.setSearchTerm(event.target.value));
    dispatch(actions.fetchBooks());
  }
  const { books, loading, error } = useSelector(bookListSelector)
  return (
    <>
      <SearchBox term={term} onSearch={onSearch} />
      <BookList books={books} loading={loading} error={error} />
    </>
  );
}
export default BookListContainer;