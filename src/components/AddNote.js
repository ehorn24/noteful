import React, { Component } from "react";

export default class AddNote extends Component {
  state = {
    name: "",
    folderid: undefined,
    content: ""
  };

  render() {
    return (
      <form
        action="submit"
        className="add-note"
        onSubmit={e => {
          e.preventDefault();
          this.props.addNote(
            this.state.name,
            this.state.folderid,
            this.state.content
          );
          this.props.history.goBack();
        }}
      >
        <h2>Add a Note</h2>
        <div className="note-input">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            required
            value={this.state.name}
            onChange={e => this.setState({ name: e.target.value })}
          />
        </div>
        <div className="note-input">
          <label htmlFor="folder">Folder</label>
          <select
            name="folder"
            id="folder"
            required
            value={this.state.folderid}
            onChange={e => this.setState({ folderid: e.target.value })}
            defaultValue=""
          >
            <option value="" disabled>
              Select a folder
            </option>
            {this.props.folders.map((folder, i) => (
              <option value={folder.id} key={i}>
                {folder.foldername}
              </option>
            ))}
          </select>
        </div>
        <div className="note-input">
          <label htmlFor="content">Content</label>
          <input
            className="note-content"
            type="text"
            name="content"
            id="content"
            required
            value={this.state.content}
            onChange={e => this.setState({ content: e.target.value })}
          />
        </div>
        <button type="submit">Submit</button>
        <button
          type="button"
          onClick={e => {
            e.preventDefault();
            this.props.history.goBack("/");
          }}
        >
          Cancel
        </button>
      </form>
    );
  }
}
