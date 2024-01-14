import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";

import { api } from "../../api";
import { schema, FormData } from "./form";

import { Modal, Input } from "../../components";

import "./style.css";

interface Props {
  cancel: () => void
}

export function CreateProduct({ cancel }: Props) {
  const {register, handleSubmit, formState: {errors}} = useForm<FormData>({
    resolver: zodResolver(schema)
  });

  const [warning, setWarning] = useState("");

  const submit = async ({
    code,
    name,
    description,
    price
  }: FormData) => {
    try {
      await api.post("product", {
        code,
        name,
        description,
        price
      });
    } catch(err) {
      console.log(err)
      if(!(err instanceof AxiosError)) return;

      setWarning(err.response?.data.message);
    }
  }

  return (
    <Modal title="Criar Produto" cancel={cancel}>
      <form onSubmit={handleSubmit(submit)}>
        <Input<FormData>
          label="Código do produto:"
          name="code"
          type="text"
          placeholder="Código do produto"
          register={register}
          error={errors.code}
        />
        <Input<FormData>
          label="Nome do produto:"
          name="name"
          type="text"
          placeholder="Nome do produto"
          register={register}
          error={errors.name}
        />
        <Input<FormData>
          label="Descrição do produto:"
          name="description"
          type="text"
          placeholder="Descrição do produto"
          register={register}
          error={errors.description}
        />
        <Input<FormData>
          label="Preço do produto:"
          name="price"
          type="number"
          step={0.01}
          placeholder="Preço do produto"
          register={register}
          error={errors.price}
        />

        <span>{warning}</span>
      </form>
    </Modal>
  )
}