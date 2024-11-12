import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function ItemDetailContainer() {
  const { id } = useParams(); // Obtener el id del producto desde la URL
  const [product, setProduct] = useState(null); // Estado para almacenar los detalles del producto
  const [loading, setLoading] = useState(true); // Estado para controlar la carga

  useEffect(() => {
    // Función para obtener los detalles del producto desde la API
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`https://api.mercadolibre.com/items/${id}`); // Suponiendo que usas la API de MercadoLibre
        const data = await response.json();
        setProduct(data); // Establecer los detalles del producto en el estado
        setLoading(false); // Finalizar carga
      } catch (error) {
        console.error('Error al obtener los detalles del producto:', error);
        setLoading(false); // Finalizar carga aunque haya error
      }
    };

    fetchProductDetails(); // Llamar a la función para obtener los detalles
  }, [id]); // Volver a ejecutar si el id cambia

  // Si está cargando, muestra un mensaje de "Cargando..."
  if (loading) {
    return <p>Cargando...</p>;
  }

  // Si no hay producto, muestra un mensaje de error
  if (!product) {
    return <p>No se encontró el producto.</p>;
  }

  return (
    <div>
      <h2>{product.title}</h2> {/* Título del producto */}
      <img src={product.thumbnail} alt={product.title} /> {/* Imagen del producto */}
      <p>{product.description}</p> {/* Descripción del producto */}
      <p>Precio: ${product.price}</p> {/* Precio del producto */}
      {/* Puedes mostrar más detalles dependiendo de lo que devuelva la API */}
    </div>
  );
}

export default ItemDetailContainer;
