// src/contexts/CarrinhoContext.jsx
import React, { createContext, useState, useMemo } from 'react';

export const CarrinhoContext = createContext();

export const CarrinhoProvider = ({ children }) => {
  const [carrinho, setCarrinho] = useState([]);
  //adicionar produto no carrinho
  const adicionarAoCarrinho = (produto) => {
    setCarrinho((prevCarrinho) => {
      const produtoExistente = prevCarrinho.find(item => item.id === produto.id);
      if (produtoExistente) {
        return prevCarrinho.map(item =>
          item.id === produto.id ? { ...item, quantidade: item.quantidade + 1 } : item
        );
      }
      return [...prevCarrinho, { ...produto, quantidade: 1 }];
    });
  };
  //Função para aumentar a quantidade de um produto específico no carrinho.
  const aumentarQuantidade = (produtoId) => {
    setCarrinho((prevCarrinho) =>
      prevCarrinho.map(item =>
        item.id === produtoId ? { ...item, quantidade: item.quantidade + 1 } : item
      )
    );
  };
  //Função para diminuir a quantidade de um produto específico no carrinho, sem permitir que a quantidade caia abaixo de 1
  const diminuirQuantidade = (produtoId) => {
    setCarrinho((prevCarrinho) =>
      prevCarrinho.map(item =>
        item.id === produtoId && item.quantidade > 1
          ? { ...item, quantidade: item.quantidade - 1 }
          : item
      )
    );
  };
  //Função para remover um produto do carrinho pelo seu ID.
  const removerDoCarrinho = (produtoId) => {
    setCarrinho((prevCarrinho) => prevCarrinho.filter(item => item.id !== produtoId));
  };
  //Memoiza o valor total do carrinho, que é recalculado sempre que o estado carrinho muda.
  const totalCarrinho = useMemo(() => {
    return carrinho.reduce((total, produto) => total + produto.price * produto.quantidade, 0);
  }, [carrinho]);
  //funções para manipulação do carrinho e para todos os componentes filhosque estiverem dentro do CarrinhoProvider
  return (
    <CarrinhoContext.Provider value={{ carrinho, adicionarAoCarrinho, aumentarQuantidade, diminuirQuantidade, removerDoCarrinho, totalCarrinho }}>
      {children}
    </CarrinhoContext.Provider>
  );
};



/*import React, { createContext, useState } from 'react';

export const CarrinhoContext = createContext();

export const CarrinhoProvider = ({ children }) => {
  const [carrinho, setCarrinho] = useState([]);
  const [total, setTotal] = useState(0);

  const adicionarAoCarrinho = (produto) => {
    setCarrinho([...carrinho, produto]);
    setTotal(total + produto.price);
  };

  const removerDoCarrinho = (id) => {
    const novoCarrinho = carrinho.filter(item => item.id !== id);
    const produtoRemovido = carrinho.find(item => item.id === id);
    setCarrinho(novoCarrinho);
    setTotal(total - produtoRemovido.price);
  };

  return (
    <CarrinhoContext.Provider value={{ carrinho, total, adicionarAoCarrinho, removerDoCarrinho }}>
      {children}
    </CarrinhoContext.Provider>
  );
};*/
