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

// Display All items
connection.query("SELECT * FROM products", function (err, res) {
    console.table(res);
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

        // // Get stock quantity first and store it in a variable
        // var currentItemStock;

        // connection.query("SELECT stock_quantity FROM products WHERE ? "[
        //     {
        //         item_id: answer.item_id
        //     }
        // ], function (err, res) {
        //     currentItemStock = res;
        //     console.log(res);
        // }
        // );

        connection.query("UPDATE products SET ? WHERE ?", [
            {
                stock_quantity: answer.quantity,
            }, {
                item_id: answer.item_id
            }
        ], function (err, res) {
            console.log("Something happened");
        }
        );

        console.log("You have chosen to buy " + answer.quantity + " Items with the item ID " + answer.item_id);
    })
}

// Call startShopping function after half a second. 
setTimeout(startShopping, 500);



