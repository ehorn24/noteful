export const getNotes = () => {
  fetch("http://localhost:9090/notes").then(res => res.json());
};

export const getFolders = () => {
  fetch("http://localhost:9090/folders").then(res => res.json());
};
