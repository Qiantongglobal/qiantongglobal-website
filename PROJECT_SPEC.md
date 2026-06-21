# PROJECT_SPEC.md

## 1. 项目基本信息

| 字段 | 值 |
|---|---|
| 项目名称 | Qiantong Global |
| 需求摘要 | 医疗器械外贸B2B独立站，展示医疗耗材产品、解决方案、资质认证和联系方式 |
| 开发模式 | 前端应用（React + Vite + Tailwind CSS） |
| 创建时间 | 2026-06-18 |
| 最后更新 | 2026-06-18 |

---

## 2. 产品及视觉设计

**品牌定位**：专业医疗器械外贸B2B独立站，蓝白配色，简洁大气
**主色调**：蓝色系（primary: #1e4a7f，深蓝渐变背景）
**字体**：Inter 无衬线字体
**布局**：响应式单页应用，支持手机/平板/桌面端
**设计元素**：
- 圆角卡片设计（rounded-2xl）
- 渐变背景装饰
- 网格图案背景
- 浮动WhatsApp按钮
- 粘性导航栏（滚动时变白色背景）

---

## 3. 前端设计

**技术栈**：React 18 + Vite + Tailwind CSS + lucide-react 图标库
**页面结构**：单页应用（SPA），通过锚点导航切换不同区域

**组件清单**：
| 组件名 | 文件路径 | 功能说明 |
|---|---|---|
| Navbar | src/components/Navbar.tsx | 顶部导航栏，支持移动端汉堡菜单 |
| Footer | src/components/Footer.tsx | 页脚，包含品牌信息、快速链接、联系方式 |
| WhatsAppButton | src/components/WhatsAppButton.tsx | 浮动WhatsApp聊天按钮 |
| HomePage | src/pages/index.tsx | 主页，包含所有业务区域 |

**页面区域**：
1. Hero Section - 主标语 + CTA按钮 + 统计数据
2. Three Advantages - 三大核心优势卡片
3. About Us - 团队背景 + 市场聚焦
4. Products - 三大产品线展示
5. Solutions - 三大痛点解决方案
6. Certifications - 资质认证展示
7. Trust Banner - 信任数据展示
8. Contact - 联系方式 + 表单
9. CTA Section - 底部行动号召

---

## 4. 鉴权策略 [LOCKED]

AUTH_STRATEGY: dingtalk-platform

依赖钉钉平台访问控制，不生成登录页，不使用 supabase.auth.* 相关 API

---

## 5. 数据模型 [LOCKED after first deploy]

本项目为静态展示网站，无后端数据库表。

---

## 6. API 接口协议 [LOCKED]

本项目为纯前端静态网站，无后端API接口。

---

## 7. 业务组件清单

| 组件名 | 文件路径 | 来源 | 关联页面 | 功能说明 |
|---|---|---|---|---|
| Navbar | src/components/Navbar.tsx | 自研 | 全局 | 响应式导航栏，支持滚动变色和移动端菜单 |
| Footer | src/components/Footer.tsx | 自研 | 全局 | 页脚信息展示 |
| WhatsAppButton | src/components/WhatsAppButton.tsx | 自研 | 全局 | 浮动WhatsApp联系按钮 |
| HomePage | src/pages/index.tsx | 自研 | 首页 | 所有业务区域的主页面组件 |

---

## 8. 迭代变更记录

| 时间 | 变更类型 | 变更内容 | 变更原因 |
|---|---|---|---|
| 2026-06-18 | 初始化 | 首次生成完整网站 | 用户需求：搭建Qiantong Global医疗器械外贸B2B独立站 |
