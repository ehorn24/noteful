import React from "react";
import { Link } from "react-router-dom";

const addButtons = (
  <>
    <Link to="/addfolder">
      <button>Add Folder</button>
    </Link>
    <Link to="/addnote">
      <button>Add Note</button>
    </Link>
  </>
);

const Sidebar = ({ Mode, match, folders, history }) => {
  switch (Mode) {
    case "Normal":
      return [
        ...folders.map((folder, key) => (
          <div key={key} className="sidebar-link">
            <Link to={"/folder/" + folder.id}>{folder.name}</Link>
          </div>
        )),
        addButtons
      ];
    case "ActiveFolder":
      return [
        ...folders.map((folder, key) => (
          <div key={key} className="sidebar-link">
            <Link
              to={"/folder/" + folder.id}
              className={match.params.folderId === folder.id ? "active" : null}
            >
              {folder.name}
            </Link>
          </div>
        )),
        addButtons
      ];
    case "Notes":
      return <button onClick={() => history.goBack()}>Back to Folder</button>;
    default:
      return Mode;
  }
};

export default props => (
  <div className="sidebar">
    <Sidebar {...props} />
  </div>
);
