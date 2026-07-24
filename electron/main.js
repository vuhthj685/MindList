const { app, BrowserWindow, Menu, ipcMain, shell } = require("electron");
const path = require("node:path");
const { pathToFileURL } = require("node:url");

const hasSingleInstanceLock = app.requestSingleInstanceLock();
let mainWindow = null;

function isMainWindowSender(event) {
  return Boolean(
    mainWindow &&
      !mainWindow.isDestroyed() &&
      event.sender === mainWindow.webContents,
  );
}

function openExternalUrl(targetUrl) {
  try {
    const parsedUrl = new URL(targetUrl);
    if (parsedUrl.protocol === "https:" || parsedUrl.protocol === "http:") {
      void shell.openExternal(parsedUrl.toString());
    }
  } catch {
    // Ignore malformed or unsupported URLs.
  }
}

function registerIpcHandlers() {
  ipcMain.on("window-minimize", (event) => {
    if (isMainWindowSender(event)) mainWindow.minimize();
  });

  ipcMain.on("window-toggle-maximize", (event) => {
    if (!isMainWindowSender(event)) return;
    if (mainWindow.isMaximized()) mainWindow.unmaximize();
    else mainWindow.maximize();
  });

  ipcMain.on("window-close", (event) => {
    if (isMainWindowSender(event)) mainWindow.close();
  });

  // The renderer still emits this event for compatibility with the old shell.
  ipcMain.on("set-theme-color", (event) => {
    if (!isMainWindowSender(event)) return;
  });
}

function createApplicationMenu() {
  const template = [
    {
      label: "文件",
      submenu: [
        {
          label: "退出",
          accelerator: process.platform === "darwin" ? "Command+Q" : "Ctrl+Q",
          click: () => app.quit(),
        },
      ],
    },
    {
      label: "视图",
      submenu: [
        { role: "reload", label: "重新加载" },
        { role: "forceReload", label: "强制重新加载" },
        { type: "separator" },
        { role: "resetZoom", label: "重置缩放" },
        { role: "zoomIn", label: "放大" },
        { role: "zoomOut", label: "缩小" },
        { type: "separator" },
        { role: "togglefullscreen", label: "切换全屏" },
      ],
    },
    {
      label: "帮助",
      submenu: [
        {
          label: "开发者工具",
          accelerator: process.platform === "darwin" ? "Command+Alt+I" : "F12",
          click: (_item, focusedWindow) => {
            if (focusedWindow) focusedWindow.webContents.toggleDevTools();
          },
        },
      ],
    },
  ];

  if (process.platform === "darwin") {
    template.unshift({
      label: app.name,
      submenu: [
        { role: "about", label: "关于 MindList" },
        { type: "separator" },
        { role: "services", label: "服务" },
        { type: "separator" },
        { role: "hide", label: "隐藏 MindList" },
        { role: "hideOthers", label: "隐藏其他" },
        { role: "unhide", label: "全部显示" },
        { type: "separator" },
        { role: "quit", label: "退出 MindList" },
      ],
    });
  }

  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 800,
    minHeight: 600,
    title: "MindList 思维导图清单",
    frame: false,
    backgroundColor: "#f5f7fa",
    icon: path.join(app.getAppPath(), "dist", "img", "logo.png"),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: true,
      webSecurity: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  const indexPath = path.join(app.getAppPath(), "dist", "index.html");
  const allowedPageUrl = pathToFileURL(indexPath).toString();
  void mainWindow.loadFile(indexPath);

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    openExternalUrl(url);
    return { action: "deny" };
  });

  mainWindow.webContents.on("will-navigate", (event, navigationUrl) => {
    if (navigationUrl.split("#", 1)[0] === allowedPageUrl) return;
    event.preventDefault();
    openExternalUrl(navigationUrl);
  });

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

if (!hasSingleInstanceLock) {
  app.quit();
} else {
  registerIpcHandlers();

  app.on("second-instance", () => {
    if (!mainWindow) return;
    if (mainWindow.isMinimized()) mainWindow.restore();
    mainWindow.show();
    mainWindow.focus();
  });

  app.whenReady().then(() => {
    createApplicationMenu();
    createWindow();

    app.on("activate", () => {
      if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
  });

  app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit();
  });
}
