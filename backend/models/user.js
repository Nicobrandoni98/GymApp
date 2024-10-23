const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
    unique: true
},
  name: String,
  passwordHash: String,
  exercises: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Categorie'
    }
  ],
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    // el passwordHash no debe mostrarse
    delete returnedObject.passwordHash
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User