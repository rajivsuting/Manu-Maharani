export type AppResponseHandler<T> = TErrorResponse | TSuccessResponse<T>;

export type TErrorResponse = {
  error: string;
  success: false;
};

export type TResponse<T> = TErrorResponse | TSuccessResponse<T>;

export type TSuccessResponse<T> = { success: true } & T;

const AppResponseHandler = {
  error: (error: string, statusCode: number) => {
    return {
      error,
      statusCode,
      success: false,
    } as TErrorResponse;
  },
  isError: <T>(data: AppResponseHandler<T>): data is TErrorResponse => {
    return data.success === false;
  },
  isSuccess: <T>(data: AppResponseHandler<T>): data is TSuccessResponse<T> => {
    return data.success === true;
  },
  success: <T>(data: T) => {
    return {
      ...data,
      success: true,
    } as TSuccessResponse<T>;
  },
  successWithoutData: () => {
    return {
      success: true,
    } as TSuccessResponse<undefined>;
  },
};

export { AppResponseHandler };
