const db = require('../db'); // Importa tu pool de conexiones

// Obtener todos los productos
exports.getProductos = (req, res) => {
  const query = 'SELECT * FROM productos';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error al obtener productos:', err);
      return res.status(500).json({ error: 'Error al obtener productos' });
    }
    res.json(results);
  });
};

// Obtener un producto por ID
exports.getProducto = (req, res) => {
  const { id } = req.params;

  const query = 'SELECT * FROM productos WHERE id = ?';
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error al obtener el producto:', err);
      return res.status(500).json({ error: 'Error al obtener el producto' });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.json(results[0]);
  });
};

// Obtener productos filtrados por categoría
exports.getProductosByCategoria = (req, res) => {
  const { categoria } = req.query;

  const query = 'SELECT * FROM productos WHERE categoria = ?';
  db.query(query, [categoria], (err, results) => {
    if (err) {
      console.error('Error al obtener productos por categoría:', err);
      return res.status(500).json({ error: 'Error al obtener productos por categoría' });
    }
    res.json(results);
  });
};
