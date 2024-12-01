import axios from "axios";
import { API_AUTH, API_BASE, API_LOGIN } from "./constants";
import { save } from "../localStorage/save";

interface LoginOptions {
  email: string;
  password: string;
}

/**
 * Handles the user login process.
 * 
 * This function sends a POST request to the login endpoint with the user's email and password, 
 * and upon successful login, saves the returned access token and profile data to local storage.
 * 
 * @param {LoginOptions} loginData - The email and password of the user.
 * @returns {Promise<Object>} - A promise that resolves with the login response data.
 * @throws {Error} - Throws an error if the login request fails or if the response is not as expected.
 */
export default async function login({
  email,
  password,
}: LoginOptions) {
  try {
    const response = await axios.post(
      `${API_BASE}${API_AUTH}${API_LOGIN}?_holidaze=true`,
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const { accessToken, ...profile } = response.data.data;

    // Save the access token and profile data to local storage
    save("token", accessToken);
    save("profile", profile);

    return response.data;

  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      // Specific error message if login fails with axios response
      throw new Error(`Error ${error.response.status}: ${error.response.data.message || "Login failed"}`);
    } else {
      // Generic error message for other errors
      throw new Error("An error occurred while trying to log in.");
    }
  }
}
