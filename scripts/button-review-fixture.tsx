import { createRoot } from 'react-dom/client';
import { useState } from 'react';
import Button from '../src/components/Button';
import IconButton from '../src/components/IconButton';
import ToggleButton from '../src/components/ToggleButton';
import '../src/styles/rds-foundations.css';
import '../src/styles/fonts.css';
import '../src/components/button.css';

function Review() {
  const [calls, setCalls] = useState(0);
  const [loading, setLoading] = useState(false);
  return (
    <main>
      <h1>Button foundation review</h1>
      <p>Candidate · human approval pending</p>
      <div id="behavior">
        <Button radius="more" loading={loading} onClick={() => { setCalls(value => value + 1); setLoading(true); }}>Save</Button>
        <Button onClick={() => setLoading(false)}>Finish</Button>
        <ToggleButton radius="more" iconStart={<svg data-example-icon="toggle" />}>Toggle</ToggleButton>
        <Button radius="more" href="#destination">Navigate</Button>
        <Button radius="more" href="#blocked" loading>Blocked link</Button>
        <output>{calls}</output>
      </div>
      {(['less', 'more'] as const).map(radius => (
        <section key={radius} data-review-radius={radius}>
          <h2>{radius === 'less' ? 'Less · radius.8' : 'More · radius.12'}</h2>
          {(['solid', 'soft', 'ghost'] as const).flatMap(appearance =>
            (['neutral', 'brand', 'danger'] as const).map(intent => (
              <div key={`${appearance}-${intent}`} className="review-row">
                <h3>{appearance} / {intent}</h3>
                {(['sm', 'md', 'lg'] as const).flatMap(size =>
                  (['Button', 'IconButton', 'ToggleButton'] as const).flatMap(kind =>
                    (['default', 'disabled', 'loading', ...(kind === 'ToggleButton' ? ['selected'] as const : [])] as const).map(state => {
                      const id = [radius, appearance, intent, size, kind, state].join('-');
                      const props = { radius, appearance, intent, size, disabled: state === 'disabled', loading: state === 'loading' };
                      return (
                        <span key={id} data-case={id} data-state={state} data-kind={kind}>
                          {kind === 'IconButton' ? <IconButton {...props} aria-label="Add"><span>+</span></IconButton>
                            : kind === 'ToggleButton' ? <ToggleButton {...props} defaultPressed={state === 'selected'}>انتخاب</ToggleButton>
                              : <Button {...props}>ذخیره</Button>}
                        </span>
                      );
                    }),
                  ),
                )}
              </div>
            )),
          )}
        </section>
      ))}
      <div id="destination">Destination</div>
    </main>
  );
}

createRoot(document.getElementById('root')!).render(<Review />);
