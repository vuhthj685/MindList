# Changelog

## [1.1.0] - 2026-07-24

### Added

- 提供 macOS Intel 与 Apple Silicon 的 DMG、ZIP 下载包。
- 提供可复现的 Windows 安装版和便携版自动构建。
- GitHub Actions 在发布前统一验证网页、macOS 和 Windows 使用的同一份资源。

### Changed

- 在线版、macOS 版和 Windows 版现在共用同一套经过回归验证的 `dist` 文件。
- Electron 更新到 43.2.0，并启用上下文隔离、沙箱和网页安全策略。

### Fixed

- 修复节点拖动时可能卡死的问题。
- 恢复自由拖拽到指定位置，并避免关闭自由拖拽后继续读取旧坐标。
- 修复自动布局中相邻分支距离过近或重叠的问题。
- 完成节点现在会同步显示灰色字体与删除线。

