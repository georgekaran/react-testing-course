import React from 'react';
import Enzyme, { shallow } from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16';

import App from './App';

Enzyme.configure({ adapter: new EnzymeAdapter() })

/**
 * Factory function to create a ShallowWrapper for the component
 * @function setup
 * @param {object} props 
 * @param {object} state 
 * @returns {ShallowWrapper}
 */
const setup = (props={}, state=null) => {
  const wrapper = shallow(<App {...props} />);
  if (state) wrapper.setState(state)

  return wrapper
}

/**
 * Return ShallowWrapper containing node(s) with the given data-test value.
 * @param {ShallowWrapper} wrapper 
 * @param {string} val
 * @returns {ShallowWrapper} 
 */
const findByTestAttr = (wrapper, val) => {
  return wrapper.find(`[data-test="${val}"]`)
}

test('renders without error', () => {
  const wrapper = setup();
  const appComponent = findByTestAttr(wrapper, 'component-app')
  expect(appComponent.length).toBe(1);
})

test('renders increment button', () => {
  const wrapper = setup();
  const button = findByTestAttr(wrapper, 'increment-button')
  expect(button.length).toBe(1);
})

test('renders counter display', () => {
  const wrapper = setup();
  const display = findByTestAttr(wrapper, 'counter-display')
  expect(display.length).toBe(1);
})

test('counter starts at 0', () => {
  const wrapper = setup();
  const initialCounterState = wrapper.state('counter')
  expect(initialCounterState).toBe(0)
})

test('clicking button increments counter display', () => {
  const counter = 7;
  const wrapper = setup(null, { counter });
  const button = findByTestAttr(wrapper, 'increment-button')
  button.simulate('click')
  const counterDisplay = findByTestAttr(wrapper, 'counter-display')
  expect(counterDisplay.text()).toContain(counter + 1);
})

test('clicking button decreases counter display', () => {
  const counter = 5;
  const wrapper = setup(null, { counter });
  const button = findByTestAttr(wrapper, 'decrement-button')
  button.simulate('click')
  const counterDisplay = findByTestAttr(wrapper, 'counter-display')
  expect(counterDisplay.text()).toContain(counter - 1);
})

test('display should not be negative', () => {
  const counter = 1;
  const wrapper = setup(null, { counter });
  let counterWarning = findByTestAttr(wrapper, 'counter-warning')
  expect(counterWarning.length).toBe(0);
  
  const decrementButton = findByTestAttr(wrapper, 'decrement-button')
  decrementButton.simulate('click')
  
  counterWarning = findByTestAttr(wrapper, 'counter-warning')
  expect(counterWarning.length).toBe(1);

  decrementButton.simulate('click')
  const counterDisplay = findByTestAttr(wrapper, 'counter-display')

  const incrementButton = findByTestAttr(wrapper, 'increment-button')
  incrementButton.simulate('click')
  counterWarning = findByTestAttr(wrapper, 'counter-warning')
  expect(counterWarning.length).toBe(0);
})