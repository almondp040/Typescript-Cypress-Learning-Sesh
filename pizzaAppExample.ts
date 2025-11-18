console.log("Hello, TypeScript!");

//Run File: node pizzaAppExample.ts
// Building a simple console pizza application
//We will create a menu which will be an array of pizza items, where each item is a different type of pizza

//Types
type Pizza = {
    id: number,
    name: string;
    price: number;
};



type Order = {
    ID: number;
    pizza: Pizza;
    status: "ordered" | "complete";
}

//Global Variables
let pizzaID = 1
let orderID = 0 
let cashInRegister = 100; 
const orderQueue: Order[] = []; 


//OG Pizza Data
const menu: Pizza[] = [
    { id: pizzaID++, name: "Margherita", price: 8.5 },
    { id: pizzaID++, name: "Pepperoni", price: 9.5 },
    { id: pizzaID++, name: "Hawaiian", price: 10.0 },
    { id: pizzaID++, name: "Veggie", price: 9.0 },
];



//Add a utility function called addNewPizza that takes a new pizza and adds it to the menu: 
 // Initialize order ID counter
// const addNewPizza = (pizza: Omit<Pizza, "id">): Pizza => {
//     //Push the ID into the pizza if no ID is provided! 

//     const { name, price } = pizza;
//     const newPizza = {
//         id: pizzaID++,
//         name,
//         price
//     }
   
//     menu.push(newPizza);
//     console.log(`Added new pizza: ${newPizza.name} at $${newPizza.price}`);
//     console.log("Updated Menu:", menu);
//     return newPizza;
// }

// addNewPizza({name:"BBQ Chicken", price: 11.0});

//Use a generic to make everything generic so we can make helper functions!
const addPizzaWithGenerics = <Type>(array: Type[], item:Type): Type[] =>{
    array.push(item)
    return array; 
}

addPizzaWithGenerics<Pizza>(menu, {id: pizzaID++, name: "Vodka", price: 10}); 
addPizzaWithGenerics<Order>(orderQueue, {ID: 1, pizza: menu[2], status:"complete"}); 

//Add another function that allows us to place a order for a pizza from the menu:
//Finds a pizza by name, then we add the price to the cash in register once we find a match
//Push this order to the orderQueue array with a status of ordered
//Finally the function should return the new order just in case we need it


const placeOrder = (pizzaName: string): Order | undefined => {
    // Find the pizza in the menu by name
    const pizza = menu.find(item => item.name === pizzaName);
    if (!pizza) {
        console.error(`Sorry, we don't have ${pizzaName} on the menu.`);
        return undefined;
    }
    const newOrder: Order = {
        ID: ++orderID,
        pizza,
        status: "ordered"
    };
    cashInRegister += pizza.price;
    console.log("Placed Order:", newOrder);
    console.log("Updated Cash in Register: $", cashInRegister);
    orderQueue.push(newOrder);
    return newOrder;
};

placeOrder("Pepperoni");
// placeOrder("Hawaiian");
// placeOrder("Veggie");

//Complete Order Utility Function that takes in a order ID, and then will update the status of the newOrder to complete
const completeOrder = (orderID: number): Order | undefined => {
    console.log("Current Order Queue from Complete Order: ",orderQueue)

    for (const order of orderQueue) {
        if (order.ID === orderID) {
            order.status = "complete";
            console.log(`Order ID ${orderID} is now complete.`);
            console.log("Updated Order:", order);
            return order;
        }
    }
};

 completeOrder(1);
// completeOrder(2);
// completeOrder(3);





//Write a function to grab the pizza details, that will have a parameter called identifier 
// and this can be either the name or ID of the pizza

const getPizzaDetail = (identifier: string | number): Pizza | undefined =>{

 console.log("Identifier: ", identifier); 

 //loop over menu and see if there is a match based off the ID or String! Use .find() on menu
    return menu.find((item)=>{
     if (identifier === item.id || identifier === item.name) {
        let script = `Here is your Pizza Details: Name is ${item.name}, Price is: ${item.price} and the ID is: ${item.id}`
       // console.log(script);
        return script; 
    }

 })

 }


const findVeggie = getPizzaDetail("Veggie");
console.log("From find veggie: ",findVeggie);

