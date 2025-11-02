// src/lib/webhook.ts
type Payload = {
  name: string;
  phone: string;
  email?: string;
  topic?: string;
  message?: string;
};

const WEBHOOK_URL =
  "https://script.google.com/macros/s/AKfycbzuoSTYanVrktsQmk0mIx153EdW5dvhhrbyKDO7jBpiMVXr-TPXHz6Ic43ZGC1m3790/exec";

export async function submitToWebhook(data: Payload) {
  const body = new URLSearchParams();
  body.append('name',   data.name   || '');
  body.append('phone',  data.phone  || '');
  if (data.email)   body.append('email',   data.email);
  if (data.topic)   body.append('topic',   data.topic);
  if (data.message) body.append('message', data.message);

  const res = await fetch(WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });
  if (!res.ok) throw new Error(`Webhook error: ${res.status}`);
}
