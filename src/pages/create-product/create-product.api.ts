// utils/login.ts
import {
  BaseResponse,
  BaseResponsePagination2,
} from "../../types/client/general";
import { Product } from "../../types/product.type";
import { ProductPhoto } from "../../types/productPhoto.type";
import { endpoints } from "../../utils/end-points";
import { BASE_URL, fetchInstance } from "../../utils/fetch-instance";
import { replaceRouteParams } from "../../utils/function.util";

export interface LoginResponse {
  message: string;
  data: {
    token: string;
    id: string;
    name: string;
    phoneNumber: string;
  };
}

export interface AddProductData {
  type: string;
  model: string;
  category: string;
  brand: string;
  types: string;
  priceForUser: string;
  priceForWorkmate: string;
  warranty: string;
  numberOfExist: string;
  off: string;
  properties: Array<{
    id: string;
    value: string;
  }>;
  photo: string;
}

export const addProduct = async (
  data: AddProductData
): Promise<BaseResponse<Product>> => {
  return fetchInstance(endpoints.product.product, {
    method: "POST",
    body: { ...data },
  });
};

export const getProducts = async (
  currentPage = 1,
  pageSize = 10
): Promise<BaseResponsePagination2<Product[]>> => {
  const url = `${endpoints.product.product}?page=${currentPage}&take=${pageSize}`;
  return fetchInstance(url, {
    method: "GET",
  });
};

export const getProduct = async (
  model: string
): Promise<BaseResponse<Product>> => {
  const url = replaceRouteParams(endpoints.product.getProduct, { model });
  return fetchInstance(url, {
    method: "GET",
  });
};

export const editProduct = async (
  model: string,
  data: AddProductData
): Promise<BaseResponse<Product>> => {
  const url = replaceRouteParams(endpoints.product.editProduct, { model });
  return fetchInstance(url, {
    method: "PUT",
    body: { ...data },
  });
};

export const deleteProduct = async (
  model: string
): Promise<BaseResponse<void>> => {
  console.log(model);
  const url = replaceRouteParams(endpoints.product.editProduct, { model });
  return fetchInstance(url, {
    method: "DELETE",
  });
};

export const getAvailableProducts = async (
  model: string
): Promise<BaseResponse<number>> => {
  const url = replaceRouteParams(endpoints.product.getAvailable, { model });
  return fetchInstance(url, {
    method: "GET",
  });
};

export const uploadFile = async (
  file: string
): Promise<BaseResponse<ProductPhoto>> => {
  const formData = new FormData();
  formData.append("photo", file);
  const response = await fetch(BASE_URL + "/" + endpoints.product.uploadImage, {
    method: "POST",
    body: formData,
    // No need to manually set Content-Type, `FormData` handles it
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
};
