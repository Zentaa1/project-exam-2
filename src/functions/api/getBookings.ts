import axios from "axios";
import { API_BASE, API_BOOKING, API_HOLIDAZE } from "../auth/constants";
import { load } from "../localStorage/load";

export default async function getBookings() {
    try {
        const response = await axios.get(
            `${API_BASE}${API_HOLIDAZE}${API_BOOKING}?_customer=true`,
            {
                headers: {
                    Authorization: `Bearer ${load("token")}`,
                    "X-Noroff-API-Key": import.meta.env.VITE_API_KEY,
                },
            }
        );

        return response.data;
    } catch (error) {
        console.error("Error fetching Bookings:", error);
        throw new Error("Failed to fetch Bookings.");
    }
}
