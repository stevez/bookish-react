import axios from "axios";
import * as types from "./types";

export const setSearchTerm = (term) => {
  return {
    type: types.SET_SEARCH_TERM,
    term,
  };
};

export const fetchBooks = () => {
  return (dispatch, getState) => {
    const state = getState();
    const url = `http://localhost:8080/books?q=${state.term || ""}`;
    dispatch({ type: types.FETCH_BOOKS_PENDING });
    return axios
      .get(url)
      .then((res) => {
        dispatch({ type: types.FETCH_BOOKS_SUCCESS, books: res.data });
      })
      .catch((error) => {
        dispatch({ type: types.FETCH_BOOKS_FAILED, err: error.message });
      });
  };
};

export const fetchABook = (id) => {
  return (dispatch) => {
    const url = `http://localhost:8080/books/${id}`;
    dispatch({ type: types.FETCH_BOOK_PENDING });
    return axios
      .get(url)
      .then((res) => {
        dispatch({ type: types.FETCH_BOOK_SUCCESS, book: res.data });
      })
      .catch((error) => {
        dispatch({ type: types.FETCH_BOOK_FAILED, err: error.message });
      });
  };
};

export const saveReview = (id, review) => {
  const config = {
    headers: { "Content-Type": "application/json" },
  };

  return (dispatch) => {
    const url = `http://localhost:8080/books/${id}/reviews`;
    dispatch({ type: types.SAVE_BOOK_REVIEW_PENDING });
    return axios
      .post(url, JSON.stringify(review), config)
      .then((res) => {
        dispatch({ type: types.SAVE_BOOK_REVIEW_SUCCESS, book: res.data });
        dispatch(fetchABook(id));
      })
      .catch((error) => {
        dispatch({ type: types.SAVE_BOOK_REVIEW_FAILED, err: error.message });
      });
  };
};
