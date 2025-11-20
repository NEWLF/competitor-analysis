import axios from "axios";

export const requester = axios.create({
  // baseURL: "http://localhost:3002",
  // baseURL: "http://10.49.51.124:3002", // 20250123ljy
  baseURL: "http://10.49.104.213:3002",
});
