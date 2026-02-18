import axios from "axios";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

export const loginUser = async (email: string, password: string) => {
  try {
    const res = await axios.post(`${API_BASE}/api/v1/auth/login`, { email, password });
    return {
      user: res.data.user,
      token: res.data.access_token
    };
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      throw err.response?.data || { message: 'Login failed' };
    }
    throw { message: 'An unexpected error occurred' };
  }
};

export const registerUser = async (firstName: string, lastName: string, email: string, password: string) => {
  try {
    const res = await axios.post(`${API_BASE}/api/v1/auth/register`, { 
      firstName, 
      lastName, 
      email, 
      password 
    });
    return res.data;
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      throw err.response?.data || { message: "Registration failed" };
    }
    throw { message: "An unexpected error occurred" };
  }
};