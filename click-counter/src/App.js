import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      counter: 0
    };
  }

  handleIncrementCount() {
    this.setState({ ...this.state, counter: this.state.counter + 1 })
  }

  handleDecrementCount() {
    if (this.state.counter !== 0) {
      this.setState({ ...this.state, counter: this.state.counter - 1 })
    }
  }

  render() {
    return (
      <div data-test="component-app">
        <h1 data-test="counter-display">
          The counter is currently {this.state.counter}
        </h1>
        {this.state.counter === 0 && 
          <h3 data-test="counter-warning">Counter cannot be less than 0</h3>}
        <button data-test="increment-button" onClick={() => this.handleIncrementCount()}></button>
        <button data-test="decrement-button" onClick={() => this.handleDecrementCount()}></button>
      </div>
    );
  }
}
export default App;
