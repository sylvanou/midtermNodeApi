const express = require("express");
const router = express.Router();

// const User = require("../../models/user")

const users = [
  {
    name: "John Smith",
    email: "jsmith@hotmail.com",
    id: 1
  },
  {
    name: "Jane Doe",
    email: "jdoe@gmail.com",
    id: 2
  },
  {
    name: "Samuel Adams",
    email: "samadams@outlook.com",
    id: 3
  },
  {
    name: "Will Smith",
    email: "wsmith@hotmail.com",
    id: 4
  },
  {
    name: "Donald Trump",
    email: "realdonaldtrump@hotmail.com",
    id: 5
  }
];

router.get("/test", (req, res) => res.json({ msg: "User Works" }));


// Shows all users
router.get("/", (req, res) => {
  res.json(users);
});

router.get(`/:id`, (req, res) => {
  res.send(req.params);
  // res.json(users.filter(user.id === `${id}`));
});

module.exports = userRouter = router;
