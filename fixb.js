const fs = require('fs');
const path = "C:/Users/Administrator/Documents/schneider-blog/public/index.html";
let content = fs.readFileSync(path, 'utf8');
// Fix busuanzi id typo: 'containe r' -> 'container'
content = content.replace(/busuanzi_containe r_/g, 'busuanzi_container_');
fs.writeFileSync(path, content, 'utf8');
console.log('Fixed busuanzi id');