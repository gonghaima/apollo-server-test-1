const { RESTDataSource } = require("apollo-datasource-rest");
const { data } = require("./mock/productsData");

class ProductAPI extends RESTDataSource {
  constructor() {
    super();
  }

  async getAllProducts() {
    // const response = await Promise.resolve(data);
    // return Array.isArray(response) ? response : [];
    // return data;
    return [
      {
        id: 1,
        price: "$87.68",
        product_name: "Amitriptyline Hydrochloride",
        description: "synergize efficient metrics",
        product_image: "http://dummyimage.com/307x328.bmp/ff4444/ffffff"
      },
      {
        id: 2,
        price: "$58.53",
        product_name: "Zicam",
        description: "repurpose world-class metrics",
        product_image: "http://dummyimage.com/345x342.jpg/dddddd/000000"
      }
    ];
  }
}

module.exports = ProductAPI;
