import axiosInstance from "../api/axiosInstance";
import type { AuthUser, Role } from "../types";

export async function loginUser(email: string, password: string): Promise<AuthUser> {
  const response = await axiosInstance.post<{ email: string; password: string }, { data: { data: AuthUser } }>("/api/auth/login", {
    email,
    password,
  });

  const user = response.data.data;
  localStorage.setItem("userId", String(user.userId));
  localStorage.setItem("token", user.token);
  return user;
}

export async function registerUser(name: string, email: string, password: string, role: Role): Promise<AuthUser> {
  const response = await axiosInstance.post<{ name: string; email: string; password: string; role: Role }, { data: { data: AuthUser } }>(
    "/api/auth/register",
    {
      name,
      email,
      password,
      role,
    },
  );

  const user = response.data.data;
  localStorage.setItem("userId", String(user.userId));
  localStorage.setItem("token", user.token);
  return user;
}