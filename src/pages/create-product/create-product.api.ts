// utils/login.ts
import { endpoints } from "../../utils/end-points";
import { fetchInstance } from "../../utils/fetch-instance";

export interface LoginResponse {
  message: string;
  data: {
    token: string;
    id: string;
    name: string;
    phoneNumber: string;
  };
}

export const getCatergoris = async (): Promise<LoginResponse> => {
  return fetchInstance(endpoints.category.getCatergoris, {
    method: "GET",
  });
};
