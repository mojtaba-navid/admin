// utils/login.ts
import {
  CONFIRM_PASSWORD,
  EMAIL,
  lAST_NAME,
  NAME,
  NATIONAL_CODE,
  PASSWORD,
  PHONE_NUMBER,
} from "./register.config";
import { endpoints } from "../../utils/end-points";
import { fetchInstance } from "../../utils/fetch-instance";

// Define the data type for the login request
export interface RegisterData {
  [NAME]: string;
  [lAST_NAME]: string;
  [NATIONAL_CODE]: string;
  [EMAIL]: string;
  [PHONE_NUMBER]: string;
  [PASSWORD]: string;
  [CONFIRM_PASSWORD]: string;
}

// Define the type for the response (adjust this based on your API response)
export interface RegisterResponse {
  token: string;
  user: {
    id: string;
    name: string;
    phoneNumber: string;
  };
}

export const register = async (
  data: RegisterData
): Promise<RegisterResponse> => {
  return fetchInstance(endpoints.auth.register, {
    method: "POST",
    body: { ...data },
  });
};
