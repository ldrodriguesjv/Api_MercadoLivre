// src/components/homepage/Homepage.jsx
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import './style/Homepage.css';
import Oferta from '../oferta/ofertas';
import { CarrinhoContext } from '../../contexts/CarrinhoContext';
import { Link } from 'react-router-dom';
import WhatsAppLink from './WhatAppLink';

const Homepage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [visibleProducts, setVisibleProducts] = useState(9);
  const [sortOrder, setSortOrder] = useState('asc'); // Estado para o critério de classificação
  const { carrinho, adicionarAoCarrinho } = useContext(CarrinhoContext);

  useEffect(() => {
    const fetchProducts = async (retryCount = 3) => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`https://api.mercadolibre.com/sites/MLB/search?q=${searchTerm}`);
        setProducts(response.data.results);
        setLoading(false);
      } catch (error) {
        if (retryCount > 0) {
          console.warn(`Retrying... attempts left: ${retryCount}`);
          fetchProducts(retryCount - 1);
        } else {
          if (error.response) {
            setError(`Error: ${error.response.status} - ${error.response.data.message}`);// Erro de resposta (status fora do intervalo 2xx)
          } else if (error.request) {
            setError('Network error: sem resposta do servidor');// Erro de requisição  do servidor
          } else {
            setError(`Error: ${error.message}`);// Erro na configuração da requisição
          }
        }
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [searchTerm]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  const loadMoreProducts = () => {
    setVisibleProducts(prevVisibleProducts => prevVisibleProducts + 9);
  };

  const formatPrice = (price) => {
    return price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };
  
  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.slice(0, maxLength) + '...';
  };

  const sortedProducts = [...products].sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.price - b.price;
    } else {
      return b.price - a.price;
    }
  });

  return (
    <div className='container'>
      <header>
        <div className='divHeader'>
          <div className='divLogo'>
            <img src='https://img.freepik.com/vetores-premium/dois-punhos-batendo-juntos-punhos-colidindo-ilustracao-vetorial_680692-496.jpg' alt='Logo' className='logoMarca' />
            <h1 className='nomeSite'>Mercado do Leo</h1>
          </div>
          <div className='divPesquisa'>
            <label htmlFor=''>Buscar produtos</label>
            <input className='inputPesquisa' type='text' value={searchTerm} onChange={handleSearchChange} placeholder='Buscar produtos...' />
          </div>
          <Link to="/carrinho" className="carrinho-link">
            <span className="carrinho-icone">🛒</span>
            <span className="carrinho-contagem">{carrinho.length}</span>
          </Link>
        </div>
      </header>
      {loading && <p>Carregando...</p>}
      {error && <p>Ocorreu um erro: {error.message}</p>}
      <Oferta />
      <div className='divPesquisa1'>
        <div className='divOrdenacao'>
          <h1>Resultado da pesquisa</h1>
            <label htmlFor="sortOrder">Ordenar por preço:</label>
            <select id="sortOrder" value={sortOrder} onChange={handleSortChange}>
              <option value="asc">Menor para maior</option>
              <option value="desc">Maior para menor</option>
            </select>
        </div>
        <ul className="cardsContainer">
          {sortedProducts.slice(0, visibleProducts).map(product => (
            <li key={product.id} className="cardItem">
              <div className='cardProduto'>
                <p className='tituloProduto'>{truncateText(product.title, 50)}</p>
                <img src={product.thumbnail} alt={product.title} />
                <p className='vlrProduto'>Preço: {formatPrice(product.price)}</p>
                {product.installments && (
                  <p>
                    Financiamento: {product.installments.quantity}x de {formatPrice(product.installments.amount)}
                    {product.installments.rate === 0 ? ' sem juros' : ` com juros `}
                  </p>
                )}
                <p>Link: <a href={product.permalink} target="_blank" rel="noopener noreferrer">Ver Produto</a></p>
                <button className='btn btn-success botaoAjuste' onClick={() => adicionarAoCarrinho(product)}>Adicionar ao Carrinho</button>
              </div>
            </li>
          ))}
        </ul>
        {products.length > visibleProducts && (
          <button className='btn btn-primary' onClick={loadMoreProducts}>Carregar mais produtos</button>
        )}
      </div>
      <footer>
        <p>Criado por: Leonardo Delgado Rodrigues</p>
        <div className='linkSocial'>
          <p className='git'><a href="https://github.com/ldrodriguesjv" target='_blank'><img src="https://img.shields.io/badge/GitHub-000?style=for-the-badge&logo=github&logoColor=30A3DC" alt=""/></a></p>
          <p className='linkdin'><a href="https://www.linkedin.com/in/leonardo-delgado-rodrigues-3a227bb1/" target='_blank'>
          <img src="https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white" alt="" /></a></p>
          <p className='email'><a href="mailto:ldrodrigues.jv@gmail.com" class="email-link" target="_blank">
            <img src="https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white" alt="" />
          </a></p>
          <WhatsAppLink />
        </div>
      </footer>
    </div>
  );
};

