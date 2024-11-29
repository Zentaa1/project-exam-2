import axios from "axios";
import { API_BASE, API_HOLIDAZE } from "../auth/constants";
import { load } from "../localStorage/load";

interface Avatar {
    url: string;
    alt: string;
}

interface updateProfileOptions {
    bio: string;
    venueManager: boolean;
    avatar: Avatar;
}

 export default async function updateProfile(
    currentProfile: string,
    {
        bio,
        avatar,
        venueManager
    }: updateProfileOptions) {
        try {
            const response = await axios.put(
                `${API_BASE}${API_HOLIDAZE}/profiles/${currentProfile}`,
                { bio, avatar, venueManager },
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
            console.error("Error updating profile", error);
            throw new Error("Failed to update profile");
        }
    }