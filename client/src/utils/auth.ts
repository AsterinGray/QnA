import cookies from "js-cookie";
import httpApi from "@/utils/http-api";

export const initTokenHeader = (
  setIsAuthenticate: (isAuthenticate: boolean) => void
): void => {
  const token = cookies.get("QnA_token");
  if (token) {
    httpApi.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    setIsAuthenticate(true);
  }
};

export const removeTokenHeader = (): void => {
  httpApi.defaults.headers.common["Authorization"] = "";
};
