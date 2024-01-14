import { FormEventHandler } from "react";
import { api } from "../../api";

import { Modal } from "../../components";

import "./style.css";

interface Product {
  id: string,
  code: string,
  name: string,
  description: string,
  price: number
}

interface Props {
  product: Product,
  cancel: () => void
}

export function DeleteProduct({ product, cancel }: Props) {
  const submit: FormEventHandler<HTMLFormElement> = async e  => {
    e.preventDefault();

    try {
      await api.delete(`product/${product.id}`);

      window.location.reload();
    } catch(err) {
      console.log(err)
    }
  }

  return (
    <Modal
      title="Deletar Produto"
      cancel={cancel}
      confirmButton={
        <button
          className="btn confirm"
          form="delete-product-form"
          type="submit"
        >
          Deletar Produto
        </button>
      }
    >
      <form id="delete-product-form" onSubmit={submit}>
        <p>Tem certeza que quer deletar o produto {product.name}?</p>
      </form>
    </Modal>
  )
}
