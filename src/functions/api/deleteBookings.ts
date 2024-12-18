import axios from "axios";
import { API_BASE, API_BOOKING, API_HOLIDAZE } from "../auth/constants";
import { load } from "../localStorage/load";

/**
 * Deletes a booking by its ID.
 * 
 * @param {string} [id] - The ID of the booking to delete.
 * If no ID is provided, the function will not make a request.
 * 
 * @returns {Promise<AxiosResponse>} - A promise that resolves to the response from the delete request.
 * @throws {Error} - Throws an error if the booking deletion fails.
 */
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

        return response;
    } catch (error) {
        console.error("Error deleting booking", error);
        throw new Error("Failed to delete booking");
    }
}
