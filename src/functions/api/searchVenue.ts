import axios from "axios";
import { API_BASE, API_HOLIDAZE, API_VENUES } from "../auth/constants";

export default async function searchVenue(searchQuery: string) {
    try {
        const response = await axios.get(
            `${API_BASE}${API_HOLIDAZE}${API_VENUES}/search?q=${searchQuery}`,
            {
                headers: {
                    "X-Noroff-API-Key": import.meta.env.VITE_API_KEY,
                },
            }
        );

        console.log(response.data.data);

        return response.data;
    } catch (error) {
        console.error("Error fetching venues", error);
        throw new Error("Failed to find venue");
    }
}