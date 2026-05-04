const fs = require('fs');
const path = require('path');

const baseDir = 'C:\\Users\\Administrator\\Documents\\schneider-blog\\source\\_posts\\';

const articles = [
    {
        file: 'schneider-news-20260503-1604.md',
        images: [
            { 
                searchAfter: '## Industrial Copilot：AI智能体驱动自动化工程变革', 
                img: 'industrial-robot.jpg',
                caption: '施耐德Industrial Copilot工业AI助手 — 产线调整周期从数周缩短至数小时'
            },
            {
                searchAfter: '## EcoStruxure开放自动化平台V24.0：五大升级赋能柔性制造',
                img: 'smart-factory.jpg',
                caption: 'EcoStruxure开放自动化平台 — 赋能柔性制造新范式'
            },
            {
                searchAfter: '## 技术要点总结',
                img: 'data-center.jpg',
                caption: '施耐德AI+数字化孪生技术架构'
            }
        ]
    },
    {
        file: 'schneider-semiconductor-20260502.md',
        images: [
            {
                searchAfter: '## 行业背景',
                img: 'semiconductor-chip.jpg',
                caption: '半导体芯片制造 — 洁净室环境要求 ISO 5 级，温湿度精度 ±0.5℃'
            },
            {
                searchAfter: '## 核心技术架构',
                img: 'control-panel.jpg',
                caption: '施耐德半导体厂房智能化控制系统 — 从厂务到工艺的全链路数字化'
            },
            {
                searchAfter: '## 能耗管理与 PUE 优化',
                img: 'energy-management.jpg',
                caption: '能耗管理与PUE优化 — 智能调度算法降低制冷能耗15%-20%'
            }
        ]
    },
    {
        file: 'schneider-smart-water-20260502.md',
        images: [
            {
                searchAfter: '## 施耐德电气智慧水务整体解决方案',
                img: 'industrial-factory.jpg',
                caption: '智慧水务整体架构 — 感知层-控制层-管理层三层联动'
            },
            {
                searchAfter: '## 典型应用场景',
                img: 'data-center.jpg',
                caption: '智慧水务应用场景 — 管网漏损管理、智慧水厂、无人值守泵站'
            },
            {
                searchAfter: '## 成功案例：英国Anglian水务公司',
                img: 'automation-plc.jpg',
                caption: '智慧水务泵站控制系统 — 远程监控与能耗优化'
            }
        ]
    },
    {
        file: 'edge-tech-20260503-1612.md',
        images: [
            {
                searchAfter: '## 一、落地案例：施耐德边缘控制器的场景实践',
                img: 'automation-plc.jpg',
                caption: 'Modicon边缘控制器 — OPC UA over TSN确定性通信架构'
            },
            {
                searchAfter: '## 二、技术创新：开放自动化与分布式控制',
                img: 'data-center.jpg',
                caption: '边缘计算架构 — 云边端协同的确定性低时延保障'
            },
            {
                searchAfter: '## 三、编程技巧：IEC 61131-3标准的实践应用',
                img: 'control-panel.jpg',
                caption: 'IEC 61131-3编程环境 — ST/LD/FBD多语言协同开发'
            }
        ]
    },
    {
        file: 'automation-news-202605.md',
        images: [
            {
                searchAfter: '### 1. 康茂胜自动化（Camozzi）跨界生命科学，精密控制赋能医疗器械',
                img: 'control-panel.jpg',
                caption: '康茂胜K8系列微型电磁阀 — 赋能即时诊断与芯片实验室设备'
            },
            {
                searchAfter: '### 2. 宝维塔：从"模组厂内部孵化"到汽车电子柔性智造赋能者',
                img: 'smart-factory.jpg',
                caption: '宝维塔柔性智造方案 — 多车型共线生产与AI视觉检测'
            },
            {
                searchAfter: '### 3. 菲尼克斯中国：33年深耕，"二次创业"谋新局',
                img: 'industrial-robot.jpg',
                caption: '菲尼克斯南京超级工厂 — 4T融合的绿色精益智能制造示范'
            }
        ]
    }
];

function makeImageMarkdown(imgFile, caption) {
    return `\n{% asset_img ${imgFile} "${caption}" %}\n`;
}

function addImagesToArticle(articlePath, images) {
    let content = fs.readFileSync(articlePath, 'utf8');
    
    for (const imgInfo of images) {
        const marker = imgInfo.searchAfter;
        const idx = content.indexOf(marker);
        if (idx === -1) {
            console.log(`  WARNING: Could not find marker "${marker}" in ${path.basename(articlePath)}`);
            continue;
        }
        
        const insertPos = idx + marker.length;
        const imageMd = makeImageMarkdown(imgInfo.img, imgInfo.caption);
        
        if (content.indexOf(imgInfo.img) !== -1) {
            console.log(`  SKIP: ${imgInfo.img} already exists in ${path.basename(articlePath)}`);
            continue;
        }
        
        content = content.slice(0, insertPos) + imageMd + content.slice(insertPos);
        console.log(`  + Added ${imgInfo.img} after "${marker.substring(0, 40)}..."`);
    }
    
    fs.writeFileSync(articlePath, content, 'utf8');
    return content;
}

console.log('=== Adding images to blog articles ===\n');

for (const article of articles) {
    const articlePath = path.join(baseDir, article.file);
    if (!fs.existsSync(articlePath)) {
        console.log(`SKIP: ${article.file} not found\n`);
        continue;
    }
    console.log(`Processing: ${article.file}`);
    addImagesToArticle(articlePath, article.images);
    console.log('');
}

console.log('Done! Run "hexo generate" to rebuild the site.');
