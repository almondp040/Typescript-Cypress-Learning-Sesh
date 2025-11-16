console.log("Hello, TypeScript!");

//Run File: node pizzaAppExample.ts
// Building a simple console pizza application
//We will create a menu which will be an array of pizza items, where each item is a different type of pizza

type Pizza = {
    name: string;
    price: number;
};

type Order = {
    ID: number;
    pizza: Pizza;
    status: "ordered" | "complete";
}

const menu = [
    { name: "Margherita", price: 8.5 },
    { name: "Pepperoni", price: 9.5 },
    { name: "Hawaiian", price: 10.0 },
    { name: "Veggie", price: 9.0 },
];

let cashInRegister = 100; 
const orderQueue: Order[] = []; 

//Add a utility function called addNewPizza that takes a new pizza and adds it to the menu: 

const addNewPizza = (pizza: Pizza) => {
    //Logic bug make sure the pizza doesn't already exist in the menu
    
    menu.push(pizza);
    console.log(`Added new pizza: ${pizza.name} at $${pizza.price}`);
    console.log("Updated Menu:", menu);
}

//addNewPizza("BBQ Chicken", 11.0);

//Add another function that allows us to place a order for a pizza from the menu:
//Finds a pizza by name, then we add the price to the cash in register once we find a match
//Push this order to the orderQueue array with a status of ordered
//Finally the function should return the new order just in case we need it

let orderID = 0 // Initialize order ID counter
const placeOrder = (pizzaOrder: Order) => {
    
    //Loop through our menu array to make sure the Order name we give this function matches! 
    for (const item of menu) {
        if (item.name === pizzaOrder.pizza.name) {
            let generateID = orderID += 1;
            pizzaOrder.ID = generateID;
            cashInRegister += item.price;
            const newOrder = { ID: pizzaOrder.ID, pizza: item, status: pizzaOrder.status };
            console.log("Placed Order:", newOrder);
            console.log("Updated Cash in Register: $", cashInRegister);
            orderQueue.push(newOrder);
            return newOrder;
        } else {
            console.error(`Sorry, we don't have ${pizzaOrder.pizza.name} on the menu.`);
        }
    }
}; 

// placeOrder("Pepperoni");
// placeOrder("Hawaiian");
// placeOrder("Veggie");

//Complete Order Utility Function that takes in a order ID, and then will update the status of the newOrder to complete
const completeOrder = (orderID: Order) => {
    console.log("Current Order Queue from Complete Order: ",orderQueue)

    for (const order of orderQueue) {
        if (order.ID === orderID.ID) {
            order.status = "complete";
            console.log(`Order ID ${orderID.ID} is now complete.`);
            console.log("Updated Order:", order);
            return order;
        }
    }
};

// completeOrder(1);
// completeOrder(2);
// completeOrder(3);

//Make a function that will run operations in the pizza app! 

const runPizzaApp = (operation: string,  newPizzaOrder: Order) => {
    console.log("What would you like for the pizza app to do?")

    //If we want to add our app to add a new pizza
    if (operation === "addNewPizza") {
      return addNewPizza(newPizzaOrder.pizza);
        
    }

    //If we want to place an order
    if (operation === "placeOrder") {
      return  placeOrder(newPizzaOrder);
    }

    //If we want to complete an order
    if (operation === "completeOrder" && orderID !== 0) {
       return completeOrder(newPizzaOrder);
    }



}

//Pizza App Operations!
let newPizza1 = {name: "Buffalo Chicken", price: 11.0};
let placedOrder1: Order = {ID: 0 , pizza: newPizza1, status: "ordered"};
let completeOrder1: Order = {ID: 1 , pizza: newPizza1, status: "complete"};



const addBuffalo = runPizzaApp("addNewPizza", placedOrder1);
const placeBuffaloOrder = runPizzaApp("placeOrder", placedOrder1);
const completeBuffaloOrder = runPizzaApp("completeOrder", completeOrder1);



