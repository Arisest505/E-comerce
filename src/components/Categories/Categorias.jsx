import React, { useState, useEffect } from "react";
import axios from "axios";
import { useCart } from "../Cart/CartContext";
import "./Categories.css";

function Categorias() {
  const [categorias, setCategorias] = useState([]);
  const [productos, setProductos] = useState([]);
  const [filteredProductos, setFilteredProductos] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [brands, setBrands] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [maxPrice, setMaxPrice] = useState(1000);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showProductModal, setShowProductModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { addToCart } = useCart();
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriasRes, productosRes, marcasRes] = await Promise.all([
          axios.get("http://localhost:8080/api/categorias"),
          axios.get("http://localhost:8080/api/productos"),
          axios.get("http://localhost:8080/api/marcas"),
        ]);

        setCategorias(categoriasRes.data);
        setProductos(productosRes.data);
        setFilteredProductos(productosRes.data);
        setBrands(marcasRes.data);
      } catch (err) {
        setError("Error al cargar datos. Por favor, intenta nuevamente.");
        console.error("Error al cargar datos:", err);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let filtered = [...productos];

    if (selectedCategory) {
      filtered = filtered.filter(
        (producto) => Number(producto.categoria_id) === Number(selectedCategory)
      );
    }

    if (searchTerm) {
      filtered = filtered.filter((producto) =>
        producto.nombre.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    filtered = filtered.filter((producto) => producto.precio_venta <= maxPrice);

    if (selectedBrands.length > 0) {
      filtered = filtered.filter((producto) =>
        selectedBrands.includes(producto.marca_id)
      );
    }

    setFilteredProductos(filtered);
  }, [selectedCategory, searchTerm, maxPrice, selectedBrands, productos]);

  const handleBrandChange = (brandId) => {
    setSelectedBrands((prev) =>
      prev.includes(brandId) ? prev.filter((b) => b !== brandId) : [...prev, brandId]
    );
  };

  const openProductModal = (producto) => {
    setSelectedProduct(producto);
    setShowProductModal(true);
  };

  const closeProductModal = () => {
    setSelectedProduct(null);
    setShowProductModal(false);
  };

  const handleMostrarTodo = () => {
    setSelectedCategory("");
    setSelectedBrands([]);
    setSearchTerm("");
    setMaxPrice(1000);
    setFilteredProductos(productos);
  };

  return (
    <div className="categorias-layout">
      {error && <p className="error">{error}</p>}

      {/* Filtros */}
      <div className="filtros-container">
        <button onClick={() => setShowCategoryModal(true)}>Categorías</button>
        <button onClick={handleMostrarTodo}>Mostrar Todo</button>

        <input
          type="text"
          placeholder="Buscar producto..."
          className="categorias-busqueda"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="filtro-precio">
          <label>Precio máximo: ${maxPrice}</label>
          <input
            type="range"
            min="0"
            max="2000"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
          />
        </div>
        <div className="filtro-marcas">
          <h4>Filtrar por marcas</h4>
          {brands.map((marca) => (
            <div key={marca.id} className="marca-checkbox">
              <input
                type="checkbox"
                id={`marca-${marca.id}`}
                checked={selectedBrands.includes(marca.id)}
                onChange={() => handleBrandChange(marca.id)}
              />
              <label htmlFor={`marca-${marca.id}`}>{marca.nombre}</label>
            </div>
          ))}
        </div>
      </div>

      {showCategoryModal && (
        <div className="modal">
          <div className="modal-content">
            <button onClick={() => setShowCategoryModal(false)}>Cerrar</button>
            <h2>Selecciona una categoría</h2>
            {categorias.map((categoria) => (
              <button
                key={`${categoria.id}-${categoria.nombre}`}
                onClick={() => {
                  setSelectedCategory(categoria.id);
                  setShowCategoryModal(false);
                }}
              >
                {categoria.nombre}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="productos-container">
        {filteredProductos.length > 0 ? (
          filteredProductos.map((producto) => (
            <div
              key={producto.id}
              className="producto-card"
              onClick={() => openProductModal(producto)}
            >
              <img
                src={producto.imagen || "placeholder.jpg"}
                alt={producto.nombre}
                className="producto-imagen"
              />
              <div className="producto-info">
                <h3>{producto.nombre}</h3>
                <p>Precio: ${producto.precio_venta}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No hay productos para mostrar.</p>
        )}
      </div>

      {showProductModal && selectedProduct && (
        <div className="modal">
          <div className="modal-content">
            <button className="cerrar-modal" onClick={closeProductModal}>
              Cerrar
            </button>
            <h2>{selectedProduct.nombre}</h2>
            <img
              src={selectedProduct.imagen || "placeholder.jpg"}
              alt={selectedProduct.nombre}
            />
            <p><strong>Descripción:</strong> {selectedProduct.descripcion}</p>
            <p><strong>Precio:</strong> ${selectedProduct.precio_venta}</p>
            <button onClick={() => addToCart(selectedProduct)}>Agregar al carrito</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Categorias;
