import { createRoot } from 'react-dom/client';
import { useState } from 'react';
import { List, LayoutGrid, Columns3, Calendar } from 'lucide-react';
import { SegmentedControl, type SegmentedControlProps } from '../src/components/SegmentedControl';
import '../src/styles/rds-foundations.css';
import '../src/styles/fonts.css';
import '../src/components/segmented-control.css';

const options = [{ value: 'a', label: 'فهرست', icon: List }, { value: 'b', label: 'شبکه', icon: LayoutGrid, disabled: true }, { value: 'c', label: 'تابلو', icon: Columns3 }, { value: 'd', label: 'تقویم', icon: Calendar }];
type Config = { theme: 'light' | 'dark'; contrast: 'standard' | 'more'; dir: 'rtl' | 'ltr'; tone: 'neutral' | 'brand'; size: 'sm' | 'md' | 'lg'; icons: boolean; disabled: boolean; selectedDisabled: boolean; removed: boolean; fullWidth: boolean; manual: boolean; long: boolean; allDisabled: boolean; invalid: boolean };
declare global { interface Window { configureSegments: (patch: Partial<Config>) => void } }
function Review() {
  const [config, setConfig] = useState<Config>({ theme: 'light', contrast: 'standard', dir: 'ltr', tone: 'neutral', size: 'md', icons: true, disabled: false, selectedDisabled: false, removed: false, fullWidth: false, manual: false, long: false, allDisabled: false, invalid: false });
  window.configureSegments = patch => setConfig(current => ({ ...current, ...patch }));
  const [value, setValue] = useState('a');
  const [calls, setCalls] = useState(0);
  const items = options.filter(option => !config.removed || option.value !== 'a').map(option => ({ ...option,
    icon: config.icons ? option.icon : undefined,
    disabled: config.allDisabled || (config.selectedDisabled && option.value === value) || option.disabled,
    label: config.long ? `${option.label} برای بررسی عنوان بلند و فضای محدود` : option.label,
  }));
  const props: Partial<SegmentedControlProps> = { tone: config.tone, size: config.size, disabled: config.disabled, fullWidth: config.fullWidth, keyboardActivation: config.manual ? 'manual' : 'automatic' };
  return <main className="rds-stage" data-rds-theme={config.theme} data-rds-contrast={config.contrast} data-appearance={config.theme} data-contrast={config.contrast} dir={config.dir}>
    <h1>Segmented control — review candidate</h1>
    <button id="before" type="button">Before</button>
    <SegmentedControl id="subject" label="نمایش" options={items} value={config.invalid ? 'missing' : value} onChange={next => { setValue(next); setCalls(n => n + 1); }} {...props} />
    <button id="after" type="button">After</button>
    <SegmentedControl id="independent" label="گروه مستقل" options={options} />
    <SegmentedControl id="uncontrolled" aria-label="Uncontrolled" defaultValue="c" options={options} />
    <SegmentedControl id="empty" label="Empty" options={[]} />
    <output id="changes">{JSON.stringify({ value, calls })}</output>
  </main>;
}
createRoot(document.getElementById('root')!).render(<Review />);
