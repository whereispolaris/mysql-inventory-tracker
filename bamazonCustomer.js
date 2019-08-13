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
        console.log("You have chosen to buy " + answer.quantity + " Items with the item ID " + answer.item_id);
    })
}

// Call startShopping function after half a second. 
setTimeout(startShopping, 500);



