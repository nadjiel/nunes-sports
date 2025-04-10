import axios from "axios";

const url = process.env.REACT_APP_API_URL || "localhost:3001"

export const api = axios.create({
  baseURL: `http://${url}/api`
});
