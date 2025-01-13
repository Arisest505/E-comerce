import React from 'react';
import { useCart } from './CartContext'; // Importa el hook del contexto
import { Typography, Container, Grid, Box, Button } from '@mui/material';
import { FaPlus, FaMinus, FaTrash } from 'react-icons/fa';
import './Cart.css'; // Importa los estilos de Cart.css

const Cart = () => {
  const { cart, updateCartQuantity, removeFromCart, clearCart } = useCart();

  return (
    <Container>
      <Typography variant="h4" gutterBottom className="cart-title">
        Tu Carrito
      </Typography>

      {cart.length === 0 && (
        <Typography variant="body1" align="center" className="empty-cart-text">
          El carrito está vacío.
        </Typography>
      )}

      <Grid container spacing={4}>
        {cart.map((producto) => (
          <Grid item xs={12} sm={6} md={4} key={producto.id}>
            <div className="cart-item">
              <img
                className="cart-item-image"
                src={producto.imagen || 'default-image.jpg'}
                alt={producto.nombre}
              />
              <div className="cart-item-content">
                <Typography variant="h6" className="cart-item-name">
                  {producto.nombre}
                </Typography>
                <Typography variant="body2" className="cart-item-price">
                  Precio: ${producto.precio_venta}
                </Typography>

                <Box className="cart-item-quantity">
                  <Button
                    onClick={() => updateCartQuantity(producto.id, false)}
                    variant="outlined"
                    size="small"
                    disabled={producto.quantity <= 1}
                    className="cart-item-quantity-btn"
                  >
                    <FaMinus />
                  </Button>
                  <Typography variant="body2" className="cart-item-quantity-text">
                    {producto.quantity}
                  </Typography>
                  <Button
                    onClick={() => updateCartQuantity(producto.id, true)}
                    variant="outlined"
                    size="small"
                    disabled={producto.quantity >= 10}
                    className="cart-item-quantity-btn"
                  >
                    <FaPlus />
                  </Button>
                </Box>
              </div>
              <div className="cart-item-actions">
                <Button
                  onClick={() => removeFromCart(producto.id)}
                  variant="contained"
                  color="secondary"
                  className="cart-item-remove-btn"
                >
                  Eliminar
                </Button>
              </div>
            </div>
          </Grid>
        ))}
      </Grid>

      {cart.length > 0 && (
        <Box className="cart-total">
          <Typography variant="h6" className="cart-total-text">
            Total: ${cart.reduce((total, item) => total + item.precio_venta * item.quantity, 0).toFixed(2)}
          </Typography>
          <Button
            onClick={clearCart}
            variant="contained"
            color="primary"
            fullWidth
            className="cart-clear-btn"
          >
            Vaciar Carrito
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default Cart;
