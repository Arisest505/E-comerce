const db = require("../db"); // Tu archivo db.js

// Obtener todas las marcas
exports.getMarcas = (req, res) => {
  const query = "SELECT * FROM marcas";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error al obtener las marcas:", err);
      return res.status(500).json({ error: "Error al obtener las marcas" });
    }
    res.status(200).json(results);
  });
};

// Crear una nueva marca
exports.createMarca = (req, res) => {
  const { nombre, descripcion, estado } = req.body;
  const query = "INSERT INTO marcas (nombre, descripcion, estado) VALUES (?, ?, ?)";
  db.query(query, [nombre, descripcion, estado], (err, results) => {
    if (err) {
      console.error("Error al crear la marca:", err);
      return res.status(500).json({ error: "Error al crear la marca" });
    }
    res.status(201).json({ message: "Marca creada exitosamente", id: results.insertId });
  });
};

// Actualizar una marca existente
exports.updateMarca = (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, estado } = req.body;
  const query = "UPDATE marcas SET nombre = ?, descripcion = ?, estado = ? WHERE id = ?";
  db.query(query, [nombre, descripcion, estado, id], (err, results) => {
    if (err) {
      console.error("Error al actualizar la marca:", err);
      return res.status(500).json({ error: "Error al actualizar la marca" });
    }
    res.status(200).json({ message: "Marca actualizada exitosamente" });
  });
};

// Eliminar una marca
exports.deleteMarca = (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM marcas WHERE id = ?";
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error("Error al eliminar la marca:", err);
      return res.status(500).json({ error: "Error al eliminar la marca" });
    }
    res.status(200).json({ message: "Marca eliminada exitosamente" });
  });
};
