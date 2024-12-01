import axios from "axios";
import { API_BASE, API_BOOKING, API_HOLIDAZE } from "../auth/constants";
import { load } from "../localStorage/load";

/**
 * Fetches all bookings for the current customer.
 * 
 * This function sends a GET request to retrieve bookings associated with the current customer. 
 * The request is authenticated using the stored token, and the response is returned.
 * 
 * @returns {Promise<any>} - A promise that resolves to the data from the booking API response.
 * @throws {Error} - Throws an error if the request to fetch bookings fails.
 */
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
