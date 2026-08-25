import { QIPPO_CATALOG, qippoOnlyInventoryItems } from '../qippo/catalog';
import { INVENTORY, type InventoryItem } from './catalog';

/**
 * Qipper inventory plus Qippo Figma overlay.
 * Does not overwrite extracted Qipper fields.
 */
export function inventoryWithQippo(items: InventoryItem[] = INVENTORY): InventoryItem[] {
  const byId = new Map(QIPPO_CATALOG.map((item) => [item.mappedInventoryId ?? item.id, item]));
  const merged = items.map((item) => {
    const qippo = byId.get(item.id);
    if (!qippo) {
      if (item.status === 'missing' || item.status === 'proposed') return item;
      return { ...item, presence: 'qipper-only' as const };
    }
    return {
      ...item,
      qippoSource: qippo.figmaPath,
      presence: qippo.presence,
      notes: [item.notes, `Qippo: ${qippo.summary}`].filter(Boolean).join(' '),
    };
  });
  const known = new Set(merged.map((item) => item.id));
  return [...merged, ...qippoOnlyInventoryItems().filter((item) => !known.has(item.id))];
}
