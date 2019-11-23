import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Main from "./Main";
import Note from "./Note";
import STORE from "./store";

export default class App extends Component {
  state = {
    folders: [...STORE.folders],
    notes: [...STORE.notes],
    test: "context"
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
              <Sidebar {...props} folders={this.state.folders} Mode="Normal" />
              <Main {...props} notes={this.state.notes} />
            </>
          )}
        />
        <Route
          path="/folder/:folderId"
          render={props => (
            <>
              <Sidebar
                {...props}
                folders={this.state.folders}
                Mode="ActiveFolder"
              />

              <Main {...props} notes={this.state.notes} />
            </>
          )}
        />
        <Route
          path="/note/:noteId"
          render={props => (
            <>
              <Sidebar
                {...props}
                folders={this.state.folders}
                FolderID={props.match.params.folderId}
                Mode="Notes"
              />
              <Note {...props} notes={this.state.notes} />
            </>
          )}
        />
      </Router>
    );
  }
}
