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

// Display All  & Run Start shopping
connection.query("SELECT * FROM products", function (err, res) {
    console.table(res);
    startShopping();
    // console.table(res);
});

function startShopping() {
    inquirer.prompt([
        {
            // The first should ask them the ID of the product they would like to buy.
            type: "input",
            message: "Please enter the item_id of the product you would like to buy.",
            name: "item_id",
            validate: function (value) {
                if (isNaN(value) === false) {
                    return true;
                }
                else {
                    return false;
                }
            }
        },
        {
            // The second message should ask how many units of the product they would like to buy.
            type: "input",
            message: "How many would you like to buy? (Enter a number)",
            name: "quantity",
            validate: function (value) {
                if (isNaN(value) === false) {
                    return true;
                }
                else {
                    return false;
                }
            }
        }
    ]).then(function (answer) {

        // Get stock quantity first and store it in a variable
        connection.query("SELECT stock_quantity, price FROM products WHERE ? ", [
            {
                item_id: answer.item_id
            }
        ], function (err, res) {
            var currentItemStock = res[0].stock_quantity;
            var currentItemPrice = res[0].price;
            if (currentItemStock < answer.quantity) {
                console.log(chalk.red("\nWe don't have that many in stock! Please select ") + chalk.yellow(currentItemStock) + chalk.red(" or less.\n"));
            }
            else {
                connection.query("UPDATE products SET ? WHERE ?", [
                    {
                        stock_quantity: currentItemStock - answer.quantity,
                    }, {
                        item_id: answer.item_id
                    }
                ], function (err, res) {
                    console.log(chalk.green("Your grand total is ") + chalk.yellow("$" + currentItemPrice * answer.quantity));
                }
                );
            }
        }
        );
    })
}




