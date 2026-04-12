/**
 * Careseeker (employer) signup — set per environment in `.env`.
 * @example NEXT_PUBLIC_CARESEEKER_REGISTER_URL=https://careseekers.ulohelps.com/auth/register
 */
export const CARESEEKER_REGISTER_URL =
  process.env.NEXT_PUBLIC_CARESEEKER_REGISTER_URL ??
  "https://careseekers.ulohelps.com/auth/register";

/**
 * Domestic worker CTA — same-site path or full URL to the caregivers app, per environment.
 * @example NEXT_PUBLIC_DOMESTIC_WORKER_CTA_URL=/for-domestic-workers
 * @example NEXT_PUBLIC_DOMESTIC_WORKER_CTA_URL=https://caregivers.ulohelps.com/auth/register
 */
export const DOMESTIC_WORKER_CTA_URL =
  process.env.NEXT_PUBLIC_DOMESTIC_WORKER_CTA_URL ?? "/for-domestic-workers";

/** WhatsApp chat (E.164 without +). Set NEXT_PUBLIC_WHATSAPP_PHONE in .env for production. */
const rawPhone = process.env.NEXT_PUBLIC_WHATSAPP_PHONE ?? "2348012345678";

export const WHATSAPP_CHAT_URL = `https://wa.me/${rawPhone.replace(/\D/g, "")}?text=${encodeURIComponent(
  "Hi Ulo — I'd like to find a verified domestic worker in Lagos."
)}`;

/** Set in .env when the native apps are live. */
export const APP_STORE_URL =
  process.env.NEXT_PUBLIC_APP_STORE_URL ?? "https://apps.apple.com/";
export const PLAY_STORE_URL =
  process.env.NEXT_PUBLIC_PLAY_STORE_URL ?? "https://play.google.com/store";
