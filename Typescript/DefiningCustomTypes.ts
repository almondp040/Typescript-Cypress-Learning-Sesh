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
    id: number; 
    username: string; 
    role: userRole; 
}

type UpdatedUser = Partial<User>;
let userID = 1
const currentUsers: User[] = [
    {id: userID++, username: "Almond Paschal", role: "admin"}, 
    {id: userID++, username: "Austin Paschal", role: "guest"}, 
    {id: userID++, username: "Cooper Paschal", role: "read-only"}, 
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
//console.log(findMe);

//TS Any Type: 
//Any variables, objs, or functions with the Any type essentially turns off TS
//You shouldn't really use Any at all, if possible, but if you are in the process of converting JS to TS and is short on time, then you can add Any


//Good Practice tip always provide an explicit return type to our functions!
//Write a function that takes in a obj, and with object.assign we can update the user we find. 

const updateUser = (id: number, updates: UpdatedUser): User | undefined =>{
    //target is going to come from .find(), then use object.assign() to spit out a new obj with our updates
   return currentUsers.find((user)=>{
        if (user.id === id) {
            //console.log(user); 

            const assign = Object.assign(user, updates); 
            console.log(assign)
            return assign; 
        }
 
    })
}

updateUser(2, {role: "admin"}); 
updateUser(1, {username: "John Doe"}); 

//Utility Types: 
//Like a function, they can take other types in as a parameter and return a new type with some changes to it
//Built in to TS; to perform commonly-needed modifications to existing types
//In the example above to avoid using Any for updates, we made a utility type for the updates, so that we can modify the existing type


//Partial Type, (USES GENERICS!)
//This modifies the type you pass in and turns all properties into optional properties, 
// so instead of a updated type, partial allows us to use what we need

//Omit Utility Type Challenge and Example: 
//What does the Omit Type Do? 
//Omit takes in a type AND a string (can also be a union of strings) property names 
// and returns a new type with those properties removed

//Allows the function to handle the ID instead of forcing us to provide it: 
const addNewUser = (newUser: Omit<User, "id">): User =>{
    let user: User = {id: userID++, ...newUser}
     currentUsers.push(user)
     return user
}

addNewUser({username: "joe", role: "guest"})

console.log(currentUsers)


//Generics
//Allows us to add some flexibility to existing functions, types, etc. 
//Acts like function parameters, but for types! 

//Generics Example: 

const gameScores = [14, 21, 33, 42, 59]; 
const favoriteThings = ["Rain drops on roses", "whiskers on kittens"]
const voters = [{name: "Alice", age: 43}, {name: "Bob", age: 77}]

//Find the last item in an array: We can use Generics and then we can define what the type actuall is
const findLast = <Array> (array: Array[]): Array | undefined=>{

    return array[array.length -1]
}

findLast(gameScores)
findLast(favoriteThings)
findLast(voters)