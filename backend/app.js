require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const middleware = require("./utils/middleware.js");
const usersRouter = require('./controllers/users.js');
const categoriesRouter = require('./controllers/categories.js');

const app = express();


app.use(express.json());
app.use(cors());
app.use(express.static("build"));


/* app.use('/api/users', usersRouter); */ 
app.use('/api/categories', categoriesRouter); 


app.get("/api/admin", (request, response) => {
  response.send("server Works");
});
app.post("/api/admin", (request, response) => {
  const body = request.body;
  response.json(body);
});


app.get('*', (request, response) => {
  response.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});


app.use(middleware.unknownEndpoint);

module.exports = app;
