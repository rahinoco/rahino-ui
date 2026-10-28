import pkg from '../../package.json';
import master from './canonical/master-tokens/manifest.json';

/** Dated source snapshot, not a new semantic release version. Package release stays independent. */
export const FOUNDATION_MANIFEST = {
  document: 'RAHINO_FOUNDATIONS_MASTER',
  documentVersion: '2026-10-28',
  documentDate: '2026-10-28',
  tokenVersion: '2026-10-28',
  packageVersion: pkg.version,
  status: master.status,
  packageRelease: 'unpublished',
  platforms: ['web'], runtime: 'React 19 + Vite', language: 'fa', direction: 'rtl',
  owner: 'design-and-product',
  adoptedOn: '2026-10-26',
  source: 'src/foundations/canonical/master-tokens',
  notes: [
    'بنیان‌ها از مجموعهٔ اصلی پذیرفته‌شده در ۲۰۲۶/۱۰/۲۸ تولید می‌شوند؛ این تاریخ شمارهٔ انتشار بسته نیست.',
    'پذیرش بنیان‌ها به معنی تأیید همهٔ اجزای محصول نیست.',
    'پروفایل‌های دقت عدد، نشانه‌های تشخیص اجزا و طراحی presentation در منبع به کار بعدی موکول شده‌اند.',
    'فونت فارسی IRANYekanX و فونت لاتین Roboto Condensed است. مجوز توزیع فونت نامعلوم است.',
  ],
} as const;
