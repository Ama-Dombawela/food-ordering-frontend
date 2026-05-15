// Role constants are kept in one place so UI, guards, and services use the same values.
export const ROLES = {
  ADMIN: 'ADMIN',
  CUSTOMER: 'CUSTOMER',
} as const;

export type RoleValue = (typeof ROLES)[keyof typeof ROLES];