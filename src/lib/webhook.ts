interface WebhookData {
  name?: string;
  phone?: string;
  email?: string;
  message?: string;
  topic?: string;
  consent?: boolean;
  form_id: string;
  form_title: string;
  type: string;
  page_url: string;
  referrer: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
}

const WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbzuoSTYanVrktsQmk0mIx153EdW5dvhhrbyKDO7jBpiMVXr-TPXHz6Ic43ZGC1m3790/exec";

export const getUTMParams = () => {
  const urlParams = new URLSearchParams(window.location.search);
  return {
    utm_source: urlParams.get('utm_source') || undefined,
    utm_medium: urlParams.get('utm_medium') || undefined,
    utm_campaign: urlParams.get('utm_campaign') || undefined,
    utm_term: urlParams.get('utm_term') || undefined,
    utm_content: urlParams.get('utm_content') || undefined,
  };
};

export const submitToWebhook = async (data: {
  name?: string;
  phone?: string;
  email?: string;
  message?: string;
  topic?: string;
  consent?: boolean;
  form_id: string;
  form_title: string;
}): Promise<void> => {
  const webhookData: WebhookData = {
    ...data,
    type: "form",
    page_url: window.location.href,
    referrer: document.referrer,
    ...getUTMParams(),
  };

  const response = await fetch(WEBHOOK_URL, {
    method: 'POST',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(webhookData),
  });

  // With no-cors, we can't read the response, but we assume success
  // Redirect to thanks page
  window.location.href = '/thanks';
};
