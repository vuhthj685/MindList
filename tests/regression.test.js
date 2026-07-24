const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const root = path.resolve(__dirname, "..");
const read = (relativePath) =>
  fs.readFileSync(path.join(root, relativePath), "utf8");

const editor = read("dist/js/chunk-1b795919.js");
const appBundle = read("dist/js/app.js");
const homeBundle = read("dist/js/chunk-17f86c25.js");
const mainProcess = read("electron/main.js");
const packageJson = JSON.parse(read("package.json"));

test("web entry references every required runtime asset", () => {
  const html = read("dist/index.html");
  assert.match(html, /js\/chunk-vendors\.js/);
  assert.match(html, /js\/app\.js/);
  assert.ok(fs.existsSync(path.join(root, "dist/js/chunk-vendors.js")));
  assert.ok(fs.existsSync(path.join(root, "dist/css/app.css")));
});

test("drag saves are coalesced and listeners are removed", () => {
  assert.match(editor, /storeDataTimer: null/);
  assert.match(editor, /this\.pendingRootData = t/);
  assert.match(editor, /this\.\$bus\.\$off\("data_change", this\.onDataChangeHandler\)/);
  assert.match(editor, /"view_data_change",\s+this\.onViewDataChangeHandler/);
});

test("drag placeholder cloning does not rerun node constructors", () => {
  assert.match(
    editor,
    /fakeClone\(\) \{\s+return Object\.assign\(Object\.create\(Object\.getPrototypeOf\(this\)\), this\);/,
  );
  assert.doesNotMatch(editor, /fakeClone\(\) \{\s+const t = new fl\(/);
});

test("free positioning owns drops before structural drag handling", () => {
  const dragClassStart = editor.indexOf("class Ec extends bl");
  const mouseupStart = editor.indexOf("async onMouseup(t)", dragClassStart);
  const mouseupEnd = editor.indexOf("\n        removeNodeActive(t)", mouseupStart);
  const mouseupBody = editor.slice(mouseupStart, mouseupEnd);
  const freeDropIndex = mouseupBody.indexOf(
    "this.clone && n && 1 === this.beingDragNodeList.length",
  );
  const overlapDropIndex = mouseupBody.indexOf("if (this.overlapNode)");

  assert.ok(freeDropIndex >= 0);
  assert.ok(overlapDropIndex >= 0);
  assert.ok(freeDropIndex < overlapDropIndex);
  assert.match(editor, /this\.mindMap\.opt\.enableFreeDrag \|\|\s+this\.checkOverlapNode\(\)/);
});

test("automatic layout ignores stale free-drag coordinates", () => {
  const leftGetterBody = editor.match(/get left\(\) \{([\s\S]*?)\n        \}/)[1];
  const topGetterBody = editor.match(/get top\(\) \{([\s\S]*?)\n        \}/)[1];
  const getLeft = new Function(leftGetterBody);
  const getTop = new Function(topGetterBody);
  const node = {
    mindMap: { opt: { enableFreeDrag: false } },
    customLeft: 12,
    customTop: 18,
    _left: 120,
    _top: 180,
  };

  assert.equal(getLeft.call(node), 120);
  assert.equal(getTop.call(node), 180);
  node.mindMap.opt.enableFreeDrag = true;
  node.customLeft = 0;
  node.customTop = 0;
  assert.equal(getLeft.call(node), 0);
  assert.equal(getTop.call(node), 0);
});

test("completed mind-map nodes are dimmed and struck through", () => {
  assert.equal((editor.match(/color = "#bbb"/g) || []).length, 3);
  assert.equal((editor.match(/textDecoration = "line-through"/g) || []).length, 3);
  assert.match(homeBundle, /doneText/);
});

test("storage reuses the selected checklist and does not clone on every save", () => {
  assert.match(appBundle, /if \(u\) return u/);
  assert.match(appBundle, /\(u = t\)/);
});

test("desktop renderer runs with Electron isolation and web security", () => {
  assert.match(mainProcess, /nodeIntegration: false/);
  assert.match(mainProcess, /contextIsolation: true/);
  assert.match(mainProcess, /sandbox: true/);
  assert.match(mainProcess, /webSecurity: true/);
  assert.doesNotMatch(mainProcess, /webSecurity:\s*false/);
});

test("external navigation is restricted to HTTP and HTTPS", () => {
  assert.match(mainProcess, /parsedUrl\.protocol === "https:"/);
  assert.match(mainProcess, /parsedUrl\.protocol === "http:"/);
  assert.match(mainProcess, /setWindowOpenHandler/);
  assert.match(mainProcess, /will-navigate/);
});

test("desktop packaging targets both macOS and Windows", () => {
  assert.equal(packageJson.main, "electron/main.js");
  assert.deepEqual(packageJson.build.mac.target, ["dmg", "zip"]);
  assert.deepEqual(packageJson.build.win.target, ["nsis", "portable"]);
  assert.equal(packageJson.devDependencies.electron, "43.2.0");
});

test("Windows icon contains a 256px image", () => {
  const icon = fs.readFileSync(path.join(root, "build/icon.ico"));
  const imageCount = icon.readUInt16LE(4);
  let largestWidth = 0;

  for (let index = 0; index < imageCount; index += 1) {
    const widthByte = icon[6 + index * 16];
    largestWidth = Math.max(largestWidth, widthByte === 0 ? 256 : widthByte);
  }

  assert.ok(largestWidth >= 256);
});
