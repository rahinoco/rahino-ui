import pkg from '../../package.json';
import type { ContractPage } from '@/contracts/blocks';
import { RELEASE } from '@/contracts/release';

const depRows = Object.entries({ ...pkg.dependencies, ...pkg.peerDependencies }).map(([name, version]) => [
  name,
  String(version),
  'rahino-ui/package.json',
  name === 'framer-motion' || name === 'lucide-react' || name === 'clsx' || name === 'tailwind-merge' || name === 'persian-date-kit'
    ? 'در استفادهٔ بسته'
    : 'peer',
]);

export const DEVELOP_PAGES: ContractPage[] = [
  {
    id: 'install',
    docId: 'DV02',
    path: '/develop/install',
    title: 'نصب و مصرف',
    lede: `${RELEASE.package.name} نسخهٔ ${RELEASE.package.version} و ${RELEASE.package.status} است. قرارداد بنیان‌ها ${RELEASE.foundations.version} است. از این دو شماره دستور نصب یکی ساخته نمی‌شود.`,
    sections: [
      {
        id: 'modes',
        title: 'حالت‌های مصرف',
        blocks: [
          { kind: 'p', text: 'نصب از registry آماده نیست. مسیر محلی همین چیدمان file:../rahino-ui است. alias توسعه به ../rahino-ui/src/index.ts و استایل به styles.css است. deep import داخلی قرارداد عمومی نیست.' },
          {
            kind: 'table',
            headers: ['حالت', 'استفاده', 'شرط'],
            rows: [
              ['وابستگی محلی', 'توسعهٔ دو ریپوی کنار هم', 'file:../rahino-ui و alias واقعی Vite و TypeScript'],
              ['artifact از tag یا commit', 'آزمون نسخهٔ مشخص', 'بستهٔ buildشده هنوز مسیر مصرف این سایت نیست'],
              ['نسخهٔ registry', 'مصرف پایدار', 'منتشر نشده؛ دستور نصب registry داده نمی‌شود'],
              ['candidate', 'ارزیابی محدود', 'اجزای استخراج‌شده candidateاند و opt-in ضمنی canonical نیست'],
            ],
          },
          { kind: 'code', text: `import { Button, ThemeProvider } from '${RELEASE.package.name}';\nimport '${RELEASE.package.name}/styles.css';`, note: 'ورود واقعی public export و styles.css. provider از حدس ساخته نشده؛ ThemeProvider در index بسته export شده است.' },
          { kind: 'p', text: `peer وابستگی React در package.json بسته ${pkg.peerDependencies.react} است. SSR و React Native adapter و آزمون ندارند و پشتیبانی‌شده نیستند. مجوز کد ${RELEASE.package.license} است و با مجوز فونت یکی نیست.` },
        ],
      },
      {
        id: 'repos',
        title: 'مرز مخزن‌ها',
        blocks: [
          { kind: 'note', text: 'DV01. rahino-ui قرارداد و اجزای مشترک را نگه می‌دارد و store محصول، مجوز کسب‌وکار و API مالی را نگه نمی‌دارد. frontend نسخهٔ مستقل توکن یا approval نمی‌سازد.' },
          {
            kind: 'table',
            headers: ['محل', 'مسئولیت', 'منتقل نمی‌شود'],
            rows: [
              ['rahino-ui', 'قرارداد، توکن، اجزای مشترک، metadata', 'store محصول و منطق سرور'],
              ['rahino-ui-frontend', 'مستندات، ناوبری، زمین بازی و آزمایشگاه', 'approval اجزا'],
              ['مخزن محصول', 'داده، routing، state مشترک و recipe اختصاصی', 'کپی بی‌ارتباط از جزء'],
              ['Figma', 'مشخصات بصری هم‌نسخه', 'بازنویسی خودکار کد'],
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'theming',
    docId: 'DV03',
    path: '/develop/theming',
    title: 'تم و توکن',
    lede: 'کامپوننت نقش معنایی مصرف می‌کند. این صفحه طرح نام‌گذاری دوم نمی‌سازد. جدول رنگ، Veil، Lift و تایپوگرافی در بنیان‌هاست.',
    sections: [
      {
        id: 'theme',
        title: 'مسیر تغییر',
        blocks: [
          { kind: 'links', items: [{ title: 'توکن‌ها', path: '/foundations/tokens' }, { title: 'رنگ', path: '/foundations/colors' }, { title: 'سطوح حائل', path: '/foundations/veil' }, { title: 'ارتفاع', path: '/foundations/lift' }, { title: 'تایپوگرافی', path: '/foundations/typography' }] },
          {
            kind: 'table',
            headers: ['تغییر', 'محل'],
            rows: [
              ['انتخاب preset', 'ThemeProvider واقعی بسته'],
              ['ظاهر', 'محور light یا dark یا system'],
              ['تغییر معنای نقش', 'پیشنهاد تغییر قرارداد، نه override محلی'],
              ['آزمایش ارزش تازه', 'زمین بازی با برچسب، بدون عوض کردن منبع حقیقت'],
            ],
          },
          { kind: 'p', text: 'پنج درجهٔ Veil برابر trace، air، core، shelter و opaque است. opaque همچنان نیمه‌شفاف است. سطح عادی plain مسیر جداست، نه درجهٔ ششم. گرادینت در کنترل، sidebar و header وارد نمی‌شود. Reduce Motion و کنتراست بالا فراموش نمی‌شوند.' },
          { kind: 'p', text: 'لاتین Roboto Condensed است و فایل متغیر آن در بسته با محور wght از ۱۰۰ تا ۹۰۰ ثبت شده. وزن ۶۰۰ فارسی فایل IRANYekanX-DemiBold.woff2 است. مجوز توزیع فونت نامعلوم است.' },
        ],
      },
    ],
  },
  {
    id: 'state',
    docId: 'DV04',
    path: '/develop/state',
    title: 'وضعیت',
    lede: 'Zustand روش انتخاب‌شده برای state مشترک کلاینت در محصول است. مصرف @rahinoco/rahino-ui به نصب Zustand وابسته نیست. هر جزء قرارداد واقعی خودش را دارد و همه به value و onChange اجبار نمی‌شوند.',
    sections: [
      {
        id: 'places',
        title: 'محل هر داده',
        blocks: [
          {
            kind: 'table',
            headers: ['نوع', 'محل مناسب', 'مثال'],
            rows: [
              ['تعامل موقت یک جزء', 'state محلی یا prop کنترل‌شده', 'باز بودن همان مودال'],
              ['تعامل مشترک چند بخش', 'state در والد', 'انتخاب مشترک دو پنل'],
              ['state مشترک کلاینت', 'Zustand در لایهٔ محصول', 'فضای کاری فعال'],
              ['قابل پیوند', 'URL و react-router', 'فیلتر و تب زمین بازی'],
              ['دادهٔ سرور', 'لایهٔ دریافت محصول', 'فهرست؛ ابزار fetch در این بسته انتخاب نشده'],
              ['پیش‌نویس فرم', 'state فرم یا محلی', 'مقدار ورودی و dirty'],
              ['توکن و ظاهر', 'ThemeProvider', 'light و dark؛ دوام در محصول'],
            ],
          },
          { kind: 'p', text: 'خواندن store اختیار دسترسی سرور را جایگزین نمی‌کند. تبدیل همهٔ داده‌ها به یک store الزامی نیست. Zustand در package.json این دو ریپو نیست.' },
        ],
      },
      {
        id: 'wiring',
        title: 'اتصال به جزء',
        blocks: [
          { kind: 'p', text: 'دکمه onClick دارد، نه value. مودال isOpen و onClose دارد، نه open و onOpenChange. ورودی value و onChange از ویژگی‌های input دارد. نام‌ها از API همان جزء می‌آیند.' },
          { kind: 'links', items: [{ title: 'دکمه', path: '/components/button' }, { title: 'مودال', path: '/components/modal' }, { title: 'ورودی', path: '/components/input' }] },
          { kind: 'sample', id: 'state-split' },
          { kind: 'code', text: `<Button type="button" onClick={() => setSaved(true)}>ذخیره</Button>`, note: 'این قطعه store نمی‌سازد. type و onClick از Button واقعی‌اند.' },
        ],
      },
    ],
  },
  {
    id: 'libraries',
    docId: 'DV05',
    path: '/develop/libraries',
    title: 'ابزارها',
    lede: 'ابزار بخشی از API دیزاین سیستم نیست. بودن در package.json مصوب بودن برای همهٔ محصولات را ثابت نمی‌کند. ابزاری که اینجا نیست ساخته‌شده معرفی نمی‌شود.',
    sections: [
      {
        id: 'catalog',
        title: 'آنچه در بسته هست',
        blocks: [
          { kind: 'table', headers: ['نام', 'نسخه در package.json', 'منبع', 'وضعیت'], rows: depRows },
          { kind: 'p', text: 'react-router-dom در rahino-ui-frontend برای URL این سایت است، نه وابستگی rahino-ui. Zustand انتخاب محصول است و نصب نشده. کتابخانهٔ فرم، دریافت داده، جدول مجازی و نمودار در این بسته انتخاب نشده‌اند و «در استفاده» حساب نمی‌شوند.' },
          { kind: 'p', text: 'Lucide در وابستگی‌ها هست؛ نهایی بودن مجموعهٔ آیکون به review ثبت‌شده نیاز دارد و این صفحه آن را مصوب اعلام نمی‌کند. Storybook در اسکریپت frontend هست؛ پوستهٔ سایت راهی‌نو است و قالب Storybook سایت نهایی نیست.' },
        ],
      },
    ],
  },
  {
    id: 'i18n',
    docId: 'DV06',
    path: '/develop/i18n',
    title: 'فارسی و محتوای پویا',
    lede: 'نمایش، parsing و دادهٔ اصلی جدا هستند. قواعد متن از بخش محتوا می‌آید. این صفحه API پیام فرضی را آمادهٔ مصرف معرفی نمی‌کند.',
    sections: [
      {
        id: 'format',
        title: 'نمایش',
        blocks: [
          { kind: 'links', items: [{ title: 'محتوا', path: '/content/writing' }, { title: 'اعداد', path: '/foundations/numbers' }, { title: 'جهت', path: '/foundations/direction' }] },
          {
            kind: 'table',
            headers: ['قاعده', 'نتیجه'],
            rows: [
              ['ارقام فارسی، عربی و لاتین در ورودی عددی', 'parsing یکدست، بدون از بین بردن مکان نشانگر'],
              ['صفر اولیهٔ شناسه', 'تلفن و شناسه عدد محاسباتی نیستند'],
              ['جهت مستقل literal', 'URL و ایمیل و کد در RTL به‌هم نمی‌ریزند'],
              ['واحد صریح', 'تومان و ریال با تعویض label به هم تبدیل نمی‌شوند'],
              ['تقویم', 'شمسی پیش‌فرض؛ تغییر تقویم دادهٔ تاریخ را عوض نمی‌کند'],
              ['پیام', 'جملهٔ کامل با متغیر نام‌دار، نه چسباندن قطعه'],
            ],
          },
          { kind: 'p', text: 'شکل فارسی عدد با فونت، جای تبدیل نویسه را نمی‌گیرد. ارقام کاربری با IRANYekanX می‌مانند و متن لاتین Roboto Condensed است. وزن ۶۰۰ فارسی فایل IRANYekanX-DemiBold.woff2 است. هر formatter باید نوع ورودی، null، صفر، منفی، دقت و رفتار کپی را مشخص کند.' },
        ],
      },
      {
        id: 'messages',
        title: 'نگهداری پیام',
        blocks: [
          { kind: 'note', text: 'این بخش دستور اجرایی داخلی سند محتواست و جزء متن هر صفحهٔ محتوا نیست. طرح داده است، نه API آمادهٔ مصرف.' },
          { kind: 'p', text: 'قواعد و واژه‌نامهٔ مشترک در مستندات نسخه‌دار rahino-ui نگهداری می‌شوند. متن اختصاصی هزینه، دفتر مالی یا ابزار دیجیکس در مخزن محصول با مالک همان دامنه است. rahino-ui متن‌ها و امکان شخصی‌سازی لازم برای اجزای عمومی را نگه می‌دارد. منطق کسب‌وکار و ترجمهٔ همهٔ محصولات به هستهٔ کتابخانه منتقل نمی‌شوند.' },
          {
            kind: 'table',
            headers: ['فیلد', 'معنی'],
            rows: [
              ['id', 'شناسهٔ پایدار مانند expense.save.unknown'],
              ['locale', 'زبان پیام؛ مستقل از تقویم و واحد پول'],
              ['text', 'جملهٔ کامل با متغیرهای نام‌دار'],
              ['variables', 'نام، نوع، قالب و حساسیت متغیرها'],
              ['trigger', 'شواهد یا وضعیت واقعی لازم برای نمایش'],
              ['action', 'عمل مرتبط، یا تصریح نبود اقدام'],
              ['severity', 'پیامد و فوریت واقعی'],
              ['destination', 'محل نمایش و قرارداد اعلام تغییر'],
              ['owner', 'مالک دامنه و محتوا'],
              ['status', 'پیشنهادی، پذیرفته‌شده یا منسوخ با سابقه'],
              ['related', 'جزء، الگو و تصمیم مرتبط'],
            ],
          },
          { kind: 'code', text: '{\n  "id": "expense.save.unknown",\n  "locale": "fa",\n  "text": "نتیجهٔ ثبت هنوز مشخص نیست. وضعیت را بررسی کنید.",\n  "variables": [],\n  "trigger": "save_outcome_unknown",\n  "action": "check_existing_operation",\n  "severity": "attention",\n  "destination": "persistent_operation_status",\n  "owner": "product-content-owner",\n  "status": "proposed"\n}', note: 'نمونهٔ مفهومی. وجود چنین API یا فایل اجرایی را فرض نکنید.' },
          { kind: 'p', text: 'ترجمه و interpolation مطابق ابزار واقعی پروژه انجام می‌شود. دادهٔ حساس برای تهیهٔ مثال یا analytics بدون قرارداد حریم خصوصی ثبت نمی‌شود.' },
          { kind: 'list', items: [
            'نام عمل، مقصد و اثر آن درست است.',
            'متن با وضعیت واقعی و حالت‌های نتیجهٔ نامعلوم سازگار است.',
            'نام‌ها و واژه‌ها مطابق واژه‌نامه‌اند.',
            'واحد، رقم، جهت و تاریخ از بنیان‌ها مصرف شده‌اند.',
            'عنوان، label و نام دسترس‌پذیر با هم سازگارند.',
            'متن در عرض کم، بزرگ‌نمایی و حالت چندخطی قابل استفاده است.',
            'پیام ضروری با لمس، کیبورد و فناوری کمکی در دسترس است.',
            'وعدهٔ امنیت، حفظ داده یا نتیجهٔ مالی پشتوانه دارد.',
            'تفاوت لحن محصول محدود، قابل توضیح و در موقعیت حساس مهار شده است.',
            'تغییر پیام حساس یا واژهٔ دارای معنای تازه، تصمیم و مالک ثبت‌شده دارد.',
          ] },
        ],
      },
    ],
  },
  {
    id: 'ai',
    docId: 'DV07',
    path: '/develop/ai',
    title: 'توسعه با هوش مصنوعی',
    lede: 'AI تصمیم طراحی، قابلیت منتشرشده و مجوز تصویب را از روی ظاهر preview نمی‌سازد. فایل aidesignrules.md به‌تنهایی خوانده نمی‌شود.',
    sections: [
      {
        id: 'mission',
        title: 'ورودی مأموریت',
        blocks: [
          {
            kind: 'table',
            headers: ['ورودی', 'نمونه'],
            rows: [
              ['هدف', 'کار مشخص با اجزای موجود'],
              ['منابع', 'قرارداد ۲.۰.۰ و export واقعی ۰.۱.۰'],
              ['دامنه', 'فایل‌های مجاز'],
              ['خارج از دامنه', 'بازنویسی توکن، تعویض وابستگی، علامت canonical'],
              ['پذیرش', 'سناریو، typecheck و review انسانی'],
            ],
          },
          { kind: 'ol', items: [
            'اول قرارداد و API نسخهٔ مورد مصرف را بخوان.',
            'از public export و نقش معنایی استفاده کن.',
            'برای نیاز تازه اول composition و recipe محلی را ببین.',
            'state و متن و داده را در دامنهٔ واقعی نگه دار.',
            'loading و خطا و نتیجهٔ نامعلوم را فقط جایی که مربوط است بساز.',
            'dependency و token و component تازه را از اصلاح صفحه جدا کن.',
            'در تعارض، منبع را ثبت کن و قانون تازه را پنهانی تثبیت نکن.',
            'اگر قاعده پذیرفته شده و فایل ندارد، آن را تصمیم باز نخوان؛ کمبود اجرا را بنویس.',
            'فایل آرشیو منبع فعال نیست مگر برای استخراج سابقه. export شدن reference آن را canonical نمی‌کند.',
          ] },
        ],
      },
      {
        id: 'review',
        title: 'معیار بررسی توسعه',
        blocks: [
          { kind: 'note', text: 'DV09. نوشتن این جدول ابزار تازه نمی‌سازد و scope را تأییدشده اعلام نمی‌کند.' },
          {
            kind: 'table',
            headers: ['نوع تغییر', 'بررسی مناسب'],
            rows: [
              ['متن و لینک', 'صحت پیام، مقصد و navigation مرتبط'],
              ['نمونهٔ اجرایی', 'compile در consumer و تطبیق preview با code'],
              ['رفتار جزء', 'تست interaction برای رفتار واقعی و keyboard'],
              ['token', 'schema، alias، generated output و مصرف‌کنندگان'],
              ['theme / material', 'ظاهرهای مرتبط، contrast، plain و reduced settings'],
              ['layout', 'عرض محدود، متن بلند، zoom و scrolling'],
              ['dependency / public API', 'build مستقل، compatibility و اثر bundle'],
              ['release', 'محتویات package، حقوق دارایی‌ها، changelog و migration'],
            ],
          },
          { kind: 'p', text: 'یک build سبز typecheck، keyboard و پذیرش بصری را اثبات نمی‌کند. فقط وقتی کل scope بررسی شده، همان scope می‌تواند تأییدشده اعلام شود و آن هم با رکورد انسانی است. خطای قبلی با owner و اثر جدا ثبت می‌شود. تغییر جدید پشت خطای قدیمی پنهان نمی‌ماند.' },
          { kind: 'p', text: 'تست با ریسک انتخاب می‌شود. برای اصلاح سادهٔ متن، تستی که همان متن را تکرار کند لازم نیست. برای modal، parsing مبلغ و callback state، رفتار واقعی باید بررسی شود.' },
        ],
      },
      {
        id: 'attach',
        title: 'اتصال فایل قواعد',
        blocks: [
          { kind: 'p', text: 'aidesignrules.md در rahino-ui-frontend است. نام فایل به‌تنهایی باعث خواندن خودکار نمی‌شود. در Cursor یک قانون پروژه بسازید که قبل از ویرایش این نظام، همان فایل را بخواند. سه لایه کافی است: قواعد کوتاه همان فایل، manifest نسخه در rahino-ui/src/contracts/release.ts، و صفحات مستندات.' },
          { kind: 'p', text: 'فهرست props در فایل AI تکثیر نمی‌شود. جدول API از componentApi.ts و نوع همان جزء می‌آید.' },
          { kind: 'links', items: [{ title: 'وضعیت', path: '/meta/status' }] },
        ],
      },
    ],
  },
  {
    id: 'resources',
    docId: 'DV10',
    path: '/develop/resources',
    title: 'منابع قابل دریافت',
    lede: 'تا وقتی مجوز توزیع ثبت نشده، فونت و لوگو دارایی عمومی قابل دریافت معرفی نمی‌شوند.',
    sections: [
      {
        id: 'downloads',
        title: 'چه چیزی همراه منبع لازم است',
        blocks: [
          {
            kind: 'table',
            headers: ['منبع', 'وضعیت فعلی'],
            rows: [
              ['package', `${RELEASE.package.name} ${RELEASE.package.version} ${RELEASE.package.status}؛ مجوز ${RELEASE.package.license}`],
              ['توکن', 'قرارداد بنیان‌ها ۲.۰.۰ و CSS همان بسته'],
              ['aidesignrules.md', 'metadata پر شده؛ آمادهٔ بررسی، نه تصویب'],
              ['Figma', 'mirror هم‌نسخه در این ریپو به‌عنوان دانلود ثبت نشده'],
              ['لوگو', 'مجوز نامعلوم'],
              ['فونت', 'IRANYekanX در ۴۰۰ و ۵۰۰ و ۶۰۰ و ۷۰۰ و ۸۰۰ و Roboto Condensed متغیر در بسته ثبت شده‌اند. مجوز توزیع نامعلوم است'],
            ],
          },
          { kind: 'links', items: [{ title: 'مجوزها', path: '/meta/licenses' }, { title: 'زمین بازی', path: '/playground' }, { title: 'آزمایشگاه', path: '/lab' }] },
          { kind: 'note', text: 'DV00 زمین بازی و آزمایشگاه را در همین راهنما جا می‌دهد. آن دو مسیر جدا مانده‌اند و اینجا فقط پیوند دارند.' },
        ],
      },
    ],
  },
];
