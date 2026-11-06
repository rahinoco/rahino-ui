import { createRoot } from 'react-dom/client';
import { useState } from 'react';
import { MoneyCell } from '../src/components/DataTable/cells/MoneyCell';
import { MonoIdCell } from '../src/components/DataTable/cells/MonoIdCell';
import { RowActionCell } from '../src/components/DataTable/cells/RowActionCell';
import ConfirmationModal from '../src/components/ConfirmationModal';
import { DataLoadingState } from '../src/components/DataState';

function Review() {
  const [open, setOpen] = useState(false);
  const [calls, setCalls] = useState(0);
  return <main className="rds-stage" data-appearance="light" data-rds-theme="light" dir="rtl" style={{ padding: 24 }}>
    <div className="rds-table" id="helpers" onClick={() => setCalls(n => n + 100)}>
      <MoneyCell amount={12345} /><MoneyCell amount={12345} emphasize /><MoneyCell emptyLabel="بدون مبلغ" />
      <MonoIdCell prefix="A-123" suffix="۴۵۶" label="شناسه پرونده" />
      <RowActionCell onAction={() => setCalls(n => n + 1)} />
    </div>
    <output id="calls">{calls}</output>
    <DataLoadingState />
    <button type="button" onClick={() => setOpen(true)}>Open confirmation</button>
    <ConfirmationModal isOpen={open} onClose={() => setOpen(false)} onConfirm={() => setOpen(false)} title="تأیید عملیات" message="این یک نمونه بازبینی است" confirmText="تأیید" cancelText="انصراف" />
  </main>;
}
createRoot(document.getElementById('root')!).render(<Review />);
