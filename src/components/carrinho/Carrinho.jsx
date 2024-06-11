// src/components/carrinho/Carrinho.jsx
import React, { useContext } from 'react';
import { CarrinhoContext } from '../../contexts/CarrinhoContext';
import { Link } from 'react-router-dom';
import './style/Carrinho.css';

const Carrinho = () => {
  const { carrinho, aumentarQuantidade, diminuirQuantidade, removerDoCarrinho, totalCarrinho } = useContext(CarrinhoContext);
  const formatPrice = (price) => {
    return price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };
  return (
    <div>
      <div className='headerCarrinho'>
        <div>
          <label className='tituloCarrinho'>Meu carrinho de compras</label>
        </div>
        <Link to="/" className="btn btn-primary">Voltar a comprar</Link>
      </div>
      <ul>
        {carrinho.map((produto, index) => (
          <li className='liCard' key={index}>
            <div className="produto-item">
              <div className="imagem-produto">
              <img src={produto.thumbnail} alt={produto.title} />  
              </div>  
              <div className="produto-info">   
                <label>{produto.title.length > 50 ? produto.title.slice(0, 50) + '...' : produto.title}</label>
                <p>Preço: {formatPrice(produto.price)}</p>
                <div className="quantidade">
                  <button onClick={() => diminuirQuantidade(produto.id)}>-</button>
                  <span>{produto.quantidade}</span>
                  <button onClick={() => aumentarQuantidade(produto.id)}>+</button>
                </div>
                <button onClick={() => removerDoCarrinho(produto.id)} className="btn btn-danger">Remover</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <h2>Total: {formatPrice(totalCarrinho)}</h2>
    </div>
  );
};

export default Carrinho;


