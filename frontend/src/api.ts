import axios from "axios";

const url = process.env.API_URL || "localhost:3001"

export const api = axios.create({
  baseURL: `http://${url}/api`
});
