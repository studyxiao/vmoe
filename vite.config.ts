import path from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import Pages from 'vite-plugin-pages'
import Layouts from 'vite-plugin-vue-layouts'
import Icons from 'unplugin-icons/vite'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'
import IconsResolver from 'unplugin-icons/resolver'
import WebfontDownload from 'vite-plugin-webfont-dl'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
    },
  },

  plugins: [
    vue(),

    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      // 预设
      imports: [
        'vue',
        'vue-router',
        'pinia',
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

    // https://github.com/antfu/unplugin-vue-components
    Components({
      dirs: ['src/components'],
      // 自动扫描 `./src/components/` 下 vue 和 markdown 组件，支持嵌套
      extensions: ['vue', 'md'],
      // 生成的 .d.ts 文件以支持 TS 语法提示
      dts: 'src/components.d.ts',
      // 在 vue 和 markdown 中获得支持
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      resolvers: [
        IconsResolver({
          customCollections: ['my-icons'],
        }),
      ],
    }),

    // https://github.com/hannoeru/vite-plugin-pages
    Pages({
      // 还可以是数组
      dirs: 'src/pages',
      // 自动导入 `src/pages/` 下的 vue md 或 ts 导出的组件
      extensions: ['vue', 'md', 'ts'],
      // 不包括 `src/pages/**/components/` 下的组件
      exclude: ['**/components/*.vue'],
    }),

    // https://github.com/JohnCampionJr/vite-plugin-vue-layouts
    Layouts(),

    // https://github.com/antfu/unplugin-icons
    Icons({
      // 自定义图标
      customCollections: {
        // <i-my-icons-[name] />
        'my-icons': FileSystemIconLoader(
          'src/assets/icons',
          svg => svg.replace(/^<svg /, '<svg fill="currentColor" '),
        ),
      },
    }),

    // https://github.com/feat-agency/vite-plugin-webfont-dl
    WebfontDownload(),
  ],
})
