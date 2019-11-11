import React from "react";

const Sidebar = props => {
  return <pre>{JSON.stringify(props, null, 2)}</pre>;
};

export default Sidebar;
