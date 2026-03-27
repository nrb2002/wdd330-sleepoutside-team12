<<<<<<< Updated upstream:src/js/ProductData.mjs
=======
const baseURL = "https://wdd330-backend.onrender.com:3000";

>>>>>>> Stashed changes:src/js/ExternalServices.mjs
function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ProductData {
  constructor(category) {
    this.category = category;
    this.path = category ? `/json/${this.category}.json` : null;
  }

  async getData() {
    if (!this.path) return [];
    const response = await fetch(this.path);
    const data = await convertToJson(response);
    return data;
  }

  async findProductById(id) {
    const products = await this.getData();
    return products.find((item) => item.Id === id);
  }
}