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

// View low inventory (5 in stock or less)
viewLowInventory = () => {
    console.log("\n ITEMS WITH 5 OR LESS IN STOCK: \n");
    connection.query("SELECT * FROM products WHERE stock_quantity <= 5", function (err, res) {
        console.table(res);
        managerStart();
    })
}

addToInventory = () => {
    connection.query("SELECT * FROM products", (err, res) => {
        console.table(res);
        inquirer.prompt([
            {
                type: "input",
                message: "Please enter the item_id of the product you want to add inventory to: ",
                name: "itemToStock",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    else {
                        console.log(" Please enter a number");
                        return false;
                    }
                }
            },
            {
                type: "input",
                message: "How much more stock would you like to add? ",
                name: "inventoryAmount",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    else {
                        console.log(" Please enter a number");
                        return false;
                    }
                }
            }
        ]).then(function (answer) {
            // connection.query("UPDATE");
            connection.query("SELECT stock_quantity, price FROM products WHERE ? ", [{
                item_id: answer.itemToStock
            }], function (err, res) {
                var currentStockAmount = res[0].stock_quantity;
                var increaseStockAmount = answer.inventoryAmount;
                connection.query("UPDATE products SET ? WHERE ?", [
                    {
                        stock_quantity: parseFloat(currentStockAmount) + parseFloat(increaseStockAmount)
                    },
                    {
                        item_id: answer.itemToStock
                    }
                ], function (err, res) {
                    managerStart();
                })
            })

        })
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
                addToInventory();
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