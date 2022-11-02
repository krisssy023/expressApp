export class UserService {
  constructor(users = [], idOfUserToDelete,searchedUser) {
    this.users = users;
    this.idOfUserToDelete = idOfUserToDelete;
    this.searchedUser = this.searchedUser
  }

  create(userObject) {
    // Add the userObject to the `users`
  }

  update(id, newUserObject) {
    // Update the user using ID with the new user Object
  }

  remove(users, idOfUserToDelete) {
    const indexOfUserToDelete = this.users.findIndex(
      (object) => object.id === parseInt(this.idOfUserToDelete)
    );

    let responseToUser = {
      "deleted user": this.users.splice(indexOfUserToDelete, 1),
      "New User Array": this.users,
    };
    return responseToUser;
  }

  read(users,searchedUser) {
    // Read the user using ID

    // if (isNaN(this.searchedUser)) {
    //   return response.status(400).json({
    //     error: "Invalid ID.",
    //   });
    // }

    let findUser = this.users.find((object) => object.id === parseInt(this.searchedUser));

    //undefined y?
    console.log(findUser)
    console.log(this.searchedUser)

    //with value
    console.log(this.users)

    let responseToUser = {
      "found user": findUser
    };

    return responseToUser;


  }

  list() {
    // List down all the users
  }
}
