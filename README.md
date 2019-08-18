# mysql-inventory-tracker
A Node Amazon-like application that takes orders from customers and depletes stock from the store's inventory using a MySQL database. 

Technologies Used:
- [Node.js](https://nodejs.org/en/)
- [MySQL(npm)](https://www.npmjs.com/package/mysql) HTTP Client
- [MySQL Workbench](https://www.mysql.com/products/workbench/)
- [Chalk](https://www.npmjs.com/package/chalk)

![MySQL Inventory Demo](https://santiagoenciso.com/img/MySQLDemo.gif "MySQL Inventory Demo")

Full Video Demo: https://share.getcloudapp.com/E0ulYRpO

## Commands

Customer View:
```
$ node bamazonCustomer.js
```

Manager View:

```
$ node bamazonManager.js
```


## Installation

- Clone GitHub repo.
- Create a local database called `bamazon` (or any name you want). I used [MySQL Workbench](https://dev.mysql.com/downloads/workbench/) to handle the MySQL locally. 
- Import `database.sql` file from root folder and import. Check out the MySQL Workbench [Table Data Export and Import Wizard](https://dev.mysql.com/doc/workbench/en/wb-admin-export-import-table.html) for instructions.
- Make sure `YOURROOTPASSWORD` and `DATABASENAME` in the `mysql.createConnection` method match your local database's credentials on both `bamazonCustomer.js` and `bamazonManager.js`:

```
// Create MySQL Connection
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: YOURROOTPASSWORD,
    database: DATABASENAME
});
```

- Install npm dependencies:

```
$ npm install
```


- Enjoy!
