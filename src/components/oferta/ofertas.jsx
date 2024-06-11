import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import './style/Ofertas.css';
import { CarrinhoContext } from '../../contexts/CarrinhoContext';

const Ofertas = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const itemsPerPage = 5;
  const { adicionarAoCarrinho } = useContext(CarrinhoContext); // Use o contexto do carrinho

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://api.mercadolibre.com/sites/MLB/search?q=random&offset=${page * itemsPerPage}&limit=${itemsPerPage}`);
        setProducts(response.data.results);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page]);

  const handlePreviousPage = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    setPage(page + 1);
  };

  const handleAdicionarAoCarrinho = (product) => {
    adicionarAoCarrinho(product);
    //alert('Produto adicionado ao carrinho!');
  };

  return (
    <div className="ofertas-container">
      <h3>Minhas Ofertas</h3>
      {loading && <p>Carregando...</p>}
      {error && <p>Ocorreu um erro: {error.message}</p>}
      
      <div className="ofertas-grid">
        {products.map((product, index) => (
          <div key={product.id} className="card">
            <img src={product.thumbnail} alt={product.title} />
            <h4>{product.title}</h4>
            <p>Preço: R$ {product.price}</p>
            <a className='btnLink' href={product.permalink} target="_blank" rel="noopener noreferrer">Ver Produto</a>
            <button className='btnAddCarrinho' onClick={() => handleAdicionarAoCarrinho(product)}>Adicionar no 🛒</button>
            {index === 0 && ( // Mostra botão apenas no primeiro card
              <button className="nav-button left" onClick={handlePreviousPage}>&lt;</button>
            )}
            {index === 4 && ( // Mostra botão apenas no quinto card
              <button className="nav-button right" onClick={handleNextPage}>&gt;</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Ofertas;

