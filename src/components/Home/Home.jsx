import React, { useState, useEffect } from 'react';
import { Typography, Container, Grid, Card, CardMedia, CardContent, CardActions, Button } from '@mui/material';
import { useCart } from '../Cart/CartContext'; // Importa el hook del contexto
import './Home.css';

const Home = () => {
  const [productos, setProductos] = useState([]);
  const { addToCart } = useCart(); // Desestructura la función addToCart desde el contexto

  useEffect(() => {
    fetch('http://localhost:8080/api/productos')
      .then((response) => {
        if (!response.ok) throw new Error('Error en la respuesta del servidor');
        return response.json();
      })
      .then((data) => setProductos(data))
      .catch((error) => console.error('Error fetching productos:', error));
  }, []);

  return (
    <Container className="home-container" maxWidth="xl">
      {/* Imagen principal */}
      <div>
        <img
          src="https://d319yleido6tgg.cloudfront.net/stores/001/063/033/themes/cubo/slide-1571835719477-7385694174-9537d0d86060d32ec8c5dc6d975ab9741571835723-1920-1920.jpg?755810131"
          alt="Promotional"
          className="home-promo-image"
        />
      </div>

      {/* Texto de bienvenida */}
      <Typography variant="h3" className="home-welcome-title">
        Bienvenido a E-Shop
      </Typography>
      <Typography variant="h6" className="home-welcome-description">
        ¡Descubre los mejores productos a los mejores precios!
      </Typography>

      {/* Lista de productos */}
      <Grid container spacing={4}>
        {productos.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
            <Card
              sx={{
                backgroundColor: '#000',
                color: '#fff',
                borderRadius: '8px',
                boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.3)',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 8px 16px rgba(0, 0, 0, 0.4)',
                },
              }}
            >
              <CardMedia
                component="img"
                sx={{
                  objectFit: 'contain',  // Escala la imagen sin distorsionar, manteniendo su proporción
                  width: '100%',         // Hace que la imagen ocupe todo el ancho disponible del contenedor
                  maxHeight: '300px',    // Establece una altura máxima, pero la imagen se ajusta proporcionalmente
                  height: '300px',        // Deja que la altura se ajuste automáticamente para mantener la proporción
                }}
                image={product.imagen || 'default-image.jpg'}
                alt={product.nombre}
              />
              <CardContent>
                <Typography variant="h6" sx={{ color: '#b39ddb' }}>
                  {product.nombre}
                </Typography>
                <Typography variant="body2" sx={{ color: '#bdbdbd' }}>
                  ${product.precio_venta}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  sx={{
                    background: 'linear-gradient(45deg, #7b1fa2, #b39ddb)',
                    color: '#fff',
                    fontWeight: '600',
                    borderRadius: '6px',
                    padding: '8px',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #6a1b9a, #9e91c9)',
                    },
                  }}
                  fullWidth
                  onClick={() => addToCart(product)} // Llama a la función addToCart
                >
                  Comprar
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Home;
