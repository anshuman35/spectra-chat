
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

export interface Channel {
  id: string,
  name: string,
  description: string
}
