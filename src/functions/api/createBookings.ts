import axios from "axios";
import { API_BASE, API_BOOKING, API_HOLIDAZE } from "../auth/constants";
import { load } from "../localStorage/load";

interface createBookingOptions {
     venueId: string;
     dateTo: string;
     dateFrom: string;
     guests: number;
}

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