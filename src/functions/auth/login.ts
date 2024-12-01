import axios from "axios";
import { API_AUTH, API_BASE, API_LOGIN } from "./constants";
import { save } from "../localStorage/save";

interface LoginOptions {
  email: string;
  password: string;
}

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

    save("token", accessToken);
    save("profile", profile);

    return response.data;

  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(`Error ${error.response.status}: ${error.response.data.message || "Login failed"}`);
    } else {
      throw new Error("An error occurred while trying to log in.");
    }
  }
}
