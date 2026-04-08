/** Careseeker signup — update if the URL changes. */
export const CARESEEKER_REGISTER_URL =
  "https://careseekers.ulohelps.com/auth/register";

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
