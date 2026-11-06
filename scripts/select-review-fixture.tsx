import { createRoot } from 'react-dom/client';
import { useState } from 'react';
import Select from '../src/components/Select';
import Checkbox from '../src/components/Checkbox';
import '../src/styles/rds-foundations.css';
import '../src/styles/fonts.css';
import '../src/components/checkbox.css';
import '../src/components/select.css';

const options = [{ value: 'a', label: 'Alpha' }, { value: 'b', label: 'Beta', disabled: true }, { value: 'c', label: 'Charlie' }, { value: 'd', label: 'Delta' }];
const persian = [{ value: 'one', label: 'ارسال عادی' }, { value: 'two', label: 'ارسال سریع' }, { value: 'three', label: 'دریافت حضوری' }, { value: 'four', label: 'گزینه غیرفعال', disabled: true }];
const long = Array.from({ length: 30 }, (_, i) => ({ value: String(i), label: i === 12 ? 'عنوان بسیار طولانی برای بررسی شکستن متن و حفظ عرض منو در نمایشگر کوچک بدون سرریز افقی' : `Branch ${i + 1}` }));
function Review() {
  const [single, setSingle] = useState('a');
  const [multi, setMulti] = useState<string[]>(['b']);
  const [calls, setCalls] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const [readonly, setReadonly] = useState(false);
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState(options);
  const [dialog, setDialog] = useState(false);
  const [checkbox, setCheckbox] = useState(false);
  return <main>
    <h1>Select · state review</h1><p>Review candidate · human approval pending</p>
    <section id="behavior" className="review-grid">
      <Select id="single" label="Single" value={single} onChange={value => { setSingle(value); setCalls(n => n + 1); }} options={items} searchable={false} disabled={disabled} readOnly={readonly} loading={loading} />
      <Select id="multi" label="Multiple" multiple value={multi} onChange={value => { setMulti(value); setCalls(n => n + 1); }} options={options} searchable={false} />
      <Select id="search" label="Search" options={options} />
      <Select id="multi-search" label="Multi search" multiple options={options} />
      <Select id="persian" label="Persian search" options={[{ value: 'fa', label: 'کیف یک' }, { value: 'other', label: 'ارسال' }]} />
      <Select id="long" label="Long list" options={long} defaultValue="12" searchable={false} />
      <Select id="duplicates" label="Duplicates" options={[options[0], { value: 'a', label: 'Duplicate' }, { value: '', label: 'Empty value' }, options[2]]} searchable={false} />
      <Select id="null" label="Null value" options={options} value={null} searchable={false} />
      <Select id="unlabeled" aria-label="Named filter" options={options} searchable={false} />
      <Select id="hint" label="With hint" helperText="Visible essential hint" options={options} />
      <Select id="error" label="With error" helperText="Replaced hint" error="Choose an option" required options={options} />
      <Select id="all-disabled" label="All disabled" options={options.map(option => ({ ...option, disabled: true }))} searchable={false} />
    </section>
    <div className="tools">
      <button onClick={() => setDisabled(value => !value)}>Toggle disabled</button>
      <button onClick={() => setReadonly(value => !value)}>Toggle readonly</button>
      <button onClick={() => setLoading(value => !value)}>Toggle loading</button>
      <button onClick={() => setItems(items.length ? [] : options)}>Toggle options</button>
      <button id="outside">Outside</button>
      <output id="changes">{JSON.stringify({ single, multi, calls })}</output>
    </div>
    <form id="form" onSubmit={event => event.preventDefault()}>
      <div className="review-grid">
        <Select id="form-single" label="Form single" name="single" required options={options} defaultValue="a" searchable={false} />
        <Select id="form-multi" label="Form multi" name="multi" multiple options={options} defaultValue={['a', 'b']} searchable={false} required />
        <Select id="form-empty" label="Form required" name="empty" required options={options} searchable={false} />
        <Select label="Form disabled" name="disabled" disabled defaultValue="a" options={options} />
        <Select label="Form readonly" name="readonly" readOnly required defaultValue="c" options={options} />
      </div>
      <button type="submit">Submit</button><button type="reset">Reset</button>
    </form>
    <Select id="external" label="External form" name="external" form="form" options={options} defaultValue="d" searchable={false} />
    <div className="clipped"><Select id="clipped" label="Clipped container" options={long} searchable={false} /></div>
    <button onClick={() => setDialog(true)}>Open dialog</button>
    {dialog ? <dialog open onKeyDown={event => { if (event.key === 'Escape') setDialog(false); }}>
      <Select id="dialog-select" label="Dialog select" options={options} searchable={false} /><button onClick={() => setDialog(false)}>Close dialog</button>
    </dialog> : null}
    <Checkbox label="Checkbox regression" checked={checkbox} onChange={setCheckbox} />
    {([false, true] as const).flatMap(multiple => ([false, true] as const).flatMap(searchable => (['sm', 'md', 'lg'] as const).map(size => <section key={`${multiple}/${searchable}/${size}`}>
      <h2>{multiple ? 'Multiple' : 'Single'} · {searchable ? 'Search' : 'Browse'} · {size}</h2><div className="review-grid">
        {(['empty', 'filled', 'error', 'disabled', 'readonly', 'loading', 'no-options', 'all-disabled', 'long'] as const).map(state => {
          const value = state === 'empty' || state === 'no-options' ? [] : ['one'];
          const stateOptions = state === 'no-options' ? [] : state === 'long' ? long : state === 'all-disabled' ? persian.map(option => ({ ...option, disabled: true })) : persian;
          const common = { options: stateOptions, controlSize: size, disabled: state === 'disabled', readOnly: state === 'readonly', loading: state === 'loading', searchable,
            label: `${multiple ? 'چندتایی' : 'تکی'} · ${state}`, helperText: 'راهنمای انتخاب', error: state === 'error' ? 'یک گزینه را انتخاب کنید' : undefined };
          return <div data-case={`${multiple ? 'multiple' : 'single'}/${size}/${searchable ? 'search' : 'browse'}/${state}`} key={state}>
            {multiple ? <Select {...common} multiple defaultValue={value} /> : <Select {...common} defaultValue={value[0]} />}
          </div>;
        })}
      </div>
    </section>)))}
  </main>;
}
createRoot(document.getElementById('root')!).render(<Review />);
