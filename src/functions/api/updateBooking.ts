import axios from "axios";
import { API_BASE, API_BOOKING, API_HOLIDAZE } from "../auth/constants";
import { load } from "../localStorage/load";

interface updateBookingOptions {
    dateTo: string;
    dateFrom: string;
    guests: number;
}

export default async function updateBooking(
    id: string,
    {
    dateFrom,
    dateTo,
    guests
}: updateBookingOptions) {
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

        console.log(response);

        return response;
    } catch (error) {
        console.error("Error updating booking", error);
        throw new Error("Failed to update booking");
    }
}