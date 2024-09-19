const express = require("express");
const app = express();
const middleware = require("./utils/middleware.js");
const cors = require("cors");
const infoCategories = require('./DB/infoCategories.js')
app.use(express.json());
app.use(cors());
/* app.use(logger.requestLogger); */
app.use(express.static('build'));


app.get("/", (request, response) => {
  response.send("Hellow");
});

app.get("/api/categories", (request, response) => {
  response.json(infoCategories);
});

app.get("/api/categories/:id", (request, response) => {
  const id = request.params.id;
  const category = infoCategories.find((category) => category.id === id);
  response.json(category);
});


app.use(middleware.unknownEndpoint);

const PORT = process.env.PORT || 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
