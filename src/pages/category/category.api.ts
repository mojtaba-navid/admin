import { Catergory } from "../../types/catergory.type";
import {
  BaseResponse,
  BaseResponsePagination,
} from "../../types/client/general";
import { endpoints } from "../../utils/end-points";
import { BASE_URL, fetchInstance } from "../../utils/fetch-instance";

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
export interface AddCategoryData {
  brands: string[];
  types: string[];
  properties: string[];
  type: string;
  photo: string;
}

// API Functions
export const AddCategory = async (
  data: AddCategoryData
): Promise<BaseResponse<Catergory>> => {
  return fetchInstance(endpoints.category.category, {
    method: "POST",
    body: data,
  });
};

export const editCatergory = async (
  id: number,
  data: AddCategoryData
): Promise<BaseResponse<Catergory>> => {
  const url = replaceRouteParams(endpoints.category.categorywithParam, { id });
  return fetchInstance(url, {
    method: "PUT",
    body: data,
  });
};

export const deleteCategory = async (id: number): Promise<void> => {
  const url = replaceRouteParams(endpoints.category.categorywithParam, { id });
  return fetchInstance(url, {
    method: "DELETE",
  });
};

export const getCatergories = async (
  currentPage = 1,
  pageSize = 10
): Promise<BaseResponsePagination<Catergory[]>> => {
  const url = `${endpoints.category.category}?page=${currentPage}&take=${pageSize}`;
  return fetchInstance(url, { method: "GET" });
};

export const getCatergory = async (
  id: number
): Promise<BaseResponse<Catergory>> => {
  const url = `${endpoints.category.getCatergory}?id=${id}`;
  return fetchInstance(url, { method: "GET" });
};

export const uploadFile = async (
  file: string
): Promise<BaseResponse<{ src: string }>> => {
  const formData = new FormData();
  formData.append("photo", file);

  const response = await fetch(
    BASE_URL + "/" + endpoints.category.UploadPhoto,
    {
      method: "POST",
      body: formData,
      // No need to manually set Content-Type, `FormData` handles it
    }
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
};
