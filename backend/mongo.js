const mongoose = require('mongoose')

/* if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
} */

const password = process.argv[2]

const url =
  `mongodb+srv://nicobrandoni98:${password}@gymapp.8tqsl.mongodb.net/?retryWrites=true&w=majority&appName=GymApp`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const categorieSchema = new mongoose.Schema({
  title: String,
  exercises: [{
    name: String,
    peso: Number,
    repeticiones: Number,
    series: Number
  }],
  img: String
})

const Categorie = mongoose.model('Categorie', categorieSchema)

const categorie = new Categorie({
  title: 'espalda',
  exercises: [{
    name: 'espaldirijilla',
    peso: 120,
    repeticiones: 12,
    series: 4
  }],
  img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5RZALev86EkvtZhn9ejHXhnnpw6UEA9-Pog&s"
})

categorie.save().then(result => {
  console.log('categorie saved!')
  console.log(result);
  
  mongoose.connection.close()
}) 

/*   Categorie.find({}).then(result => {
    result.forEach(categorie => {
      console.log(categorie)
    })
    mongoose.connection.close()
  }) */