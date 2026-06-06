import { SITE } from "@/config/site";

type Payload = {
  name: string;
  phone: string;
  email?: string;
  topic?: string;
  message?: string;
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

export async function submitToWebhook(data: Payload) {
  if (!WEB_APP_URL) {
    throw new Error("Lead webhook URL is not configured");
  }

  const body = new URLSearchParams();
  const payload: Record<string, string> = {
    name: data.name || "",
    phone: data.phone || "",
    email: data.email || "",
    recipient_email: SITE.email,
    to_email: SITE.email,
    topic: data.topic || "",
    message: data.message || "",
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
    keepalive: true
  });

  if (response.type !== "opaque" && !response.ok) {
    throw new Error(`Lead webhook error: ${response.status}`);
  }
}
