const fs = require('fs');
const path = require('path');

const src = 'C:\\Users\\Administrator\\AppData\\Local\\Temp\\_tw_schneider_article.txt';
const dst = 'C:\\Users\\Administrator\\Documents\\schneider-blog\\source\\_posts\\schneider-news-20260504-2037.md';

let content = fs.readFileSync(src, 'utf-8');
// Ensure CRLF for Windows
content = content.replace(/\r?\n/g, '\r\n');
fs.writeFileSync(dst, content, 'utf-8');

const stats = fs.statSync(dst);
console.log('Written:', dst);
console.log('Size:', stats.size, 'bytes');
