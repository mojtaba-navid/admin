import { Brand } from "../../types/brand.type";
import {
  BaseResponse,
  BaseResponsePagination,
} from "../../types/client/general";
import { ProductType } from "../../types/productType.type";
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
    throw new Error(error);
  });
};

export const editProducType = async (
  id: number,
  data: AddProdcutTypeData
): Promise<BaseResponse<Brand>> => {
  const url = replaceRouteParams(endpoints.type.getProductType, { id });
  return fetchInstance(url, {
    method: "PUT",
    body: data,
  });
};

export const deleteProductType = async (id: number): Promise<void> => {
  const url = replaceRouteParams(endpoints.type.getProductType, { id });
  return fetchInstance(url, {
    method: "DELETE",
  });
};

export const getProductTypes = async (
  currentPage = 1,
  pageSize = 10
): Promise<BaseResponsePagination<ProductType[]>> => {
  const url = `${endpoints.type.type}?page=${currentPage}&take=${pageSize}`;
  return fetchInstance(url, { method: "GET" });
};

export const getProductType = async (
  id: number
): Promise<BaseResponse<ProductType>> => {
  const url = replaceRouteParams(endpoints.type.getProductType, { id });
  console.log(url);
  return fetchInstance(url, { method: "GET" });
};
