import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDirectory = fileURLToPath(new URL('.', import.meta.url));
const outputDirectory = resolve(scriptDirectory, process.env.MAKEFUN_OUTPUT_DIR || '/output');
const text = 'You hum like a broken jet engine all night just to blind me with interrogation lighting and offer me half a lemon and three jars of mustard.';

const characterCount = [...text].length;
if (characterCount < 1 || characterCount > 200 || /[\r\n\u2028\u2029]/u.test(text)) {
  throw new Error('Entry must be a single line of 1 to 200 characters');
}

const expected = Buffer.from(`${text}\n`, 'utf8');
await mkdir(outputDirectory, { recursive: true });
const entryPath = resolve(outputDirectory, 'entry.txt');
await writeFile(entryPath, expected);
if (!expected.equals(await readFile(entryPath))) {
  throw new Error('Entry file does not match expected bytes');
}
