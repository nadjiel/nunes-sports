import { useState, useEffect } from "react";

import { api } from "./api";

import './App.css';

function App() {
  const [products, setProducts] = useState([]);

  async function fetchProducts() {
    setProducts(await api.get("product"));
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <main className="App">
      <button>Adicionar Produto</button>
    </main>
  );
}

export default App;
