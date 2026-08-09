import { api } from '../../lib/axios';

import axios from 'axios';
import { LoginFormValues, SignupFormValues } from './schemas';

export const loginUser = async ({ email, password }: LoginFormValues) => {
  try {
    const res = await api.post(`auth/login`, {
      email,
      password,
    });
    return {
      user: res.data.user,
      token: res.data.access_token,
    };
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      throw err.response?.data || { message: 'Login failed' };
    }
    throw { message: 'An unexpected error occurred' };
  }
};

export const registerUser = async ({
  firstName,
  lastName,
  email,
  password,
}: SignupFormValues) => {
  try {
    const res = await api.post(`auth/register`, {
      firstName,
      lastName,
      email,
      password,
    });
    return res.data;
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      throw err.response?.data || { message: 'Registration failed' };
    }
    throw { message: 'An unexpected error occurred' };
  }
};
