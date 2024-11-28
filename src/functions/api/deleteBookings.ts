import axios from "axios";
import { API_BASE, API_BOOKING, API_HOLIDAZE } from "../auth/constants";
import { load } from "../localStorage/load";

export default async function deleteBookings(id?: string) {
    try {
        const response = await axios.delete(
            `${API_BASE}${API_HOLIDAZE}${API_BOOKING}/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${load("token")}`,
                    "X-Noroff-API-Key": import.meta.env.VITE_API_KEY,
                },
            }
        );

        console.log(response)

        return response;
    } catch (error) {
        console.error("Error deleting booking", error);
        throw new Error("Failed to delete booking");
    }
}