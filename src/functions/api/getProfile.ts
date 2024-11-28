import axios from "axios";
import { API_BASE, API_HOLIDAZE } from "../auth/constants";
import { load } from "../localStorage/load";

export default async function getProfile(id?: string) {
    try {
        const [profileResponse, bookingsResponse, venuesResponse] = await Promise.all([
            axios.get(`${API_BASE}${API_HOLIDAZE}/profiles/${id}`, {
                headers: {
                    Authorization: `Bearer ${load("token")}`,
                    "X-Noroff-API-Key": import.meta.env.VITE_API_KEY,
                },
            }),
            axios.get(`${API_BASE}${API_HOLIDAZE}/profiles/${id}/bookings`, {
                headers: {
                    Authorization: `Bearer ${load("token")}`,
                    "X-Noroff-API-Key": import.meta.env.VITE_API_KEY,
                },
            }),
            axios.get(`${API_BASE}${API_HOLIDAZE}/profiles/${id}/venues`, {
                headers: {
                    Authorization: `Bearer ${load("token")}`,
                    "X-Noroff-API-Key": import.meta.env.VITE_API_KEY,
                },
            }),
        ]);

        const profileData = profileResponse.data.data;
        const bookingsData = bookingsResponse.data.data;
        const venuesData = venuesResponse.data.data;

        return {
            profile: profileData,
            bookings: bookingsData,
            venues: venuesData,
        };
    } catch (error) {
        console.error("Error fetching profile data:", error);
        throw new Error("Failed to fetch profile, bookings, or venues.");
    }
}
