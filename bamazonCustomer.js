const mysql = require('mysql');
const inquirer = require('inquirer');

// Create MySQL Connection
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "BdEBK4Z4U@J7N6;uo9;x",
    database: "bamazon"
});

// Connect to MySQL
connection.connect(function (err) {
    console.log("Connected as id: " + connection.threadId);
    startShopping();
});

function startShopping() {
    // Display All iterms
    connection.query("SELECT * FROM products", function (err, res) {
        console.table(res);
    });
}

