# portfolio

瓦帕迪力的个人作品集网站。Next.js 15（App Router）+ Tailwind CSS v4，静态导出，无 UI 组件库，无外部字体依赖（全部用系统字体栈，保证国内访问不受任何 CDN 影响）。

## 本地开发

```bash
npm install
npm run dev       # http://localhost:3000
```

## 构建

```bash
npm run build          # 输出到 out/，basePath 为空，给 Vercel 根域名用
npm run build:mirror    # 输出到 out/，basePath 为 /me，给自建服务器镜像用
```

两次构建的产物目录相同（`out/`），构建镜像版之前记得先把上一次的 `out/` 清掉或者放到不同目录，避免混用。

## 部署（以下需要你自己动手，我这边做不了）

### 1. Vercel（主部署）

代码已经推到 `https://github.com/yinren112/portfolio`（public）。

1. 登录 [vercel.com](https://vercel.com)，New Project → 选择 `yinren112/portfolio` 仓库
2. Framework Preset 选 Next.js（Vercel 会自动识别），其余保持默认，直接 Deploy
3. 部署完成后会拿到一个 `xxx.vercel.app` 的地址

### 2. 自建服务器镜像（国内访问用，解决 vercel.app 在国内可能打不开的问题）

你已经有 `lailinkeji.com` 的服务器和 Nginx，思路是把静态产物传上去挂在 `/me/` 子路径下：

```bash
# 本地执行
npm run build:mirror
# out/ 目录就是完整的静态站点，basePath 已经处理成 /me

# 传到服务器（换成你服务器的实际路径）
rsync -avz --delete out/ 你的用户名@服务器IP:/var/www/lailinkeji-me/
```

Nginx 配置里加一段（跟官网、learning-web 现有的 server block 放一起，参考它们已有的 HTTPS 配置，不需要新证书）：

```nginx
location /me/ {
    alias /var/www/lailinkeji-me/;
    try_files $uri $uri/ $uri.html =404;
}
```

改完 `nginx -t` 测试一下配置再 `systemctl reload nginx`。之后 `https://lailinkeji.com/me/` 就能访问了。

### 3. 以后想换成个人专属域名

现在先用 `xxx.vercel.app`（海外/长期地址）+ `lailinkeji.com/me/`（国内镜像）这两个免费方案跑起来。真觉得这事儿值得长期投入了，再考虑买个人域名，在 Vercel 项目设置里加一下自定义域名就行，不用改代码。

## 内容素材

`content/` 目录下是 7 个页面的完整文案草稿（markdown 格式），是这个网站的"文案源头"，代码里的文字都是从这里搬过去的。以后要改文案，建议先改这里的 md 文件，改完再同步到对应的 `.tsx` 页面，保持两边一致。
