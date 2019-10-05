# TO DO LIST for product list graphql server

- Build a sqlite table for product data
  - [x] create products table
  - [x] add items in products table
- Create items in product data api
- Update items in product data api
- Delete items in product data api
- Add item in product data api
- Paginate items based on request
- Seed items to initialize product data

## script to create product table

```sql
CREATE TABLE products (
    id INTEGER PRIMARY KEY,
    price INTEGER NOT NULL,
    productName TEXT NOT NULL,
    productImage TEXT NOT NULL,
    description TEXT NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_DATETIME NOT NULL,
    updatedAt DATETIME DEFAULT CURRENT_DATETIME NOT NULL
)
```

```sql
INSERT INTO products (
    price,
    productName,
    description,
    productImage
)
VALUES(8768, 'Amitriptyline Hydrochloride','synergize efficient metrics', 'http://dummyimage.com/307x328.bmp/ff4444/ffffff' );
```

## run seed to populate data to sqlite

```sh
node -e 'require("./seed").init()'
```

### to debug the seed file

```sh
node --inspect -e 'require("./seed").init()'
```

## query

```javascript
query GetLaunches {
  launches(pageSize: 3) {
    launches {
      id
      mission {
        name
      }
    }
  }
}
```

```javascript
query foo {
  products {
    productName
  }
}
```

```javascript
mutation CreateNewProduct($price: String!, $productName: String!, $productImage: String!, $description: String!) {
  createProduct(price:$price, productName:$productName, productImage:$productImage, description:$description){
    success
    message
    product {
      id
      productName
      description
      productImage
      price
      updatedAt
      createdAt
    }
  }
}
query parameters
{
  "price": "$0.01",
  "productName": "Android",
  "productImage": "http://illuminea.com/wp-content/uploads/uploads/2009/02/500px-android-logosvg-300x300.png",
  "description": "Using media queries in emotion works just like using media queries in regular css except you don’t have to specify a selector inside the block"
}

mutation uProduct($id:ID!, $price: String!, $productName: String!, $productImage: String!, $description: String!) {
  updateProduct(id:$id,price:$price, productName:$productName, productImage:$productImage, description:$description){
    success
    message
    rowAffected
  }
}
query parameters
{
  "id":1,
  "price": "$58.53",
  "productName": "Repurpose world-class metrics",
  "productImage": "http://dummyimage.com/345x342.jpg/dddddd/000000",
  "description": "you don’t have to specify a selector inside the block"
}
```
