import React, { Component } from "react";

export default class Error extends Component {
  state = {
    hasError: false
  };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <h2>Sorry, something went wrong. Please try again.</h2>;
    }
    return this.props.children;
  }
}
