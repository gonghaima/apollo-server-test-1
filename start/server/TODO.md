# TO DO LIST for product list graphql server

* Build a sqlite table for product data
  * [x] create products table
  * [ ] add items in products table
* Create items in product data api
* Update items in product data api
* Delete items in product data api
* Add item in product data api
* Paginate items based on request
* Seed items to initialize product data

## script to create product table

```sql
CREATE TABLE products (
    id INTEGER PRIMARY KEY,
    price INTEGER NOT NULL,
    product_name TEXT NOT NULL,
    product_image TEXT NOT NULL,
    description TEXT NOT NULL
)
```
