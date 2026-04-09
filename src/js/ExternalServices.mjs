const baseURL = import.meta.env.VITE_SERVER_URL;

async function convertToJson(res) {
  //convert the response body to JSON before checking if it's okay.
  const jsonResponse = await res.json();

  if (res.ok) {
    return jsonResponse;
  } else {
    // send full error details instead of generic message
    throw {
      name: "servicesError",
      message: jsonResponse
     };
  }
}

export default class ExternalServices {
  constructor(category) {
    this.category = category;
    //this.path = `/json/${this.category}.json`; // absolute path from public folder
  }

  async getData(category){
     const response = await fetch(`${baseURL}products/search/${category}`);
    const data = await convertToJson(response);
    return data.Result;
  }

  async findProductById(id) {
    const response = await fetch(`${baseURL}product/${id}`);
    const data = await convertToJson(response);
    return data.Result;
  }

  async checkout(payload) {
    const url = `${baseURL}/checkout`;

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        
      },
      body: JSON.stringify(payload)
    };

    const response = await fetch(url, options);

    return await convertToJson(response);
  }
}