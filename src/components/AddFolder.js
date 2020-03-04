import React, { Component } from "react";

export default class AddFolder extends Component {
  state = {
    foldername: ""
  };

  render() {
    return (
      <form
        action="submit"
        className="add-folder"
        onSubmit={e => {
          e.preventDefault();
          this.props.addFolder(this.state.foldername);
          this.props.history.goBack();
        }}
      >
        <h2>Add a Folder</h2>
        <div className="folder-input">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            required
            value={this.state.foldername}
            onChange={e => this.setState({ foldername: e.target.value })}
          />
        </div>
        <button type="submit">Submit</button>
        <button
          type="button"
          onClick={e => {
            e.preventDefault();
            this.props.history.goBack();
          }}
        >
          Cancel
        </button>
      </form>
    );
  }
}
