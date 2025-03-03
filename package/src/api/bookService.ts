import axios from "axios";

const apiUrl = `/book`;

const addBook = async (book: any) => {
  const res = await axios.post(`${apiUrl}/add-book`, { book });
  return res;
}

const updateBook = async (book: any, id: number) => {
  const res = await axios.put(`${apiUrl}/update-book/${id}`, { book, id });
  return res;
}

const deleteBook = async (id: number) => {
  const res = await axios.delete(`${apiUrl}/delete-book/${id}`);
  return res;
}

const listBook = async (page: number, size: number) => {
  try {
    const response = await axios.get(`${apiUrl}/list-book`, {
      params: { page, size },
      // withCredentials: true, // Bật gửi cookie
    });
    return response?.data;
  } catch (error) {
    throw "Không có quyền"
  }
};



const bookService = {
  addBook, updateBook, deleteBook, listBook
}

export default bookService;