/* eslint-disable react/prop-types */
import * as React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";

import { createWithProviderDecorator } from "../withProvider";

describe("withProvider", () => {
  const Provider = ({ children }) => <div>{children}</div>;
  const withProvider = createWithProviderDecorator(Provider);

  it("decorates a component with the provider", () => {
    const Component = () => (
      <div>
        <p>I am a Component</p>
      </div>
    );
    const DecoratedComponent = withProvider(Component);

    const wrapper = shallow(<DecoratedComponent />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
