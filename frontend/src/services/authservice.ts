import axios from "axios";
import { deleteCookie, setCookie } from "cookies-next";
const URL = process.env.NEXT_PUBLIC_API_URL;

interface Payload {
  email: string;
  password: string;
}

const Fetch = {
  login: async (payload: Payload) => {
    try {
      const response = await axios.post(`${URL}/users/login`, payload);
      const token = response.data.token;
      if (!token) throw new Error("No token received");
      setCookie("token", token);
    } catch (error: any) {
      const message = error?.response?.data?.message || "Server Error";
      throw new Error(message);
    }
  },
  logout: async () => {
    try {
      deleteCookie("token"); // elimina el token en logout
    } catch (error: any) {
      throw new Error("Logout error");
    }
  },
};

export default Fetch;
