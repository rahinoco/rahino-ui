import { writeFile } from 'node:fs/promises';
import path from 'node:path';
import { masterDir, renderReview } from './lib.mjs';

await writeFile(path.join(masterDir, 'Master-Token-List.md'), await renderReview(), 'utf8');
console.log('Updated master-tokens/Master-Token-List.md from the master JSON collection.');
