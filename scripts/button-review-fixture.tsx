import { createRoot } from 'react-dom/client';
import { useState } from 'react';
import { ArrowRight, List, Plus } from 'lucide-react';
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
        <ToggleButton radius="more" iconStart={<List data-example-icon="toggle" />}>Toggle</ToggleButton>
        <Button radius="more" href="#destination">Navigate</Button>
        <Button radius="more" href="#blocked" loading>Blocked link</Button>
        <output>{calls}</output>
      </div>
      <div id="toggle-motion-review">
        {(['sm', 'md', 'lg'] as const).map(size => (
          <div key={size} data-toggle-size={size}>
            <Button size={size}>دنبال کردن</Button>
            <ToggleButton size={size}>دنبال کردن</ToggleButton>
          </div>
        ))}
      </div>
      <div id="icon-direction-review">
        <Button iconStart={<ArrowRight />} mirrorStart>Direction</Button>
        <Button iconStart={<Plus />}>Add</Button>
        <IconButton mirror aria-label="Directional action"><ArrowRight /></IconButton>
        <IconButton mirror loading aria-label="Directional loading"><ArrowRight /></IconButton>
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
                          {kind === 'IconButton' ? <IconButton {...props} aria-label="Add"><Plus /></IconButton>
                            : kind === 'ToggleButton' ? <ToggleButton {...props} defaultPressed={state === 'selected'}>انتخاب</ToggleButton>
                              : <Button {...props} iconStart={<Plus />}>ذخیره</Button>}
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
      <div data-geometry-case>
        <Button style={{ width: '123.375px', height: '44.625px' }}>ثبت نمونه</Button>
      </div>
    </main>
  );
}

createRoot(document.getElementById('root')!).render(<Review />);
