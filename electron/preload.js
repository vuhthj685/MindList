const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld(
  "electronAPI",
  Object.freeze({
    setThemeColor: (bgColor, symbolColor) => {
      ipcRenderer.send("set-theme-color", { bgColor, symbolColor });
    },
    minimizeWindow: () => ipcRenderer.send("window-minimize"),
    toggleMaximizeWindow: () => ipcRenderer.send("window-toggle-maximize"),
    closeWindow: () => ipcRenderer.send("window-close"),
    isElectron: true,
  }),
);

