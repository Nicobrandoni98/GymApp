require("dotenv").config();
const express = require("express");
const app = express();
const middleware = require("./utils/middleware.js");
const cors = require("cors");
const usersRouter = require('./controllers/users.js')
const Categorie = require("./models/categorie.js");
app.use(express.json());
app.use(cors());
app.use(express.static("build"));
const path = require('path');

app.get("/api/categories", (request, response) => {
  Categorie.find({}).then((categorie) => {
    response.json(categorie);
  });
});

app.get("/api/categories/:id", (request, response) => {
  Categorie.findById(request.params.id)
    .then((categorie) => {
      if (categorie) {
        response.json(categorie);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => {
      console.log(error);
      response.status(400).send({ error: "malformatted id" });
    });
});

app.post("/api/categories", (request, response) => {
  const body = request.body;

  if (body.title === undefined || body.exercise === undefined) {
    return response.status(400).json({ error: "content missing" });
  }
  const categorie = new Categorie({
    title: body.title,
    exercise: body.exercise,
    img: body.img,
    createAt: Date.now()
  });
  categorie.save().then((savedCategorie) => {
    response.json(savedCategorie);
  });
});

app.put("/api/categories/:id/exercise", async(request, response) => {
  const exerciseId = request.params.id;
  const { name, peso, repeticiones, series } = request.body
  const cat = await Categorie.findOne({"exercise._id": exerciseId})
  const existingExercise = cat.exercise.id(exerciseId)

  if (existingExercise) {
    existingExercise.peso = peso;
    existingExercise.repeticiones = repeticiones;
    existingExercise.series = series;
  } 
  return cat.save();


/*   Categorie.findById(categoryId)
    .then(category => {

      const existingExercise = category.exercise.find(ex => ex.name === name);

      if (existingExercise) {
        existingExercise.peso = peso;
        existingExercise.repeticiones = repeticiones;
        existingExercise.series = series;
      } else {
        category.exercise.push({ name, peso, repeticiones, series });
      }

      return category.save();
    })
    .then(updatedCategory => {
      response.json(updatedCategory);
    }) */
});

app.get('*', (req, rest) =>
res-sendFile(patg.join(__dirname, '')))


/* app.use('/api/users', usersRouter) */




app.use(middleware.unknownEndpoint);

const PORT = process.env.PORT || 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
