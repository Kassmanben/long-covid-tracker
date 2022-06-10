const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8080";

export const POST_DATA = `${API_URL}/newdata`
export const GET_DATA = `${API_URL}/getdata`

export const axiosConfig = {
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
    }
};

