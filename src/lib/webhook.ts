// src/lib/webhook.ts
type Payload = {
  name: string;
  phone: string;
  email?: string;
  message?: string;
  topic?: string;          // caseType
  consent?: boolean;
  form_id?: string;
  form_title?: string;
};

const WEBHOOK_URL =
  "https://script.google.com/macros/s/AKfycbzuoSTYanVrktsQmk0mIx153EdW5dvhhrbyKDO7jBpiMVXr-TPXHz6Ic43ZGC1m3790/exec";

function getParam(name: string): string {
  try {
    return new URL(window.location.href).searchParams.get(name) || "";
  } catch {
    return "";
  }
}

export async function submitToWebhook(data: Payload) {
  if (!WEBHOOK_URL) throw new Error("WEBHOOK_URL is not configured");

  const meta = {
    page_url: typeof window !== "undefined" ? window.location.href : "",
    referrer: typeof document !== "undefined" ? document.referrer : "",
    utm_source:  getParam("utm_source"),
    utm_medium:  getParam("utm_medium"),
    utm_campaign:getParam("utm_campaign"),
    utm_term:    getParam("utm_term"),
    utm_content: getParam("utm_content"),
    type: "form",
  };

  const normalized = {
    ...data,
    consent: data.consent ? "yes" : "no",
    topic: data.topic || "",
    ...meta,
  };

  const body = new URLSearchParams();
  Object.entries(normalized).forEach(([k, v]) => {
    if (v !== undefined && v !== null) body.append(k, String(v));
  });

  const res = await fetch(WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Webhook error: ${res.status} ${text}`);
  }
}
