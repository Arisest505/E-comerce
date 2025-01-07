import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCart } from '../Cart/CartContext'; // Importar el contexto del carrito
import './Categories.css'; // Archivo CSS para el diseño

function Categorias() {
  const [categorias, setCategorias] = useState([]); // Lista de categorías
  const [productos, setProductos] = useState([]); // Lista de productos
  const [selectedCategory, setSelectedCategory] = useState(''); // Categoría seleccionada

  const { addToCart } = useCart(); // Usamos la función para añadir productos al carrito

  // Obtener categorías al cargar el componente
  useEffect(() => {
    axios
      .get('http://localhost:8080/api/categorias')
      .then((response) => {
        setCategorias(response.data); // Asigna las categorías al estado
      })
      .catch((error) => {
        console.error('Error al obtener categorías:', error);
      });
  }, []);

  // Obtener productos cuando se selecciona una categoría
  useEffect(() => {
    if (selectedCategory) {
      axios
        .get('http://localhost:8080/api/productos', {
          params: { categoria: selectedCategory }, // Pasar la categoría seleccionada como parámetro
        })
        .then((response) => {
          setProductos(response.data); // Asigna los productos al estado
        })
        .catch((error) => {
          console.error('Error al obtener productos:', error);
        });
    } else {
      setProductos([]); // Limpia la lista de productos si no hay categoría seleccionada
    }
  }, [selectedCategory]);

  return (
    <div className="categorias-container">
      <h2 className="categorias-title">Explora nuestras categorías</h2>

      {/* Selector de categorías */}
      <select
        className="categorias-select"
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <option value="">Selecciona una categoría</option>
        {categorias.map((categoria) => (
          <option key={categoria.id} value={categoria.id}>
            {categoria.nombre}
          </option>
        ))}
      </select>

      {/* Mostrar productos */}
      <div className="productos-container">
        {productos.length > 0 ? (
          productos.map((producto) => (
            <div key={producto.id} className="producto-card">
              <div className="producto-card-content">
                <img
                  src={producto.imagen}
                  alt={producto.nombre}
                  className="producto-imagen"
                />
                <div className="producto-info">
                  <h3 className="producto-nombre">{producto.nombre}</h3>
                  <p className="producto-descripcion">{producto.descripcion}</p>
                  <p className="producto-precio">Precio: ${producto.precio_venta}</p>
                  <button
                    className="producto-boton"
                    onClick={() => addToCart(producto)} // Añadir producto al carrito
                  >
                    Comprar
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="no-productos">No hay productos para mostrar.</p>
        )}
      </div>
    </div>
  );
}

export default Categorias;
