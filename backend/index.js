const express = require("express");
const app = express();
/* const logger = require("./utils/requestLogger.js"); */
const middleware = require("./utils/middleware.js");
const cors = require("cors");
app.use(express.json());
app.use(cors());
/* app.use(logger.requestLogger); */

let cardData = [
  {
    id: "1",
    title: "Ejercicios para pecho",
    exercises: [
      "Press Banca",
      "Press banca inclinado",
      "Apertura con mancuernas",
      "Cruce de Poleas",
    ],
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu8qK5mNV_W1j823KeA_qfF8wFLdoihyIsaA&s",
  },
  {
    id: "2",
    title: "Ejercicios para espalda",
    exercises: [
      "Jalon al pecho",
      "Remo con barra",
      "Remo T",
      "Remo con mancuernas",
    ],
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5RZALev86EkvtZhn9ejHXhnnpw6UEA9-Pog&s",
  },
  {
    id: "3",
    title: "Ejercicios para piernas",
    exercises: [
      "Sentadilla",
      "Peso muerto",
      "Extension de cuadriceps",
      "Prensa",
    ],
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiHK-P8nRBBKNynjNxL295MUtkLDa5FNfKpA&s",
  },
  {
    id: "4",
    title: "Ejercicios para brazos",
    exercises: [
      "Curl de bicep",
      "Extension triceps con soga",
      "Vuelos laterales",
    ],
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3XyBlGIc8hO8R1BRwCjZrDlkNQcgZ42E02u08_L3kKQxZ1GE9nN1LQT26O9sZO-lHugI&usqp=CAU",
  },
];

app.get("/", (request, response) => {
  response.send("Hellow");
});

app.get("/api/categories", (request, response) => {
  response.json(cardData);
});

app.get("/api/categories/:id", (request, response) => {
  const id = request.params.id;
  const category = cardData.find((category) => category.id === id);
  response.json(category);
});

app.use(middleware.unknownEndpoint);

const PORT = process.env.PORT || 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
