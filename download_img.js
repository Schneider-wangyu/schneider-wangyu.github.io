const fs = require('fs');
const https = require('https');
const http = require('http');
const path = require('path');
const url = require('url');

function dl(imageUrl, destPath) {
    return new Promise((resolve, reject) => {
        const parsedUrl = new url.URL(imageUrl);
        const protocol = parsedUrl.protocol === 'https:' ? https : http;
        const file = fs.createWriteStream(destPath);
        
        protocol.get(imageUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            }
        }, (response) => {
            if (response.statusCode === 301 || response.statusCode === 302) {
                file.close();
                fs.unlinkSync(destPath);
                dl(response.headers.location, destPath).then(resolve).catch(reject);
                return;
            }
            response.pipe(file);
            file.on('finish', () => {
                file.close();
                resolve(destPath);
            });
        }).on('error', (err) => {
            file.close();
            if (fs.existsSync(destPath)) fs.unlinkSync(destPath);
            reject(err);
        });
    });
}

// Images to download - free stock photos relevant to industrial/semiconductor topics
const images = [
    {
        url: 'https://images.unsplash.com/photo-1565043666747-69f6646db940?w=800&q=80',
        file: 'source/images/industrial-robot.jpg',
        desc: 'Industrial robot arm - Hannover article'
    },
    {
        url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80',
        file: 'source/images/semiconductor-chip.jpg',
        desc: 'Semiconductor chip - Semiconductor article'
    },
    {
        url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80',
        file: 'source/images/industrial-factory.jpg',
        desc: 'Industrial factory - Smart manufacturing'
    },
    {
        url: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800&q=80',
        file: 'source/images/automation-plc.jpg',
        desc: 'PLC automation - Edge control'
    },
    {
        url: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&q=80',
        file: 'source/images/data-center.jpg',
        desc: 'Data center - Industrial IoT'
    },
    {
        url: 'https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?w=800&q=80',
        file: 'source/images/smart-factory.jpg',
        desc: 'Smart factory - Digital transformation'
    },
    {
        url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
        file: 'source/images/energy-management.jpg',
        desc: 'Energy management dashboard'
    },
    {
        url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&q=80',
        file: 'source/images/control-panel.jpg',
        desc: 'Control panel - Industrial automation'
    }
];

async function main() {
    const baseDir = 'C:\\Users\\Administrator\\Documents\\schneider-blog';
    let success = 0;
    let failed = 0;
    
    for (const img of images) {
        const fullPath = path.join(baseDir, img.file);
        try {
            console.log(`Downloading: ${img.desc}`);
            console.log(`  URL: ${img.url}`);
            await dl(img.url, fullPath);
            const size = fs.statSync(fullPath).size;
            console.log(`  OK: ${fullPath} (${size} bytes)\n`);
            success++;
        } catch (err) {
            console.log(`  FAILED: ${err.message}\n`);
            failed++;
        }
    }
    
    console.log(`\n=== Summary: ${success} succeeded, ${failed} failed ===`);
}

main().catch(console.error);
