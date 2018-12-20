/* eslint-disable react/prop-types */
import * as React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";

import { createWithConsumerDecorator } from "../withConsumer";
import { ReactContext, mockContextData } from "./fixtures";

describe("createConsumer", () => {
  const { Consumer } = ReactContext;
  const withConsumer = createWithConsumerDecorator(Consumer);

  it("returns a function", () => {
    expect(withConsumer).toBeFunction();
  });

  it("creates a context consumer function", () => {
    const Child = props => <div>{props.context}</div>;
    const DecoratedChild = withConsumer(Child);
    const newContextValue = "newValue";

    const wrapper = shallow(<DecoratedChild />);

    const childWrapper = wrapper.dive();

    expect(toJson(childWrapper)).toMatchSnapshot();
    childWrapper.props().setContext(newContextValue);

    expect(mockContextData.setContext).toHaveBeenCalledWith(newContextValue);
  });
});
