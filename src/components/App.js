import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Main from "./Main";
import STORE from "./components/store";

export default class App extends Component {
  state = {
    folders: [...STORE.folders],
    notes: [...STORE.notes]
  };

  render() {
    return (
      <Router>
        <Header />
        <Route
          path="/"
          exact={true}
          render={props => (
            <>
              <Sidebar {...props} />
              <Main {...props} />
            </>
          )}
        />
        <Route
          path="/folder/:folderId"
          render={props => (
            <>
              <Sidebar {...props} />
              <Main {...props} />
            </>
          )}
        />
        <Route
          path="/note/:noteId"
          render={props => (
            <>
              <Sidebar {...props} />
              <Main {...props} />
            </>
          )}
        />
      </Router>
    );
  }
}
