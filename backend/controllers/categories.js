const express = require("express");
const Categorie = require("../models/categorie.js");
const router = express.Router();

router.get("/", (request, response) => {
  Categorie.find({})
    .then(categorie => response.json(categorie))
    .catch(error => response.status(400).json({ error: error.message }));
});

router.get("/:id", (request, response) => {
  Categorie.findById(request.params.id)
    .populate("exercise")
    .then((categorie) => {
      if (categorie) response.json(categorie);
      else response.status(404).end();
    })
    .catch((err) => response.status(400).json({ error: "malformatted id" }));
});

router.post("/", (request, response) => {
  const body = request.body;
  if (!body.title || !body.exercise) {
    return response.status(400).json({ error: "content missing" });
  }
  const categorie = new Categorie({
    title: body.title,
    exercise: body.exercise,
    img: body.img,
    createAt: Date.now(),
  });
  categorie
    .save()
    .then((savedCategorie) => response.json(savedCategorie))
    .catch((error) => response.status(400).json({ error: error.message }));
});

router.put("/:id/exercise", async (request, response) => {
  const exerciseId = request.params.id;
  const { peso, repeticiones, series } = request.body;
  try {
    const cat = await Categorie.findOne({ exercise: exerciseId }).populate(
      "exercise"
    );

    if (!cat || !cat.exercise) {
      return response
        .status(404)
        .json({ error: "categoria o ejercicio no encontrado" });
    }

    cat.exercise.peso = peso;
    cat.exercise.repeticiones = repeticiones;
    cat.exercise.series = series;

    await cat.exercise.save();
    return response.status(200).json({ message: "Ejercicio actualizado" });
  } catch {
    return response.status(500).json({ error: error.message });
  }
});

module.exports = router;
