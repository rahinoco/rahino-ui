import pkg from '../../package.json';

/** شماره‌های سند و بسته یکی نیستند. نسخهٔ بسته از package.json همین ریپو خوانده می‌شود. */
export const RELEASE = {
  foundations: { id: 'RAHINO_01', version: '2.0.0', date: '2026-10-07' },
  content: { id: 'RAHINO_04', version: '1.0.0', date: '2026-10-07' },
  components: { id: 'RAHINO_05', version: '1.0.0', date: '2026-10-07' },
  development: { id: 'RAHINO_06', version: '1.0.0', date: '2026-10-07' },
  governance: { id: 'RAHINO_07', version: '1.0.0', date: '2026-10-07' },
  package: {
    name: pkg.name,
    version: pkg.version,
    status: 'unpublished' as const,
    license: pkg.license,
    description: pkg.description,
    source: 'file:../rahino-ui' as const,
  },
} as const;

export const RELEASE_NOTE =
  'قرارداد بنیان‌ها ۲.۰.۰ است. بسته @rahinoco/rahino-ui نسخهٔ package.json و unpublished است. پذیرش سند، اجزا را canonical نمی‌کند.';
