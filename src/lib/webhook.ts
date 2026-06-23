import { SITE } from "@/config/site";
import { getAttachmentError } from "@/lib/attachments";

type Payload = {
  name: string;
  phone: string;
  email?: string;
  topic?: string;
  message?: string;
  attachments?: File[];
};

type SerializedAttachment = {
  name: string;
  type: string;
  size: number;
  base64: string;
};

const DEFAULT_WEB_APP_URL =
  "https://script.google.com/macros/s/AKfycbyTB6e7U6RFPEWrcJAK_4skG8TagYIIt8GNzoTmI3fhbZZw3GbD0PWbNA0qQ4bB2Fxvlw/exec";

export const WEB_APP_URL = import.meta.env.VITE_LEAD_WEBHOOK_URL || DEFAULT_WEB_APP_URL;

const getUrlParam = (name: string) => {
  if (typeof window === "undefined") return "";

  try {
    return new URL(window.location.href).searchParams.get(name) || "";
  } catch {
    return "";
  }
};

const serializeAttachment = (file: File) =>
  new Promise<SerializedAttachment>((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const dataUrl = String(reader.result ?? "");
      const base64 = dataUrl.includes(",") ? dataUrl.split(",")[1] : "";
      if (!base64) {
        reject(new Error(`Не удалось прочитать файл ${file.name}`));
        return;
      }

      resolve({
        name: file.name,
        type: file.type || "application/octet-stream",
        size: file.size,
        base64
      });
    };
    reader.onerror = () => reject(new Error(`Не удалось прочитать файл ${file.name}`));
    reader.readAsDataURL(file);
  });

export async function submitToWebhook(data: Payload) {
  if (!WEB_APP_URL) {
    throw new Error("Lead webhook URL is not configured");
  }

  const attachmentError = getAttachmentError(data.attachments ?? []);
  if (attachmentError) {
    throw new Error(attachmentError);
  }

  const attachments = await Promise.all((data.attachments ?? []).map(serializeAttachment));
  const body = new URLSearchParams();
  const payload: Record<string, string> = {
    name: data.name || "",
    phone: data.phone || "",
    email: data.email || "",
    recipient_email: SITE.email,
    to_email: SITE.email,
    topic: data.topic || "",
    message: data.message || "",
    attachments: attachments.length > 0 ? JSON.stringify(attachments) : "",
    attachment_names: attachments.map((attachment) => attachment.name).join(", "),
    type: "form",
    page_url: typeof window !== "undefined" ? window.location.href : "",
    referrer: typeof document !== "undefined" ? document.referrer : "",
    utm_source: getUrlParam("utm_source"),
    utm_medium: getUrlParam("utm_medium"),
    utm_campaign: getUrlParam("utm_campaign"),
    utm_term: getUrlParam("utm_term"),
    utm_content: getUrlParam("utm_content"),
    submitted_at: new Date().toISOString()
  };

  Object.entries(payload).forEach(([key, value]) => {
    if (value) body.append(key, value);
  });

  const response = await fetch(WEB_APP_URL, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
    // keepalive ограничивает тело запроса примерно 64 КБ в браузерах,
    // поэтому для заявок с документами его использовать нельзя.
    keepalive: attachments.length === 0
  });

  if (response.type !== "opaque" && !response.ok) {
    throw new Error(`Lead webhook error: ${response.status}`);
  }
}
