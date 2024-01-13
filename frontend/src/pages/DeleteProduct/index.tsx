import { api } from "../../api";

import { Modal } from "../../components";

import "./style.css";

interface Props {
  visible: boolean,
  id: string,
  name: string
}

export function DeleteProduct({ visible, id, name }: Props) {
  const submit = async () => {
    try {
      await api.delete(`product/${id}`);
    } catch(err) {
      console.log(err)
    }
  }

  return (
    <Modal visible={visible}>
      <form onSubmit={submit}>
        <h2>Deletar Produto</h2>
        <p>Tem certeza que quer deletar o produto {name}?</p>

        <button>Deletar</button>
      </form>
    </Modal>
  )
}
