import { Brand } from "../../types/brand.type";
import {
  BaseResponse,
  BaseResponsePagination,
} from "../../types/client/general";
import { ProductType } from "../../types/productType.type";
import { Property } from "../../types/property.type";
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
export interface AddProdcutTypeData {
  type: string;
  title: string;
}

// API Functions
export const AddProductType = async (
  data: AddProdcutTypeData
): Promise<BaseResponse<ProductType>> => {
  return fetchInstance(endpoints.type.type, {
    method: "POST",
    body: data,
  }).catch((error) => {
    console.error("Error adding brand:", error);
    throw new Error("Failed to add brand. Please try again.");
  });
};

export const editBrand = async (
  id: number,
  data: AddProdcutTypeData
): Promise<BaseResponse<Brand>> => {
  const url = replaceRouteParams(endpoints.type.editBrand, { id });
  return fetchInstance(url, {
    method: "PUT",
    body: data,
  }).catch((error) => {
    console.error("Error editing brand:", error);
    throw new Error("Failed to edit brand. Please try again.");
  });
};

export const deleteBrand = async (id: number): Promise<void> => {
  const url = replaceRouteParams(endpoints.type.deleteBrand, { id });
  return fetchInstance(url, {
    method: "DELETE",
  }).catch((error) => {
    console.error("Error deleting brand:", error);
    throw new Error("Failed to delete brand. Please try again.");
  });
};

export const getProductTypes = async (
  currentPage = 1,
  pageSize = 10
): Promise<BaseResponsePagination<ProductType[]>> => {
  const url = `${endpoints.type.type}?page=${currentPage}&take=${pageSize}`;
  return fetchInstance(url, { method: "GET" }).catch((error) => {
    console.error("Error fetching brands:", error);
    throw new Error("Failed to fetch brands. Please try again.");
  });
};

export const getBrand = async (id: number): Promise<BaseResponse<Brand>> => {
  const url = replaceRouteParams(endpoints.type.getBrand, { id });
  return fetchInstance(url, { method: "GET" }).catch((error) => {
    console.error("Error fetching brand:", error);
    throw new Error("Failed to fetch brand details. Please try again.");
  });
};
