const { contextBridge, ipcRenderer } = require("electron");

ipcRenderer.on("desktop-edit-action", (_event, action) => {
  window.dispatchEvent(new CustomEvent("mindlist-desktop-edit", { detail: action }));
});

contextBridge.exposeInMainWorld(
  "electronAPI",
  Object.freeze({
    setThemeColor: (bgColor, symbolColor) => {
      ipcRenderer.send("set-theme-color", { bgColor, symbolColor });
    },
    minimizeWindow: () => ipcRenderer.send("window-minimize"),
    toggleMaximizeWindow: () => ipcRenderer.send("window-toggle-maximize"),
    closeWindow: () => ipcRenderer.send("window-close"),
    readClipboard: () => ipcRenderer.invoke("clipboard-read"),
    writeClipboardText: (text) => ipcRenderer.invoke("clipboard-write-text", text),
    editText: (action) => ipcRenderer.invoke("edit-text", action),
    isElectron: true,
  }),
);
