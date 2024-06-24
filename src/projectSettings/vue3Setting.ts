const packageJson = `{
  "name": "vue3-ts",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build"
  },
  "dependencies": {
    "@element-plus/icons-vue": "^1.1.4",
    "@wangeditor/editor": "^5.1.23",
    "@wangeditor/editor-for-vue": "^5.1.12",
    "axios": "^1.6.8",
    "crypto-js": "^4.1.1",
    "echarts": "^5.3.2",
    "echarts-liquidfill": "^3.1.0",
    "element-china-area-data": "^6.1.0",
    "element-plus": "^2.7.1",
    "js-md5": "^0.8.3",
    "js-sha256": "^0.9.0",
    "lodash": "^4.17.21",
    "qs": "^6.12.0",
    "uuid": "^9.0.0",
    "vue": "^3.4.21",
    "vue-demi": "^0.14.7",
    "vue-router": "^4.0.0-0",
    "vuex": "^4.0.0-0",
    "xss": "^1.0.15"
  },
  "devDependencies": {
    "@types/crypto-js": "^4.1.1",
    "@types/lodash": "^4.17.0",
    "@types/node": "^20.12.7",
    "@typescript-eslint/eslint-plugin": "^7.7.1",
    "@typescript-eslint/parser": "^7.7.1",
    "@vitejs/plugin-vue": "^5.0.4",
    "@vitejs/plugin-vue-jsx": "^3.1.0",
    "@vue/eslint-config-standard": "^8.0.1",
    "@vue/eslint-config-typescript": "^13.0.0",
    "eslint": "^8.57.0",
    "eslint-plugin-import": "^2.20.2",
    "eslint-plugin-node": "^11.1.0",
    "eslint-plugin-promise": "^4.2.1",
    "eslint-plugin-standard": "^4.0.0",
    "eslint-plugin-vue": "^9.25.0",
    "sass": "^1.26.5",
    "terser": "^5.30.4",
    "typescript": "5.2.2",
    "typescript-plugin-css-modules": "^5.1.0",
    "unplugin-vue-components": "^0.26.0",
    "vite": "^5.2.0",
    "vite-plugin-svg-icons": "^2.0.1",
    "vue-tsc": "^2.0.6"
  },
  "browserslist": [
    "> 1%",
    "last 2 versions",
    "not dead"
  ]
}
`;

const tsConfig = `{
  "compilerOptions": {
    "target": "esnext",
    "module": "esnext",
    "strict": true,
    "jsx": "preserve",
    "importHelpers": true,
    "moduleResolution": "node",
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "sourceMap": true,
    "baseUrl": ".",
    "noImplicitAny": false,
    "paths": {
      "@/*": ["src/*"]
    },
    "lib": ["esnext", "dom", "dom.iterable", "scripthost", "ES2015", "ES2015.promise"],
    "plugins": [{ "name": "typescript-plugin-css-modules" }],
    "types": ["vite/client"],
  },
  "include": [
    "src/**/*.ts",
    "src/**/*.tsx",
    "src/**/*.vue",
    "tests/**/*.ts",
    "tests/**/*.tsx",
    "types/**/*.d.ts",
    "vite.config.ts",
  ],
  "exclude": ["node_modules","**/*.js", "study-deal"]
}
`;
const viteConfig = `import vue from '@vitejs/plugin-vue';
import { ConfigEnv } from 'vite';
import { UserConfigExport } from 'vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import Components from 'unplugin-vue-components/vite';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import path from 'path';

// https://vitejs.dev/config/
export default ({ mode, command }: ConfigEnv): UserConfigExport => {
  const isBuild = command.includes('build');
  return {
    base: "/",
    resolve: {
      alias: [
        {
          find: '@',
          replacement: '/src',
        },
      ],
    },
    server: {
      // 服务配置
      port: 6001, // 类型： number 指定服务器端口;
      open: false, // 类型： boolean | string在服务器启动时自动在浏览器中打开应用程序；
      cors: false, // 类型： boolean | CorsOptions 为开发服务器配置 CORS。默认启用并允许任何源
      host: '0.0.0.0', // IP配置，支持从IP启动
      proxy: {
        '/api': {
          target: '', // 研发云环境
          ws: true,
          changeOrigin: true,
        },
      },
    },
    build: {
      outDir: 'study-deal',
      // outDir: 'dist',
      rollupOptions: {
        output: {
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
          manualChunks(id, { getModuleInfo }) {
            const reg = /(.*)\\/src\\/components\\/(.*)/
            if (reg.test(id)) {
              const importersLen = getModuleInfo(id)?.importers.length;
              // 被多处引用
              if (importersLen && importersLen > 1) {
                return 'common';
              }
            }
          }
        },
      },
      assetsDir: 'static',
      sourcemap: mode !== 'production',
      chunkSizeWarningLimit: 1500,
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: mode === 'production',
          drop_debugger: true,
        },
      },
    },
    css: {
      modules: {
        //* css模块化
        // css模块化 文件以.module.[css|less|scss]结尾
        generateScopedName: '[name]__[local]___[hash:base64:5]',
        hashPrefix: 'prefix',
      },
     preprocessorOptions: {
      scss: {}
     }
    },
    plugins: [
      vue(),
      // JSX支持
      vueJsx(),
      Components({
        dirs: ['src/components'],
        extensions: ['vue', 'md', 'tsx'],
        deep: true,
        dts: 'types/components.d.ts',
        directoryAsNamespace: false,
        globalNamespaces: [],
        directives: true,
        include: [/\.vue$/, /\.vue\?vue/, /\.md$/, /\.tsx$/],
        exclude: [
          /[\\/]node_modules[\\/]/,
          /[\\/]\.git[\\/]/,
          /[\\/]\.nuxt[\\/]/,
        ],
        resolvers: [ElementPlusResolver()],
      }),
      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [path.resolve(process.cwd(), 'src/icons/svg')],
        // 指定symbolId格式
        symbolId: 'icon-[dir]-[name]',
      })
    ],
  };
};
`;

export default {
  packageJson,
  tsConfig,
  viteConfig
};