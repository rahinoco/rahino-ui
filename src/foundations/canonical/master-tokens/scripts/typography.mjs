import { json, flatten, resolve, display, isAlias } from './lib.mjs';

/** Assemble complete styles from master property bindings and preserved CSS sizes. */
export async function resolveTypographyStyles() {
  const manifest = await json('manifest.json');
  const records = await json(manifest.typographyFile);
  const tokens = flatten(await json(manifest.sets.shared.file));
  const value = (alias, expectedType) => {
    if (!isAlias(alias)) throw new TypeError('Typography properties must reference typed tokens.');
    const token = resolve(tokens, alias.slice(1, -1));
    if (token.$type !== expectedType) throw new TypeError(`Expected ${expectedType} typography property.`);
    return token;
  };
  const styles = { fa: {}, latin: {} };
  for (const entry of records.entries) {
    const role = entry.publicPath.slice('rds.type.'.length);
    const bindings = entry.properties;
    for (const script of Object.keys(styles)) {
      const font = value(entry.fontFamilyBinding[script], 'fontFamily').$value;
      styles[script][role] = {
        fontSize: isAlias(bindings.fontSize) ? display('dimension', value(bindings.fontSize, 'dimension').$value) : bindings.fontSize,
        fontWeight: value(bindings.fontWeight, 'fontWeight').$value,
        lineHeight: value(bindings.lineHeight, 'number').$value,
        profile: entry.profile,
        fontFamily: font.map(family => /\s/.test(family) ? JSON.stringify(family) : family).join(', '),
      };
    }
  }
  return styles;
}
