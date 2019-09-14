const { RESTDataSource } = require("apollo-datasource-rest");
const data = require("./mock/productsData");

class ProductAPI extends RESTDataSource {
  constructor() {
    super();
  }

  async getAllProducts() {
    const response = await Promise.resolve(data);
    // return Array.isArray(response) ? response : [];
    console.log(response);
    return response;
  }

  async findOrCreateUser({ email: emailArg } = {}) {
    const email =
      this.context && this.context.user ? this.context.user.email : emailArg;
    if (!email || !isEmail.validate(email)) return null;

    const users = await this.store.users.findOrCreate({ where: { email } });
    return users && users[0] ? users[0] : null;
  }
}

module.exports = ProductAPI;
