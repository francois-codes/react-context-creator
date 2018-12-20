/* eslint-disable react/prop-types */
import * as React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";

import { createProvider } from "../provider";
import { ReactContext } from "./fixtures";

const initialContext = {
  context: "initialValue",
  otherContext: "otherValue"
};

const contextPropertiesNames = ["context", "otherContext"];
const contextSettersNames = ["setContext", "setOtherContext"];

const stateValidator = jest.fn(() => true);

describe("createProvider", () => {
  const Provider = createProvider({
    ReactContext,
    initialContext,
    contextPropertiesNames,
    contextSettersNames,
    stateValidator
  });

  it("creates a context Provider component", () => {
    const MockChild = props => <div>{props.context}</div>;

    const wrapper = shallow(
      <Provider>
        <MockChild context={"context"} />
      </Provider>
    );
    expect(toJson(wrapper)).toMatchSnapshot();

    expect(wrapper.find(ReactContext.Provider).props()).toMatchSnapshot();
  });
});
