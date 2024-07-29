const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const userRoutes = require("./routes/user");
const productoRoutes = require("./routes/producto");
const categoriaRoutes = require("./routes/categoria");
const app = express();
const port = process.env.PORT || 4000;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.json());
app.use("/api", userRoutes);
app.use("/api", productoRoutes);
app.use("/api", categoriaRoutes);

app.get("/", (req, res) => {
  res.send("Bienvenidos");
});


mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Conectado a Mongo"))
  .catch((error) => console.error(error));

app.listen(port, () => console.log("Se esta corriendo en el puerto", port));
