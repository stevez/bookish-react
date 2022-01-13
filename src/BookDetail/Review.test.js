import Review from "./Review";
import { render } from "@testing-library/react";
import React from "react";
import userEvent from "@testing-library/user-event";
import store from "../store";
import { Provider } from "react-redux";
import * as actions from "../redux/actions/actions";

const renderWithProvider = (component) => {
  return { ...render(<Provider store={store}>{component}</Provider>) };
};
describe("Review", () => {
  it("renders", () => {
    const props = {
      review: {
        name: "Juntao",
        date: "2021/12/18",
        content: "Excellent work",
      },
    };

    const { container } = renderWithProvider(<Review {...props} />);
    const review = container.querySelector(".review");
    expect(review.querySelector(".name").innerHTML).toEqual("Juntao");
    expect(review.querySelector(".date").innerHTML).toEqual("2021/12/18");
    expect(review.querySelector(".content").innerHTML).toEqual(
      "Excellent work"
    );
  });

  it("editing", () => {
    const props = {
      review: {
        name: "Juntao",
        date: "2021/12/18",
        content: "Excellent work",
      },
    };

    const { getByText } = renderWithProvider(<Review {...props} />);
    const button = getByText("Edit");
    expect(button.innerHTML).toEqual("Edit");
    userEvent.click(button);
    expect(button.innerHTML).toEqual("Submit");
  });

  it("copy content to a text area for editing", () => {
    const props = {
      review: {
        name: "Juntao",
        date: "2021/12/18",
        content: "Excellent work",
      },
    };

    const { getByText, container } = renderWithProvider(<Review {...props} />);
    const button = getByText("Edit");
    const content = container.querySelector("p.content");

    expect(content).toBeInTheDocument();
    expect(
      container.querySelector('textarea[name="content"')
    ).not.toBeInTheDocument();
    userEvent.click(button);

    expect(content).not.toBeInTheDocument();
    expect(
      container.querySelector('textarea[name="content"')
    ).toBeInTheDocument();
    expect(
      container.querySelector('textarea[name="content"').innerHTML
    ).toEqual("Excellent work");
  });

  it("send requests", async () => {
    const fakeUpdateReview = () => {
      return () => {
        return Promise.resolve({});
      };
    };

    const props = {
      review: {
        id: 123,
        name: "Juntao",
        date: "2021/12/18",
        content: "Excellent work",
      },
    };
    jest
      .spyOn(actions, "updateReview")
      .mockImplementation(() => fakeUpdateReview);

    const { getByText, container } = renderWithProvider(<Review {...props} />);
    const button = getByText("Edit");
    //edit
    userEvent.click(button);

    const content = container.querySelector('textarea[name="content"]');

    userEvent.clear(content);
    userEvent.type(content, "Great job");
    //submit
    userEvent.click(button);
    expect(actions.updateReview).toHaveBeenLastCalledWith(123, {
      content: "Great job",
    });
  });
});
