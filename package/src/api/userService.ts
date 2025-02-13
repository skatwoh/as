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

const apiService = {
    signUp, signIn
}

export default apiService;