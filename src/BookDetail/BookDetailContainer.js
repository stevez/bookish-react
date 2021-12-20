import React, { useEffect } from 'react';
import BookDetail from './BookDetail';

import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../redux/actions/actions'

const BookDetailContainer = ({ match }) => {
  const disptach = useDispatch()
  useEffect(() => {
    disptach(actions.fetchABook(match.params.id))
  }, [disptach, match])

  const book = useSelector(state => state.book)
  return <BookDetail book={book} />
}

export default BookDetailContainer;