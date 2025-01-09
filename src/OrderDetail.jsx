import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './OrderDetail.css';
import amarilloIcon from './assets/amarillo.png';
import grisIcon from './assets/gris.png';
import seguimientoIcon from './assets/seguimiento.png';
import asistenteIcon from './assets/asistente.png'; 
import amarillofIcon from './assets/amarillof.png'; 
function OrderDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const orderDetail = location.state?.order;
  const [isPickupDetailsVisible, setPickupDetailsVisible] = useState(false); 
  const [estimatedTime, setEstimatedTime] = useState('');

  // Generar una hora estimada aleatoria
  useEffect(() => {
    const generateRandomTime = () => {
      const hours = Math.floor(Math.random() * 12) + 1; 
      const minutes = Math.floor(Math.random() * 60); 
      const period = Math.random() > 0.5 ? 'AM' : 'PM'; 
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${period}`;
    };
    setEstimatedTime(generateRandomTime());
  }, []);

  if (!orderDetail) {
    return (
      <div className="order-detail-page">
        <p>No se encontraron detalles para este pedido.</p>
        <button onClick={() => navigate(-1)} className="back-button">Volver</button>
      </div>
    );
  }

  return (
    <div className="order-detail-page">
      {/* Primer recuadro */}
      <div className="order-card">
        <h3 className="reference-section">
          <span className="order-number">Order #{orderDetail.order_number}</span>
        </h3>
        <div className="pickup-block">
          <p className="block-label">Pickup</p>
          <div className="block-with-icon">
            <img src={amarilloIcon} alt="Icono amarillo" className="icon-image amarillo" />
            <p className="block-location">{orderDetail.destinations[0]?.city || 'Ciudad no disponible'}</p>
          </div>
          <p className="block-address">
            {orderDetail.destinations[0]?.address.slice(0, 30) || 'Dirección no disponible'}...
          </p>
        </div>
        <div className="vertical-separator"></div>
        <div className="dropoff-block">
          <p className="block-label">Dropoff</p>
          <div className="block-with-icon">
            <img src={grisIcon} alt="Icono gris" className="icon-image" />
            <p className="block-location">{orderDetail.destinations[1]?.city || 'Ciudad no disponible'}</p>
          </div>
          <p className="block-address">
            {orderDetail.destinations[1]?.address.slice(0, 30) || 'Dirección no disponible'}...
          </p>
        </div>
      </div>

      {/* Segundo recuadro: Seguimiento del pedido */}
      <div className="order-card tracking-card">
        {/* Imagen circular arriba de la hora */}
        <div className="assistant-image-wrapper">
          <img src={asistenteIcon} alt="Asistente" className="assistant-image" />
        </div>
        {/* Hora estimada centrada */}
        <div className="estimated-time">{estimatedTime}</div>
        <div className="tracking-container">
          <img src={seguimientoIcon} alt="Seguimiento" className="tracking-image" />
          <div className="tracking-steps">
            <div className="tracking-step">
              <p>Pedido Recibido</p>
            </div>
            <div className="tracking-step">
              <p>En Camino</p>
            </div>
            <div className="tracking-step">
              <p>Entregado</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tercer recuadro */}
      <div className="order-card">
        <div
          className="pickup-toggle"
          onClick={() => setPickupDetailsVisible(!isPickupDetailsVisible)}
        >
          <p className="pickup-data-label">Pickup Data</p>
          <img
            src={amarillofIcon}
            alt="Flecha"
            className={`toggle-icon ${isPickupDetailsVisible ? 'rotated-down' : ''}`}
          />
        </div>
        {isPickupDetailsVisible && (
          <div className="pickup-details">
            <p><strong>Dirección:</strong> {orderDetail.destinations[0]?.address || 'No disponible'}</p>
            <p><strong>Fecha:</strong> {orderDetail.destinations[0]?.date || 'No disponible'}</p>
            <p><strong>Hora:</strong> {orderDetail.destinations[0]?.time || 'No disponible'}</p>
            <p><strong>Teléfono:</strong> +525567890346</p>
            <p><strong>Email:</strong> johndoe@gmail.com</p>
          </div>
        )}
      </div>

      {/* Botón de volver */}
      <button onClick={() => navigate(-1)} className="back-button">Volver</button>
    </div>
  );
}

export default OrderDetail;
