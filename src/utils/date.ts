const toDate = (value: string | Date | null | undefined): Date | null => {
  if (value == null || value === '') return null;
  if (value instanceof Date) return Number.isNaN(value.getTime()) ? null : value;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? null : d;
};

export function formatJalaliDate(
  iso: string | Date | null | undefined,
  options: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' }
): string {
  const d = toDate(iso);
  if (!d) return '—';
  return new Intl.DateTimeFormat('fa-IR', options).format(d);
}

export function formatJalaliDateShort(iso: string | Date | null | undefined): string {
  return formatJalaliDate(iso, { year: 'numeric', month: '2-digit', day: '2-digit' });
}

export function formatJalaliDateTime(iso: string | Date | null | undefined): string {
  return formatJalaliDate(iso, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function formatJalaliTime(iso: string | Date | null | undefined): string {
  return formatJalaliDate(iso, { hour: '2-digit', minute: '2-digit' });
}
