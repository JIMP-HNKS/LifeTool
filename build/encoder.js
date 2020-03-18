"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function encodeOctets(life) {
    const size = Math.ceil(life.width * life.height / 8);
    const out = new Uint8Array(size);
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
function dummyRLE(octets) {
    const out = Buffer.alloc(octets.length * 2);
    for (let i = 0; i < octets.length; i++) {
        out.writeUInt8(1, 2 * i);
        out.writeUInt8(octets[i], 2 * i + 1);
    }
    return out;
}
exports.dummyRLE = dummyRLE;
function encodeLife(life) {
    const header = Buffer.alloc(12);
    const rle = dummyRLE(encodeOctets(life));
    header.write("LIFE");
    header.writeUInt32LE(life.width, 4);
    header.writeUInt32LE(life.height, 8);
    return Buffer.concat([header, rle]);
}
exports.encodeLife = encodeLife;
