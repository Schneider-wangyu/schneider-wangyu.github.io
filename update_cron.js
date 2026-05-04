const fs = require('fs');
const j = JSON.parse(fs.readFileSync('C:/Users/Administrator/.qclaw/cron/jobs.json', 'utf8'));
j.jobs[0].schedule.everyMs = 1800000;
fs.writeFileSync('C:/Users/Administrator/.qclaw/cron/jobs.json', JSON.stringify(j, null, 2), 'utf8');
console.log('OK everyMs=' + j.jobs[0].schedule.everyMs);
