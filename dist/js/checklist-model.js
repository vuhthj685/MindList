(function (scope) {
  'use strict';
  // Keep renderer instances out of the existing .smm data format.
  function snapshot(data) {
    return JSON.parse(JSON.stringify(data, (key, value) => key === '_node' ? undefined : value));
  }

  function visibleText(text) {
    if (!/<[^>]+>/.test(text || '')) return String(text || '').trim();
    const element = scope.document.createElement('div');
    element.innerHTML = text;
    return (element.textContent || '').trim();
  }

  function renameRoot(root, title) {
    if (!root.data.richText) { root.data.text = title; return; }
    const element = scope.document.createElement('div');
    element.innerHTML = root.data.text || '';
    const walker = scope.document.createTreeWalker(element, 4);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    if (nodes.length) nodes.forEach((node, index) => { node.textContent = index ? '' : title; });
    else element.textContent = title;
    root.data.text = element.innerHTML;
  }

  function isPartial(node) {
    return !node.data.checked && (node.children || []).some(child => child.data.checked || isPartial(child));
  }

  function setChecked(root, target, checked, set = (data, key, value) => { data[key] = value; }) {
    const changed = new Set();
    function update(node, value) {
      if (node.data.checked !== value) { set(node.data, 'checked', value); changed.add(node); }
    }
    function descend(node) {
      update(node, checked);
      (node.children || []).forEach(descend);
    }
    function visit(node) {
      if (node === target) { descend(node); return true; }
      if ((node.children || []).some(visit)) {
        update(node, node.children.every(child => !!child.data.checked));
        // Also refresh ancestors whose partial state changed without checked changing.
        changed.add(node);
        return true;
      }
      return false;
    }
    visit(root);
    return changed;
  }

  function reconcileStructure(before, root, set = (data, key, value) => { data[key] = value; }) {
    const previous = new Map(), previousPaths = new Map(), changed = new Set();
    const identity = (node, path) => node.data.uid || node._id || path;
    function remember(node, path) {
      previous.set(identity(node, path), node);
      previousPaths.set(path, node);
      (node.children || []).forEach((child, i) => remember(child, path + '.' + i));
    }
    function visit(node, path) {
      const children = node.children || [];
      const descendantChanged = children.map((child, i) => visit(child, path + '.' + i)).some(Boolean);
      let old = previous.get(identity(node, path));
      const atPath = previousPaths.get(path);
      if (!old && atPath && !atPath.data.uid && !atPath._id) old = atPath;
      const oldChildren = old && (old.children || []);
      // Old homepage files may acquire temporary row IDs only when displayed.
      const ownChanged = oldChildren && (oldChildren.length !== children.length || oldChildren.some((child, i) => {
        const id = child.data.uid || child._id;
        return id && id !== identity(children[i], path + '.' + i);
      }));
      const affected = descendantChanged || !!ownChanged;
      if (affected && children.length) {
        const checked = children.every(child => !!child.data.checked);
        if (node.data.checked !== checked) set(node.data, 'checked', checked);
        changed.add(node);
      }
      return affected;
    }
    remember(before, 'root');
    visit(root, 'root');
    return changed;
  }

  function clearSaveError() {
    if (scope.document) {
      const alert = scope.document.getElementById('mindlist-save-error');
      if (alert) alert.remove();
    }
  }
  const model = { snapshot, visibleText, renameRoot, isPartial, setChecked, reconcileStructure, clearSaveError };
  if (typeof module === 'object' && module.exports) module.exports = model;
  else {
    scope.MindListModel = model;
    scope.addEventListener('mindlist-desktop-edit', event => {
      const element = scope.document.activeElement;
      if (element && (element.matches('input,textarea') || element.isContentEditable))
        scope.electronAPI.editText(event.detail);
      else {
        const app = scope.document.querySelector('#app');
        const bus = scope.$bus || app && app.__vue__ && app.__vue__.$bus;
        if (bus) bus.$emit('desktop-edit-action', event.detail);
      }
    });
    scope.addEventListener('mindlist-save-error', () => {
      let alert = scope.document.getElementById('mindlist-save-error');
      if (alert) return;
      alert = scope.document.createElement('div');
      alert.id = 'mindlist-save-error';
      alert.setAttribute('role', 'alert');
      alert.style.cssText = 'position:fixed;top:60px;left:50%;transform:translateX(-50%);z-index:100000;padding:16px;background:#fff0f0;color:#a12626;border:1px solid #e6a3a3;border-radius:6px;max-width:80%;box-shadow:0 2px 12px #0002';
      alert.textContent = '保存失败，最新修改还未保存。请保留此页面，尝试手动保存或导出清单。';
      const close = scope.document.createElement('button');
      close.textContent = '知道了';
      close.style.marginLeft = '12px';
      close.onclick = () => alert.remove();
      alert.appendChild(close);
      scope.document.body.appendChild(alert);
    });
  }
})(typeof window === 'object' ? window : globalThis);
