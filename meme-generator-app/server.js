const express = require('express');
const Jimp = require('jimp');
const multer = require('multer');
const fs = require('fs');

const app = express();
const upload = multer({ storage: multer.memoryStorage() }); // 將檔案儲存在內存中

const PORT = process.env.PORT || 3000;
const FONT_PATH = '/usr/share/fonts/impact.ttf'; // 容器中 Impact 字體路徑
const IMAGE_SIZE = 1080;
const MARGIN = 20;

// 輔助函數：讀取自訂字體（Jimp 不直接讀取 .ttf，這裡使用 Jimp 字體 API）
async function loadImpactFont() {
    try {
        // Jimp 字體 API 需要 .fnt 格式。我們在這裡使用 Jimp 內建字體簡化
        // 如果要使用 .ttf，需要將其轉換為 Jimp 支援的 .fnt 格式，這涉及額外工具。
        // 為簡化，我們將使用JimP內建字體。
        return await Jimp.loadFont(Jimp.FONT_SANS_64_WHITE); 
    } catch (e) {
        console.error("Could not load Impact font. Using default.", e);
        return await Jimp.loadFont(Jimp.FONT_SANS_64_WHITE);
    }
}

// 主要 API 路由：接收圖片和字幕
app.post('/generate', upload.single('image'), async (req, res) => {
    try {
        if (!req.file || !req.body.caption) {
            return res.status(400).send('Missing image file or caption.');
        }

        const imageBuffer = req.file.buffer;
        const caption = req.body.caption.toUpperCase();
        
        // 字體和圖片載入
        const font = await loadImpactFont();
        let image = await Jimp.read(imageBuffer);

        // 調整圖片尺寸 (1080x1080)
        image = image.cover(IMAGE_SIZE, IMAGE_SIZE);

        // 字幕拆分 (這裡假設單純將字幕拆成頂部和底部)
        const words = caption.split(/\s+/);
        const halfIndex = Math.ceil(words.length / 2);
        const topText = words.slice(0, halfIndex).join(' ');
        const bottomText = words.slice(halfIndex).join(' ');

        const drawText = async (img, text, yPos) => {
            if (!text) return;
            // 由於 Jimp 原生不支持描邊，這裡使用雙重繪製進行模擬 (白色文字+黑色背景)
            // 這是最簡單的 Jimp 描邊模擬，但效果不如 PIL/Canvas
            
            // 步驟 1: 繪製黑色輪廓 (通過繪製兩次黑色來加粗)
            const blackFont = await Jimp.loadFont(Jimp.FONT_SANS_64_BLACK);
            img.print(blackFont, MARGIN - 2, yPos - 2, { text: text, alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER }, IMAGE_SIZE - 2 * MARGIN);
            img.print(blackFont, MARGIN + 2, yPos + 2, { text: text, alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER }, IMAGE_SIZE - 2 * MARGIN);

            // 步驟 2: 繪製白色文字
            img.print(font, MARGIN, yPos, { text: text, alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER }, IMAGE_SIZE - 2 * MARGIN);
        };

        // 繪製頂部文字
        await drawText(image, topText, MARGIN);

        // 繪製底部文字
        const bottomY = IMAGE_SIZE - Jimp.measureTextHeight(font, bottomText, IMAGE_SIZE - 2 * MARGIN) - MARGIN;
        await drawText(image, bottomText, bottomY);

        // 將處理後的圖片返回為 Buffer
        const outputBuffer = await image.getBufferAsync(Jimp.MIME_JPEG);
        
        // 設定 HTTP 響應頭並發送圖片
        res.setHeader('Content-Type', Jimp.MIME_JPEG);
        res.setHeader('Content-Disposition', 'attachment; filename="meme.jpg"');
        res.send(outputBuffer);

    } catch (error) {
        console.error('Meme generation failed:', error);
        res.status(500).send(`Meme generation failed: ${error.message}`);
    }
});

app.listen(PORT, () => {
    console.log(`Meme Generator Service running on port ${PORT}`);
});
