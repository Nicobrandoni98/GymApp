const mongoose = require("mongoose");

mongoose.set("strictQuery", false);
/* const url =
  `mongodb+srv://nicobrandoni98:123qwe@gymapp.8tqsl.mongodb.net/?retryWrites=true&w=majority&appName=GymApp` */

const url = process.env.MONGODB_URI;

console.log("connecting to", url);

mongoose
  .connect(url)
  .then((result) => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

const categorieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  exercise: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Exercise"
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createAt: Date,
  img: String,
});
categorieSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

/* const Categorie = mongoose.model('Categorie', categorieSchema) */

module.exports = mongoose.model("Categorie", categorieSchema);
