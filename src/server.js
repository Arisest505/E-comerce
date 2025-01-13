const express = require("express");
const cors = require("cors");
const path = require("path");

const categoriasController = require("./controllers/categoriasController");
const marcasController = require("./controllers/marcasController");
const productosController = require("./controllers/productosController");


const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "assets")));

// Rutas de categorías
app.get("/api/categorias", categoriasController.getCategorias);
app.get("/api/productos/categoria", productosController.getProductosByCategoria);  

// Rutas de marcas
app.get("/api/marcas", marcasController.getMarcas);
app.post("/api/marcas", marcasController.createMarca);
app.put("/api/marcas/:id", marcasController.updateMarca);
app.delete("/api/marcas/:id", marcasController.deleteMarca);

// Rutas de productos
app.get("/api/productos", productosController.getProductos);
app.get("/api/productos/:id", productosController.getProducto);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
