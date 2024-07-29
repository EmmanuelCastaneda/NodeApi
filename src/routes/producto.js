const express = require("express");
const productoSchema = require("../models/producto");
const categoriaSchema = require("../models/categoria");
const router = express.Router();

router.post("/producto", (req, res) => {
  const { nombre, precio, descripcion, categoria } = req.body;
  categoriaSchema.findById(categoria)
    .then((cat) => {
      if (!cat) {
        return res.status(404).json({ message: "No se encontro la categoria" });
      }
      const product = new productoSchema({
        nombre,
        precio,
        descripcion,
        categoria
      });

      return product.save();
    })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

router.get("/producto", (req, res) => {
  productoSchema
    .find()
    .populate('categoria', 'nombre')
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

router.get("/producto/:id", (req, res) => {
  const { id } = req.params;
  productoSchema
    .findById(id)
    .populate('categoria', 'nombre')
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

router.put("/producto/:id", (req, res) => {
  const { id } = req.params;
  const { nombre, precio, descripcion, categoria } = req.body;
  categoriaSchema.findById(categoria)
    .then((cat) => {
      if (!cat) {
        return res.status(404).json({ message: "No se encontro la categoria" });
      }
      return productoSchema.updateOne({ _id: id }, { $set: { nombre, precio, descripcion, categoria }});
    })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});


router.delete("/producto/:id", (req, res) => {
  const { id } = req.params;
  productoSchema
    .deleteOne({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

module.exports = router;
