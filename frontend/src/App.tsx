import { useState, useEffect } from "react";

import { api } from "./api";

import './App.css';
import { CreateProduct } from "./pages/CreateProduct";

interface Product {
  id: string,
  code: string,
  name: string,
  description: string,
  price: number
}

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [createProductModalVisible, setCreateProductModalVisible] = useState(false);

  async function fetchProducts() {
    const res = await api.get("product");

    setProducts(res.data);
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  function toggleCreateProductModal() {
    createProductModalVisible ? setCreateProductModalVisible(false) : setCreateProductModalVisible(true);
  }

  return (
    <main className="App">
      <button onClick={toggleCreateProductModal}>Adicionar Produto</button>
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
      <CreateProduct visible={createProductModalVisible}/>
    </main>
  );
}

export default App;
