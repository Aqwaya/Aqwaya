// src/api/auth.ts
import axios from "axios";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

export const isLoggedIn = () => {
  const token = localStorage.getItem("token");
  return !!token;
};


export const loginUser = async (email: string, password: string) => {
  try {
    const res = await axios.post(`${API_BASE}/api/users/login`, { email, password });
    return res.data; // { user, token } with firstLogin included
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      throw err.response?.data || { message: 'Login failed' };
  }
    throw { message: 'Login failed' };
  }
};

export const registerUser = async (username: string, email: string, password: string) => {
  try {
    const res = await axios.post(`${API_BASE}/api/users/register`, { username, email, password });
    return res.data;
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      throw err.response?.data || { message: "Registration failed" };
  }
  throw { message: "Registration failed" };
  }
};
