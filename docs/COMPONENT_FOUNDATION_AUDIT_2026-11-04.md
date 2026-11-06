# بررسی انطباق کامپوننت‌های تازه با foundation

تاریخ: ۲۰۲۶-۱۱-۰۴. دامنه: خانواده Button، Checkbox، Input، Select، SegmentedControl، DataTable و سلول‌های کمکی آن، DataState؛ همراه با بررسی وابستگی Modal، ConfirmationModal و Card و چهار فایل سبک صفحات مرور.

این گزارش تأیید طراحی یا دسترس‌پذیری همه حالت‌ها نیست. وضعیت تأیید انسانی همچنان pending است. درخواست کوچک‌سازی مجدد segmented control با دستور بعدی کاربر برگشت داده شد: ارتفاع بخش‌های sm/md/lg برابر ۳۲/۳۶/۴۴ پیکسل، فاصله قاب ۴ پیکسل و offset فوکوس صفر باقی می‌ماند.

## نتیجه بررسی توکن‌ها

- بررسی ایستا ۱۱ فایل CSS و ۲۰ فایل TSX را پوشش می‌دهد. زنجیره وابستگی ۱۸۹ متغیر مصرف‌شده تا تعریف‌ها دنبال شد؛ **هیچ نام تعریف‌نشده‌ای پیدا نشد**. در اجرای اولیه ۳۱۸ تعریف پیمایش شد.
- منبع canonical شامل shared/light/dark DTCG و ۱۶ سبک معنایی تایپوگرافی است. اعتبارسنجی رسمی aliases، نوع مقدارها و تازگی خروجی‌ها جدا با `npm run tokens:check` انجام می‌شود.
- رنگ‌های CSS اجزای بازطراحی‌شده به referenceهای موجود می‌رسند؛ `color-mix`، رنگ hex/rgb تازه، opacity سفارشی غیر از روشن/خاموش کردن لایه موجود، و shadow.lg در فایل‌های غیرمودال این دامنه دیده نشد. استفاده از alpha reference موجود با مقدار اصلی مجاز است.
- recipeهای محلی مثل `--rds-select-height` و `--rds-segmented-padding` توکن canonical مستقل نیستند؛ aliasهای محلی کامپوننت‌اند و تعریف و وابستگی آن‌ها بررسی شد. نام کامپوننت در این لایه مجاز است.
- متغیرهای grid جدول از props و CSS inline خود جدول می‌آیند. `--rds-font-family-content` انتخاب runtime زبان است و fallback موجود دارد؛ این‌ها نام گمشده نیستند.

**تعریف در CSS با تعریف canonical و زنجیره کامل rds → ref یکسان نیست.** برخی مقادیر از لایه سازگاری تولید می‌شوند؛ بنابراین نتیجه «صفر نام تعریف‌نشده» نباید به «تمام ابعاد توکن canonical دارند» تعبیر شود.

## کمبودهای foundation که باقی مانده‌اند

| مورد | وضعیت فعلی | پیشنهاد برای foundation؛ هنوز اعمال نشده |
| --- | --- | --- |
| `--rds-size-control-{sm,md,lg}-min-height` | CSS موجود: ۳۶/۴۴/۵۲؛ از `CONTROL_SIZE` در `src/foundations/metrics.ts` تولید می‌شود، ولی public path متناظر canonical و reference ابعاد آن ندارد. | خانواده مستقل از کامپوننت برای حداقل ارتفاع کنترل، با referenceهای ثابت و alias معنایی مستند شود. مقدار جدید از طرف این بررسی تصویب نشد. |
| `--rds-size-touch-min` | CSS موجود: ۴۴؛ مقدار سازگاری است. | نقش معنایی حداقل هدف لمس و reference آن به canonical منتقل شود. |
| `--rds-size-control-*-padding-*` و `*-label` | تعریف CSS دارند؛ بعضی مقدارها با scale موجود یکی‌اند، ولی این نام‌ها canonical نیستند. lg block padding برابر ۱۰ پیکسل است و در spacing scale کنونی نیست. | مقادیر مشترک به space/type موجود alias شوند. برای ۱۰ پیکسل، recipe یا تغییر به یک مقدار موجود صریحاً بررسی شود؛ صرفاً توکن تازه نسازیم. |
| `--rds-font-weight-control` و `--rds-focus-offset` | مقادیر سازگاری ۵۰۰ و ۲ پیکسل؛ منابع TS از weight.medium و space.50 می‌آیند ولی CSS خروجی literal است. | خروجی سازگاری به متغیر canonical موجود alias شود؛ نیاز به reference رنگ یا مقدار تازه نیست. |
| اندازه کوچک segmented control | `ref.size.32` موجود است و مستقیم استفاده می‌شود، ولی `rds` اختصاص‌یافته به نقش ارتفاع کنترل ۳۲ وجود ندارد. | در پیشنهاد خانواده ارتفاع کنترل پوشش داده شود؛ alias نامرتبط `space` یا اندازه آیکون را به‌جای آن مصرف نکنیم. |
| fill غیرفعال/انتخاب‌نشده Checkbox | referenceهای رنگ موجود مصرف می‌شوند؛ نقش معنایی fill کنترل انتخاب‌نشده هنوز پیشنهاد است. | [پیشنهاد موجود Checkbox](CHECKBOX_TOKEN_PROPOSAL.md) حفظ شده؛ نقش جدید بدون تصمیم طراحی اضافه نشد. |
| حداکثر ارتفاع منوی Select | `--rds-select-menu-max-height: 280px` recipe محلی مستند است، نه توکن foundation. | اگر این محدودیت برای چند سطح شناور مشترک شد، نقش reusable برای اندازه viewport پیشنهاد شود. برای هر عدد اجرایی توکن عمومی لازم نیست. |

