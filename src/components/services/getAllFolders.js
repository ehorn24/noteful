export const getAllFolders = () => {
  return fetch("/folders/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  }).then(res => res.json());
};
