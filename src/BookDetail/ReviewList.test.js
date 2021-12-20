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

  it("renders review list when data is passed", () => {
    const props = {
      reviews: [
        { name: "Juntao", date: "2021/12/18", content: "Exellent work" },
        { name: "Steve", date: "2021/12/01", content: "amazing" },
      ],
    };

    const { container } = render(<ReviewList {...props} />);
    const reviews = container.querySelectorAll(
      '[data-test="reviews-container"] .review'
    );
    expect(reviews.length).toBe(2);
    expect(reviews[0].innerHTML).toEqual("Juntao");
  });
});
