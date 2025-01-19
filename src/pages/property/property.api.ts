import {
  BaseResponse,
  BaseResponsePagination,
} from "../../types/client/general";
import { Property } from "../../types/property.type";
import { PropertyTitle } from "../../types/propertyTitle.type";
import { endpoints } from "../../utils/end-points";
import { fetchInstance } from "../../utils/fetch-instance";

interface FormData {
  title: string;
  properties: Array<{ property: string }>;
}

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
export interface AddPropertyData {
  title: string;
  properties: Record<string, string>;
}
// API Functions
export const addproperty = async (
  data: AddPropertyData
): Promise<BaseResponse<Property>> => {
  return fetchInstance(endpoints.propertyTitle.propertyTitle, {
    method: "POST",
    body: data,
  });
};

export const EditProperty = async (
  id: number,
  data: FormData
): Promise<BaseResponse<PropertyTitle>> => {
  const url = replaceRouteParams(
    endpoints.propertyTitle.propertyTitlewithParmas,
    {
      id,
    }
  );
  return fetchInstance(url, {
    method: "PUT",
    body: data,
  });
};

export const deletePropertyTitle = async (id: number): Promise<void> => {
  const url = replaceRouteParams(
    endpoints.propertyTitle.propertyTitlewithParmas,
    {
      id,
    }
  );
  return fetchInstance(url, {
    method: "DELETE",
  });
};

export const deleteProperty = async (id: string): Promise<void> => {
  const url = replaceRouteParams(endpoints.property.propertiesWithParam, {
    id,
  });
  return fetchInstance(url, {
    method: "DELETE",
  });
};

export const getProperties = async (
  currentPage = 1,
  pageSize = 10
): Promise<BaseResponsePagination<Property[]>> => {
  const url = `${endpoints.propertyTitle.propertyTitle}?page=${currentPage}&take=${pageSize}`;
  return fetchInstance(url, { method: "GET" });
};

export const getProperty = async (
  id: number
): Promise<BaseResponse<PropertyTitle>> => {
  const url = replaceRouteParams(
    endpoints.propertyTitle.propertyTitlewithParmas,
    {
      id,
    }
  );
  return fetchInstance(url, { method: "GET" });
};
