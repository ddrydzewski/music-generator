export const postDataToApi = async (TextFromClient: string) => {
  if (TextFromClient !== null && TextFromClient !== undefined) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ TextFromClient }),
    };
    await fetch("https://localhost:44305/api/values", requestOptions);
  }
};
