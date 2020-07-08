# umi-electron-boilerplate

> Powered by [eumi](https://github.com/diamondYuan/eumi).

- UmiJS (render)
- Webpack (main)
- Typescript
- Ant Design
- ESLint

## 如何使用

### 安装依赖

```
$ yarn
```

### 开发

```
$ yarn dev
```

浏览器打开 `http://localhost:8888` 即可预览。

可以尝试修改 `src/renderer/pages/index.tsx` 和 `src/main/main.ts` 的内容，页面会自动刷新。

### 编译

```
$ yarn build
$ yarn start # 启动编译后的程序
```

### 打包

```
$ yarn release:win
$ yarn release:mac
```

## 自定义配置

### 主进程配置

配置文件为 `build/webpack.main.config.js`,可以参考 [webpack](https://webpack.js.org/concepts/)。

### 渲染进程配置

配置文件为 `src/renderer/config/config.ts`,可以参考 [umi](https://umijs.org/config)。

### 打包配置

配置文件为 `electron-builder.json`,可以参考 [electron-builder](https://www.electron.build/configuration/configurations)。
