const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const root = path.join(__dirname, '..');

function storageModule() {
  const source = fs.readFileSync(path.join(root, 'dist/js/app.js'), 'utf8');
  const start = source.indexOf('  d763: function (e, t, n) {');
  const end = source.indexOf('\n  },', start);
  const values = new Map();
  const alerts = [];
  const storage = { getItem: key => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, value), removeItem: key => values.delete(key) };
  const modelPath = path.join(root, 'dist/js/checklist-model.js');
  const model = fs.existsSync(modelPath) ? require(modelPath) : undefined;
  const requireBundle = () => {};
  requireBundle.d = (target, key, getter) => Object.defineProperty(target, key, { get: getter });
  const context = { localStorage: storage, console: { error() {} }, window: { MindListModel: model,
    dispatchEvent: event => alerts.push(event.type) }, Event: class { constructor(type) { this.type = type; } } };
  const factory = vm.runInNewContext('(' + source.slice(start + 8, end + 4) + ')', context);
  const exports = {};
  factory({}, exports, requireBundle);
  return { api: exports, values, storage, alerts };
}

test('save persists a detached tree even after the renderer attaches circular objects', () => {
  const { api } = storageModule();
  const { file, data } = api.b('清单');
  const node = { opt: { data: data.root } };
  data.root._node = node;
  data.root.children.push({ data: { text: '<p><b>任务</b></p>', richText: true }, children: [] });
  assert.equal(api.g(file.id, data), true);
  assert.equal(api.d(file.id).root.children[0].data.text, '<p><b>任务</b></p>');
  assert.equal(api.d(file.id).root._node, undefined);
});

test('legacy names stay different until root text is edited, then sync', () => {
  const { api, values } = storageModule();
  const { file, data } = api.b('旧标题');
  data.root.data.text = '旧中心';
  values.set('MIND_MAP_FILE_DATA_' + file.id, JSON.stringify(data));
  api.g(file.id, data);
  assert.equal(api.e()[0].name, '旧标题');
  data.root.data.text = '新中心';
  api.g(file.id, data);
  assert.equal(api.e()[0].name, '新中心');
});

test('editing the title to the existing root name also synchronizes legacy metadata', () => {
  const { api, values } = storageModule();
  const { file, data } = api.b('旧标题');
  data.root.data.text = '已有中心';
  values.set('MIND_MAP_FILE_DATA_' + file.id, JSON.stringify(data));
  assert.equal(api.g(file.id, data, '已有中心'), true);
  assert.equal(api.e()[0].name, '已有中心');
});

test('failed save is reported and the previously saved checklist survives', () => {
  const { api, storage, values, alerts } = storageModule();
  const { file, data } = api.b('原清单');
  const previous = values.get('MIND_MAP_FILE_DATA_' + file.id);
  storage.setItem = () => { throw new Error('disk full'); };
  data.root.data.text = '未保存';
  assert.equal(api.g(file.id, data), false);
  assert.equal(values.get('MIND_MAP_FILE_DATA_' + file.id), previous);
  assert.deepEqual(alerts, ['mindlist-save-error']);
});

test('metadata write failure rolls back both checklist and title', () => {
  const { api, storage, values } = storageModule();
  const { file, data } = api.b('原清单');
  const previous = [...values.entries()];
  const write = storage.setItem;
  storage.setItem = (key, value) => {
    if (key === 'MIND_MAP_FILE_LIST') throw new Error('metadata full');
    write(key, value);
  };
  data.root.data.text = '新标题';
  assert.equal(api.g(file.id, data), false);
  assert.deepEqual([...values.entries()], previous);
});

test('check cascades down, aggregates all ancestors, and reports nested partial state', () => {
  const { setChecked, isPartial } = require('../dist/js/checklist-model.js');
  const node = (text, children = []) => ({ data: { text, checked: false }, children });
  const a = node('甲'), b = node('乙'), parent = node('父', [a, b]), rootNode = node('中心', [parent]);
  setChecked(rootNode, a, true);
  assert.equal(isPartial(parent), true);
  assert.equal(isPartial(rootNode), true);
  assert.equal(parent.data.checked, false);
  setChecked(rootNode, b, true);
  assert.equal(parent.data.checked, true);
  assert.equal(rootNode.data.checked, true);
  setChecked(rootNode, parent, false);
  assert.deepEqual([a, b, parent, rootNode].map(item => item.data.checked), [false, false, false, false]);
  assert.equal(isPartial(rootNode), false);
});

