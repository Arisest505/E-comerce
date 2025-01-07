import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Grid, Card, CardMedia, CardContent, CardActions, Button, Typography } from '@mui/material';
import axios from 'axios';
import { useCart } from '../components/Cart/CartContext'; 

const CategoriaProductos = () => {
  const { categoria } = useParams(); // Captura el parámetro 'categoria' de la URL
  const [productos, setProductos] = useState([]);
  const { addToCart } = useCart(); // Usamos la función para añadir productos al carrito

  useEffect(() => {
    // Solicitar los productos de la categoría seleccionada
    axios
      .get(`http://localhost:8080/api/productos/categoria?categoria=${categoria}`)
      .then((response) => {
        setProductos(response.data); // Guardamos los productos en el estado
      })
      .catch((error) => {
        console.error('Error fetching productos:', error);
      });
  }, [categoria]);

  return (
    <Container>
      <Typography variant="h4" sx={{ marginBottom: 4 }}>
        Productos de la categoría: {categoria}
      </Typography>

      <Grid container spacing={4}>
        {productos.map((producto) => (
          <Grid item xs={12} sm={6} md={4} key={producto.id}>
            <Card sx={{ backgroundColor: '#000', color: '#fff' }}>
              <CardMedia
                component="img"
                sx={{
                  objectFit: 'contain',
                  width: '100%',
                  height: '300px',
                }}
                image={producto.imagen || 'default-image.jpg'} // Imagen predeterminada si no tiene imagen
                alt={producto.nombre}
              />
              <CardContent>
                <Typography variant="h6">{producto.nombre}</Typography>
                <Typography variant="body2">${producto.precio_venta}</Typography>
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
                  onClick={() => addToCart(producto)} // Pasamos el producto correcto
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

export default CategoriaProductos;
