<!-- owner: 项目维护者 | last-reviewed: 2026-06-08 -->

# Scaffolds 开发规范

## 脚手架双写规则

修改前端脚手架文件时，必须同时更新两个位置：

1. **`APP-META/docker-config/sandbox-frontend-scaffold/`** — 镜像源，下次镜像构建后生效
2. **`app/scaffolds/frontend_template/`** — 运行时覆盖层，实时生效（镜像 + 内容覆盖）

**Why：** `APP-META/docker-config/sandbox-frontend-scaffold/` 下的内容需要等镜像更新才能生效，周期较长。`app/scaffolds/frontend_template/` 的内容会在运行时覆盖镜像中的文件，修改即时生效。两者路径结构必须一致。

**How to apply：**
- 修改 `APP-META/docker-config/sandbox-frontend-scaffold/` 下任何文件时，必须将相同修改同步到 `app/scaffolds/frontend_template/` 对应路径（没有则新建，保持相对路径一致）
- 反之亦然：如果只改 `app/scaffolds/frontend_template/`，也要同步到 `APP-META/docker-config/sandbox-frontend-scaffold/` 下，否则下次镜像更新会覆盖掉修改
- `app/scaffolds/frontend_template/` 中只需放被修改/新增的文件，不需要复制整个脚手架
