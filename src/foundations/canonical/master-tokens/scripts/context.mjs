import policy from '../context-policy.json' with { type: 'json' };
import { selectContext } from './color-policy.mjs';

/** Select a foundation context; applications supply current preference values. */
export function resolveContext(settings = {}, environment = {}) {
  return selectContext(policy, settings, environment);
}
