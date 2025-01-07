import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Badge, Menu, MenuItem, Box } from '@mui/material';
import { ShoppingCart as ShoppingCartIcon, Menu as MenuIcon } from '@mui/icons-material';
import { Link, NavLink } from 'react-router-dom';
import './Navbar.css'; // Importa el archivo CSS

const Navbar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="fixed" sx={{ backgroundColor: '#000000 ', zIndex: 1201 }}>
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
            E-Shop
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
            <Button color="inherit">Categories</Button>
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) => (isActive ? 'navbar-link-active' : 'navbar-link')}
          >
            <Button color="inherit">About</Button>
          </NavLink>

          {/* Carrito */}
          <IconButton color="inherit" component={Link} to="/cart">
            <Badge badgeContent={0} color="error">
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
          <NavLink to="/" className={({ isActive }) => (isActive ? 'navbar-link-active' : 'navbar-link')}>
            Home
          </NavLink>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <NavLink to="/categorias" className={({ isActive }) => (isActive ? 'navbar-link-active' : 'navbar-link')}>
            Categories
          </NavLink>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <NavLink to="/about" className={({ isActive }) => (isActive ? 'navbar-link-active' : 'navbar-link')}>
            About
          </NavLink>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <NavLink to="/cart" className={({ isActive }) => (isActive ? 'navbar-link-active' : 'navbar-link')}>
            Cart (0)
          </NavLink>
        </MenuItem>
      </Menu>
    </AppBar>
  );
};

export default Navbar;
