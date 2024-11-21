import axios from "axios";
import { API_BASE, API_HOLIDAZE, API_VENUES } from "../auth/constants";
import { load } from "../localStorage/load";

interface createVenueOptions {
    name: string;
    location: {
        address: string;
        city: string;
        zip: string;
        country: string;
    };
    meta: {
        wifi: boolean;
        pets: boolean;
        breakfast: boolean;
        parking: boolean;
    };
    description: string;
    price: number;
    maxGuests: number;
    media: [{ url: string; alt: string }];
}

export default async function createVenue({
    name,
    location,
    meta,
    description,
    price,
    maxGuests,
    media
}: createVenueOptions) {
    try {
        const response = await axios.post(
            `${API_BASE}${API_HOLIDAZE}${API_VENUES}`,
            { name, location, meta, description, price, maxGuests, media },
            {
                headers: {
                    Authorization: `Bearer ${load("token")}`,
                    "X-Noroff-API-Key": import.meta.env.VITE_API_KEY,
                },
            }
        );

        console.log(response);  // For debugging, check the full response

        return response.data;  // Return the data from the response
    } catch (error) {
        console.error("Error publishing venue", error);  // Log the error if the request fails
        throw new Error("Failed to publish venue");
    }
}
