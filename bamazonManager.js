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

function managerStart() {
    inquirer.prompt({
        type: "list",
        message: "Welcome, Mr. Manager. What would you like to do today?",
        choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"],
        name: "managerToDo"
    }).then(function (answer) {

        console.log(answer.managerToDo);

    });
}

managerStart();