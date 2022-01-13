import React from "react";
import ReviewList from "./ReviewList";
import ReviewForm from "./ReviewForm";

const BookDetail = ({ book }) => {
  return (
    <>
      <h2 className="book-title">{book.name}</h2>
      <p className="book-description">
        {book.description ? book.description : book.name}
      </p>
      <ReviewForm id={book.id} />
      {book.reviews && <ReviewList reviews={book.reviews} />}
    </>
  );
};

export default BookDetail;
