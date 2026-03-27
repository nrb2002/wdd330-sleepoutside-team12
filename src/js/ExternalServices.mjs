//const baseURL = "https://wdd330-backend.onrender.com:3000";
const baseURL = import.meta.env.VITE_SERVER_URL;

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ExternalServices {
  constructor(category) {
    this.category = category;
    this.path = `/json/${this.category}.json`; // absolute path from public folder
  }

  async getData(){
    const response = await fetch(this.path);
    const data = await convertToJson(response);

    return data;
  }

  async findProductById(id) {
    const products = await this.getData();
    return products.find((item) => item.Id === id);
  }

  async checkout(payload) {
    const url = `${baseURL}/checkout`;

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    };

    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error("Server error");
    }

    return await response.json();
  }
}