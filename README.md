# MindList

MindList 将思维导图与任务清单结合，让你在同一份内容中梳理思路、拆解目标和管理进度。

## 使用与下载

- [在线使用](https://vuhthj685.github.io/MindList/)
- [macOS · Apple Silicon](https://github.com/vuhthj685/MindList/releases/latest/download/MindList-1.1.2-macOS-arm64.dmg)
- [macOS · Intel](https://github.com/vuhthj685/MindList/releases/latest/download/MindList-1.1.2-macOS-x64.dmg)
- [Windows · 安装版](https://github.com/vuhthj685/MindList/releases/latest/download/MindList-1.1.2-Windows-Setup-x64.exe)
- [Windows · 便携版](https://github.com/vuhthj685/MindList/releases/latest/download/MindList-1.1.2-Windows-Portable-x64.exe)

全部版本与历史下载见 [Releases](https://github.com/vuhthj685/MindList/releases)。

桌面版尚未使用开发者证书签名。首次打开时，macOS 或 Windows 可能显示系统安全提示。

## 主要功能

- **思维导图与清单联动**：两种视图编辑同一份内容，任务完成状态自动同步。
- **任务层级与进度**：支持父子任务勾选、部分完成、折叠展开和多清单管理。
- **灵活编辑**：节点拖拽、富文本、图片、链接、备注、标签、公式及撤销重做。
- **多种呈现方式**：支持主题、背景、大纲，以及思维导图、逻辑结构、组织结构和时间线等布局。
- **文件与扩展**：支持清单文件导入导出、图片导出，以及配置自有接口的 AI 辅助功能。

## 数据与备份

数据默认保存在当前浏览器或桌面应用的本地存储中。网页版与桌面版各自保存，不提供跨端云同步。

建议定期导出清单备份。清理浏览器或应用数据前，请先确认备份可用。

## 开发

使用 Node.js 24 安装依赖：

```sh
npm ci
npm start
```

运行检查及构建：

```sh
npm test
npm run test:desktop
npm run dist:mac
npm run dist:win
```

`dist/` 是网页版和桌面版共用的页面资源。正式安装包由 GitHub Actions 构建，并发布至 Releases。

## 开源来源

MindList 基于 [mind-map](https://github.com/wanglin2/mind-map) 二次开发，增加清单管理与任务状态联动。感谢上游项目与相关开源依赖。

Electron 与 Chromium 的许可说明随相关运行环境提供，仓库保留对应许可证文件。
