import React from 'react';
import { Typography, Container, Button, Paper, Box } from '@mui/material';
import { styled } from '@mui/system';

const StyledContainer = styled(Container)(({ theme }) => ({
  backgroundColor: '#d3d3d3', // Negro oscuro
  color: '#ffffff',
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  boxShadow: '0 4px 20px rgba(255, 248, 248, 0.84)',
}));

const StyledTitle = styled(Typography)({
  color: '#9c27b0', // Morado elegante
  fontWeight: 'bold',
  textAlign: 'center',
  marginBottom: '1rem',
});

const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: '#2c2c2c',
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderRadius: theme.shape.borderRadius,
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
  color: 'white',
}));

const StyledButton = styled(Button)({
  backgroundColor: '#9c27b0',
  color: '#ffffff',
  '&:hover': {
    backgroundColor: '#7b1fa2',
  },
});

const StyledTotal = styled(Typography)({
  color: '#000000',
  textAlign: 'right',
  marginTop: '2rem',
  fontWeight: 'bold',
});

const StyledCheckoutButton = styled(Button)({
  backgroundColor: '#9c27b0',
  color: '#ffffff',
  width: '100%',
  marginTop: '1rem',
  padding: '0.75rem',
  fontSize: '1rem',
  '&:hover': {
    backgroundColor: '#7b1fa2',
  },
});

const Cart = () => {
  return (
    <StyledContainer maxWidth="md">
      <StyledTitle variant="h4" gutterBottom>
        Your Cart
      </StyledTitle>

      <StyledPaper>
        <Box>
          <Typography variant="h6">Product 1</Typography>
          <Typography variant="body2">Price: $99.99</Typography>
        </Box>
        <StyledButton variant="contained">Remove</StyledButton>
      </StyledPaper>

      <StyledTotal variant="h5">Total: $99.99</StyledTotal>

      <StyledCheckoutButton variant="contained">
        Proceed to Checkout
      </StyledCheckoutButton>
    </StyledContainer>
  );
};

export default Cart;
