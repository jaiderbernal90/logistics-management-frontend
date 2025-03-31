export interface ApiError {
  message: string;
  code?: string;
  status?: number;
}

export const extractErrorMessage = (error: unknown): string => {
  if (error instanceof Error) return error.message;
  if (typeof error === "string") return error;
  return "Ha ocurrido un error desconocido";
};
