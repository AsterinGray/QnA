import axios from "axios";
import cookies from "js-cookie";

export default {
  initTokenHeader(setIsAuthenticate: (isAuthenticate: boolean) => void): void {
    const token = cookies.get("QnA_token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setIsAuthenticate(true);
      console.log("successfully setIsAuthenticate true");
    }
  },
  modifyTokenHeader(isAuthenticate: boolean): void {
    if (!isAuthenticate) {
      axios.defaults.headers.common["Authorization"] = "";
    } else {
      const token = cookies.get("QnA_token");
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  },
};
