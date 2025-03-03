import axios from "axios";

const apiUrl = `/author`;

const addAuthor = async (author: any) => {
  const res = await axios.post(`${apiUrl}/add-author`, author);
  return res;
}

const updateAuthor = async (author: any, id: number) => {
  const res = await axios.put(`${apiUrl}/update-author/${id}`, author);
  return res;
}

const deleteAuthor = async (id: number) => {
  const res = await axios.delete(`${apiUrl}/delete-author/${id}`);
  return res;
}

const listAuthor = async (page: number, size: number) => {
  try {
    const response = await axios.get(`${apiUrl}/list-author`, {
      params: { page, size },
      // withCredentials: true, // Bật gửi cookie
    });
    return response?.data;
  } catch (error) {
    throw "Không có quyền"
  }
};



const authorService = {
  addAuthor, updateAuthor, deleteAuthor, listAuthor
}

export default authorService;