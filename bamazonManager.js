const mysql = require('mysql');
const inquirer = require('inquirer');
const chalk = require('chalk');

// Create MySQL Connection
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "BdEBK4Z4U@J7N6;uo9;x",
    database: "bamazon"
});

// View all products in database
viewProducts = () => {
    connection.query("SELECT * FROM products", (err, res) => {
        console.table(res);
        managerStart();
    });
}

// End MySQL connection
exit = () => {
    console.log(chalk.magenta("\n Thanks for stopping by! \n"));
    connection.end();
}

function managerStart() {
    inquirer.prompt({
        type: "list",
        message: "Welcome, Mr. Manager. What would you like to do today?",
        choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "EXIT"],
        name: "managerToDo"
    }).then((answer) => {
        switch (answer.managerToDo) {
            case "View Products for Sale":
                viewProducts();
                break;
            case "View Low Inventory":
                viewLowInventory();
                break;
            case "Add to Inventory":
                // addToInventory();
                break;
            case "Add New Product":
            // addNewProduct();
            case "EXIT":
                exit();
                break;
        }
    });
}

managerStart();