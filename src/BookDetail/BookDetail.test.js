import React from "react";
import { render } from "@testing-library/react";
import BookDetail from "./BookDetail";
import store from "../store";
import { Provider } from "react-redux";

const renderWithProvider = (component) => {
  return { ...render(<Provider store={store}>{component}</Provider>) };
};
describe("BookDetail", () => {
  it("renders title", () => {
    const props = {
      book: {
        name: "Refactoring",
      },
    };
    const { container } = renderWithProvider(<BookDetail {...props} />);
    const title = container.querySelector(".book-title");
    expect(title.innerHTML).toEqual(props.book.name);
  });

  it("renders description", () => {
    const props = {
      book: {
        name: "Refactoring",
        description: "Martin Fowler's Refactoring book",
      },
    };
    const { container } = renderWithProvider(<BookDetail {...props} />);
    const description = container.querySelector("p.book-description");
    expect(description.innerHTML).toEqual(props.book.description);
  });

  it("displays the book name when no descriiption was given", () => {
    const props = {
      book: {
        name: "Refactoring",
      },
    };
    const { container } = renderWithProvider(<BookDetail {...props} />);
    const description = container.querySelector("p.book-description");
    expect(description.innerHTML).toEqual(props.book.name);
  });

  it("renders reviews", () => {
    const props = {
      book: {
        name: "Refactoring",
        description: "Martin Fowler's Refactoring book",
        reviews: [
          { name: "Juntao", date: "2021/12/18", content: "Exellent work" },
        ],
      },
    };
    const { container } = renderWithProvider(<BookDetail {...props} />);
    const reviews = container.querySelectorAll(
      '[data-test="reviews-container"] .review'
    );
    expect(reviews.length).toBe(1);
    expect(reviews[0].querySelector(".name").innerHTML).toEqual("Juntao");
  });

  it("renders veview form", () => {
    const props = {
      book: {
        name: "Refactoring",
        description: "Martin Fowler's Refactoring book",
      },
    };
    const { container } = renderWithProvider(<BookDetail {...props} />);
    const form = container.querySelector("form");
    const nameInput = container.querySelector('input[name="name"]');
    const contentTextArea = container.querySelector('textarea[name="content"]');
    const submitButton = container.querySelector('button[name="submit"]');

    expect(form).toBeInTheDocument();
    expect(nameInput).toBeInTheDocument();
    expect(contentTextArea).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });
});
