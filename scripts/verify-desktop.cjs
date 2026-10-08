// Uses a disposable Electron profile. Never opens the installed app's user data.
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const root = path.resolve(__dirname, '..');
const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'mindlist-verify-'));
const verifyRenderer = require('../tests/renderer-scenarios.js');
fs.symlinkSync(path.join(root, 'dist'), path.join(directory, 'dist'));
fs.writeFileSync(path.join(directory, 'package.json'), JSON.stringify({ name: 'mindlist-verification', main: 'main.cjs' }));
fs.writeFileSync(path.join(directory, 'main.cjs'), `
const { app, BrowserWindow, Menu, clipboard, nativeImage } = require('electron');
const assert = require('node:assert/strict');
app.setName('MindList 验收');
app.setPath('userData', ${JSON.stringify(path.join(directory, 'profile'))});
const originalClipboard = clipboard.readText();
const originalImage = clipboard.readImage();
const originalHtml = clipboard.readHTML();
const originalRtf = clipboard.readRTF();
const pause = ms => new Promise(resolve => setTimeout(resolve, ms));
app.once('browser-window-created', (_event, win) => {
  win.hide();
  win.webContents.once('did-finish-load', async () => {
    try {
      const run = async code => { try { return await win.webContents.executeJavaScript('eval(' + JSON.stringify(code) + ')', true); } catch (error) { throw new Error(code.slice(0,200) + ': ' + error.message); } };
      const editMenu = Menu.getApplicationMenu().items.find(item => item.label === '编辑').submenu;
      const menu = async label => { const item = editMenu.items.find(item => item.label === label); item.click(item, win); await pause(180); };
      await run(\`const input = document.createElement('input');input.id='verify-input';document.body.appendChild(input);input.focus();\`);
      clipboard.writeText('文字粘贴验收');
      await menu('粘贴');
      assert.equal(await run(\`document.querySelector('#verify-input').value\`), '文字粘贴验收');
      await menu('全选'); await menu('复制');
      assert.equal(clipboard.readText(), '文字粘贴验收');
      await menu('剪切');
      assert.equal(await run(\`document.querySelector('#verify-input').value\`), '');
      await menu('粘贴');
      await run(\`document.querySelector('#verify-input').remove();\`);
      const rendered = await run('(' + ${JSON.stringify(verifyRenderer.toString())} + ')()');
      await run(\`window.testEditor = (() => {const vs=[];function visit(v){vs.push(v);(v.$children||[]).forEach(visit)}visit(document.querySelector('#app').__vue__);return vs.find(v=>v.mindMap&&v._checkboxInstanceMap)})();const m=testEditor.mindMap;m.renderer.clearActiveNodeList();m.renderer.addNodeToActiveList(m.renderer.root.children[0]);document.activeElement.blur();\`);
      await menu('复制');
      const copied = clipboard.readText();
      assert.ok(copied.includes('任务甲') && copied.includes('任务乙'), 'Node copy did not preserve children');
      await run(\`const m=testEditor.mindMap;m.renderer.clearActiveNodeList();m.renderer.addNodeToActiveList(m.renderer.root);\`);
      await menu('粘贴'); await pause(450);
      assert.equal(await run(\`testEditor.mindMap.getData().children.length\`), 3);
      assert.equal(await run(\`testEditor.mindMap.getData().children[2].children.length\`), 2);
      await run(\`const m=testEditor.mindMap;m.renderer.clearActiveNodeList();m.renderer.addNodeToActiveList(m.renderer.root.children[2]);\`);
      await menu('剪切'); await pause(350);
      assert.equal(await run(\`testEditor.mindMap.getData().children.length\`), 2);
      await run(\`const m=testEditor.mindMap;m.renderer.clearActiveNodeList();m.setMode('readonly');m.renderer.addNodeToActiveList(m.renderer.root.children[0]);\`);
      await menu('粘贴'); await menu('剪切'); await pause(300);
      assert.equal(await run(\`testEditor.mindMap.getData().children.length\`), 2, 'Readonly clipboard changed the tree');
      await run(\`testEditor.mindMap.setMode('edit');\`);
      await menu('撤销'); await pause(350);
      assert.equal(await run(\`testEditor.mindMap.getData().children.length\`), 3);
      await menu('重做'); await pause(350);
      assert.equal(await run(\`testEditor.mindMap.getData().children.length\`), 2);
      await run(\`testEditor.mindMap.renderer.textEdit.show({node:testEditor.mindMap.renderer.root.children[0]});\`);
      await menu('全选'); await menu('复制');
      assert.ok(clipboard.readText().includes('父任务') && !clipboard.readText().includes('任务甲'), 'Text editing copied a subtree');
      await menu('剪切'); await menu('粘贴');
      await run(\`testEditor.manualSave();\`); await pause(350);
      assert.equal(await run(\`testEditor.mindMap.getData().children[0].children.length\`), 2);
      await run(\`const m=testEditor.mindMap;m.renderer.clearActiveNodeList();m.renderer.addNodeToActiveList(m.renderer.root.children[1]);\`);
      clipboard.writeImage(nativeImage.createFromPath(${JSON.stringify(path.join(root, 'dist/img/logo.png'))}));
      assert.equal(clipboard.readImage().isEmpty(), false);
      await menu('粘贴'); await pause(600);
      assert.ok(await run(\`testEditor.mindMap.getData().children[1].data.image\`));
      console.log('MINDLIST_VERIFICATION ' + JSON.stringify({ renderer: rendered, native: ['文字复制剪切粘贴', '节点及子层级复制粘贴', '节点剪切撤销重做', '文字编辑只处理文字', '只读模式不剪切粘贴节点', '图片粘贴'] }));
      clipboard.write({text:originalClipboard, html:originalHtml, rtf:originalRtf, ...(originalImage.isEmpty()?{}:{image:originalImage})});
      app.exit(0);
    } catch (error) {
      console.error('MINDLIST_VERIFICATION_FAILED', error.stack);
      clipboard.write({text:originalClipboard, html:originalHtml, rtf:originalRtf, ...(originalImage.isEmpty()?{}:{image:originalImage})});
      app.exit(1);
    }
  });
});
require(${JSON.stringify(path.join(root, 'electron/main.js'))});
`);
try {
  const result = spawnSync(require('electron'), [directory], { encoding: 'utf8', timeout: 90000 });
  process.stdout.write(result.stdout || '');
  process.stderr.write(result.stderr || '');
  if (result.error) throw result.error;
  process.exitCode = result.status ?? 1;
} finally { fs.rmSync(directory, { recursive: true, force: true }); }
