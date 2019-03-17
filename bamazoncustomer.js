//dependencies
var mysql = require("mysql");
var inquirer = require("inquirer");

//mysql connection
var connection = mysql.createConnection({
    host: "localhost",
    PORT: 3306,
    user: "root",
    password: "pumpkin9",
    database: "bamazon"
});

connection.connect(function(err){
    if (err) throw err;
    console.log("Welcome to Bamazon");
    start();

});

function start(){
    inquirer.prompt([{
        type: "confirm",
        name: "confirm",
        message: "Look at inventory?",
        default: true
    }])
    .then(function(user){
            if(user.confirm===true){
                inventory();
            } else{
                console.log("Come back soon!")
            }
    })
}

function inventory() {
    var table = new Table({
        head: ['ID', 'Item', 'Department', 'Price', 'Stock'],
        colWidths: [10, 30, 30, 30, 30]
    });

    list();

    function list() {


        connection.query("SELECT * FROM products", function(err, res) {
            for (var i = 0; i < res.length; i++) {

                var itemId = res[i].item_id,
                    productName = res[i].product_name,
                    departmentName = res[i].department_name,
                    price = res[i].price,
                    stockQuantity = res[i].stock_quantity;

              table.push(
                  [itemId, productName, departmentName, price, stockQuantity]
            );
          }           
            console.log(table.toString());
            shop();
        });
    }
}

function shop() {

    inquirer.prompt([{

        type: "confirm",
        name: "continue",
        message: "Would you like to purchase an item?",
        default: true

    }]).then(function(user) {
        if (user.continue === true) {
            selectionPrompt();
        } else {
            console.log("Thank you! Come back soon!");
        }
    });
}