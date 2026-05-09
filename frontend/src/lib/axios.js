import axios from "axios";
// npm i axios!
export const axiosInstance = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? "http://localhost:3000/api"
      : "/api",
  withCredentials: true,
});
/*   Umesto:  axios.get("http://localhost:3000/api/messages")

axiosInstance.get("/messages") - ovo samo pisem umesto svaki put ceo blok
Zašto /api u production?

Jer frontend i backend su često na istom domenu (npr. Vercel + API proxy).
“šalji cookies uz svaki request”
req.cookies.jwt req.cookies.jwt
*/
