import { createRoot } from 'react-dom/client';
import { useState } from 'react';
import Checkbox from '../src/components/Checkbox';
import '../src/styles/rds-foundations.css';
import '../src/styles/fonts.css';
import '../src/components/checkbox.css';

function Review() {
  const [checked, setChecked] = useState(false);
  const [mixed, setMixed] = useState(true);
  const [all, setAll] = useState(false);
  const [calls, setCalls] = useState(0);
  return <main>
    <h1>Checkbox · state review</h1><p>Candidate · human approval pending</p>
    <div id="behavior">
      <Checkbox checked={checked} onChange={next => { setChecked(next); setCalls(n => n + 1); }} label="Delivery updates" description="A description" type="item-desc" />
      <Checkbox checked={all} indeterminate={mixed} onChange={next => { setMixed(false); setAll(next); }} label="Select all" />
      <Checkbox disabled label="Unavailable" onChange={() => setCalls(n => n + 1)} />
      <Checkbox aria-label="Standalone" />
      <output>{calls}</output>
    </div>
    {(['simple', 'item', 'item-desc'] as const).map(type => <section key={type}>
      <h2>{type}</h2>
      <div className="review-grid">
        {(['unchecked', 'checked', 'mixed'] as const).flatMap(state => [false, true].map(disabled => <div data-case={`${type}/${state}/${disabled ? 'disabled' : 'enabled'}`} key={`${state}/${disabled}`}>
          <p>{state} · {disabled ? 'disabled' : 'enabled'}</p>
          <Checkbox type={type} checked={state === 'checked'} indeterminate={state === 'mixed'} disabled={disabled}
            label="خبرهای ارسال بسته" description="با انتخاب این گزینه، وضعیت ارسال بسته اطلاع داده می‌شود." />
        </div>))}
      </div>
    </section>)}
  </main>;
}
createRoot(document.getElementById('root')!).render(<Review />);
