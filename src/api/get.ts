export const getDataFromApi = async () => {
  setTimeout(() => {
    const response = {
      file: "https://convertermidi.azurewebsites.net/api/Values/download",
    };
    window.open(response.file);
  }, 100);
};
