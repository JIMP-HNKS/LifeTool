"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jimp = require("jimp");
async function decodeLife(file) {
    const img = await jimp.read(file);
    const w = img.getWidth(), h = img.getHeight();
    const data = Array(w).fill(0).map(x => Array(h));
    for (let x = 0; x < w; x++) {
        for (let y = 0; y < h; y++) {
            const color = jimp.intToRGBA(img.getPixelColor(x, y));
            data[x][y] = color.r ? 1 : 0;
        }
    }
    return {
        width: w,
        height: h,
        data
    };
}
exports.decodeLife = decodeLife;
