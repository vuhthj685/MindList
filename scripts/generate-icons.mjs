import { readFile, writeFile } from "node:fs/promises";
import pngToIco from "png-to-ico";

const sourcePath = new URL("../build/icon.png", import.meta.url);
const outputPath = new URL("../build/icon.ico", import.meta.url);

const source = await readFile(sourcePath);
const icon = await pngToIco(source);

await writeFile(outputPath, icon);
