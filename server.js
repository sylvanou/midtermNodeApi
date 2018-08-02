var express = require("express");
var app = express();
var morgan = require("morgan");
const port = 3336;
const host = "127.0.0.1";

app.use(morgan('dev')); // uses morgan dependency
app.use(express.static('client')); // to serve the files inside the client directory.
app.use(express.urlencoded({ extended: true })); // 
app.use(express.json()); //

app.use((err, req, res, next) => {
  // catches all errors
  if (err) {
    console.log(err.message);
    res.status(500).send(err);
  }
});

var userRouter = require("../nodeapi/routes/api/users");

app.use('/api/users', userRouter); // uses the users.js router to make code cleaner and more organized, and easier to recreate new api's.

app.listen(port, host, function() {
  // starts our server to listen on localhost by default or host on any host you make it as in the host constant, along with the port.
  console.log(`Listening on PORT:${port}`);
});