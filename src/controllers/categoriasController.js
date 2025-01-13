const db = require('../db');

// Obtener todas las categorías
exports.getCategorias = (req, res) => {
  const query = "SELECT id, nombre FROM categorias ORDER BY nombre";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error en la consulta:", err);
      return res.status(500).json({ error: "Error al obtener las categorías" });
    }

    // Verifica qué se está recibiendo antes de responder
    console.log("Resultados de categorías:", results); // Asegúrate de ver id y nombre

    res.json(results); // Responde con los datos correctos
  });
};

// Nuevo método para obtener productos por categoría  
exports.getProductosByCategoria = (req, res) => {
    const { categoria } = req.query;
    console.log('ID de categoría recibido:', categoria); // Verifica si el ID de categoría se pasa correctamente
  
    if (!categoria) {
      return res.status(400).json({ error: 'Se requiere un ID de categoría' });
    }
  
    const query = `
      SELECT p.*   
      FROM productos p  
      WHERE p.categoria_id = ?  
    `;
  
    db.query(query, [categoria], (err, results) => {
      if (err) {
        console.error('Error al obtener productos por categoría:', err);
        return res.status(500).json({ error: 'Error interno del servidor' });
      }
  
      if (results.length === 0) {
        return res.status(404).json({ error: 'Producto no encontrado' });
      }
  
      res.json(results);
    });
  };
  