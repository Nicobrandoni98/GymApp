const express = require('express')
const app = express()
const requestLogger = require('./middleware/requestLogger')
const unknownEndpoint = require('./middleware/unknownEndpoint')
app.use(express.json())

app.use(requestLogger)


let cardData = [
  {
    id: "1",
    title: "Pecho",
    text: "Ejercicios para pecho",
    buttonText: "Ir a los ejercicios",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu8qK5mNV_W1j823KeA_qfF8wFLdoihyIsaA&s",
  },
  {
    id: "2",
    title: "Espalda",
    text: "Ejercicios para espalda",
    buttonText: "Ir a lo ejercicios",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5RZALev86EkvtZhn9ejHXhnnpw6UEA9-Pog&s",
  },
  {
    id: "3",
    title: "Piernas",
    text: "Ejercicios para piernas",
    buttonText: "Ir a los ejercicios",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiHK-P8nRBBKNynjNxL295MUtkLDa5FNfKpA&s",
  },
  {
    id: "4",
    title: "Brazos",
    text: "Ejercicios para brazos",
    buttonText: "Ir a los ejercicios",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3XyBlGIc8hO8R1BRwCjZrDlkNQcgZ42E02u08_L3kKQxZ1GE9nN1LQT26O9sZO-lHugI&usqp=CAU",
  },
];

app.get('/', (request, response) => {
    response.send('Hellow')
})

app.get('/api/categories', (request, response) => {
    response.json(cardData)
})

app.get('/api/categories/:id', (request, response) => {
    const id = request.params.id
    const category = cardData.find(category => {
      return category.id === id
    })
    response.json(category)
  })
  
  
app.use(unknownEndpoint)

const PORT = 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
