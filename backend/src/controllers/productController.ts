import { Request, Response } from "express";
import httpStatus from "http-status-codes";
import * as uuid from "uuid";

import { productModel } from "../models";

interface ProductBody {
  code: string,
  name: string,
  description: string,
  price: number
};

async function getAll(req: Request, res: Response) {
  const products = await productModel.findAll();

  res.status(httpStatus.OK).json(products);
}

async function get(req: Request, res: Response) {
  const id = req.params.id;

  if(!uuid.validate(id)) {
    return res
      .status(httpStatus.BAD_REQUEST)
      .json({ error: `Id '${id}' is not a valid UUID` });
  }

  const product = await productModel.findByPk(id);

  if(!product) {
    return res
      .status(httpStatus.NOT_FOUND)
      .json({ error: `Couldn't find product with id ${id}` });
  }

  res.status(httpStatus.OK).json(product);
}

async function create(req: Request, res: Response) {
  const {
    code,
    name,
    description,
    price
  }: ProductBody = req.body;
  
  if(!code) {
    return res
      .status(httpStatus.BAD_REQUEST)
      .json({ error: "Code has to be provided" });
  }
  if(await productModel.findOne({ where: { code } })) {
    return res
      .status(httpStatus.BAD_REQUEST)
      .json({ error: "Code is already registered" });
  }

  if(!name) {
    return res
      .status(httpStatus.BAD_REQUEST)
      .json({ error: "Name has to be provided" });
  }

  if(!description) {
    return res
      .status(httpStatus.BAD_REQUEST)
      .json({ error: "Description has to be provided" });
  }

  if(price == undefined) {
    return res
      .status(httpStatus.BAD_REQUEST)
      .json({ error: "Price has to be provided" });
  }

  const product = await productModel.create({
    code, name, description, price
  });

  res.status(httpStatus.CREATED).json(product);
}

async function update(req: Request, res: Response) {
  const id = req.params.id;
  const {
    code,
    name,
    description,
    price
  }: ProductBody = req.body;

  if(!uuid.validate(id)) {
    return res
      .status(httpStatus.BAD_REQUEST)
      .json({ error: `Id '${id}' is not a valid UUID` });
  }
  if(!await productModel.findByPk(id)) {
    return res
      .status(httpStatus.NOT_FOUND)
      .json({ error: `Couldn't find product with id ${id}` });
  }

  if(code && await productModel.findOne({ where: { code } })) {
    return res
      .status(httpStatus.BAD_REQUEST)
      .json({ error: `Code is already registered` });
  }

  const result = await productModel.update({
    code, name, description, price
  }, { where: { id }, returning: true });

  const product = result[1];

  res.status(httpStatus.OK).json(product);
}

async function remove(req: Request, res: Response) {
  const id = req.params.id;

  if(!uuid.validate(id)) {
    return res
      .status(httpStatus.BAD_REQUEST)
      .json({ error: `Id '${id}' is not a valid UUID` });
  }

  const product = await productModel.findByPk(id);

  if(!product) {
    return res
      .status(httpStatus.NOT_FOUND)
      .json({ error: `Couldn't find product with id ${id}` });
  }

  product.destroy();

  res.status(httpStatus.OK).json(product);
}

export { getAll, get, create, update, remove };
