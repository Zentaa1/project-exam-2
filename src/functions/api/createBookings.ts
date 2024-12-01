import axios from "axios";
import { API_BASE, API_BOOKING, API_HOLIDAZE } from "../auth/constants";
import { load } from "../localStorage/load";

/**
 * Interface representing the options required to create a booking.
 * 
 * @typedef {Object} createBookingOptions
 * @property {string} venueId - The ID of the venue to book.
 * @property {string} dateFrom - The start date of the booking.
 * @property {string} dateTo - The end date of the booking.
 * @property {number} guests - The number of guests for the booking.
 */
interface createBookingOptions {
    venueId: string;
    dateFrom: string;
    dateTo: string;
    guests: number;
}

/**
 * Creates a booking for a specific venue by sending the booking details to the API.
 * 
 * @param {createBookingOptions} bookingOptions - The details required to create a booking.
 * @param {string} bookingOptions.venueId - The venue ID.
 * @param {string} bookingOptions.dateFrom - The start date of the booking.
 * @param {string} bookingOptions.dateTo - The end date of the booking.
 * @param {number} bookingOptions.guests - The number of guests for the booking.
 * 
 * @returns {Promise<Object>} - A promise that resolves to the API response data upon success.
 * @throws {Error} - Throws an error if the booking creation fails.
 */
export default async function createBooking({
    venueId,
    dateFrom,
    dateTo,
    guests
}: createBookingOptions) {
    try {
        const response = await axios.post(
            `${API_BASE}${API_HOLIDAZE}${API_BOOKING}`,
            { venueId, dateFrom, dateTo, guests },
            {
                headers: {
                    Authorization: `Bearer ${load("token")}`,
                    "X-Noroff-API-Key": import.meta.env.VITE_API_KEY,
                },
            }
        );

        return response.data;
    } catch (error) {
        console.error("Error creating booking", error);
        throw new Error("Failed to create booking");
    }
}
