import * as R from "ramda";

const SETTER_PREFIX = "set";

// this noop function is used temporarily when the React Context is first created
export const NOOP = () => {};

/**
 * capitalizes a string
 * @param {String} string to capitalize
 * @returns {String} string
 */
const capitalize = R.compose(
  R.join(""),
  R.juxt([
    R.compose(
      R.toUpper,
      R.head
    ),
    R.tail
  ])
);

/**
 * gets the setter name for a given property : fooBar => setFooBar
 * @param {String} property
 * @returns {String}
 */
export const getSetterName = R.compose(
  R.concat(SETTER_PREFIX),
  capitalize
);

/**
 * Creates the setter function for each property, and binds it to the current react component,
 * invokes the stateValidator if provided in the options
 * @param {Array<String>} properties array of properties for which setters need to be created
 * @param {Object} component react component to which the setter functions must be bound to
 * @param {Object} options
 * @param {Function} options.stateValidator optional Predicate to validate whether
 * the invokation of the setter is valid or not. It is called with {property, value}
 * falls back to () => true if not provided
 */
export function createContextSetters(properties, component, options = {}) {
  const { stateValidator = R.T } = options;

  R.forEach(property => {
    const setterName = getSetterName(property);

    component[setterName] = value => {
      if (stateValidator({ property, value })) {
        component.setState(R.assoc(property, value));
      } else {
        // eslint-disable-next-line no-console
        console.warn(
          `trying to invoke ${setterName} with ${value} - but it was rejected by the state validator
          skipping context update`
        );
      }
    };
  }, properties);
}
