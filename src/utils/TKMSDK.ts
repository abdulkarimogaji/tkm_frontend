class TKMSDK {
  async callRawAPI(endpoint: string, method: string, body: any) {
    const result = await fetch(import.meta.env.VITE_API_URL + endpoint, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify(body),
    });
    const json = await result.json();

    if (result.status > 399) {
      throw json;
    }
    return json;
  }
}

export default TKMSDK;
