// import express, { response } from 'express'

// const app = express()
// app.use(express.json())

// Task 1
export default function EmailValidator(req, res, next) {
  const { email } = req.body;
  let users = req.app.get("users");

  if (users != undefined && users.length != 0) {
    let registeredEmails = users.map(({ email }) => email);
    // Express 102 Task 2
    if (registeredEmails.includes(email)) {
      return res.status(422).json({
        error: "Email already registered, please input a new one.",
      });
    }
  }

  //express 102 task 1
  if (!email.includes("@")) {
    return res.status(422).json({
      error: "Email must contain @ symbol.",
    });
  }

  next();
}
