import axios from "axios";
import { API_AUTH, API_BASE, API_REGISTER } from "./constants";

interface RegisterOptions {
    name: string;
    email: string;
    password: string;
    venueManager: boolean;
}

export default async function register({
    name,
    email,
    password,
    venueManager,
}: RegisterOptions) {
    try {
        const response = await axios.post(
            `${API_BASE}${API_AUTH}${API_REGISTER}`, 
            { name, email, password, venueManager },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        return response.data;
        
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw new Error(`Error ${error.response.status}: ${error.response.data.message || "Could not register the account at this time."}`);
        }
        
        throw new Error("Could not register the account at this time.");
    }
}
