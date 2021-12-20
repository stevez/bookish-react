import axios from "axios";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

import { setSearchTerm, fetchBooks, fetchABook, saveReview } from "./actions";
import * as types from "./types";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("BookListContainer related actions", () => {
  it("Sets the search keyword", () => {
    const term = "";
    const expected = {
      type: types.SET_SEARCH_TERM,
      term,
    };
    const action = setSearchTerm(term);
    expect(action).toEqual(expected);
  });

  it("feches data successfully", () => {
    const books = [
      { id: 1, name: "Refactoring" },
      { id: 2, name: "Domain-driven design" },
    ];
    axios.get = jest
      .fn()
      .mockImplementation(() => Promise.resolve({ data: books }));

    const expectedActions = [
      { type: types.FETCH_BOOKS_PENDING },
      { type: types.FETCH_BOOKS_SUCCESS, books },
    ];

    const store = mockStore({ books: [] });
    return store.dispatch(fetchBooks()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it("fetch data with error", () => {
    axios.get = jest.fn().mockImplementation(() => {
      return Promise.reject({ message: "Something was wrong" });
    });

    const expectedActions = [
      { type: types.FETCH_BOOKS_PENDING },
      { type: types.FETCH_BOOKS_FAILED, err: "Something was wrong" },
    ];
    const store = mockStore({ books: [] });

    return store.dispatch(fetchBooks()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it("Fetch a book by id", () => {
    const book = { id: 1, name: "Refactoring" };
    axios.get = jest
      .fn()
      .mockImplementation(() => Promise.resolve({ data: book }));
    const store = mockStore({ list: { books: [], term: "" } });
    return store.dispatch(fetchABook(1)).then(() => {
      expect(axios.get).toHaveBeenCalledWith("http://localhost:8080/books/1");
    });
  });

  it("Saves a review for a book", () => {
    const review = {
      name: "Steve",
      content: "Excellent work!",
    };
    axios.post = jest.fn().mockImplementation(() => Promise.resolve({}));

    const store = mockStore({ list: { books: [], term: "" } });
    return store.dispatch(saveReview(1, review)).then(() => {
      expect(axios.post).toHaveBeenCalledWith(
        "http://localhost:8080/books/1",
        review
      );
    });
  });
});
