import { api } from "../../api";

import { Modal } from "../../components";

import "./style.css";

interface Props {
  id: string,
  name: string,
  cancel: () => void
}

export function DeleteProduct({ id, name, cancel }: Props) {
  const submit = async () => {
    try {
      await api.delete(`product/${id}`);
    } catch(err) {
      console.log(err)
    }
  }

  return (
    <Modal title="Deletar Produto" cancel={cancel}>
      <form onSubmit={submit}>
        <p>Tem certeza que quer deletar o produto {name}?</p>
      </form>
    </Modal>
  )
}
