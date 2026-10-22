
import { copyFileSync } from 'node:fs';

copyFileSync('dist/index.html', 'dist/404.html');

console.log('Created GitHub Pages SPA fallback: dist/404.html');
