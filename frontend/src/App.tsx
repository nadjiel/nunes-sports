import { useState, useEffect } from "react";

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

  function openEditionModal(id: string) {
    setModal(<EditProduct id={id} cancel={closeModal} />);
  }

  function openDeletionModal(id: string, name: string) {
    setModal(<DeleteProduct id={id} name={name} cancel={closeModal} />);
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <main className="App">
      <button onClick={openCreationModal}>Adicionar Produto</button>
      {
        products.length ?
        <ul>
          {
            products.map(product => (
              <li key={product.id}>
                <div>
                  <span>{product.code}</span>
                  <h3>{product.name}</h3>
                  <span>{product.price}</span>
                  <p>{product.description}</p>
                </div>
                <div>
                  <button onClick={() => openEditionModal(product.id)}>Editar</button>
                  <button onClick={() => openDeletionModal(product.id, product.name)}>Deletar</button>
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
