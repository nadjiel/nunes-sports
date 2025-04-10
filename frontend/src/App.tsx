import { useState, useEffect } from "react";
import dotenv from "dotenv";
dotenv.config()

import { api } from "./api";

import './App.css';
import { CreateProduct, EditProduct, DeleteProduct } from "./pages";

interface Product {
  id: string,
  code: string,
  name: string,
  description: string,
  price: number
}

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [modal, setModal] = useState<JSX.Element | null>(null);

  async function fetchProducts() {
    const res = await api.get("product");

    setProducts(res.data);
  }

  function closeModal() {
    setModal(null);
  }

  function openCreationModal() {
    setModal(<CreateProduct cancel={closeModal} />);
  }

  function openEditionModal(product: Product) {
    setModal(<EditProduct product={product} cancel={closeModal} />);
  }

  function openDeletionModal(product: Product) {
    setModal(<DeleteProduct product={product} cancel={closeModal} />);
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <main className="App">
      <div className="header">
        <h1 className="main-title">Nunes Sports</h1>
        <button className="btn" onClick={openCreationModal}>Adicionar Produto</button>
      </div>
      {
        products.length ?
        <ul className="list">
          {
            products.map(product => (
              <li className="list-item" key={product.id}>
                <div>
                  <span>{product.code}</span>
                  <h3>{product.name}</h3>
                  <span>{product.price}</span>
                  <p>{product.description}</p>
                </div>
                <div className="btn-col">
                  <button className="btn" onClick={() => openEditionModal(product)}>Editar</button>
                  <button className="btn danger" onClick={() => openDeletionModal(product)}>Deletar</button>
                </div>
              </li>
            ))
          }
        </ul> :
        <p>Nenhum produto registrado</p>
      }
      { modal }
    </main>
  );
}

export default App;
