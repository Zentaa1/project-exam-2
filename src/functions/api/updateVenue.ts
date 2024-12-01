import axios from "axios";
import { API_BASE, API_HOLIDAZE, API_VENUES } from "../auth/constants";
import { load } from "../localStorage/load";

interface updVenueOptions {
    id: string;
    name: string;
    description: string;
    rating: number;
    price: number;
    maxGuests: number;
    location: {
        country: string;
    };
    meta: {
        wifi: boolean;
        pets: boolean;
        breakfast: boolean;
        parking: boolean;
    };
    media: Array<{
        url: string;
        alt?: string;
    }>;
}

export default async function updateVenue({
    id,
    name,
    description,
    rating,
    price,
    maxGuests,
    location,
    meta,
    media,
}: updVenueOptions) {
    try {
        const response = await axios.put(
            `${API_BASE}${API_HOLIDAZE}${API_VENUES}/${id}`,
            {
                name,
                description,
                rating,
                price,
                maxGuests,
                location,
                meta,
                media,
            },
            {
                headers: {
                    Authorization: `Bearer ${load("token")}`,
                    "X-Noroff-API-Key": import.meta.env.VITE_API_KEY,
                },
            }
        );

        return response;
    } catch (error) {
        console.error("Error updating venue", error);
        throw new Error("Failed to update venue");
    }
}
