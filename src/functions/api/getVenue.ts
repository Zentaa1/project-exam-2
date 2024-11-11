import axios from "axios";
import { API_BASE, API_HOLIDAZE, API_VENUES } from "../auth/constants";
import { load } from "../localStorage/load";

export default async function getVenues() {
    try {
        const response = await axios.get(
            `${API_BASE}${API_HOLIDAZE}${API_VENUES}`,
            {
                headers: {
                    Authorization: `Bearer ${load("token")}`,
                    "X-Noroff-API-Key": import.meta.env.VITE_API_KEY,
                },
            }
        );

        console.log(response.data)

        return response.data.data;
    } catch (error) {
        console.error("Error fetching venues:", error);
        throw new Error("Failed to fetch venues.");
    }
}
