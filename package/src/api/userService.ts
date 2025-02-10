import axios from "axios";

const api_base = process.env.REACT_APP_API_BASE_URL
const apiUrl = `${api_base}/addNewUser`;

const signUp = async (username: string, password: string, email: string) => {
    const res = await axios.post(apiUrl, {username, password, email})
    console.log(res, "res")
    return res;
}

const apiService = {
    signUp
}

export default apiService;