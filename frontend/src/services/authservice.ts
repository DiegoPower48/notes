import axios from "axios";
import { setCookie } from "cookies-next";
const URL = process.env.NEXT_PUBLIC_API_URL;

interface Payload {
  email: string;
  password: string;
}

const Fetch = {
  login: async (payload: Payload) => {
    try {
      const data = await axios.post(`${URL}/users/login`, payload, {
        withCredentials: true,
      });
      setCookie("token", data.data.message, {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
      });
    } catch (error: any) {
      const message = error?.response?.data?.message || "Server Error";
      throw new Error(message);
    }
  },
  logout: async () => {
    try {
      await axios.post(
        `${URL}/users/logout`,
        {},
        {
          withCredentials: true,
        }
      );
    } catch (error: any) {
      const message = error?.response?.data?.message || "Logout: Server Error";
      throw new Error(message);
    }
  },
};

export default Fetch;
