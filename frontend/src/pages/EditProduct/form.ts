import { ZodType, z } from "zod";

export interface FormData {
  code: string,
  name: string,
  description: string,
  price: number
}

export const schema: ZodType<FormData> = z.object({
  code: z
    .string()
    .min(1, "O código do produto é obrigatório"),
  name: z
    .string()
    .min(1, "O nome do produto é obrigatório"),
  description: z
    .string()
    .min(1, "A descrição do produto é obrigatória"),
  price: z
    .coerce
    .number()
    .gt(0, "O preço do produto não pode ser menor ou igual a zero")
});
