//TS Basics: 

// node DefiningCustomTypes.ts

//Syntax for creating a variable with a specific type:
let myName: string = "Almond Paschal"; 

//SET UP OUR TYPES BEFORE WE START CODING!!!

//Challenge type some variables below: 

//The only difference is we need to specifically say the type of variable we are creating:
let numberOfWheels: number = 4;
let isStudent: boolean = false;

//Adding types to objects! See pizza example for an example of this in use

//Custom Types in TS: 
//Using the type keyword we can create our own custom types in TS: 
type Food = string;

//Lets create a custom type for a student for example:
//We can use other custom types inside of our custom types as well! Useful if we need to use Address elswhere!
type Student = {
    name: string;
    age: number;
    isEnrolled: boolean;
    address?: Address | "No Address Provided" //Making address optional by allowing it to be this string. 
};

type Address = {
    street: string;
    city: string;
    zipCode: string;
}
//To use the type we can do this: 
let student1: Student = {
    name: "Almond Paschal",
    age: 30,
    isEnrolled: true,
    address: {
        street: "456 College Ave",
        city: "University City",
        zipCode: "67890"
    }
}

//Nested Custom Types: 
//Let's create a custom type with a nested object for a address! If anything is optional we can use "?" after the key!

//Now student can either have an address or not!
let student2: Student = {
    name: "Jane Doe",
    age: 22,
    isEnrolled: false,
    address: {
        street: "123 Main St",
        city: "Anytown",
        zipCode: "12345"
    }
}

let student3: Student = {
    name: "John Smith",
    age: 25,
    isEnrolled: true,
    //No address provided
}

//Example using this in a function: 
const displayInfo = (StudentInfo: Student) => {
    console.log(
                "Student Name: ",StudentInfo.name, 
                "Student Address: ",StudentInfo.age, 
                "Student Enrolled: ", StudentInfo.isEnrolled, 
                "Student Address: ",StudentInfo.address
                );
}; 

displayInfo(student1) 
displayInfo(student2) 
displayInfo(student3) 

//Typing Arrays: We simply put a "[]" after the type to indicate its an array of that type

let ages: number[] = [21, 25, 30, 35]; //Array of numbers
let names: string[] = ["Alice", "Bob", "Charlie"]; //Array of strings
let students: Student[] = [student1, student2, student3]; //Array of Student objects


//Literal Types: 
//When you tell TS a actual value instead of just saying the type: 

//We can literally set a value to a object, and TS will infer the type
let nbaName: "Trae Young";  //Will throw an error because Lebron is different from Trae

//Unions: Says our object MUST be these values!
//Define Type
type userRole = "guest" | "admin" | "read-only"; 

//OR

//Define and Use type at the same time
let userRole2: "guest" | "admin" | "read-only"

userRole2 = "guest" //Will work! 

//userRole2 = "sjdaslkjd" //Will throw an error

//Use Type
let admin: userRole = "admin"

//Try and be as explicit as we can when writing our code, so we should add extra protections via typeOf

//Function return types Example

type User = {
    username: string; 
    role: userRole; 
}

const currentUsers: User[] = [
    {username: "Almond Paschal", role: "admin"}, 
    {username: "Austin Paschal", role: "guest"}, 
    {username: "Cooper Paschal", role: "read-only"}, 
]; 


//Write a function to grab user details based off of the username: 
//Force the function to return the User Object using the Type User: 
//If there is a user cool! if not it will be undefined
const grabUserDetails = (username: string): User | undefined =>{
  const findUser = currentUsers.find((user)=>{
        if (user && user.username === username) {
            return user 
        } else {
            throw new Error("User Not Found!");
        }
    });   
    return findUser
}

const findMe = grabUserDetails("Almond Paschal"); 
console.log(findMe);

//TS Any Type: 
//Any variables, objs, or functions with the Any type essentially turns off TS
//You shouldn't really use Any at all, if possible, but if you are in the process of converting JS to TS and is short on time, then you can add Any


//Good Practice tip always provide an explicit return type to our functions!


//Utility Types for Tomorrow: 1:32:01 for https://www.youtube.com/watch?v=SpwzRDUQ1GI&t=76s