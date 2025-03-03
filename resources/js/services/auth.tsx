import axios from "axios";

export const login = async (email: string, password: string) => {
    try {
        const response = await axios.post("/login", {email, password});
        return response.data;
    }
    catch(error: any){
        throw error.response?.data || {message: "An error occured"};
    }
};