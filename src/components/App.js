import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Main from "./Main";
import Note from "./Note";
import AddFolder from "./AddFolder";
import AddNote from "./AddNote";
import Error from "./Error";

export default class App extends Component {
  state = {
    folders: [],
    notes: []
  };

  getStuff = () => {
    Promise.all([
      fetch("http://localhost:9090/notes").then(res => res.json()),
      fetch("http://localhost:9090/folders").then(res => res.json())
    ]).then(([notes, folders]) => {
      this.setState({ notes, folders });
    });
  };

  componentDidMount() {
    this.getStuff();
  }

  componentDidUpdate() {
    this.getStuff();
  }

  deleteNote = noteId => {
    fetch(`http://localhost:9090/notes/${noteId}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json"
      }
    });
    let notes = [...this.state.notes].filter(note => note.id !== noteId);
    this.setState({ notes });
  };

  addFolder = name => {
    const id =
      Math.random()
        .toString(36)
        .substring(2, 4) +
      Math.random()
        .toString(36)
        .substring(2, 4);
    fetch("http://localhost:9090/folders", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({ id, name })
    });
  };

  addNote = (name, folderId, content) => {
    const id =
      Math.random()
        .toString(36)
        .substring(2, 4) +
      Math.random()
        .toString(36)
        .substring(2, 4);
    console.log(folderId);
    const modified = new Date();
    fetch("http://localhost:9090/notes", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        id,
        name,
        modified,
        folderId,
        content
      })
    });
  };

  render() {
    return (
      <Router>
        <Error>
          <Header />
          <Route
            path="/"
            exact={true}
            render={props => (
              <>
                <Sidebar
                  {...props}
                  folders={this.state.folders}
                  Mode="Normal"
                  key={1}
                />
                <Main
                  {...props}
                  notes={this.state.notes}
                  deleteNote={this.deleteNote}
                />
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
                  key={2}
                />

                <Main
                  {...props}
                  notes={this.state.notes}
                  deleteNote={this.deleteNote}
                />
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
                  key={3}
                />
                <Note
                  {...props}
                  notes={this.state.notes}
                  deleteNote={this.deleteNote}
                />
              </>
            )}
          />
          <Route
            path="/addfolder"
            render={props => (
              <AddFolder addFolder={this.addFolder} {...props} />
            )}
          />
          <Route
            path="/addnote"
            render={props => (
              <AddNote
                addNote={this.addNote}
                folders={this.state.folders}
                {...props}
              />
            )}
          />
        </Error>
      </Router>
    );
  }
}
