const SQL = require("sequelize");
const data = require("./productsData");

function createStore() {
  debugger;
  const Op = SQL.Op;
  const operatorsAliases = {
    $in: Op.in
  };

  const db = new SQL("database", "username", "password", {
    dialect: "sqlite",
    storage: "../../../store.sqlite",
    operatorsAliases,
    logging: false
  });

  const products = db.define("products", {
    id: {
      type: SQL.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    price: SQL.INTEGER,
    productName: SQL.STRING,
    productImage: SQL.STRING,
    description: SQL.STRING,
    createdAt: SQL.DATE,
    updatedAt: SQL.DATE
  });

  return { products };
}

const store = createStore();

module.exports.init = function populateData() {
  debugger;
  try {
    data.map(({ price, product_name, product_image, description }) => {
      store.products
        .create({
          price,
          productName: product_name,
          productImage: product_image,
          description: description,
          createAt: new Date(),
          updatedAt: new Date()
        })
        .then(function(user) {
          // you can now access the newly created user
          console.log("success", user.toJSON());
        })
        .catch(function(err) {
          // print the error details
          console.log(err);
        });
    });
  } catch (error) {
    throw error;
  }
};
