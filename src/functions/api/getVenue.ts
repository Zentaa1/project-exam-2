import axios from "axios";
import { API_BASE, API_HOLIDAZE, API_VENUES } from "../auth/constants";

export default async function getVenues(id?: string, includeOwner = true, includeBookings = true) {
    try {
        let url = `${API_BASE}${API_HOLIDAZE}${API_VENUES}`;
        if (id) {
            url = `${url}/${id}?_owner=${includeOwner}&_bookings=${includeBookings}`;
        }

        console.log("Fetching URL:", url); // Debug log

        const response = await axios.get(url, {
            headers: {
                "X-Noroff-API-Key": import.meta.env.VITE_API_KEY,
            },
        });

        console.log("API Response:", response.data);

        return response.data.data;
    } catch (error) {
        console.error("Error fetching venues:", error);
        throw new Error("Failed to fetch venues.");
    }
}

