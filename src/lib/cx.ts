/** Join truthy class names. */
export const cx = (...parts: Array<string | false | null | undefined>): string => parts.filter(Boolean).join(" ");

/** "(301) 555-0142" → "tel:3015550142" */
export const telHref = (phone: string): string => `tel:${phone.replace(/[^\d+]/g, "")}`;
