import React from 'react';
import Navbar from './components/Navbar/navbar';
import Home from './components/Home/Home';
import Categorias from './components/Categories/Categorias'; 
import Cart from './components/Cart/Cart';
import About from './components/About/About';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import CategoriaProductos from './views/CategoriaProductos'; // Asegúrate de importar el componente correcto

function App() {
  return (
    <div className="app-container">
      {/* Contenedor principal de la aplicación */}
      <Router>
        {/* Barra de navegación */}
        <Navbar />

        {/* Contenido de la aplicación */}
        <div className="app-content">
          <Routes>
            {/* Ruta principal que renderiza el componente Home */}
            <Route path="/" element={<Home />} />
            
            {/* Ruta para categorías */}
            <Route path="/categorias" element={<Categorias />} />
            
            {/* Ruta dinámica para las categorías */}
            <Route path="/categorias/:categoria" element={<CategoriaProductos />} />
            
            {/* Ruta para la página "Sobre nosotros" */}
            <Route path="/about" element={<About />} />
            
            {/* Ruta para el carrito */}
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;