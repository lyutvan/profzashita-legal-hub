export const MAX_ATTACHMENT_COUNT = 3;
export const MAX_ATTACHMENT_SIZE = 5 * 1024 * 1024;
export const MAX_ATTACHMENTS_TOTAL_SIZE = 10 * 1024 * 1024;
export const ATTACHMENTS_ACCEPT = ".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png,.webp";

export const getAttachmentError = (files: File[]) => {
  if (files.length > MAX_ATTACHMENT_COUNT) {
    return `Можно прикрепить не более ${MAX_ATTACHMENT_COUNT} файлов`;
  }

  if (files.some((file) => file.size > MAX_ATTACHMENT_SIZE)) {
    return "Размер каждого файла — не более 5 МБ";
  }

  const totalSize = files.reduce((total, file) => total + file.size, 0);
  if (totalSize > MAX_ATTACHMENTS_TOTAL_SIZE) {
    return "Общий размер файлов — не более 10 МБ";
  }

  return "";
};
