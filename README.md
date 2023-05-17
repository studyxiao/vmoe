- Vue3 + Vite + TS 快速开发模板
- 2023年5月15日
- 基于[antfu/vitesse](https://github.com/antfu/vitesse)

## 开发工具

- `pnpm` Nodejs包管理工具

- [`Vite`](https://cn.vitejs.dev/) 前端构建工具(build)

- VS Code Extensions

  - [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) - Vue 3 `<script setup>` IDE 支持

  - TypeScript Vue Plugin (Volar)  让 TS 识别 .vue

  - goto-alias 配置自动导入组件和API后，需要alias到源文件（Ctrl+click）

  - vscode-tailwindcss class智能感知

  - [Iconify IntelliSense](https://marketplace.visualstudio.com/items?itemName=antfu.iconify) - 图标内联显示和自动补全

  - [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

  - editorconfig 维护部分代码风格和文件格式，在根目录创建`.editorconfig`

    ```toml
    root = true

    [*]
    charset = utf-8
    indent_style = space
    indent_size = 2
    end_of_line = lf
    insert_final_newline = true
    trim_trailing_whitespace = true
    ```

- VS Code Settings `.vscode/settings.json`

  ```json
  {
    "editor.codeActionsOnSave": {
      "source.fixAll.eslint": true
    },
    "files.associations": {
      "*.css": "postcss"
    },
    "editor.formatOnSave": false
  }
  ```

## 开发规范

### 代码风格和规范

- 使用 Composition API 的 [`<script setup>` SFC 语法](https://github.com/vuejs/rfcs/pull/227)

- pnpm 依赖安装配置，根目录下 `.npmrc`

  - ```json
    shamefully-hoist=true
    strict-peer-dependencies=false
    ```

  - `shamefully-hoist=true`  默认的pnpm安装的 peerdep 包会存在 node_module/.pnpm下，但对于一些深层依赖TS会提示找不到，设置true后可以将依赖平铺到 mode_modules 下，但这可能引起依赖冲突，所以设置 `strict-peer-dependencies=false` 不让其自动失败。 [pnpm install | pnpm](https://pnpm.io/zh/cli/install#--shamefully-hoist)

- [ESLint](https://eslint.org/) 配置为 [@antfu/eslint-config](https://github.com/antfu/eslint-config)

  - 单引号, 无分号

  - 自动格式化

  - 开箱即用的 TypeScript、Vue ESLint 适配

  - 也适用于 json、yaml、markdown

  - import排序

  - 末尾逗号

  - etc.

  - `pnpm add -D eslint @antfu/eslint-config` 设置根目录下 `.eslintrc`。其它设置查看官网

    ```yaml
    extends: '@antfu'
    ```

- [Guidelines](https://vueuse.org/guidelines.html#general) VueUse使用指南。

## 公共功能

### 插件

- [`unplugin-auto-import`](https://github.com/antfu/unplugin-auto-import) - 直接使用 Composition API 等，无需导入
- [`unplugin-vue-components`](https://github.com/antfu/unplugin-vue-components) - 自动加载 components 文件夹下组件

- [Vue Router](https://github.com/vuejs/router)
  - [`vite-plugin-pages`](https://github.com/hannoeru/vite-plugin-pages) - 以文件系统为基础的路由
  - [`vite-plugin-vue-layouts`](https://github.com/JohnCampionJr/vite-plugin-vue-layouts) - 页面布局系统
- [Pinia](https://pinia.vuejs.org/) - 直接的, 类型安全的, 使用 Composition API 的轻便灵活的 Vue 状态管理
- [VueUse](https://github.com/antfu/vueuse) - 实用的 Composition API 工具合集
- [`@vueuse/head`](https://github.com/vueuse/head) - 响应式地操作文档头信息
- nprogress
- @iconify-json/carbon 图标包
- [`taze`](https://github.com/antfu/taze) 依赖包升级工具
- type 提示，因为官方包没提供类型提示，所以需要下载类型提示，如果后期官方支持，可以删除
  - @types/markdown-it-link-attributes
  - @types/nprogress

- macros 实验性 vue API
  - unplugin-vue-macros
  - @vue-macros/volar volar支持

- vite-plugin-vue-markdown
- vite-plugin-webfont-dl

### 自动导入API

通过 [`unplugin-auto-import`](https://github.com/antfu/unplugin-auto-import) 实现。可以不 import 直接使用 vue vue-router axios 等 api。这些会通过自动生成 `*.d.ts` 实现ts类型提示。只设置`vite.config.ts`选项即可。

- 预设 api  直接在`imports`中写入名称字符串
- 可编辑 api 字典形式，只加载部分api
- 自定义 api 通过文件发现形式，自动导入`dirs`，嵌套`something/**`

```ts
// vite.config.ts
import AutoImport from 'unplugin-auto-import/vite'

export default defineConfig({
  plugins: [
    AutoImport({
      // 预设
      imports: [
        'vue',
        'vue-router',
        '@vueuse/head',
        '@vueuse/core',
      ],
      // 生成的 .d.ts 文件以支持 TS 语法提示
      dts: 'src/auto-imports.d.ts',
      // 自定义函数，嵌套路径需 `module/**`
      dirs: [
        'src/composables',
        'src/stores',
      ],
      // 支持在 template 中使用
      vueTemplate: true,
    }),
  ],
})
```

### 按需自动导入组件

通过[`unplugin-vue-components`](https://github.com/antfu/unplugin-vue-components) 实现，默认加载`src/components`下所有`.vue`。

不用再 import 组件，可以直接使用。只设置`vite.config.ts`选项即可，然后就可以在 components文件夹下随意创建组件。

```tsx
import Components from 'unplugin-vue-components/vite'

Components({
  dirs: ['src/components'],
  // 自动扫描 `./src/components/` 下 vue 和 markdown 组件，支持嵌套
  extensions: ['vue', 'md'],
  // 生成的 .d.ts 文件以支持 TS 语法提示
  dts: 'src/components.d.ts',
  // 在 vue 和 markdown 中获得支持
  include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
}),
```

自定义图标或者第三方UI库需要设置如 `resolvers: [AntDesignVueResolver()]`。

### 路由系统

**第一步：**按照文件路径自动映射路由，由`vue-router`和`vite-plugin-pages` 提供。设置`vite.config.ts`选项选项后，还需要在`main.ts` 中通过 router进行注册。PS：记得在 AutoImport中注册以便自动导入API。

`vite.config.ts`

```tsx
import Pages from 'vite-plugin-pages'

export default {
  plugins: [
    Pages({
      // 自动导入 `src/pages/` 下的 vue md 或 js 导出的组件
      extensions: ['vue', 'md'],
    }),
  ],
}
```

`main.ts`

```tsx
import { createRouter, createWebHistory } from 'vue-router'
import routes from '~pages'

const router = createRouter({
  history: createWebHistory(),
  routes,
})
createApp(App).use(router).mount('#app')
```

类型提示`tsconfig.json`

```json
{
  "compilerOptions": {
    "types": [
      "vite-plugin-pages/client"
    ]
  }
}
```

在 `src/pages/*.vue` 使用 `<route lang='yaml'></route>`定义元信息

```vue
<route lang='yaml'>
name: demo
meta:
  requiresAuth: true
</route>
```

然后在 `App.vue` 中设置 `<RouterView />` 即可。

映射关系：

> `src/pages/index.vue` - `/`
>
> `src/pages/users.vue` -> `/users`
>
> `src/pages/users/index.vue` -> `/users`  同时存在 users.vue 时会形成嵌套路由
>
> `src/pages/users/profile.vue` -> `/users/profile`
>
> `src/pages/users/[id].vue` -> `/users/:id`
>
> `src/pages/[user]/settings.vue` -> `/:user/settings`
>
> `src/pages/[...all].vue` -> `/*` (`/non-existent-page`)

**第二步：**在上面的基础上利用`vite-plugin-vue-layout` 提供布局功能，即某些页面的公共部分。设置`vite.config.ts`选项后，需要在`main.ts`中改造page相关代码。之后在 layouts 文件夹中创建布局组件，最后在pages的组件中使用 route 设置布局。默认是`default.vue`

`vite.config.ts`

```tsx
import Vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'
import Layouts from 'vite-plugin-vue-layouts'

export default {
  plugins: [Vue(), Pages(), Layouts()],
}
```

改造`router`

```tsx
import { createRouter } from 'vue-router'
import { setupLayouts } from 'virtual:generated-layouts'
import generatedRoutes from '~pages'

const routes = setupLayouts(generatedRoutes)

const router = createRouter({
  // ...
  routes,
})
```

类型提示 TODO 由于 bug 导致提示失败，临时解决方案是client添加client.d.ts

```json
{
  "compilerOptions": {
    "types": [
      "vite-plugin-vue-layouts/client"// vite-plugin-vue-layouts/client.d.ts
    ]
  }
}
```

### 全局变量 Pinia

[Pinia](https://pinia.vuejs.org/introduction.html)

在`main.ts`中注册`createPinia`后就可以在stores文件夹下创建各个store了

```tsx
import createPinia from 'pinia'

const pinia = createPinia()

app.use(pinia)
```

`src/stores/counter.ts`

```tsx
import { acceptHMRUpdate, defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)

  return {
    count,
  }
})
```

使用`HelloWorld.vue`

```vue
<script setup lang="ts">
const counter = useCounterStore()
</script>

<template>
  <button type="button" @click="counter.count++">
    count is {{ counter.count }}
  </button>
</template>
```

### 工具集 vueuse

[VueUse](https://vueuse.org/)

安装 `@vueuse/core` ，记得在 AutoImport中注册以便自动导入API。

常用的比如 `useDark()` `useLocalStorage()` `useMouse()` `onClickOutside()` `useVModel()` 等。

### 自定义文档 Head

[vueuse/head](https://github.com/vueuse/head)

使用 `pnpm add @vueuse/head` (是 `@unhead/vue` 的简单包装)。在`main.ts`注册，修改`index.html`的head，可以去掉title之后在`App.vue`中自动设置。可以设置：

- title
- description
- icon（可以将svg放到 public文件夹下，然后引用）
- script

PS：记得在 AutoImport中注册以便自动导入API。

`main.ts`

```tsx
import { createHead } from '@vueuse/head'

const head = createHead()

app.use(head)
```

`App.vue`

```vue
<script setup lang="ts">
useHead({
  title: 'VMoe',
  meta: [
    {
      name: 'description',
      content: 'Opinionated Vite Starter Template from vitesse',
    },
  ],
  link: [
    {
      rel: 'icon',
      type: 'image/svg+xml',
      href: () => preferredDark.value ? '/favicon-dark.svg' : '/favicon.svg',
    },
  ],
})
</script>
```

### UI

- [TailwindCSS](https://tailwindcss.com/docs/guides/vite#vue) 组合式CSS 框架
  - [TailwindCSS Typography TailwindCSS 排版](https://github.com/tailwindlabs/tailwindcss-typography)
  - [TailwindCSS Forms](https://github.com/tailwindlabs/tailwindcss-forms)
  - [TailwindCSS Aspect Ratio TailwindCSS 纵横比](https://github.com/tailwindlabs/tailwindcss-aspect-ratio)
  - [tailwindcss-container-queries](https://github.com/tailwindlabs/tailwindcss-container-queries) 支持容器查询
  - [tailwindcss-animate](https://github.com/jamiebuilds/tailwindcss-animate)

[Install Tailwind CSS with Vite - Tailwind CSS](https://tailwindcss.com/docs/guides/vite#vue)

### Icon

- 从 [Icônes](https://icones.js.org/) 查找图标集（源自）[Iconify ](https://iconify.design/) 使用 mdi 和 heroicons
- [unokugin-icons](https://github.com/antfu/unplugin-icons) 将图标轻松集成到框架，并按需集成。同时结合 [`unplugin-vue-components`](https://github.com/antfu/unplugin-vue-components) 插件可以实现自动导入。
- 自定义图标、自定义大小颜色

安装

```bash
pnpm add -D unplugin-icons
# 安装数据集，可以先安装 mdi 和 heroicons
pnpm add -D @iconify-json/mdi @iconify-json/heroicons
```

设置`vite.config.ts`

```tsx
// vite.config.ts
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'

export default defineConfig({
  plugins: [
    Icons({ /* options */ }),
    Components({
      resolvers: [
        IconsResolver(),
      ],
    }),
  ],
})
```

类型提示

```json
// tsconfig.json
{
  "compilerOptions": {
    "types": [
      "unplugin-icons/types/vue"
    ]
  }
}
```

加载自定义svg图标

```tsx
import { FileSystemIconLoader } from 'unplugin-icons/loaders'

Icons({
  customCollections: {
      // 加载 svg 图标 <i-my-icons-[name] />
    'my-icons': FileSystemIconLoader(
      'src/assets/icons',
      svg => svg.replace(/^<svg /, '<svg fill="currentColor" '),
    ),
  }
}

Components({
  // ...
  resolvers: [
      // 支持自动导入
    IconsResolver({
      customCollections: ['my-icons'],
    }),
  ],
}),
```

使用规范`{prefix}-{collection}-{icon}` prefix 默认是`i`。

```html
<i-mdi-account-box />
<i-my-icons-logo />
```

### 字体

[feat-agency/vite-plugin-webfont-dl: ⚡ Webfont Download Vite Plugin - Make your Vite site load faster (github.com)](https://github.com/feat-agency/vite-plugin-webfont-dl)

自动将在线字体下载到本地并替换。配置后直接在 public.html的head中添加网络字体即可，剩下的就是自动下载和替换。之后就可以在 family中使用这个字体了。

### Markdown 支持

- [`vite-plugin-vue-markdown`](https://github.com/antfu/vite-plugin-vue-markdown) - Markdown as components / components in Markdown
  - [`markdown-it-shiki`](https://github.com/antfu/markdown-it-shiki) - [Shiki](https://github.com/shikijs/shiki) for syntax highlighting

vite.config.ts 设置在 Vue中要增加.md文件的支持。设置自动导入

```tsx
import Markdown from 'vite-plugin-vue-markdown'
import ViteComponents from 'vite-plugin-components'

export default {
  Vue({
    includes: ['\/.vue\', '\/.md\'],
  })
  plugins: [
    Markdown(),
    // should be placed after `Markdown()`
    ViteComponents({
      // allow auto load markdown components under `./src/components/`
      extensions: ['vue', 'md'],

      // allow auto import and register components used in markdown
      customLoaderMatcher: path => path.endsWith('.md'),
    })
  ],
}
```

主题使用内置的。

### 其它设置

- `~/`代指`/src/`

`vite.config.ts`

```tsx
import path from 'node:path'

export default defineConfig({
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
})
```

`tsconfig.json`

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "~/*": ["src/*"]
    }
  }
}
```

- nprogress

### Vue 实验性 API 支持

[sxzz/vue-macros: Explore and extend more macros and syntax sugar to Vue. --- sxzz/vue-macros：探索并将更多的宏和语法糖扩展到 Vue。 (github.com)](https://github.com/sxzz/vue-macros)

### 未实现

- 🌍 [I18n ready](https://github.com/antfu/vitesse/blob/main/locales)
- 🔎 [Component Preview](https://github.com/johnsoncodehk/vite-plugin-vue-component-preview)
- Static-site generation (SSG) via [vite-ssg](https://github.com/antfu/vite-ssg)
- Critical CSS via [critters](https://github.com/GoogleChromeLabs/critters)
- [`vite-plugin-vue-inspector`](https://github.com/webfansplz/vite-plugin-vue-inspector) - jump to local IDE source code while click the element of browser automatically
- Unit Testing with [Vitest](https://github.com/vitest-dev/vitest), E2E Testing with [Cypress](https://cypress.io/) on [GitHub Actions](https://github.com/features/actions)
- ☁️ Deploy on Netlify, zero-config
- git lint
- github action

## Coding

```bash
pnpm run dev
pnpm run build
pnpm run up  # 升级依赖
```

### Checklist

- [ ] 更改 `package.json` 中 name 和 version
- [ ] 更改 `App.vue` 中的标题
- [ ] 更改 `public`中的 favicon
- [ ] 整理路由文件
