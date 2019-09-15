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
