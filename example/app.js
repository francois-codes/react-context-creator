import * as React from "react";
import { AppRegistry, StyleSheet, Text, View, Button } from "react-native";

import { createContext } from "../src";

const CounterContext = createContext(
  { counter: 0 },
  ({ property, value }) =>
    property === "counter" && typeof value === "number" && !Number.isNaN(value)
);

const Buttons = CounterContext.withConsumer(({ counter, setCounter }) => {
  return (
    <View>
      <Button title="increment" onPress={() => setCounter(counter + 1)} />
      <Button title="decrement" onPress={() => setCounter(counter - 1)} />
      <Button title="reset" onPress={() => setCounter(0)} />
    </View>
  );
});

class App extends React.Component {
  render() {
    return (
      <View style={styles.box}>
        <Text style={styles.text}>Hello, world!</Text>
        <CounterContext.Consumer>
          {({ counter }) => (
            <Text style={styles.text}>counter value: {counter}</Text>
          )}
        </CounterContext.Consumer>
        <Buttons />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  box: { padding: 10 },
  text: { fontWeight: "bold" }
});

AppRegistry.registerComponent("App", () => CounterContext.withProvider(App));
AppRegistry.runApplication("App", {
  rootTag: document.getElementById("app_container")
});