سه reference رنگ مستقیم Checkbox/Input (`gray-warm.100`، `gray.600` و `white-alpha-10`) واقعاً وجود دارند. طبق قواعد workspace، مصرف مستقیم `ref.color.*` مجاز است؛ نبود alias جدید `rds.color.*` برای هر مصرف، به‌تنهایی نام تعریف‌نشده محسوب نمی‌شود.

ابعاد ۱ پیکسلی و margin منفی در الگوی visually-hidden برای دسترس‌پذیری، geometry اجرایی‌اند و رنگ یا اندازه بصری طراحی تازه نیستند. breakpointهای CSS نیز literalهای متناظر layout هستند؛ CSS custom property معمولی در media query قابل استفاده نیست. این موارد از خطای توکن متمایزند.

## اصلاحات انجام‌شده

| مورد | اصلاح |
| --- | --- |
| MoneyCell | حذف رنگ‌های legacy slate و وزن ۹۰۰؛ استفاده از ink.primary/secondary و تایپوگرافی/وزن foundation. |
| MonoIdCell | حذف تایپ ۹/۱۱ پیکسلی، radius شش‌پیکسلی و ring با alpha تازه؛ استفاده از type.code، caption، surface.sunken، radius.8 و space موجود. |
| RowActionCell | حذف دکمه دستی با opacity ساخته‌شده و اندازه/خط آیکون سفارشی؛ ترکیب Button با یک آیکون، برچسب قابل دیدن، فوکوس خانواده دکمه و توقف انتشار کلیک. |
| ردیف‌های DataTable | حذف shadow.sm دائمی از ردیف عادی؛ foundation سایه پیش‌فرض برای ردیف جدول ندارد. حالت‌های card/asset همچنان radius.16 دارند. |
| loading در DataState | حذف مصرف semantic مخصوص presentation؛ استفاده از recipe موجود spinner دکمه، feedback × 6 با easing.linear و حذف حرکت در reduced motion. توکن حرکت جدید اضافه نشد. |
| stroke آیکون مرتب‌سازی و DataState | جایگزینی مقدار پیش‌فرض Lucide با `rds.icon.stroke.width` موجود (۲٫۲۵)؛ اندازه آیکون‌ها هم از foundation می‌آید. |
| بستن Modal | جایگزینی دکمه دستی با IconButton موجود؛ گردی native و یک آیکون، فوکوس واقعی کیبورد و هدف لمس خانواده دکمه. |
| ConfirmationModal فارسی | قرارگیری تأیید در ابتدا و انصراف بعد از آن؛ در RTL تأیید راست و انصراف چپ، با ترتیب DOM و کیبورد یکسان. |

## محدودیت دامنه و موارد قدیمی

این گزارش clean بودن کل کتابخانه تاریخی را ادعا نمی‌کند. `RadioGroup`، `SegmentedPills`، `Tabs` قدیمی، Qippo و بخش‌های قدیمی کمکی Modal بازطراحی نشده‌اند. `DataTableColumnMenu` نیز implementation قدیمی جداگانه‌ای است که دیگر در DataTable جدید render نمی‌شود. در header/body و helperهای قدیمی Modal/ConfirmationModal هنوز utilityهای رنگ، spacing و تایپ محصول وجود دارد؛ آن‌ها باید در مهاجرت همان کامپوننت به‌صورت کامل بررسی شوند. تغییر دکمه بستن یا ترتیب footer به معنی انطباق کامل آن‌ها نیست.

یافته‌های contrast قبلی foundation، خصوصاً silhouette انتخاب‌نشده Checkbox و برخی جفت‌های focus/surface، با این بررسی حل یا تأیید نشده‌اند. نشان انتخاب segmented control طبق درخواست کاربر صرفاً سطح پر است؛ قابل تشخیص بودن این وضعیت همچنان نیازمند بازبینی انسانی است.

## اجرای مجدد

نتیجه اعتبارسنجی این نوبت: هر دو typecheck، build کتابخانه و سایت و `tokens:check` موفق بودند. تست صفحه SegmentedControl، تست کامل DataTable، تست Select داخل Modal و تست متمرکز سلول‌ها/ترتیب تأیید/فوکوس بستن مودال موفق شدند. بررسی SegmentedControl با اندازه‌های بازگردانده‌شده ۳۲/۳۶/۴۴ نیز ۶۷۲ حالت/context را گذراند و در جفت‌های اندازه‌گیری‌شده هیچ یافته contrast ثبت نکرد. این نتیجه با تأیید انسانی متفاوت است و استثناهای contrast خود foundation را رفع نمی‌کند.

در `rahino-ui`:

```text
node scripts/audit-component-foundations.mjs
npm run tokens:check
npm run typecheck
node scripts/check-foundation-audit-browser.mjs
node scripts/check-segmented-control-browser.mjs
```

در `rahino-ui-frontend`:

```text
npm run typecheck
npm run build
node scripts/check-segmented-control-page.cjs
node scripts/check-data-table-page.cjs
```

خروجی جزئی توکن‌ها: `tmp-verify/component-foundation-audit/results.json`. بررسی ایستا محدوده selectorها را اثبات نمی‌کند؛ تست مرورگر و بازبینی دستی مکمل آن‌اند. خروجی موفق script فقط نبود نام گمشده و موارد مکانیکی ممنوع در CSS دامنه را نشان می‌دهد و کمبودهای canonical جدول بالا را تأییدشده نمی‌کند.
