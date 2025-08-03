import axios from "axios";

const URL = process.env.NEXT_PUBLIC_API_URL;

interface Payload {
  email: string;
  password: string;
}

const Fetch = {
  login: async (payload: Payload) => {
    try {
      await axios.post(`${URL}/users/login`, payload, {
        withCredentials: true,
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
