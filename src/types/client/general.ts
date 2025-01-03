export interface optionsType {
  value: string | number;
  label: string;
}

export interface BaseResponse<T> {
  message: string;
  data: T;
}

export interface BaseResponsePagination<T> {
  message: string;
  data: { data: T };
  meta: {
    page: number;
    take: number;
    itemCount: number;
    pageCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  };
}
