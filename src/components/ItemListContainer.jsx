import React, { useEffect, useState, useContext } from 'react';
import { CartContext } from '../context/CartContext';
import './ItemListContainer.css';
import { debounce } from 'lodash';
import { Link } from 'react-router-dom';

function ItemListContainer() {
  const { añadirAlCarrito } = useContext(CartContext);
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [busqueda, setBusqueda] = useState("laptop");

  const obtenerProductos = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://api.mercadolibre.com/sites/MLU/search?q=${busqueda}`);
      const data = await response.json();
      setProductos(data.results);
    } catch (error) {
      console.error("Error al obtener productos:", error);
    } finally {
      setLoading(false);
    }
  };

  const obtenerProductosDebounced = debounce(obtenerProductos, 500);

  useEffect(() => {
    obtenerProductosDebounced();
    return () => {
      obtenerProductosDebounced.cancel();
    };
  }, [busqueda]);

  const manejarCambio = (e) => setBusqueda(e.target.value);
  const manejarSubmit = (e) => {
    e.preventDefault();
    obtenerProductos();
  };

  if (loading) return <p>Cargando productos...</p>;

  return (
    <div>
      <h1>Bienvenido a Miprecios</h1>
      <form onSubmit={manejarSubmit}>
        <input type="text" value={busqueda} onChange={manejarCambio} placeholder="Buscar productos..." />
        <button type="submit">Buscar</button>
      </form>
      <div className="productos-grid">
        {productos.map((producto) => (
          <div key={producto.id} className="producto-card">
            <img src={producto.thumbnail} alt={producto.title} className="producto-imagen" />
            <div className="producto-detalle">
              <h2 className="producto-titulo">{producto.title}</h2>
              <p className="producto-precio">Precio: ${producto.price}</p>
              <a href={producto.permalink} target="_blank" rel="noopener noreferrer" className="producto-enlace">
                Ver en MercadoLibre
              </a>
              <button onClick={() => añadirAlCarrito(producto)} className="producto-boton">
                Añadir al Carrito
              </button>
              {/* Botón "Ver detalles" con Link */}
              <Link to={`/product/${producto.id}`} className="producto-boton">
                Ver detalles
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ItemListContainer;
