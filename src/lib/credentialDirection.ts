const credentialAutocomplete = /(?:^|\s)(?:username|current-password|new-password)(?:\s|$)/i;

export function credentialDirection(type?: string, autoComplete?: string): 'ltr' | undefined {
  return type?.toLowerCase() === 'password' || credentialAutocomplete.test(autoComplete ?? '') ? 'ltr' : undefined;
}
