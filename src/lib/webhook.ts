type Payload = {
  name: string;
  phone: string;
  email?: string;
  topic?: string;   // caseType in UI
  message?: string;
};

const WEBHOOK_URL =
  "https://script.google.com/macros/s/AKfycbzuoSTYanVrktsQmk0mIx153EdW5dvhhrbyKDO7jBpiMVXr-TPXHz6Ic43ZGC1m3790/exec";

export async function submitToWebhook(data: Payload) {
  const body = new URLSearchParams();
  body.append("name",  data.name  || "");
  body.append("phone", data.phone || "");
  if (data.email)   body.append("email",   data.email);
  if (data.topic)   body.append("topic",   data.topic);
  if (data.message) body.append("message", data.message);

  try {
    const res = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
      keepalive: true
    });
    if (res.type === "opaque" || res.ok) return; // treat opaque as success
    const txt = await res.text().catch(() => "");
    throw new Error(`Webhook status: ${res.status} ${txt}`);
  } catch (e) {
    // fallback: hidden form submit (works without CORS)
    try {
      const form = document.createElement("form");
      form.action = WEBHOOK_URL;
      form.method = "POST";
      form.style.display = "none";
      for (const [k, v] of body.entries()) {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = k;
        input.value = v;
        form.appendChild(input);
      }
      document.body.appendChild(form);
      form.submit();
      await new Promise(r => setTimeout(r, 200));
      return;
    } catch {
      throw e;
    }
  }
}
