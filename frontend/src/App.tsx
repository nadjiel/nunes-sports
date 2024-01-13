import { useState, ReactNode, useEffect } from "react";

import { api } from "./api";

import './App.css';
import { CreateProduct } from "./pages/CreateProduct";
import { EditProduct } from "./pages/EditProduct";

interface Product {
  id: string,
  code: string,
  name: string,
  description: string,
  price: number
}

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [modal, setModal] = useState<ReactNode>();
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

  function editProduct(id: string) {
    setModal(<EditProduct id={id} visible={true} />);
  }

  function deleteProduct(id: string) {

  }

  return (
    <main className="App">
      <button onClick={toggleCreateProductModal}>Adicionar Produto</button>
      {
        products.length ?
        products.map(product => (
          <li key={product.id}>
            <div>
              <span>{product.code}</span>
              <h3>{product.name}</h3>
              <span>{product.price}</span>
              <p>{product.description}</p>
            </div>
            <div>
              <button onClick={() => editProduct(product.id)}>Editar</button>
              <button onClick={() => deleteProduct(product.id)}>Deletar</button>
            </div>
          </li>
        )) :
        <p>Nenhum produto registrado</p>
      }
      {modal}
    </main>
  );
}

export default App;
