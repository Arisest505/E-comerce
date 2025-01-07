import React from 'react';
import { useCart } from './CartContext'; // Importa el hook del contexto
import {
  Typography,
  Container,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Grid,
  Box,
} from '@mui/material';
import { FaPlus, FaMinus, FaTrash } from 'react-icons/fa';

const Cart = () => {
  const { cart, updateCartQuantity, removeFromCart, clearCart } = useCart();

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Tu Carrito
      </Typography>

      {cart.length === 0 && (
        <Typography variant="body1" align="center" sx={{ marginTop: 4 }}>
          El carrito está vacío.
        </Typography>
      )}

      <Grid container spacing={4}>
        {cart.map((producto) => (
          <Grid item xs={12} sm={6} md={4} key={producto.id}>
            <Card sx={{ display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                image={producto.imagen || 'default-image.jpg'} // Imagen predeterminada si no tiene imagen
                alt={producto.nombre}
                sx={{
                  height: 200,
                  objectFit: 'contain',
                }}
              />
              <CardContent>
                <Typography variant="h6">{producto.nombre}</Typography>
                <Typography variant="body2" sx={{ marginBottom: 2 }}>
                  Precio: ${producto.precio_venta}
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Button
                    onClick={() => updateCartQuantity(producto.id, false)}
                    variant="outlined"
                    size="small"
                    disabled={producto.quantity <= 1}
                    sx={{ marginRight: 1 }}
                  >
                    <FaMinus />
                  </Button>
                  <Typography variant="body2" sx={{ marginRight: 1 }}>
                    {producto.quantity}
                  </Typography>
                  <Button
                    onClick={() => updateCartQuantity(producto.id, true)}
                    variant="outlined"
                    size="small"
                    disabled={producto.quantity >= 10}
                  >
                    <FaPlus />
                  </Button>
                </Box>
              </CardContent>
              <CardActions sx={{ justifyContent: 'space-between' }}>
                <Button
                  onClick={() => removeFromCart(producto.id)}
                  variant="contained"
                  color="secondary"
                >
                  Eliminar
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {cart.length > 0 && (
        <Box sx={{ marginTop: 4 }}>
          <Typography variant="h6" align="right">
            Total: ${cart.reduce((total, item) => total + item.precio_venta * item.quantity, 0).toFixed(2)}
          </Typography>
          <Button
            onClick={clearCart}
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: 2 }}
          >
            Vaciar Carrito
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default Cart;
