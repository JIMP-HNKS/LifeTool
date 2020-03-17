"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function encodeOctets(life) {
    const size = Math.ceil(life.width * life.height / 8);
    const out = new Int8Array(size);
    let pos = 0, current = 0, counter = 0;
    for (let y = 0; y < life.height; y++) {
        for (let x = 0; x < life.width; x++) {
            current |= life.data[x][y] << counter;
            counter++;
            if (counter === 8) {
                out[pos] = current;
                current = 0;
                counter = 0;
                pos++;
            }
        }
    }
    if (counter !== 8) {
        out[pos] = current;
    }
    return out;
}
exports.encodeOctets = encodeOctets;
function rleCompress(octets) {
    const out = [];
    let chainLength = 0, chainBody = 0;
    for (let i = 0; i < octets.length; i++) {
        if (chainLength && chainBody !== octets[i]) {
            out.push(chainLength);
            out.push(chainBody);
            chainLength = 0;
        }
        if (!chainLength) {
            chainLength = 1;
            chainBody = octets[i];
        }
        else if (chainLength && chainBody === octets[i]) {
            chainLength++;
        }
    }
    if (chainLength) {
        out.push(chainLength);
        out.push(chainBody);
    }
    return new Int8Array(out);
}
exports.rleCompress = rleCompress;
function encodeLife(life) {
    const header = Buffer.alloc(12);
    const rle = Buffer.from(rleCompress(encodeOctets(life)));
    header.write("LIFE");
    header.writeUInt32LE(life.width, 4);
    header.writeUInt32LE(life.height, 8);
    return Buffer.concat([header, rle]);
}
exports.encodeLife = encodeLife;
