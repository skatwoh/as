import axios from "axios";

const apiUrl = `/auth`;

const signUp = async (username: string, password: string, email: string) => {
    const res = await axios.post(`${apiUrl}/addNewUser`, {username, password, email})
    return res;
}

const signIn = async (username: string, password: string) => {
    const res = await axios.post(`${apiUrl}/generateToken`, {username, password})
    return res;
}

const listUsers = async (page: number, size: number) => {
    try {
        const response = await axios.get(`${apiUrl}/list-user`, {
            params: { page, size },
            withCredentials: true, // Bật gửi cookie
        });
        return response?.data;
    } catch (error) {
        throw "Không có quyền"
    }
};



const apiService = {
    signUp, signIn, listUsers
}

export default apiService;