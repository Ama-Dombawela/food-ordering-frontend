export type UserRole = "ADMIN" | "CUSTOMER";

export interface User {
	id: number;
	name: string;
	email: string;
	password?: string;
	role: UserRole;
}

export interface AuthUser {
	email: string;
	userId : number;
	role: UserRole;
	token: string;
}

export type Role = UserRole;
export type UserDTO = User;