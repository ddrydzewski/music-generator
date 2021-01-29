export const getDataFromApi = async () => {
  setTimeout(() => {
    const response = {
      file: "https://localhost:44305/api/values",
    };
    window.open(response.file);
  }, 100);
};
