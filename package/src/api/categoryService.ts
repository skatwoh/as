import axios from "axios";

const apiUrl = `/category`;

const addCategory = async (book: any) => {
  const res = await axios.post(`${apiUrl}/add-category`, { book });
  return res;
}

const updateCategory = async (book: any, id: number) => {
  const res = await axios.put(`${apiUrl}/update-category/${id}`, { book, id });
  return res;
}

const deleteCategory = async (id: number) => {
  const res = await axios.delete(`${apiUrl}/delete-category/${id}`);
  return res;
}

const listCategory = async (page: number, size: number) => {
  try {
    const response = await axios.get(`${apiUrl}/list-category`, {
      params: { page, size },
      // withCredentials: true, // Bật gửi cookie
    });
    return response?.data;
  } catch (error) {
    throw "Không có quyền"
  }
};



const categoryService = {
  addCategory, updateCategory, deleteCategory, listCategory
}

export default categoryService;