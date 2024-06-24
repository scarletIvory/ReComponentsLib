/*
 * @Author: tuwenxuan
 * @Date: 2024-06-23 14:47:30
 * @LastEditors: tuwenxuan
 * @LastEditTime: 2024-06-23 16:23:55
 * @FilePath: \ReComponentsLib\src\projectSettings\vue2Setting.ts
 * @Description: 
 * 
 */
const packageJson = `{
  "name": "default-vue2",
  "version": "1.9.0",
  "private": true,
  "scripts": {
    "serve": "vue-cli-service serve",
    "build": "vue-cli-service build",
    "lint": "lint-staged",
    "prepare": "husky install"
  },
  "hooks": {
    "pre-commit": "lint-staged"
  },
  "lint-staged": {
    "*.ts": [
      "prettier --write",
      "eslint --fix",
      "git add"
    ],
    "*.js": [
      "prettier --write",
      "eslint --cache --fix",
      "git add"
    ],
    "*.vue": [
      "prettier --write",
      "eslint --cache --fix",
      "git add"
    ],
    "*.{json,md,yml,css}": [
      "prettier --write",
      "git add"
    ]
  },
  "dependencies": {
    "amfe-flexible": "^2.2.1",
    "core-js": "^3.6.5",
    "echarts": "^5.2.0",
    "element-ui": "^2.4.5",
    "js-md5": "^0.7.3",
    "js-sha256": "^0.9.0",
    "vue": "^2.6.11",
    "vue-clipboard2": "^0.3.3",
    "vue-i18n": "^8.1.1",
    "vue-router": "^3.2.0",
    "vuex": "^3.4.0",
    "vuex-persistedstate": "^2.5.4",
    "vxe-table": "^3.3.14",
    "xe-utils": "^3.4.0"
  },
  "devDependencies": {
    "@commitlint/cli": "^13.2.1",
    "@commitlint/config-conventional": "^13.2.0",
    "@vue/cli-plugin-babel": "~4.5.0",
    "@vue/cli-plugin-eslint": "~4.5.0",
    "@vue/cli-plugin-router": "~4.5.0",
    "@vue/cli-plugin-vuex": "~4.5.0",
    "@vue/cli-service": "~4.5.0",
    "@vue/eslint-config-prettier": "^6.0.0",
    "autoprefixer": "^8.0.0",
    "axios": "^0.18.0",
    "babel-eslint": "^10.1.0",
    "eslint": "^6.7.2",
    "eslint-plugin-prettier": "^3.3.1",
    "eslint-plugin-vue": "^6.2.2",
    "husky": "^7.0.2",
    "less": "^3.0.4",
    "less-loader": "^5.0.0",
    "lint-staged": "^11.2.3",
    "postcss": "^8.3.6",
    "postcss-loader": "^6.1.1",
    "postcss-pxtorem": "^5.0.0",
    "prettier": "^2.2.1",
    "style-resources-loader": "^1.4.1",
    "svg-sprite-loader": "^6.0.11",
    "vue-cli-plugin-axios": "~0.0.4",
    "vue-cli-plugin-element": "~1.0.1",
    "vue-cli-plugin-store": "~0.0.7",
    "vue-cli-plugin-style-resources-loader": "^0.1.5",
    "vue-template-compiler": "^2.6.11"
  }
}
`;

const vueConfig = `const path = require("path");

const autoprefixer = require("autoprefixer");
const pxtorem = require("postcss-pxtorem");

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  outputDir: "evidence-front",
  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "less",
      patterns: [path.resolve(__dirname, "src/style/var.less")], // 引入全局样式变量
    },
  },
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          autoprefixer({
            browsers: [
              "> 1%",
              "last 7 versions",
              "not ie <= 8",
              "ios >= 8",
              "android >= 4.0",
            ],
          }),
          pxtorem({
            rootValue: 192,
            propList: ["*"],
            minPixelValue: 2,
          }),
        ],
      },
    },
  },
  devServer: {
    port: 8080,
    proxy: {
      "/api": {
        target: "http://10.160.40.199:13390/",
        //  target: "https://onetrust.cmzii.com",
        pathRewrite: { "^/api": "/api" },
        changeOrigin: true,
      },
    },
    overlay: false,
    clientLogLevel: "warning",
  },
  chainWebpack: (config) => {
    config.resolve.alias.set("@", resolve("src"));
    config.module
      .rule("svg")
      .exclude.add(path.join(__dirname, "src/assets/icons")) // 排除自定义svg目录
      .end();
    config.module
      .rule("icons") // 新规则
      .test(/\.svg$/)
      .include.add(path.join(__dirname, "src/assets/icons")) // 新规则应用于我们存放svg的目录
      .end()
      .use("svg-sprite-loader") // 用sprite-loader接卸
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]",
      })
      .end();
  },
  productionSourceMap: false,
};
`;

export default {
  packageJson,
  vueConfig,
};