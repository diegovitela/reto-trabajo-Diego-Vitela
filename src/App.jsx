import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import './App.css';
import LoadingPage from './LoadingPage';
import BlackPage from './BlackPage';
import Navbar from './Navbar';  
import OrderDetail from './OrderDetail'; // Importa el componente de detalle

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true); // Estado para controlar si está en la página de carga

  useEffect(() => {
    // Siempre muestra la animación de carga al entrar a la aplicación
    const timer = setTimeout(() => {
      setIsLoading(false); // Finaliza el estado de carga
    }, 3000); // Tiempo de espera (3 segundos aquí)

    return () => clearTimeout(timer); // Limpia el temporizador si el componente se desmonta
  }, []);

  // Mientras está cargando, renderiza la página de carga
  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <div>
      {/* Muestra el Navbar solo en la ruta /black-page */}
      {location.pathname === '/black-page' && <Navbar />}
      
      <Routes>
        <Route path="/black-page" element={<BlackPage />} />
        <Route path="/order/:orderId" element={<OrderDetail />} />
        <Route path="/about" element={<div>About Page</div>} />
        <Route path="/services" element={<div>Services Page</div>} />
        <Route path="/contact" element={<div>Contact Page</div>} />
      </Routes>
    </div>
  );
}

// Necesitamos envolver App con Router en el nivel superior
export default function Root() {
  return (
    <Router>
      <App />
    </Router>
  );
}




