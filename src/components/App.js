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
      fetch("https://stormy-temple-39077.herokuapp.com/notes/").then(res =>
        res.json()
      ),
      fetch("https://stormy-temple-39077.herokuapp.com/folders/").then(res =>
        res.json()
      )
    ]).then(([notes, folders]) => {
      this.setState({ notes, folders });
    });
  };

  componentDidMount() {
    this.getStuff();
  }

  deleteNote = noteId => {
    fetch(`https://stormy-temple-39077.herokuapp.com/notes/${noteId}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json"
      }
    }).then(() => this.getStuff());
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
    fetch("https://stormy-temple-39077.herokuapp.com/folders", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({ id, name })
    }).then(() =>
      this.setState({
        folders: [...this.state.folders, { id, foldername: name }]
      })
    );
  };

  addNote = (name, folderId, content) => {
    const id =
      Math.random()
        .toString(36)
        .substring(2, 4) +
      Math.random()
        .toString(36)
        .substring(2, 4);
    const modified = new Date();
    fetch("https://stormy-temple-39077.herokuapp.com/notes", {
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
    }).then(() =>
      this.setState({
        notes: [
          ...this.state.notes,
          { id, notename: name, modified, folderId, content }
        ]
      })
    );
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
