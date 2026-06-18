# BATHLUXE 空调保温洗澡房 · 商品展示网页

> 基于 Next.js 16 + Tailwind CSS 4 + shadcn/ui 构建的高品质商品展示单页应用，可一键部署到 Cloudflare Pages。

## ✨ 功能特性

- 🎨 **现代轻奢设计**：高级灰 + 纯净白 + 黑色边框的高端卫浴调性，完全复刻设计稿风格
- 📱 **响应式布局**：移动端、平板、桌面端三端适配，移动端体验尤为流畅
- 🖼️ **10 大内容板块**：
  1. **顶部导航栏**（粘性，滚动变色，移动端汉堡菜单）
  2. **首屏 Hero**（全屏背景 + 主标题 + CTA 按钮）
  3. **核心优势**（4 大卖点卡片：3秒速热 / 3分钟升温 / 500KG承重 / 30年寿命）
  4. **产品实物展示**（10 张实物图，可点击放大）
  5. **匠心细节**（5 大产品细节图文交替展示）
  6. **全套卫浴配置**（5 大配件图标：顶喷 / 手喷 / 置物架 / 化妆镜 / 分水器）
  7. **极限强度演示**（汽车碾压 + 人体承重测试）
  8. **型号介绍**（3 款型号对比，含规格与价格）
  9. **多场景应用**（4 张高端浴室场景图）
  10. **品牌宣传画册**（6 张宣传海报，支持切换浏览）
  11. **联系我们**（电话 / 微信 / 抖音 / 小红书 二维码）
- 📞 **悬浮联系按钮**：右下角常驻电话 + 微信咨询入口
- 🚀 **静态导出**：`output: "export"`，可直接部署到 Cloudflare Pages / Vercel / Netlify / GitHub Pages

## 🛠️ 技术栈

| 层级 | 技术 | 说明 |
|------|------|------|
| 框架 | Next.js 16 (App Router) | `output: "export"` 静态导出 |
| 语言 | TypeScript 5 | 全程类型安全 |
| 样式 | Tailwind CSS 4 | 原子化 CSS |
| 组件库 | shadcn/ui (New York) | 高质量可定制 |
| 图标 | lucide-react | 现代线性图标 |
| 字体 | Noto Sans SC | 中文显示清晰 |
| 部署 | Cloudflare Pages | 免费 CDN + 自动 HTTPS |

## 📁 项目结构

```
.
├── src/
│   ├── app/
│   │   ├── layout.tsx        # 根布局（字体、SEO 元数据）
│   │   ├── page.tsx          # 主页面（所有 UI 逻辑）
│   │   └── globals.css       # 全局样式 + 品牌定制
│   └── components/ui/        # shadcn/ui 组件库
├── public/
│   └── images/
│       ├── products/         # 10 张产品实物图
│       ├── scenes/           # 4 张应用场景图
│       ├── strength/         # 2 张强度演示图
│       ├── promo/            # 6 张宣传画册
│       └── qr/               # 3 个二维码（占位，需替换）
├── next.config.ts            # 静态导出配置
├── wrangler.toml             # Cloudflare Pages 配置
└── package.json
```

## 🔧 本地开发

```bash
# 安装依赖
bun install   # 或 npm install

# 启动开发服务器
bun run dev   # 或 npm run dev
# 访问 http://localhost:3000

# Lint 检查
bun run lint

# 生产构建（输出到 out/ 目录）
bun run build
```

## ☁️ 部署到 Cloudflare Pages

### 方式一：通过 Git 仓库自动部署（推荐）

1. **将代码推送到 GitHub**：
   ```bash
   git init
   git add .
   git commit -m "feat: BATHLUXE 洗澡房商品网页"
   git branch -M main
   git remote add origin https://github.com/<你的用户名>/<仓库名>.git
   git push -u origin main
   ```

2. **在 Cloudflare 控制台连接仓库**：
   - 登录 [Cloudflare Dashboard](https://dash.cloudflare.com)
   - 进入 **Workers & Pages** → **Create application** → **Pages** → **Connect to Git**
   - 选择刚推送的仓库

3. **构建设置**（关键）：
   | 配置项 | 值 |
   |--------|-----|
   | Framework preset | `Next.js (Static HTML Export)` |
   | Build command | `npx next build` |
   | Build output directory | `out` |
   | Root directory | `/` |
   | Node version | `18` 或更高 |

4. **点击 Save and Deploy**，等待 2-3 分钟构建完成。

5. 访问 `https://<project-name>.pages.dev` 即可看到部署的网站。

### 方式二：使用 Wrangler CLI 手动部署

```bash
# 1. 安装 Wrangler
npm install -g wrangler

# 2. 登录 Cloudflare
wrangler login

# 3. 构建项目
bun run build

# 4. 部署到 Cloudflare Pages
wrangler pages deploy ./out --project-name=bathluxe-shower-room
```

## ✏️ 二次定制指南

### 1. 修改联系电话

编辑 `src/app/page.tsx`，找到 `CONTACT` 对象：

```typescript
const CONTACT = {
  phone: "400-888-8888",          // 修改为您的真实电话
  mobile: "138-8888-8888",        // 修改为您的真实手机号
  wechat: "BATHLUXE-Official",    // 修改为您的微信号
  email: "service@bathluxe.com",
  address: "广东省佛山市南海区狮山镇科技工业园A区58号",
  workTime: "周一至周日 8:00 - 22:00",
};
```

### 2. 替换二维码图片

将您真实的二维码图片保存为同名文件，覆盖 `public/images/qr/` 下的占位图即可：

```
public/images/qr/
├── wechat-qr.png         ← 微信二维码
├── douyin-qr.png         ← 抖音二维码
└── xiaohongshu-qr.png    ← 小红书二维码
```

### 3. 修改产品型号与价格

编辑 `src/app/page.tsx`，找到 `MODELS` 数组，按需修改名称、尺寸、特性、价格。

### 4. 替换图片素材

将新的图片以相同文件名覆盖 `public/images/` 下的对应文件即可，无需修改代码。

### 5. 修改品牌名称与 Logo

编辑 `src/app/page.tsx` 中的 `Navbar`、`Footer`、`layout.tsx` 中的 `metadata`，
将 `BATHLUXE` 替换为您的品牌名。

### 6. 增删页面板块

页面板块均为独立函数组件（`Hero`、`Advantages`、`ProductDetails` 等），
在主页面 `Home()` 函数中按需保留或删除即可。

## 📝 注意事项

1. **图片体积**：当前所有图片总体积约 35MB，建议部署前使用 [tinypng.com](https://tinypng.com/) 等工具压缩以提升加载速度。
2. **环境变量**：本项目为纯静态展示，无需任何环境变量。
3. **HTTPS**：Cloudflare Pages 自动提供 HTTPS，无需额外配置。
4. **CDN**：Cloudflare 自带全球 CDN，国内访问速度良好。
5. **自定义域名**：在 Cloudflare Pages 控制台 → Custom domains 中绑定您自己的域名。

## 📞 技术支持

如部署遇到问题，可参考：
- [Cloudflare Pages 官方文档](https://developers.cloudflare.com/pages/)
- [Next.js 静态导出文档](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)

---

© BATHLUXE. 保留所有权利.
