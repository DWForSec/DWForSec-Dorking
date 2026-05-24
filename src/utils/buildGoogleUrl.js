/**
 * Build a Google Search URL from a dork query string.
 * Replaces {domain} placeholder with the actual domain, then encodes it.
 */
export function buildGoogleUrl(dorkTemplate, domain) {
  const query = dorkTemplate.replace(/\{domain\}/g, domain);
  const encoded = encodeURIComponent(query);
  return `https://www.google.com/search?q=${encoded}`;
}

/**
 * Replace {domain} in a dork template with the actual domain.
 */
export function resolveDork(dorkTemplate, domain) {
  return dorkTemplate.replace(/\{domain\}/g, domain);
}