export default Homepage;

/*import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import './style/Homepage.css';
import Oferta from '../oferta/ofertas';
import { CarrinhoContext } from '../../contexts/CarrinhoContext';
import { Link } from 'react-router-dom';
import WhatsAppLink from './WhatAppLink';



const Homepage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [visibleProducts, setVisibleProducts] = useState(9); // Define o número inicial de produtos visíveis
  const { carrinho, adicionarAoCarrinho } = useContext(CarrinhoContext);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://api.mercadolibre.com/sites/MLB/search?q=${searchTerm}`);
        setProducts(response.data.results);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchTerm]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const loadMoreProducts = () => {
    setVisibleProducts(prevVisibleProducts => prevVisibleProducts + 9); // Adiciona mais 9 produtos
  };

  const formatPrice = (price) => {
    return price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };
  
  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.slice(0, maxLength) + '...';
  };

  return (
    <div className='container'>
    <header>
      <div className='divHeader'>
        <div className='divLogo'>
          <img src='https://img.freepik.com/vetores-premium/dois-punhos-batendo-juntos-punhos-colidindo-ilustracao-vetorial_680692-496.jpg' alt='Logo' className='logoMarca' />
          <h1 className='nomeSite'>Mercado do Leo</h1>
        </div>
        <div className='divPesquisa'>
          <label htmlFor=''>Buscar produtos</label>
          <input className='inputPesquisa' type='text' value={searchTerm} onChange={handleSearchChange} placeholder='Buscar produtos...' />
        </div>
        <Link to="/carrinho" className="carrinho-link">
          <span className="carrinho-icone">🛒</span>
          <span className="carrinho-contagem">{carrinho.length}</span>
        </Link>
      </div>
    </header>
    {loading && <p>Carregando...</p>}
    {error && <p>Ocorreu um erro: {error.message}</p>}
    <Oferta />
    <div className='divPesquisa'>
      <h1>Resultado da pesquisa</h1>
      <ul className="cardsContainer">
        {products.slice(0, visibleProducts).map(product => (
          <li key={product.id} className="cardItem">
            <div className='cardProduto'>
              <p className='tituloProduto'>{truncateText(product.title, 50)}</p>
              <img src={product.thumbnail} alt={product.title} />
              <p className='vlrProduto'>Preço: {formatPrice(product.price)}</p>
              {product.installments && (
                <p>
                  Financiamento: {product.installments.quantity}x de {formatPrice(product.installments.amount)}
                  {product.installments.rate === 0 ? ' sem juros' : ` com juros `}
                </p>
              )}
              <p>Link: <a href={product.permalink} target="_blank" rel="noopener noreferrer">Ver Produto</a></p>
              <button className='btn btn-success botaoAjuste' onClick={() => adicionarAoCarrinho(product)}>Adicionar ao Carrinho</button>
            </div>
          </li>
        ))}
      </ul>
      {products.length > visibleProducts && (
        <button className='btn btn-primary' onClick={loadMoreProducts}>Carregar mais produtos</button>
      )}
    </div>
    <footer>
     <p>Criado por: Leonardo Delgado Rodrigues</p> 
      <div className='linkSocial'>
        <p className='git'><a href="https://github.com/ldrodriguesjv" target='_blank'><img src="https://img.shields.io/badge/GitHub-000?style=for-the-badge&logo=github&logoColor=30A3DC" alt=""/></a> </p>
        
        <p className='linkdin'><a href="https://www.linkedin.com/in/leonardo-delgado-rodrigues-3a227bb1/" target='_blank'>
        <img src="https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white" alt="" /></a> </p>
        
        <p className='email'><a href="mailto:ldrodrigues.jv@gmail.com" class="email-link" target="_blank">
          <img src="https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white" alt="" />
        </a></p>
        <WhatsAppLink />
      </div>
    </footer>
  </div>
  );
};

export default Homepage;*/
