"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yargs = require("yargs");
const decoder_1 = require("./decoder");
const encoder_1 = require("./encoder");
const fs_extra_1 = require("fs-extra");
const files = yargs.argv._;
files.forEach(async (file) => {
    const data = await decoder_1.decodeLife(file);
    const out = encoder_1.encodeLife(data);
    const extPos = file.lastIndexOf(".");
    const newName = file.substring(0, extPos) + ".life";
    await fs_extra_1.writeFile(newName, out);
});
