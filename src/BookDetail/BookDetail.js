import React from 'react';

const BookDetail = ({ book }) => {
  return (
    <>
      <h2 className='book-title'>{book.name}</h2>
      <p className='book-description'>{book.description ? book.description : book.name}</p>
    </>
  )
}

export default BookDetail;