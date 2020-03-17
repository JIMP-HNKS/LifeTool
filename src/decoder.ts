import jimp = require("jimp")

export type LifeData = {
    width: number
    height: number
    data: (0 | 1)[][]
}

export async function decodeLife(file: string): Promise<LifeData> {
    const img = await jimp.read(file)
    const w = img.getWidth(), h = img.getHeight()
    const data: (0 | 1)[][] = Array(w).fill(0).map(x => Array(h))

    for (let x = 0; x < w; x++) {
        for (let y = 0; y < h; y++) {
            const color = jimp.intToRGBA(img.getPixelColor(x, y))

            data[x][y] = color.r ? 1 : 0
        }
    }

    return {
        width: w,
        height: h,
        data
    }
}