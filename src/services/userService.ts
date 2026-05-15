import axiosInstance from "../api/axiosInstance";
import type { UserDTO } from "../types";

export async function getAllUsers(): Promise<UserDTO[]> {
  const response = await axiosInstance.get<{ message: string; data: UserDTO[] }>("/api/users");
  return response.data.data;
}

export async function getUserById(id: number): Promise<UserDTO> {
  const response = await axiosInstance.get<{ message: string; data: UserDTO }>(`/api/users/${id}`);
  return response.data.data;
}

export async function updateUser(id: number, data: Partial<UserDTO>): Promise<UserDTO> {
  const response = await axiosInstance.put<Partial<UserDTO>, { data: { data: UserDTO } }>(`/api/users/${id}`, data);
  return response.data.data;
}

export async function deleteUser(id: number): Promise<void> {
  await axiosInstance.delete(`/api/users/${id}`);
}
