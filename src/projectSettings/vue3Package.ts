type vue3Package = {
  [key: string]: {
    dependencies: {
      [key: string]: string;
    };
    devDependencies: {
      [key: string]: string;
    };
    pnpmConfig?: {
      allowedDeprecatedVersions?: {
        [key: string]: string;
      };
      peerDependencyRules?: {
        allowedVersions?: {
          [key: string]: string;
        };
      };
    };
  };
};

type TConfigMap = {
  [key: string]: {
    version?: string;
    dependencyKey?: string;
    configKey: string;
    packages?: string;
  };
};

export const vue3Config: vue3Package = {
  'scss': {
    dependencies: {},
    devDependencies: {
      "sass": ""
    }
  },
  'less': {
    dependencies: {},
    devDependencies: {
      "less": ""
    }
  },
  'pxToRem': {
    dependencies: {},
    devDependencies: {
      "postcss-pxtorem": ""
    }
  },
  'eslint': {
    dependencies: {},
    devDependencies: {
      "@typescript-eslint/eslint-plugin": "",
      "@typescript-eslint/parser": "",
      "eslint": "",
      "eslint-plugin-import": "",
      "eslint-plugin-node": "",
      "eslint-plugin-promise": "",
      "eslint-plugin-standard": "",
      "eslint-plugin-vue": ""
    }
  },
  'stylelint': {
    dependencies: {},
    devDependencies: {
      "stylelint": "",
      "stylelint-config-standard": "",
      "stylelint-config-recommended-vue": ""
    }
  },
  'pinia': {
    dependencies: {
      "pinia": ""
    },
    devDependencies: {}
  },
  'elementPlus': {
    dependencies: {
      "element-plus": ""
    },
    devDependencies: {}
  },
  'pnpm': {
    dependencies: {},
    devDependencies: {},
    pnpmConfig: {
      "allowedDeprecatedVersions": {
        "sourcemap-codec": "*",
        "domexception": "*",
        "w3c-hr-time": "*",
        "stable": "*",
        "abab": "*"
      },
      "peerDependencyRules": {
        "allowedVersions": {
          "eslint": "9"
        }
      }
    }
  }
};

export const configMap: TConfigMap = {
  useScss: { version: 'scssVersion', dependencyKey: 'sass', configKey: 'scss' },
  useLess: { version: 'lessVersion', dependencyKey: 'less', configKey: 'less' },
  usePxToRem: { version: 'pxToRemVersion', dependencyKey: 'postcss-pxtorem', configKey: 'pxToRem' },
  useESLint: { packages: 'eslintPackages', configKey: 'eslint' },
  useStylelint: { packages: 'stylelintPackages', configKey: 'stylelint' },
  usePinia: { version: 'piniaVersion', dependencyKey: 'pinia', configKey: 'pinia' },
  useElementPlus: { version: 'elementPlusVersion', dependencyKey: 'element-plus', configKey: 'elementPlus' }
};