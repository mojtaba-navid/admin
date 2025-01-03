// utils/login.ts
import { endpoints } from "../../utils/end-points";
import { fetchInstance } from "../../utils/fetch-instance";

// Define the data type for the login request
export interface LoginData {
  phoneNumber: string;
  password: string;
}

// Define the type for the response (adjust this based on your API response)
export interface LoginResponse {
  message: string;
  data: {
    token: string;
    id: string;
    name: string;
    phoneNumber: string;
  };
}

export const login = async ({
  phoneNumber,
  password,
}: LoginData): Promise<LoginResponse> => {
  return fetchInstance(endpoints.auth.login, {
    method: "POST",
    body: { phoneNumber, password },
  });
};
