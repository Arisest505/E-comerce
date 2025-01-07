import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Badge, Menu, MenuItem, Box } from '@mui/material';
import { ShoppingCart as ShoppingCartIcon, Menu as MenuIcon } from '@mui/icons-material';
import { Link, NavLink } from 'react-router-dom';
import { useCart } from '../Cart/CartContext'; // Importa el hook del contexto
import './Navbar.css'; // Importa el archivo CSS

const Navbar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { cart } = useCart(); // Accede al estado del carrito

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="fixed" sx={{ backgroundColor: '#000000', zIndex: 1201 }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {/* Icono del menú móvil */}
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ display: { xs: 'block', sm: 'none' } }}
          onClick={handleMenuOpen}
        >
          <MenuIcon />
        </IconButton>

        {/* Logo */}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <NavLink to="/" className="navbar-link">
          Noir-Solace
          </NavLink>
        </Typography>

        {/* Menú Desktop */}
        <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center' }}>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? 'navbar-link-active' : 'navbar-link')}
          >
            <Button color="inherit">Home</Button>
          </NavLink>
          <NavLink
            to="/categorias"
            className={({ isActive }) => (isActive ? 'navbar-link-active' : 'navbar-link')}
          >
            <Button color="inherit">Categorias</Button>
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) => (isActive ? 'navbar-link-active' : 'navbar-link')}
          >
            <Button color="inherit">Nosotros</Button>
          </NavLink>

          {/* Carrito */}
          <IconButton color="inherit" component={Link} to="/cart">
            <Badge badgeContent={cart.length} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Box>
      </Toolbar>

      {/* Menú móvil */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        sx={{ display: { xs: 'block', sm: 'none' } }}
      >
        <MenuItem onClick={handleMenuClose}>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? 'navbar-link-active' : 'navbar-link')}
          >
            Home
          </NavLink>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <NavLink
            to="/categorias"
            className={({ isActive }) => (isActive ? 'navbar-link-active' : 'navbar-link')}
          >
            Categorias
          </NavLink>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <NavLink
            to="/about"
            className={({ isActive }) => (isActive ? 'navbar-link-active' : 'navbar-link')}
          >
            Nosotros
          </NavLink>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <NavLink
            to="/cart"
            className={({ isActive }) => (isActive ? 'navbar-link-active' : 'navbar-link')}
          >
            Carrito ({cart.length})
          </NavLink>
        </MenuItem>
      </Menu>
    </AppBar>
  );
};

export default Navbar;
