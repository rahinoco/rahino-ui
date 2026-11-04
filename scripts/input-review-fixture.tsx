import { createRoot } from 'react-dom/client';
import { useRef, useState } from 'react';
import { Copy, Eye, EyeOff, Search } from 'lucide-react';
import Input from '../src/components/Input';
import IconButton from '../src/components/IconButton';
import '../src/styles/rds-foundations.css';
import '../src/styles/fonts.css';
import '../src/components/button.css';
import '../src/components/input.css';

function Review() {
  const [value, setValue] = useState('');
  const [show, setShow] = useState(false);
  const [visible, setVisible] = useState<Record<string, boolean>>({});
  const [actions, setActions] = useState(0);
  const ref = useRef<HTMLInputElement>(null);
  return <main>
    <div id="behavior">
      <Input id="controlled" ref={ref} label="نام" value={value} onChange={event => setValue(event.target.value)} helperText="راهنما" error={value === 'bad' ? 'خطا' : undefined} aria-describedby="external" required />
      <span id="external">اطلاعات بیشتر</span>
      <output id="value">{value}</output>
      <button id="focus" onClick={() => ref.current?.focus()}>Focus</button>
      <Input id="password" label="رمز" type={show ? 'text' : 'password'} defaultValue="secret" dir="ltr" textScript="latin"
        endAdornment={<IconButton appearance="ghost" aria-label={show ? 'پنهان کردن رمز' : 'نمایش رمز'} onClick={() => setShow(!show)}>{show ? <EyeOff /> : <Eye />}</IconButton>} />
      <Input id="password-large" controlSize="lg" label="رمز بزرگ" type="password" dir="rtl"
        endAdornment={<IconButton appearance="ghost" aria-label="نمایش رمز بزرگ"><Eye /></IconButton>} />
      <Input id="both" label="جستجو" icon={<Search />} endAdornment={<span>تومان</span>} />
      <Input id="dense" label="برچسب پنهان" dense helperText="راهنمای ماندگار" />
      <Input id="explicit-invalid" label="خطای بیرونی" aria-invalid="true" />
      <form id="native-form"><Input id="uncontrolled" label="شناسه" defaultValue="RH-1" name="reference" /><button type="reset">Reset</button></form>
    </div>
    <output id="icon-actions">{actions}</output>
    <div id="icon-variants" className="review-grid">
      {(['md', 'lg'] as const).flatMap(controlSize => (['start', 'end'] as const).flatMap(position =>
        (['decorative', 'action', 'changing', 'disabled', 'readonly'] as const).map(kind => {
          const key = `${controlSize}-${position}-${kind}`;
          return <Input key={key} id={`icon-${key}`} label={key} controlSize={controlSize} iconPosition={position}
            type={kind === 'changing' && !visible[key] ? 'password' : 'text'} defaultValue={kind === 'changing' ? 'secret' : 'RH-1042'}
            icon={kind === 'decorative' ? <Search /> : kind === 'changing' ? (visible[key] ? <EyeOff /> : <Eye />) : <Copy />}
            disabled={kind === 'disabled'} readOnly={kind === 'readonly'}
            iconAction={kind === 'decorative' ? undefined : { label: `Action ${key}`,
              onClick: () => { setActions(count => count + 1); setVisible(previous => ({ ...previous, [key]: !previous[key] })); } }} />;
        })))}
    </div>
    <div className="review-grid">
      {(['md', 'lg'] as const).flatMap(controlSize => (['empty', 'filled', 'error', 'disabled', 'readonly', 'pending', 'icon'] as const).map(state => <div data-case={`${controlSize}/${state}`} key={`${controlSize}/${state}`}>
        <Input label="عنوان درخواست" controlSize={controlSize} defaultValue={state === 'empty' ? '' : 'ارسال به شعبه شمال'}
          error={state === 'error' ? 'عنوان درخواست را بررسی کنید' : undefined} helperText="این راهنما هنگام نوشتن باقی می‌ماند"
          disabled={state === 'disabled'} readOnly={state === 'readonly' || state === 'pending'} aria-busy={state === 'pending' || undefined}
          icon={state === 'icon' ? <Search /> : undefined} />
      </div>))}
    </div>
  </main>;
}
createRoot(document.getElementById('root')!).render(<Review />);
