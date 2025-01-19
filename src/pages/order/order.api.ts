import { Brand } from "../../types/brand.type";
import {
  BaseResponse,
  BaseResponsePagination,
} from "../../types/client/general";
import { Order } from "../../types/order.type";
import { ProductType } from "../../types/productType.type";
import { endpoints } from "../../utils/end-points";
import { fetchInstance } from "../../utils/fetch-instance";
import { form_inputs } from "./order.config";

type FormData = typeof form_inputs;

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

export const getOrders = async (
  currentPage = 1,
  pageSize = 10,
  filterItems: Partial<FormData>
): Promise<BaseResponsePagination<Order[]>> => {
  type QueryParams = {
    [key: string]: string;
  };
  // Filter out empty values
  const parmas: QueryParams = Object.fromEntries(
    Object.entries(filterItems).filter(
      ([_, value]) => value !== undefined && value !== ""
    )
  );
  const queryString = new URLSearchParams(parmas);
  queryString.append("page", currentPage.toString());
  queryString.append("take", pageSize.toString());
  const url = `${endpoints.orders.searchOrder}?${queryString}`;
  return fetchInstance(url, { method: "GET" });
};

export const getProductType = async (
  id: number
): Promise<BaseResponse<ProductType>> => {
  const url = replaceRouteParams(endpoints.type.getProductType, { id });
  console.log(url);
  return fetchInstance(url, { method: "GET" });
};
