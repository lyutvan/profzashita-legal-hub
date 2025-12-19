export const PHONE_MASK = "+7 (999) 999-99-99";

export const normalizePhone = (value: string) => value.replace(/\D/g, "");

export const isPhoneValid = (value: string) => {
  const digits = normalizePhone(value);
  return digits.length === 11 && digits.startsWith("7");
};

