import fs from 'fs';
import path from 'path';

const envFile = path.resolve(__dirname, '..', '..', '.env');

try {
  const data = fs.readFileSync(envFile, 'utf-8');
  for (const line of data.split('\n')) {
    const i = line.indexOf('=');
    if (i > 0) {
      const key = line.slice(0, i).trim();
      const val = line.slice(i + 1).trim();
      if (key) process.env[key] = val;
    }
  }
} catch {}
