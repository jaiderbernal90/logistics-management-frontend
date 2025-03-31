export const validateEmail = (email: string): string | null => {
  if (!email.trim()) return "El correo electrónico es requerido";
  if (!/\S+@\S+\.\S+/.test(email)) return "El correo electrónico no es válido";
  return null;
};

export const validatePassword = (password: string): string | null => {
  if (!password) return "La contraseña es requerida";
  if (password.length < 6)
    return "La contraseña debe tener al menos 6 caracteres";
  return null;
};

export const validateMatchingPasswords = (
  password: string,
  confirmPassword: string
): string | null => {
  if (password !== confirmPassword) return "Las contraseñas no coinciden";
  return null;
};
