import React from "react";
import { Link } from "react-router-dom";

const addFolderButton = <button>Add Folder</button>;

const Sidebar = ({ Mode, match, folders, history }) => {
  switch (Mode) {
    case "Normal":
      return [
        ...folders.map(folder => (
          <div key={folder.id}>
            <Link to={"/folder/" + folder.id}>{folder.name}</Link>
          </div>
        )),
        addFolderButton
      ];
    case "ActiveFolder":
      return [
        ...folders.map(folder => (
          <div key={folder.id}>
            <Link
              to={"/folder/" + folder.id}
              className={match.params.folderId === folder.id ? "active" : null}
            >
              {folder.name}
            </Link>
          </div>
        )),
        addFolderButton
      ];
    case "Notes":
      return <button onClick={() => history.goBack()}>Back to Folder</button>;
    default:
      return Mode;
  }
};

export default Sidebar;
