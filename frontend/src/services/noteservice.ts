import axios from "axios";
import { getCookie } from "cookies-next";

const URL = process.env.NEXT_PUBLIC_API_URL;
const token = getCookie("token");
interface Create {
  category: string;
  text: string;
}

interface Edit {
  id?: number;
  category?: string;
  text?: string;
}

interface Filter {
  archive?: string;
  category?: string;
}

const Fetch = {
  createNote: async (body: Create) => {
    try {
      const data = await axios.post(`${URL}/notes`, body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true, // 👈 MUY IMPORTANTE si usas cookies cross-origin
      });
      return data.data;
    } catch (error: any) {
      const message = error?.response?.data?.message;
      throw new Error(message);
    }
  },
  editNotes: async (body: Edit) => {
    try {
      const data = await axios.patch(`${URL}/notes`, body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true, // 👈 MUY IMPORTANTE si usas cookies cross-origin
      });
      return data.data;
    } catch (error: any) {
      const message = error?.response?.data?.message;
      throw new Error(message);
    }
  },
  deleteNotes: async (id: number) => {
    try {
      const data = await axios.delete(`${URL}/notes/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true, // 👈 MUY IMPORTANTE si usas cookies cross-origin
      });
      return data.data;
    } catch (error: any) {
      const message = error?.response?.data?.message;
      throw new Error(message);
    }
  },
  setArchived: async (id: number) => {
    try {
      const data = await axios.patch(
        `${URL}/notes/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true, // 👈 MUY IMPORTANTE si usas cookies cross-origin
        }
      );
      return data.data;
    } catch (error: any) {
      const message = error?.response?.data?.message;
      throw new Error(message);
    }
  },
  getFilter: async (body: Filter) => {
    try {
      console.log(getCookie("token"));
      const data = await axios.get(
        `${URL}/notes/filter?active=${body.archive}&category=${body.category}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true, // 👈 MUY IMPORTANTE si usas cookies cross-origin
        }
      );
      return data.data;
    } catch (error: any) {
      const message = error?.response?.data?.message;
      throw new Error(message);
    }
  },
};

export default Fetch;
