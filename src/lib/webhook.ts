type Payload = {
  name: string;
  phone: string;
  email?: string;
  topic?: string;
  message?: string;
};

export const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbzj56HWgKtfCfDf5i0CINNJTqCUTQbTYEoLyIk8PxGzNfPqNjf0y0XnarKiwi_MRZofIw/exec";

export async function submitToWebhook(data: Payload) {
  const body = new URLSearchParams();
  body.append("name",  data.name  || "");
  body.append("phone", data.phone || "");
  if (data.email)   body.append("email",   data.email);
  if (data.topic)   body.append("topic",   data.topic);
  if (data.message) body.append("message", data.message);

  // Google Apps Script requires no-cors mode for cross-origin requests
  await fetch(WEB_APP_URL, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
    keepalive: true
  });
}
