import React from 'react';
import './About.css'; // Importa el archivo CSS
import { Box, Typography, Container } from '@mui/material';

const About = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh',  paddingTop: '64px',}}>
      {/* Título principal */}
      <Box className="about-title-container">
        <Typography variant="h4" className="about-title">
          Sobre nosotros
        </Typography>
      </Box>

      {/* Contenedor principal del contenido */}
      <Container maxWidth="xl" className="about-container">
        <Box className="about-content">
          <Typography variant="body1" paragraph className="about-section-paragraph">
            E-Shop es su tienda en línea ideal para obtener los mejores y más recientes productos. Ofrecemos una amplia variedad de productos electrónicos, ropa y más, todo a precios asequibles.
          </Typography>
          <Typography variant="h6" className="about-section-title">
            Nuestra Misión
          </Typography>
          <Typography variant="body1" paragraph className="about-section-paragraph">
            Nuestra misión es proporcionar a los clientes productos de alta calidad a precios competitivos y al mismo tiempo garantizar una experiencia de compra perfecta.
          </Typography>
          <Typography variant="h6" className="about-section-title">
            ¿Por qué elegirnos?
          </Typography>
          <Typography variant="body1" paragraph className="about-section-paragraph">
            Priorizamos la satisfacción del cliente y nos esforzamos por ofrecer el mejor servicio posible. Nuestro equipo está dedicado a ayudarle a encontrar exactamente lo que necesita.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default About;
