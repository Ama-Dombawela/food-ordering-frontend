import axiosInstance from "../api/axiosInstance";
import type { User } from "../types";

// Loads the signed-in user's profile.
export async function getUserProfile(): Promise<User> {
  const response = await axiosInstance.get("/api/v1/users/profile");
  return response.data as User;
}

// Updates editable profile fields for the current user.
export async function updateUserProfile(data: Partial<User>): Promise<User> {
  const response = await axiosInstance.put("/api/v1/users/profile", data);
  return response.data as User;
}

// Admin-only user listing.
export async function getAllUsers(): Promise<User[]> {
  const response = await axiosInstance.get("/api/v1/users");
  return response.data as User[];
}
