import React from "react";
import { Link } from "react-router-dom";

const AddButtons = () => (
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
            <Link to={"/folder/" + folder.id}>{folder.foldername}</Link>
          </div>
        )),
        <AddButtons key={50} />
      ];
    case "ActiveFolder":
      return [
        ...folders.map((folder, key) => (
          <div key={key} className="sidebar-link">
            <Link
              to={"/folder/" + folder.id}
              className={match.params.folderId === folder.id ? "active" : null}
            >
              {folder.foldername}
            </Link>
          </div>
        )),
        <AddButtons key={51} />
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
