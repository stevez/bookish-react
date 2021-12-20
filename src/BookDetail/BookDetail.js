import { Button, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import ReviewList from "./ReviewList";
import * as actions from "../redux/actions/actions";

const BookDetail = ({ book }) => {
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const dispatch = useDispatch();

  return (
    <>
      <h2 className="book-title">{book.name}</h2>
      <p className="book-description">
        {book.description ? book.description : book.name}
      </p>
      <form noValidate autoComplete="off">
        <TextField
          label="Name"
          name="name"
          margin="normal"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          label="Content"
          name="content"
          margin="normal"
          variant="outlined"
          mutiline
          rowsMax="4"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          name="submit"
          onClick={() =>
            dispatch(actions.saveReview(book.id, { name, content }))
          }
        >
          Submit
        </Button>
      </form>
      {book.reviews && <ReviewList reviews={book.reviews} />}
    </>
  );
};

export default BookDetail;
