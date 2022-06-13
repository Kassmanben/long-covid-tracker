const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8080";

export const POST_RANK_URL = `${API_URL}/newrank`
export const GET_RANK_URL = `${API_URL}/getrank`

export const POST_ACTIVITY_URL = `${API_URL}/newactivity`
export const GET_ACTIVITY_URL = `${API_URL}/getactivity`

export const axiosConfig = {
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
    }
};

