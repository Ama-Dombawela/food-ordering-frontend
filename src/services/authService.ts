import axiosInstance from "../api/axiosInstance";
import type { User } from "../types";

// Login payload sent to the backend auth endpoint.
export interface LoginRequest {
  email: string;
  password: string;
}

// Registration payload used by the sign-up flow.
export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  role: "CUSTOMER" | "ADMIN";
}

// Authenticates a user and returns the server-issued token plus user data.
export async function loginUser(data: LoginRequest) {
  const response = await axiosInstance.post("/api/v1/auth/login", data);
  return response.data as { token: string; user: User };
}

// Creates a new account on the backend.
export async function registerUser(data: RegisterRequest) {
  const response = await axiosInstance.post("/api/v1/auth/register", data);
  return response.data as User;
}
