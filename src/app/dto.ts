
export interface Error {
  code: string,
  field: string,
  message: string
}

export interface Response<T> {
  success: boolean;
  data: T,
  errors: Error[];
}
