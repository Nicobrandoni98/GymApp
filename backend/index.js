// index.js
require("dotenv").config();
const mongoose = require("mongoose");
const app = require("./app"); // Importa la configuración de la app
const PORT = process.env.PORT || 3001;

// Conexión a la base de datos
const url = process.env.MONGODB_URI;
mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB:", error.message);
  });

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
