import axios from "axios";
import { API_BASE, API_HOLIDAZE, API_VENUES } from "../auth/constants";
import { load } from "../localStorage/load";

export default async function delVenue(id: string) {
    try {
        const response = axios.delete(
            `${API_BASE}${API_HOLIDAZE}${API_VENUES}/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${load("token")}`,
                    "X-Noroff-API-Key": import.meta.env.VITE_API_KEY,
                },
            }
        );

        return response;
    } catch (error) {
        console.error("Error deleting venue", error);
        throw new Error("Failed to delete venue");
    }
}