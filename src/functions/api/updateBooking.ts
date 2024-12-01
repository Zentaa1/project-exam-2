import axios from "axios";
import { API_BASE, API_BOOKING, API_HOLIDAZE } from "../auth/constants";
import { load } from "../localStorage/load";

interface updateBookingOptions {
    dateTo: string;
    dateFrom: string;
    guests: number;
}

/**
 * Updates an existing booking with new details.
 * 
 * @param {string} id - The ID of the booking to update.
 * @param {updateBookingOptions} options - The updated booking details.
 * @param {string} options.dateFrom - The updated start date of the booking.
 * @param {string} options.dateTo - The updated end date of the booking.
 * @param {number} options.guests - The updated number of guests for the booking.
 * 
 * @returns {Promise<AxiosResponse>} - A promise that resolves to the response from the update request.
 * @throws {Error} - Throws an error if the booking update fails.
 */
export default async function updateBooking(
    id: string,
    {
        dateFrom,
        dateTo,
        guests
    }: updateBookingOptions
) {
    try {
        const response = await axios.put(
            `${API_BASE}${API_HOLIDAZE}${API_BOOKING}/${id}`,
            { dateFrom, dateTo, guests },
            {
                headers: {
                    Authorization: `Bearer ${load("token")}`,
                    "X-Noroff-API-Key": import.meta.env.VITE_API_KEY,
                },
            }
        );

        return response;
    } catch (error) {
        console.error("Error updating booking", error);
        throw new Error("Failed to update booking");
    }
}
