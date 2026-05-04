const https = require('https');
const http = require('http');
const fs = require('fs');

const outPath = 'C:\\Users\\Administrator\\Documents\\schneider-blog\\source\\images\\schneider-news-202605042037.jpg';
const url = 'https://picsum.photos/800/400';

function download(url, file, cb) {
  const mod = url.startsWith('https') ? https : http;
  mod.get(url, (res) => {
    if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
      download(res.headers.location, file, cb);
    } else {
      const stream = fs.createWriteStream(file);
      res.pipe(stream);
      stream.on('finish', () => { stream.close(); cb(null, 'OK'); });
    }
  }).on('error', (e) => cb(e));
}

download(url, outPath, (err, msg) => {
  if (err) { console.error('FAIL:', err.message); process.exit(1); }
  console.log(msg);
  const stats = fs.statSync(outPath);
  console.log('Size:', stats.size);
});
