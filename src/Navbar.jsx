// Navbar.jsx
import { Link } from 'react-router-dom';
import './Navbar.css';
import flechaImg from './assets/flecha.png';  
import campanaImg from './assets/campana.png';  

function Navbar() {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        {/* Contenedor para las imágenes */}
        <li className="navbar-item-left">
          <img src={flechaImg} alt="Flecha" className="navbar-image" />
        </li>
        
        <li className="navbar-item-center">
          <span className="navbar-text">Cargo Orders</span>
        </li>
        
        <li className="navbar-item-right">
          <img src={campanaImg} alt="Campana" className="navbar-image" />
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;


