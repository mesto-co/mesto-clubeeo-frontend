export const errorHasHttpCode = (error: unknown, code: number) => {
  if (typeof error !== 'object') return false;
  return (error as { response?: { status?: number } })?.response?.status === code;
};

export interface IAxiosError {
  message: string
}
