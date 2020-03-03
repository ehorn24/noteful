export const getAllNotes = () => {
  return fetch("/notes/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  }).then(res => res.json());
};
