import express, { response } from "express";
import EmailValidator from "./Middleware/EmailValidator.js";
import {UserService} from "./UserService.js";

const app = express();
app.use(express.json());
const port = 3003;

const message = [{ message: "Haluu!" }];

// const users = []
app.set("users", []);
app.use("/UserService", UserService)
app.set("id","id")

//Task 1
app.get("/", (req, res) => {
  res.status(200).json(message);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

//Task 2 and 3
app.post("/users", EmailValidator, (req, res, next) => {
  const users = app.get("users");
  const completeDetails = req.body;
  let filteredDetails;

  function filterKeys(object, keys) {
    Object.keys(object).forEach(function (key) {
      if (keys.indexOf(key) == -1) {
        delete object[key];
      }
    });
    return object;
  }

  filteredDetails = filterKeys({ ...completeDetails }, [
    "firstName",
    "lastName",
    "email",
  ]);

  //Express 102 task 3
  filteredDetails.id = users.length;

  // Task 4

  users.push(filteredDetails);
  app.set("users", users);
  res.status(201).json(filteredDetails);
});

//Task 5
app.get("/users", (req, res) => {
  let users = app.get("users");
  res.status(200).json(users);
});

//express 104 class read
app.get("/users/:id", (request, response) => {
  let users = app.get("users");
  const searchedUser = request.params.id;
  console.log('index searched', searchedUser)

  // TASK 2
  if (isNaN(searchedUser)) {
    response.status(400).json({
      error: "Invalid ID.",
    });
  }

  //express103, task 1
  // find user from array

let findUser = users.find((object) => object.id === parseInt(searchedUser));

  console.log('index find',findUser)

  //express103, task 2
  if (findUser === undefined) {
    return response.status(404).json({
      error: "Sorry page cannot be found.",
    });
  }

  const userFound = new UserService(users,searchedUser)

  return response
  .status(200)
  .json(userFound.read())
});

app.post("/users/:id", (request, response) => {
  let users = app.get("users");
  let userToChange = request.params.id;
  const detailToChange = request.body;
  const keyToChange = Object.keys(detailToChange);
  let registeredEmails = users.map(({ email }) => email);

  if (isNaN(userToChange)) {
    response.status(400).json({
      error: "Invalid ID.",
    });
  }

  //    find user from array
  const findUser = users.find((object) => object.id === parseInt(userToChange));

  if (findUser === undefined) {
    response.status(404).json({
      error: "Sorry page cannot be found.",
    });
  }

  //checks if key to be changed exists before changing.
  const detailExistenceChecker = keyToChange in findUser;
  if (!detailExistenceChecker) {
    return response.status(422).json({
      error: "Sorry user detail does not exist.",
    });
  }

  //checks value of new email if valid
  if (keyToChange.toString() === "email") {
    if (registeredEmails.includes(detailToChange[keyToChange])) {
      return response.status(422).json({
        error: "Email already registered, please input a new one.",
      });
    }
    if (!detailToChange[keyToChange].includes("@")) {
      return response.status(422).json({
        error: "Email must contain @ symbol.",
      });
    }
  }

  //changes value of old to new user input
  findUser[keyToChange] = detailToChange[keyToChange];

  response.json(findUser);
});

// express 104, task 1
app.delete("/users/:id", (request, response) =>{

  let users = app.get("users");
  let idOfUserToDelete = request.params.id

  const indexOfUserToDelete = users.findIndex(
    (object) => object.id === parseInt(idOfUserToDelete)
  );

  if (indexOfUserToDelete === -1) {
    return response.status(422).json({
      error: "Sorry user does not exist.",
    });
  }
// checked if user id exists before using new class
  const deleteUser = new UserService(users,idOfUserToDelete)

  return response
  .status(200)
  .json(deleteUser.remove())
})

