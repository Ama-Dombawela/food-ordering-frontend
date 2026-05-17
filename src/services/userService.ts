import axiosInstance from "../api/axiosInstance";
import type { UserDTO } from "../types";

// Fetch all users in the system (admin only).
export async function getAllUsers(): Promise<UserDTO[]> {
  const response = await axiosInstance.get<{ message: string; data: UserDTO[] }>("/api/users");
  return response.data.data;
}

// Fetch a single user profile by id.
export async function getUserById(id: number): Promise<UserDTO> {
  const response = await axiosInstance.get<{ message: string; data: UserDTO }>(`/api/users/${id}`);
  return response.data.data;
}

// Update user profile fields (name, email, etc.).
export async function updateUser(id: number, data: Partial<UserDTO>): Promise<UserDTO> {
  const response = await axiosInstance.put<Partial<UserDTO>, { data: { data: UserDTO } }>(`/api/users/${id}`, data);
  return response.data.data;
}

// Permanently delete a user account.
export async function deleteUser(id: number): Promise<void> {
  await axiosInstance.delete(`/api/users/${id}`);
}
