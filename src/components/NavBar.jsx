import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

function NavBar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [categorias, setCategorias] = useState([]);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  // Función para obtener las categorías desde la API de MercadoLibre
  const obtenerCategorias = async () => {
    try {
      const response = await fetch('https://api.mercadolibre.com/sites/MLU/categories');
      const data = await response.json();
      setCategorias(data);
    } catch (error) {
      console.error("Error al obtener las categorías:", error);
    }
  };

  // Llamada a la API cuando el componente se monta
  useEffect(() => {
    obtenerCategorias();
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-logo">
          MiPrecios
        </Link>
        <Link to="/cart" className="navbar-item">
          Carrito 
        </Link>
      </div>

      <div className="navbar-right">
        <div className="categorias-container">
          <button onClick={toggleDropdown} className="navbar-item categoria-boton">
            Categorías
            <span className={`categoria-icono ${dropdownOpen ? 'abierto' : ''}`}>
              ▼
            </span>
          </button>
          {dropdownOpen && (
            <div className="categorias-dropdown">
              {categorias.map((categoria) => (
                <Link
                  key={categoria.id}
                  to={`/category/${categoria.id}`}
                  className="navbar-item categoria-enlace"
                >
                  {categoria.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;

