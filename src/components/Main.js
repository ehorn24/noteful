import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Main = ({ match, notes, deleteNote }) => {
  return (
    <main>
      {notes
        .filter(note =>
          !!match.params.folderId
            ? note.folderId === match.params.folderId
            : true
        )
        .map(note => (
          <div key={note.id} className="card">
            <Link to={"/note/" + note.id}>
              <span>{note.name}</span>
              <time>
                {new Date(note.modified).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                  hour12: true
                })}
              </time>
            </Link>
            <button onClick={e => deleteNote(note.id)}>Delete</button>
          </div>
        ))}
    </main>
  );
};

export default Main;

Main.propTypes = {
  notes: PropTypes.arrayOf(
    PropTypes.object.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      modified: PropTypes.string.isRequired,
      folderId: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired
    })
  )
};
