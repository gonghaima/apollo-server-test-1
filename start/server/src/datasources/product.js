const { RESTDataSource } = require("apollo-datasource-rest");
const data = require("./mock/productsData");

class ProductAPI extends RESTDataSource {
  constructor() {
    super();
  }

  async getAllProducts() {
    // const response = await Promise.resolve(data);
    // return Array.isArray(response) ? response : [];
    console.log(data);
    return data;
  }
}

module.exports = ProductAPI;
