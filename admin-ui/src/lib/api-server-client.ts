import { refreshAccessToken } from "@/context/auth-context";
import axios from "axios";

const apiServerClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiServerClient;
