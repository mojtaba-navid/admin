import { Brand } from "../../types/brand.type";
import {
  BaseResponse,
  BaseResponsePagination,
} from "../../types/client/general";
import { endpoints } from "../../utils/end-points";
import { fetchInstance } from "../../utils/fetch-instance";

// Utility to replace dynamic route params
const replaceRouteParams = (
  url: string,
  params: Record<string, string | number>
): string => {
  let replacedUrl = url;
  Object.entries(params).forEach(([key, value]) => {
    replacedUrl = replacedUrl.replace(`:${key}`, value.toString());
  });
  return replacedUrl;
};

// Interfaces
export interface AddBrandData {
  brand: string;
  title: string;
}

// API Functions
export const addBrand = async (
  data: AddBrandData
): Promise<BaseResponse<Brand>> => {
  return fetchInstance(endpoints.type.addBrand, {
    method: "POST",
    body: data,
  });
};

export const editBrand = async (
  id: number,
  data: AddBrandData
): Promise<BaseResponse<Brand>> => {
  const url = replaceRouteParams(endpoints.type.editBrand, { id });
  return fetchInstance(url, {
    method: "PUT",
    body: data,
  });
};

export const deleteBrand = async (id: number): Promise<void> => {
  const url = replaceRouteParams(endpoints.type.deleteBrand, { id });
  return fetchInstance(url, {
    method: "DELETE",
  });
};

export const getBrands = async (
  currentPage = 1,
  pageSize = 10
): Promise<BaseResponsePagination<Brand[]>> => {
  const url = `${endpoints.type.getBrands}?page=${currentPage}&take=${pageSize}`;
  return fetchInstance(url, { method: "GET" });
};

export const getBrand = async (id: number): Promise<BaseResponse<Brand>> => {
  const url = replaceRouteParams(endpoints.type.getBrand, { id });
  return fetchInstance(url, { method: "GET" });
};
