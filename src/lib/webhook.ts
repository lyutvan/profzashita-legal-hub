type Payload = {
  name: string;
  phone: string;
  email?: string;
  topic?: string;
  message?: string;
};

const WEBHOOK_URL =
  "https://script.google.com/macros/s/AKfycbyko0JJ3hagi3K4Q1pmPwYW8GsKK1_MZrjd5a5TRjqbeCoNYxs8HqxWOZgU9Gu_WCa0Sg/exec";

export async function submitToWebhook(data: Payload) {
  const body = new URLSearchParams();
  body.append("name",  data.name  || "");
  body.append("phone", data.phone || "");
  if (data.email)   body.append("email",   data.email);
  if (data.topic)   body.append("topic",   data.topic);
  if (data.message) body.append("message", data.message);

  await fetch(WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
    keepalive: true
  });
}