test('adding or deleting children reconciles affected parents without rewriting unrelated legacy states', () => {
  const model = require('../dist/js/checklist-model.js');
  const root = { data: { uid: 'root', checked: true }, children: [
    { data: { uid: 'parent', checked: true }, children: [{ data: { uid: 'a', checked: true }, children: [] }] },
    { data: { uid: 'legacy', checked: false }, children: [{ data: { uid: 'old', checked: true }, children: [] }] },
  ] };
  let before = model.snapshot(root);
  root.children[0].children.push({ data: { uid: 'new', checked: false }, children: [] });
  model.reconcileStructure(before, root);
  assert.equal(root.children[0].data.checked, false);
  assert.equal(model.isPartial(root.children[0]), true);
  assert.equal(root.children[1].data.checked, false);
  before = model.snapshot(root);
  root.children[0].children.pop();
  model.reconcileStructure(before, root);
  assert.equal(root.children[0].data.checked, true);
  assert.equal(root.children[1].data.checked, false);
});

test('failed node clipboard write leaves the original nodes intact and reports failure', async () => {
  const source = fs.readFileSync(path.join(root, 'dist/js/chunk-1b795919.js'), 'utf8');
  const body = source.match(/async cut\(\) \{([\s\S]*?)\n        \}\n        handlePaste/)[1];
  const utils = { P: nodes => nodes, ub: nodes => nodes, n: (_, node) => node,
    q: data => data, sb: async () => { throw new Error('clipboard denied'); } };
  const cut = new Function('b', 'return async function() {' + body + '}')(utils);
  const original = { isRoot: false, data: { text: '原节点' } };
  const errors = [], commands = [];
  const renderer = { activeNodeList: [original], mindMap: { opt: { errorHandler: code => errors.push(code) }, execCommand: name => commands.push(name) } };
  await cut.call(renderer);
  assert.deepEqual(commands, []);
  assert.deepEqual(renderer.activeNodeList, [original]);
  assert.deepEqual(errors, ['write_clipboard_error']);
});

test('legacy checklist row IDs do not hide an added incomplete child', () => {
  const model = require('../dist/js/checklist-model.js');
  const before = { data: { checked: true }, children: [{ data: { checked: true }, children: [{ data: { checked: true }, children: [] }] }] };
  const after = model.snapshot(before);
  after.children[0]._id = 'display-parent';
  after.children[0].children[0]._id = 'display-child';
  after.children[0].children.push({ _id: 'new-child', data: { checked: false }, children: [] });
  model.reconcileStructure(before, after);
  assert.equal(after.children[0].data.checked, false);
  assert.equal(model.isPartial(after.children[0]), true);
});

test('undo flushes a pending change and its old timer cannot overwrite redo history', async () => {
  const source = fs.readFileSync(path.join(root, 'dist/js/chunk-1b795919.js'), 'utf8');
  const start = source.indexOf('      class Vl {');
  const end = source.indexOf('\n      var Kl = Vl;', start);
  const model = require('../dist/js/checklist-model.js');
  const Command = new Function('b', 'Gl', 'return ' + source.slice(start, end))({ o: (_, data) => model.snapshot(data) }, { version: 'test' });
  const map = { opt: { addHistoryTime: 30, maxHistoryCount: 100 }, renderer: { renderTree: { data: { text: '原状态' }, children: [] } },
    keyCommand: { addShortcut() {} }, emit() {}, on() {}, event: { listenerCount: () => 0 } };
  const command = new Command({ mindMap: map });
  command.add('EDIT', () => { map.renderer.renderTree.data.text = '新状态'; });
  command.add('BACK', () => { map.renderer.renderTree = command.back(); });
  command.add('FORWARD', () => { map.renderer.renderTree = command.forward(); });
  command.originAddHistory();
  command.exec('EDIT');
  command.exec('BACK');
  assert.equal(map.renderer.renderTree.data.text, '原状态');
  await new Promise(resolve => setTimeout(resolve, 50));
  assert.equal(command.history.length, 2);
  assert.equal(command.activeHistoryIndex, 0);
  command.exec('FORWARD');
  assert.equal(map.renderer.renderTree.data.text, '新状态');
});
