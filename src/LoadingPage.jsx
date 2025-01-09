
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoadingPage.css';

function LoadingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirige a la página principal después de 4 segundos
    const timer = setTimeout(() => {
      navigate('/black-page');
    }, 4000);

    return () => clearTimeout(timer); 
  }, [navigate]);

  return (
    <div className="loading-page">
      <div className="loader"></div>
    </div>
  );
}

export default LoadingPage;
