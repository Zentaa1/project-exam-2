import axios from "axios";
import { API_BASE, API_HOLIDAZE } from "../auth/constants";
import { load } from "../localStorage/load";

/**
 * Fetches profile, bookings, and venues data for a specific user.
 * 
 * This function sends three parallel GET requests to fetch the profile, bookings, and venues 
 * of a user by their ID. The requests are authenticated using a stored token, and the responses 
 * are returned as an object containing the profile, bookings, and venues data.
 * 
 * @param {string} [id] - The user ID to fetch the profile, bookings, and venues data for.
 * @returns {Promise<Object>} - A promise that resolves to an object containing the profile, bookings, and venues data.
 * @throws {Error} - Throws an error if any of the requests fail or if the data cannot be fetched.
 */
export default async function getProfile(id?: string) {
    try {
        const [profileResponse, bookingsResponse, venuesResponse] = await Promise.all([
            axios.get(`${API_BASE}${API_HOLIDAZE}/profiles/${id}`, {
                headers: {
                    Authorization: `Bearer ${load("token")}`,
                    "X-Noroff-API-Key": import.meta.env.VITE_API_KEY,
                },
            }),
            axios.get(`${API_BASE}${API_HOLIDAZE}/profiles/${id}/bookings?_venue=true`, {
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
