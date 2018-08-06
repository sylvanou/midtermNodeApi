const express = require("express");
const router = express.Router();
const User = require("../../models/user");

// const User = require("../../models/user")

const users = [
  {
    id: 1,
    name: "John Smith",
    email: "jsmith@hotmail.com"
  },
  {
    id: 2,
    name: "Jane Doe",
    email: "jdoe@gmail.com"
  },
  {
    id: 3,
    name: "Samuel Adams",
    email: "samadams@outlook.com"
  },
  {
    id: 4,
    name: "Will Smith",
    email: "wsmith@hotmail.com"
  },
  {
    id: 5,
    name: "Donald Trump",
    email: "realdonaldtrump@hotmail.com"
  }
];

// Test
router.get("/test", (req, res) => res.json({ msg: "User Works" }));

// Shows all users
router.get("/", (req, res) => {
  res.json(users);
});

router.param("id", (req, res, next, id) => {
  var user = users.find(user => {
    return user.id == req.params.id;
  });

  if (user) {
    req.user = user;
    next();
  } else {
    res.send();
  }
});

// GET user by id
router.get("/:id", (req, res) => {
  // res.send(req.params);
  var user = req.user;
  res.json(user || {});
});

// CREATE new user
router.post("/create", (req, res) => {
  users.push({
    id: users.length + 1,
    name: req.body.name,
    email: req.body.email
  });
  res.json(users);
});

// PUT/Update user.id
router.put("/:id", (req, res) => {
  var update = req.body;
  console.log("update:", update);

  var user = users.findIndex(user => user.id == req.params.id);
  console.log("user:", user);
  if (!users[user]) {
    res.send();
  } else {
    // console.log(users);
    var updateduser = Object.assign(users[user], update);
    //_.assign(users[user], update);
    console.log("updateduser:", updateduser);
    res.json(updateduser);
  }
  console.log("user now:", user);
});

// DELETE user by id
router.delete("/delete/:id", (req, res) => {
  var user = users.findIndex(user => user.id == req.params.id);
  // console.log("user:", user);
  if (!users[user]) {
    res.send();
  } else {
    var deleteduser = users[user];
    console.log("deleteduser:", deleteduser);
    users.splice(user, 1);
    res.json(users);
  }
});

module.exports = userRouter = router;
