// Validation helpers return an error string when invalid, or an empty string when valid.
export const validateEmail = (email: string): string => {
  if (!email.trim()) {
    return 'Email is required.';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) ? '' : 'Please enter a valid email address.';
};

export const validatePassword = (password: string): string => {
  if (!password) {
    return 'Password is required.';
  }

  if (password.length < 6) {
    return 'Password must be at least 6 characters long.';
  }

  return '';
};

export const validateName = (name: string): string => {
  if (!name.trim()) {
    return 'Name is required.';
  }

  if (name.trim().length < 2) {
    return 'Name must be at least 2 characters long.';
  }

  return '';
};