export const validateFullName = (name) => {
  return name.trim().length > 3;
};

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  const hasMinLength = password.length >= 8;
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasLetter = /[a-zA-Z]/.test(password);
  return hasMinLength && hasSpecialChar && hasNumber && hasLetter;
};

export const validatePasswordMatch = (password, confirmPassword) => {
  return password === confirmPassword;
};

export const validatePhoneNumber = (phoneNumber) => {
  const phoneRegex = /^\(\d{2}\)\d{4,5}-\d{4}$/;
  return phoneRegex.test(phoneNumber);
};
