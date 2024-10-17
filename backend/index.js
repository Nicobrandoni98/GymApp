require("dotenv").config();
const express = require("express");
const app = express();
const middleware = require("./utils/middleware.js");
const cors = require("cors");
/* const infoCategories = require('./DB/infoCategories.js') */
const Categorie = require("./models/categorie.js");
app.use(express.json());
app.use(cors());
/* app.use(logger.requestLogger); */
app.use(express.static("build"));
const path = require('path');

app.get("/", (request, response) => {
  response.send("Hellow");
});

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

app.put("/api/categories/:id/exercise", (request, response) => {
  const categoryId = request.params.id;
  const { name, peso, repeticiones, series } = request.body;

  // Validar que todos los campos necesarios están presentes
  if (!name || peso === undefined || repeticiones === undefined || series === undefined) {
    return response.status(400).json({ error: "Missing exercise data" });
  }

  // Buscar la categoría por su ID y luego actualizar el ejercicio correspondiente
  Categorie.findById(categoryId)
    .then(category => {
      if (!category) {
        return response.status(404).json({ error: "Category not found" });
      }

      // Encontrar el ejercicio por su nombre (o actualizarlo si ya existe)
      const existingExercise = category.exercise.find(ex => ex.name === name);

      if (existingExercise) {
        // Actualizar los valores del ejercicio existente
        existingExercise.peso = peso;
        existingExercise.repeticiones = repeticiones;
        existingExercise.series = series;
      } else {
        // Si no existe, agregar el nuevo ejercicio
        category.exercise.push({ name, peso, repeticiones, series });
      }

      // Guardar los cambios en la base de datos
      return category.save();
    })
    .then(updatedCategory => {
      response.json(updatedCategory);
    })
    .catch(error => {
      console.error(error);
      response.status(500).json({ error: "Failed to update category" });
    });
});

app.get('*', (request, response) => {
  response.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});

app.use(middleware.unknownEndpoint);

const PORT = process.env.PORT || 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
