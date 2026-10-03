import { BOOKING_URL, WHATSAPP_MESSAGE, WHATSAPP_NUMBER } from "../config";

const ATTRIBUTION_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "ad_id",
  "fbclid",
  "gclid",
];

/** Link a la página de agendamiento, conservando los parámetros de campaña de la visita. */
export function bookingHref(): string {
  if (typeof window === "undefined") return BOOKING_URL;
  const current = new URLSearchParams(window.location.search);
  const url = new URL(BOOKING_URL);
  for (const key of ATTRIBUTION_KEYS) {
    const value = current.get(key);
    if (value) url.searchParams.set(key, value.slice(0, 500));
  }
  return url.toString();
}

export function whatsappHref(): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
}
