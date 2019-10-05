const { RESTDataSource } = require("apollo-datasource-rest");
const data = require("./mock/productsData");

class ProductAPI extends RESTDataSource {
  constructor({ store }) {
    super();
    this.store = store;
  }

  // async getAllProducts() {
  //   const response = await Promise.resolve(data);
  //   // return Array.isArray(response) ? response : [];
  //   console.log(response);
  //   return response;
  // }

  async getAllProducts() {
    return await this.store.products.findAll();
  }

  async createProduct(price, productName, productImage, description) {
    const result = await this.store.products.create({
      price,
      productName,
      productImage,
      description,
      createAt: new Date(),
      updatedAt: new Date()
    });
    console.log(JSON.stringify(result));

    return result && result.dataValues || null;
  }

  // async findOrProducts({ price, product_name, product_image, description }) {
  //   const products = await this.store.products.findOrCreate({
  //     where: { price, product_name, product_image, description }
  //   });
  //   return products && products[0] ? products[0] : null;
  // }
}

module.exports = ProductAPI;
