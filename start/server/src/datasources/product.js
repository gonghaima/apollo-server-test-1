const { RESTDataSource } = require("apollo-datasource-rest");
const data = require("./mock/productsData");

class ProductAPI extends RESTDataSource {
  constructor({ store }) {
    super();
    this.store = store;
  }

  async getAllProducts() {
    const response = await Promise.resolve(data);
    // return Array.isArray(response) ? response : [];
    console.log(response);
    return response;
  }

  // async findOrProducts({ price, product_name, product_image, description }) {
  //   const products = await this.store.products.findOrCreate({
  //     where: { price, product_name, product_image, description }
  //   });
  //   return products && products[0] ? products[0] : null;
  // }
}

module.exports = ProductAPI;
