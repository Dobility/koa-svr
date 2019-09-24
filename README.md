# koa2 server framework

koa2 + typescript + eslint + log4js 构成的无视图层的纯服务端框架。

本可以用[*koa*-generator](https://www.npmjs.com/package/koa-generator)来快速搭建框架，但得到的框架与期待的结果和使用习惯还是有些差距。所以开始了自己搭建的过程。首先放出基础框架结构，后面再逐步从0展开：

```python
.
config/             # 项目常量配置文件夹
interface/          # 自定义 ts 接口文件夹
logs/               # 日志输出文件夹，在项目跑起来后才生成，日志按小时为单位生成
    http/           # 正常访问的日志文件夹（也包括404这些“异常”）
    error/          # 访问出错日志文件夹
middleware/         # 中间件文件夹
out/                # ts转js的输出文件夹，在项目跑起来才生成
src/                # 项目业务代码文件夹
    controller/     # api接口实现文件夹
    router/         # 路由即api访问方式与路径配置文件夹
    service/        # 服务层
    app.ts          # 项目入口文件
.babelrc            # babel配置
.editorconfig       # 编辑器配置
.eslintignore       # eslint忽略文件（夹）配置
.eslintrc           # eslint规则配置
.gitattributes      # 主要配置 git 处理换行符
.gitignore          # git 忽略配置
index.ts            # 项目启动文件
nodemon.json        # nodemon配置
package.json        # 项目信息和依赖配置
package-lock.json   # 项目依赖配置
README.md           # 项目说明文档
tsconfig.json       # typescript编译配置
```



## 框架搭建过程

### 依赖的安装和环境的配置

1. 项目准备

   `npm init` 后安装 `koa` 简单套餐：

   ```shell
   npm i koa koa-router koa-bodyparser -S
   ```

2. 项目初始配置

   需要准备 git、编辑器相关配置

   ```
   .
   .editorconfig    # 编辑器代码格式配置
   .gitignore       # git忽略文件与文件夹
   .gitattributes   # 配置 git 换行符风格，以免 windows 下在 git 处理后会自动编程 CRLF
   ```

3. 让项目支持 import/export 

   其实 node 已支持 es6 以上，但还不支持直接用 import/export 等语法，所以还是需要用到 babel

   ```shell
   npm i babel-core babel-polyfill babel-preset-env babel-register -D
   ```

   然后增加配置文件

   ```
   .
   .babelrc        # babel转es6
   ```

4. 让项目使用 typescript

   服务端一般建议用 typescript 来规范编码和有效避免一些编码马虎

   ```shell
   npm i typescript -D
   ```

   然后增加 ts 的编译配置文件

   ```
   .
   tsconfig.json
   ```

   用了 typescript 之后，在代码中会发现使用 `import koa from 'koa'` 等会报错，因为这里会 import 成 js 版的，还需要装 ts 版的库

   ```shell
   npm i @types/node @types/koa @types/koa-router @types/koa-bodyparser -D
   ```

5. 使用 eslint 来检查语法

   （什么，不应该用 tslint 吗？[因为 tslint 自己宣布要放弃了](https://www.npmjs.com/package/tslint)，重新投入 eslint 怀抱……)

   团队合作和代码规范与自检是工程中非常重要的环节，需要安装 eslint 工具

   ```shell
   npm i eslint -D
   ```

   然后增加配置文件

   ```
   .
   .eslintrc         # eslint rule
   .eslintignore     # eslint ignore file/dir
   ```

   为了方便直接使用现有的规则库，自己比较喜欢非常严格的`airbnb`规则，但完整版里面还有`react`的规则，我们的项目不需要视图，所以用基础包 `eslint-config-airbnb-base`和支持 es6 语法检查的 `eslint-plugin-import`

   ```shell
   npm i eslint-config-airbnb-base eslint-plugin-import -D
   ```

   但 eslint 只能检查 js 语法，还不能直接检查 ts 语法，所以还需要装 eslint 的 ts 插件：

   ```shell
   npm i @typescript-eslint/eslint-plugin @typescript-eslint/parser -D
   ```

   然后在 .eslintrc 中需要加入

   ```json
   {
     "parser": "@typescript-eslint/parser",
     "plugins": ["@typescript-eslint/eslint-plugin"],
   }
   ```

6. 让项目支持热更新和 debug

   typescript 热更新需要用到`tsc-watch`，但它仅是自动重新编译成 js，整个项目的热更新可以用`nodemon`；debug 是只能在 chrome 直接 debug 哦，非常方便调试，全局还需要装 node-inspect。

   ```shell
   npm i tsc-watch nodemon -D
   npm i node-inspect -g
   ```

   nodemon 需要增加配置文件

   ```
   .
   nodemon.json
   ```

   为了方便启动热更新、可debug，在 package.json 中增加启动命令为

   ```json
   "scripts": {
     "dev": "tsc-watch --onSuccess \"nodemon --inspect out/index.js\"",
   }
   ```

7. 增加日志管理模块

   服务端少不了日志，koa 中虽然有 koa-logger 中间件，但是有一个更流行的叫`log4js`

   ```shell
   npm i log4js -S
   ```

   后面我们可以在中间件和业务代码中使用它来输出日志

8. 此外，我们还可以装一些安全工具，比如出错管理 [koa-onerror](https://www.npmjs.com/package/koa-onerror)，Http Header 安全 [koa-helmet](https://www.npmjs.com/package/koa-helmet) 等等。

9. 如果后续还需要其他功能，我们可以在增加例如文件上传功能 koa-multer，登录功能 koa-session 等中间件，数据库连接工具 mysql、knex 等等。

