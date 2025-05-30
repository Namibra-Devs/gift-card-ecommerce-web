// utils/sanitizeHtml.ts
import DOMPurify from 'dompurify';

export const sanitizeHtml = (dirty: string) => {
  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: ['div', 'p', 'br', 'strong', 'em', 'a'],
    ALLOWED_ATTR: ['href', 'target']
  });
};