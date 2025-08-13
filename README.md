# AI Template Hub

一个现代化的 AI 资源平台，提供软件模板、课程和相关资源，面向开发者和企业用户。

## 项目概述

AI Template Hub 是一个全栈 Web 应用程序，旨在为开发者和企业提供高质量的 AI 软件模板、课程和相关资源。该项目采用现代化的技术栈构建，包括一个基于 FastAPI 的后端 API 和一个使用 Next.js 构建的前端界面。

## 技术栈

### 后端 (API)

- **[FastAPI](https://fastapi.tiangolo.com/)** - 高性能 Python Web 框架
- **Python 3.12+** - 编程语言
- **SQLAlchemy** - ORM 工具
- **PostgreSQL/MySQL** - 数据库支持
- **JWT** - 身份验证
- **BCrypt** - 密码加密
- **Uvicorn** - ASGI 服务器

主要依赖:

- fastapi[standard] - Web 框架
- sqlalchemy - ORM
- psycopg2/asyncpg - 数据库连接
- python-jose - JWT 处理
- passlib/bcrypt - 密码哈希
- pydantic-settings - 配置管理

### 前端 (Web)

- **[Next.js 15](https://nextjs.org/)** - React 框架
- **[TypeScript](https://www.typescriptlang.org/)** - 类型安全的 JavaScript
- **[Tailwind CSS](https://tailwindcss.com/)** - 实用优先的 CSS 框架
- **[shadcn/ui](https://ui.shadcn.com/)** - UI 组件库
- **React 19** - 前端库
- **NextAuth.js** - 身份验证

主要依赖:

- next - React 框架
- react/react-dom - 前端库
- tailwindcss - CSS 框架
- @radix-ui - UI 组件基础
- next-auth - 身份验证
- lucide-react - 图标库
- zod - 表单验证

## 功能特性

- 用户认证系统（注册、登录、密码重置）
- 模板展示和浏览
- 课程展示和浏览
- 主题切换（浅色/深色模式）
- 响应式设计
- SEO 优化

## 项目结构

```
.
├── api/                 # 后端API
│   ├── app/
│   │   ├── config/      # 配置文件
│   │   ├── models/      # 数据模型
│   │   ├── router/      # API路由
│   │   ├── services/    # 业务逻辑
│   │   └── utils/       # 工具函数
│   ├── main.py          # 应用入口
│   └── pyproject.toml   # 项目依赖
└── web/                 # 前端应用
    ├── app/             # 应用页面和路由
    ├── components/      # React组件
    ├── lib/             # 工具函数和配置
    ├── hooks/           # 自定义React hooks
    └── public/          # 静态资源
```

## 快速开始

### 后端 (API)

1. 进入 API 目录:

   ```bash
   cd api
   ```

2. 使用 uv 安装依赖 (推荐):

   ```bash
   uv venv
   uv pip install -e .
   ```

3. 或使用 pip 安装依赖:

   ```bash
   python -m venv venv
   source venv/bin/activate   # Linux/macOS
   # venv\Scripts\activate    # Windows
   pip install -e .
   ```

4. 运行应用:
   ```bash
   uv run main.py
   # 或
   python main.py
   ```

### 前端 (Web)

1. 进入 Web 目录:

   ```bash
   cd web
   ```

2. 安装依赖:

   ```bash
   npm install
   # 或
   yarn install
   # 或
   pnpm install
   ```

3. 运行开发服务器:

   ```bash
   npm run dev
   # 或
   yarn dev
   # 或
   pnpm dev
   ```

4. 访问应用:
   打开浏览器访问 http://localhost:3000

## 部署

### 后端部署

可以使用以下方式部署 FastAPI 应用:

- Docker 容器
- 云服务 (如 Vercel, Render, Heroku 等)
- 传统服务器 (使用 Nginx + Gunicorn)

### 前端部署

Next.js 应用可以部署到:

- Vercel (官方推荐)
- Netlify
- 其他支持 Node.js 的平台

## 开发工具推荐

### 后端

- VS Code with Python extensions
- PyCharm

### 前端

- VS Code with TypeScript and React extensions
- WebStorm

## 许可证

请查看 LICENSE 文件了解详细信息。
