import cookies from "js-cookie";
import httpApi from "@/utils/http-api";

export const initAuthentication = () => {
  const token = cookies.get("QnA_token") || "";

  if (token) _setHeaderAuthentication(`Bearer ${token}`);

  return Boolean(token);
};

export const removeAuthentication = () => {
  _setHeaderAuthentication("");
  cookies.remove("QnA_token");

  return false;
};

const _setHeaderAuthentication = (bearerToken: string) => {
  httpApi.defaults.headers.common.Authorization = bearerToken;
};
