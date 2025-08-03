import axios from "axios";

const URL = process.env.NEXT_PUBLIC_API_URL;

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
        withCredentials: true,
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
        withCredentials: true,
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
        withCredentials: true,
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
          withCredentials: true,
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
      const data = await axios.get(
        `${URL}/notes/filter?active=${body.archive}&category=${body.category}`,
        {
          withCredentials: true,
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
