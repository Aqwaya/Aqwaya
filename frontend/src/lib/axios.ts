import axios from "axios";

export const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1`,
});

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    console.log("STORED TOKEN START:", token?.substring(0, 20));
    console.log("STORED TOKEN LENGTH:", token?.length);

    console.log("========== API REQUEST ==========");
    console.log("URL:", `${config.baseURL}${config.url}`);
    console.log("METHOD:", config.method);
    console.log("TOKEN EXISTS:", Boolean(token));
    console.log("TOKEN LENGTH:", token?.length);

    if (token) {
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${token}`;
    }

    console.log(
      "AUTH HEADER:",
      config.headers.Authorization ? "PRESENT" : "MISSING",
    );
    console.log("=================================");
  }

  return config;
});
