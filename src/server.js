const express = require("express");
const mysql = require("mysql");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = 8080;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "assets"))); // Sirve archivos estáticos de 'assets'

// Configuración de la base de datos
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "ecomerce",
});

// Conectar con la base de datos
db.connect((err) => {
  if (err) {
    console.error('Error al conectar con la base de datos:', err);
    return;
  }
  console.log('Conexión exitosa a la base de datos');
});

// Rutas para la API
app.get('/api/categorias', (req, res) => {
  const query = 'SELECT * FROM categorias'; 
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error en la consulta:', err);
      return res.status(500).json({ error: 'Error al obtener las categorías' });
    }
    res.json(results); 
  });
});

// Ruta para obtener los productos
app.get('/api/productos', (req, res) => {
  const { categoria } = req.query;  // Obtener el parámetro 'categoria' de la consulta (URL)
  
  if (categoria) {
    const query = 'SELECT * FROM productos WHERE categoria = ?';  // Usar el marcador de posición '?'
    
    // Ejecutar la consulta, pasando el parámetro de categoría
    db.query(query, [categoria], (err, results) => {
      if (err) {
        console.error('Error en la consulta:', err);
        return res.status(500).json({ error: 'Error al obtener los productos' });
      }
      res.json(results);  // Devolver los productos filtrados como respuesta JSON
    });
  } else {
    const query = 'SELECT * FROM productos';  // Si no hay categoría, seleccionar todos los productos
    
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error en la consulta:', err);
        return res.status(500).json({ error: 'Error al obtener los productos' });
      }
      res.json(results); // Devolver todos los productos como respuesta JSON
    });
  }
});

// Ruta para el favicon
app.get("/favicon.ico", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "vite.svg"));
});

// Ruta de fallback para servir index.html del directorio public (¡debe ir al final!)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html")); // Asegúrate de que este sea el archivo correcto
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
