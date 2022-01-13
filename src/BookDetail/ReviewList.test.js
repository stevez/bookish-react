import React from "react";
import ReviewList from "./ReviewList";
import { render } from "@testing-library/react";

describe("ReviewList", () => {
  it("renders an empty List", () => {
    const props = {
      reviews: [],
    };
    const { container } = render(<ReviewList {...props} />);
    const reviews = container.querySelector('[data-test="reviews-container"]');
    expect(reviews).toBeInTheDocument();
  });
});
