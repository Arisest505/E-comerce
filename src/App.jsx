import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/navbar';
import Home from './components/Home/Home';
import Categorias from './components/Categories/Categorias';
import Cart from './components/Cart/Cart';
import About from './components/About/About';
import CategoriaProductos from './views/CategoriaProductos';
import { CartProvider } from './components/Cart/CartContext'; // Importa el proveedor del contexto
import './App.css';

function App() {
  return (
    <CartProvider>
      {/* Proveedor del contexto de carrito para envolver toda la aplicación */}
      <div className="app-container">
        <Router>
          {/* Barra de navegación */}
          <Navbar />
          <div className="app-content">
            {/* Rutas de la aplicación */}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/categorias" element={<Categorias />} />
              <Route path="/categorias/:categoria" element={<CategoriaProductos />} />
              <Route path="/about" element={<About />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="*" element={<h2>Página no encontrada</h2>} />
            </Routes>
          </div>
        </Router>
      </div>
    </CartProvider>
  );
}

export default App;
