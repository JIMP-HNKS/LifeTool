import yargs = require("yargs")
import { decodeLife } from "./decoder"
import { encodeLife } from "./encoder"
import { writeFile } from "fs-extra"

const files: string[] = yargs.argv._

files.forEach(async file => {
    const data = await decodeLife(file)
    const out = encodeLife(data)
    
    const extPos = file.lastIndexOf(".")
    const newName = file.substring(0, extPos) + ".life"
    
    await writeFile(newName, out)
})