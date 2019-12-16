import React from "react";
import STORE from "./store";

const NotefulContext = React.createContext({
  folders: [...STORE.folders],
  notes: [...STORE.notes]
});

export default NotefulContext;
