/**
 * Normalize a domain input by removing protocol, paths, query strings, and fragments.
 * Examples:
 *   "https://example.com/login?user=1" => "example.com"
 *   "http://sub.example.com/"          => "sub.example.com"
 *   "example.com"                      => "example.com"
 *   "ftp://example.com"                => "example.com"
 */
export function normalizeDomain(input) {
  if (!input || typeof input !== 'string') return '';

  let domain = input.trim();

  // Remove protocol
  domain = domain.replace(/^(https?:\/\/|ftp:\/\/|\/\/)/i, '');

  // Remove path, query, fragment
  domain = domain.split('/')[0];
  domain = domain.split('?')[0];
  domain = domain.split('#')[0];

  // Remove port
  domain = domain.split(':')[0];

  // Remove trailing dots
  domain = domain.replace(/\.+$/, '');

  // Lowercase
  domain = domain.toLowerCase();

  return domain;
}

/**
 * Validate whether a normalized domain looks valid.
 */
export function isValidDomain(domain) {
  if (!domain) return false;
  // Basic domain validation: at least one dot, valid characters
  const domainRegex = /^[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)+$/;
  return domainRegex.test(domain);
}
