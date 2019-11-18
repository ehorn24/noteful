import React from "react";
import { Link } from "react-router-dom";

const Main = ({ match, notes }) => {
  return (
    <main>
      <h3>Notes</h3>
      {!!match.params.folderId
        ? notes
            .filter(note => note.folderId === match.params.folderId)
            .map(note => (
              <div key={note.id}>
                <Link to={"/note/" + note.id}>{note.name}</Link>
              </div>
            ))
        : notes.map(note => (
            <div key={note.id}>
              <Link to={"/note/" + note.id}>{note.name}</Link>
            </div>
          ))}
    </main>
  );
};

export default Main;
