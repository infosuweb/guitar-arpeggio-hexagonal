import { readFileSync, writeFileSync } from 'fs';

const key = process.env.GROQ_API_KEY || '';
const html = readFileSync('index.html', 'utf8');
const modified = html.replace(
  "const GROQ_API_KEY = '';",
  `const GROQ_API_KEY = '${key}';`
);
writeFileSync('index.html', modified);
console.log('Injected GROQ_API_KEY into index.html');
