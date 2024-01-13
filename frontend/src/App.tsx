import { useState, useEffect } from "react";

import { api } from "./api";

import './App.css';

interface Product {
  id: string,
  code: string,
  name: string,
  description: string,
  price: number
}

function App() {
  const [products, setProducts] = useState<Product[]>([]);

  async function fetchProducts() {
    const res = await api.get("product");

    setProducts(res.data);
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <main className="App">
      <button>Adicionar Produto</button>
      {
        products.length ?
        products.map(product => (
          <li key={product.id}>
            <span>{product.code}</span>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <span>{product.price}</span>
          </li>
        )) :
        <p>Nenhum produto registrado</p>
      }
    </main>
  );
}

export default App;
