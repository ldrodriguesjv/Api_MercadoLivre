// src/App.jsx
import React from 'react';
import { CarrinhoProvider } from './contexts/CarrinhoContext';
import Homepage from './components/homepage/Homepage';
import Carrinho from './components/carrinho/Carrinho';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <CarrinhoProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/carrinho" element={<Carrinho />} />
        </Routes>
      </Router>
    </CarrinhoProvider>
  );
}

export default App;


/*import React from 'react';
import { CarrinhoProvider } from './contexts/CarrinhoContext';
import Homepage from './components/homepage/Homepage';
import Carrinho from './components/carrinho/Carrinho';


const App = () => {
  return (
    <CarrinhoProvider>
      <Homepage />
      <Carrinho />
    </CarrinhoProvider>
  );
};

export default App;*/
