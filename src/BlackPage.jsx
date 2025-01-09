import React, { useState, useEffect } from 'react';
import './BlackPage.css'; 
import lupaIcon from './assets/lupa.png'; 
import avatarDefault from './assets/asistente.jpg'; 
import eyeIcon from './assets/ojo.png';
import maletaIcon from './assets/maleta.png'; 
import camionIcon from './assets/camion.png';
import puntoIcon from './assets/punto.png';
import { useNavigate } from 'react-router-dom'; 

function BlackPage() {
  const [orders, setOrders] = useState([]);
  const [upcomingOrders, setUpcomingOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOption, setSelectedOption] = useState('Upcoming'); // Selecciona "Upcoming" por defecto

  const navigate = useNavigate();

  function truncateText(text = '', maxLength = 30) {
    if (text.length <= maxLength) {
      return text;
    }
    return text.slice(0, maxLength) + '...';
  }

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const upcomingResponse = await fetch(
          'https://129bc152-6319-4e38-b755-534a4ee46195.mock.pstmn.io/orders/upcoming'
        );
        const upcomingData = await upcomingResponse.json();
        setUpcomingOrders(upcomingData.result);

        const allResponse = await fetch(
          'https://129bc152-6319-4e38-b755-534a4ee46195.mock.pstmn.io/orders'
        );
        const allData = await allResponse.json();
        setOrders(allData.result);

        setLoading(false);
      } catch (err) {
        console.error('Error al cargar los pedidos:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredUpcoming = upcomingOrders.filter((order) =>
    order.order_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.status_string.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectOption = (option) => {
    setSelectedOption(option);
  };

  const handleResumeClick = (order) => {
    navigate(`/order/${order._id}`, { state: { order } });
  };

  return (
    <div className="black-page">
      {loading ? (
        <p>Cargando...</p>
      ) : error ? (
        <p>Error al cargar los pedidos: {error}</p>
      ) : (
        <>
          <div className="navbar-options">
            <span
              className={`navbar-option ${selectedOption === 'Upcoming' ? 'selected' : ''}`}
              onClick={() => handleSelectOption('Upcoming')}
            >
              Upcoming
            </span>
            <span
              className={`navbar-option ${selectedOption === 'Completed' ? 'selected' : ''}`}
              onClick={() => handleSelectOption('Completed')}
            >
              Completed
            </span>
            <span
              className={`navbar-option ${selectedOption === 'Past' ? 'selected' : ''}`}
              onClick={() => handleSelectOption('Past')}
            >
              Past
            </span>
          </div>

          <div className="search-container">
            <div className="search-box">
              <img src={lupaIcon} alt="Lupa" className="search-icon" />
              <input
                type="text"
                placeholder="Busca tu paquete"
                className="search-input"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
          </div>

          {filteredUpcoming.map((order) => (
            <div key={order._id} className="order-card">
              <h3 className="order-card-title">
                Order <span className="order-id">#{order.order_number}</span>
              </h3>

              <div className="order-card-header">
                <span className="order-type">
                  <img src={maletaIcon} alt="Maleta" className="maleta-icon" />
                  {order.type || 'FTL'}
                </span>
                <span className="order-status">
                  {order.status_string || 'Orden Asignada'}
                </span>
              </div>

              <div className="order-card-body">
                <div className="block-container">
                  {/* Bloque PICKUP */}
                  <div className="pickup-block">
                    <span className="block-label">PICKUP</span>
                    <div className="block-location">
                      <img 
                        src={camionIcon} 
                        alt="Camion" 
                        className="camion-icon" 
                      />
                      {order.destinations?.[0]?.nickname || 'México'}
                    </div>
                    <div className="block-address">
                      {truncateText(order.destinations?.[0]?.address || 'Dirección de Pickup', 40)}
                    </div>
                    <div className="block-datetime">
                      <div className="block-date">
                        {order.destinations?.[0]?.date || '01/04/23'}
                      </div>
                      <div className="block-time">
                        {order.destinations?.[0]?.time || '10:45'}
                      </div>
                    </div>
                  </div>

                  {/* Línea separadora */}
                  <div className="vertical-separator"></div>

                  {/* Bloque DROPOFF */}
                  <div className="dropoff-block">
                    <span className="block-label">DROPOFF</span>
                    <div className="block-location">
                      <img 
                        src={puntoIcon} 
                        alt="Punto" 
                        className="punto-icon" 
                      />
                      {order.destinations?.[1]?.nickname || 'Entrega'}
                    </div>
                    <div className="block-address">
                      {truncateText(order.destinations?.[1]?.address || 'Dirección de Dropoff', 40)}
                    </div>
                    <div className="block-datetime">
                      <div className="block-date">
                        {order.destinations?.[1]?.date || '01/04/23'}
                      </div>
                      <div className="block-time">
                        {order.destinations?.[1]?.time || '17:30'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="order-card-footer">
                {order.status_string === 'Orden Asignada' ? (
                  <button className="btn-yellow btn-right active" onClick={() => handleResumeClick(order)}>
                    Resume
                    <img src={eyeIcon} alt="Ojo" className="eye-icon" />
                  </button>
                ) : (
                  <>
                    <button className="btn-yellow btn-left">
                      It's time for pickup
                    </button>
                    <button className="btn-yellow btn-right" onClick={() => handleResumeClick(order)}>
                      Resume
                      <img src={eyeIcon} alt="Ojo" className="eye-icon" />
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}

          {filteredUpcoming.length === 0 && (
            <p>No se encontraron pedidos que coincidan con la búsqueda.</p>
          )}
        </>
      )}
    </div>
  );
}

export default BlackPage;
