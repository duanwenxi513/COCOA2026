# COCOA 2026 学术会议网站

## 项目概述

第19届国际组合优化与应用会议（COCOA 2026）官方网站。
- 承办单位：北京化工大学
- 会议日期：2026年12月15-17日
- 会场：北京鹏润酒店
- 设计风格：极简学术风（基于 al-folio 设计语言）

支持中英双语、响应式设计，纯静态文件，无需任何后端服务器，开箱即用。

## 设计系统

| 属性 | 值 |
|------|-----|
| 主色调 | 黑色 #111 / 深灰 #222 |
| 强调色 | 学术蓝 #0056b3 |
| 容器宽度 | 930px |
| 字体 | Georgia (标题) + Segoe UI (正文) |
| 圆角 | 6px |
| 整体风格 | 白底、细边框、弱阴影、大留白 |

## 页面结构

| 页面 | 文件 |
|------|------|
| 首页 | index.html |
| 会议介绍 | about.html |
| 组织委员会 | organization.html |
| 征文通知 | call-for-papers.html |
| 会议日程 | program.html |
| 大会报告人 | speakers.html |
| 会议注册 | registration.html |
| 联系方式 | contact.html |
| 会议新闻 | news.html |
| 新闻详情 | news-detail.html |

## 技术栈

- **纯 HTML/CSS/JS**：无需 Node.js、npm、构建工具
- **零依赖**：所有功能用原生 JavaScript 实现
- **中英双语**：通过 localStorage 记忆语言偏好，所有文本通过 `js/i18n.js` 统一管理
- **响应式设计**：自动适配电脑、平板、手机

## 如何使用

### 方法 1：直接打开（最简单）
双击 `index.html` 即可在浏览器中预览所有页面。

### 方法 2：用 Python 启动
```bash
cd COCOA2026
python3 -m http.server 8080
# 打开浏览器访问 http://localhost:8080
```

## 部署方案

### GitHub Pages（免费）
1. 在 GitHub 创建仓库，上传 COCOA2026 文件夹内容
2. Settings → Pages → 选择 main 分支 → Save
3. 获得 `https://用户名.github.io/仓库名/` 网址

### Vercel / Netlify（免费）
1. 导入 GitHub 仓库或直接拖拽文件夹
2. 自动部署，获得独立域名

### 学校服务器
上传至服务器，配置 Web 服务器指向该目录即可。

## 项目结构

```
COCOA2026/
├── index.html           # 首页
├── about.html           # 会议介绍
├── organization.html    # 组织委员会
├── call-for-papers.html # 征文通知
├── program.html         # 会议日程
├── speakers.html        # 大会报告人
├── registration.html    # 会议注册
├── contact.html         # 联系方式
├── news.html            # 会议新闻
├── news-detail.html     # 新闻详情
├── css/
│   └── style.css        # 全局样式（al-folio 学术风）
└── js/
    ├── i18n.js          # 双语翻译数据
    └── main.js          # 交互逻辑
```
