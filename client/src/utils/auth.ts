import axios from "axios";
import cookies from "js-cookie";

export default {
  initTokenHeader(): void {
    const QNA_COOKIE_TOKEN = "QnA-Access-Token";
    const token = cookies.get(QNA_COOKIE_TOKEN);

    if (!token) return;

    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  },
};
