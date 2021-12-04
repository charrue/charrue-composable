// npm run create-hook
// 1. 在packages/composable/src/hooks目录下创建hookName文件夹、index.ts、index.test.ts
// 2. 在packages/composable/src/index.ts 引入hookName
// 3. 在packages/docs/src目录下创建 hookName文件夹、index.md、demo/demo.vue
// 4. 更新packages/docs/docs/.vitepress/config.js中的sidebar配置
const prompts = require("prompts");
const path = require("path");
const fs = require("fs");

const resolve = (...args) => path.resolve(__dirname, "../packages", ...args);
const hyphenateRE = /\B([A-Z])/g;
const hyphenate = (str) => str.replace(hyphenateRE, "-$1").toLowerCase();

const HOOK_SEC_PATH = resolve("composable/src/hooks");
const DOC_SRC_PATH = resolve("docs/src");
const DOC_SIDEBAR_CONFIG_PATH = resolve("docs/docs/.vitepress/sidebar.json");

const checkHookExist = (hookName) => fs.existsSync(path.resolve(HOOK_SEC_PATH, hookName));

const createHookFile = (hookName) => {
  fs.mkdirSync(path.resolve(HOOK_SEC_PATH, hookName));
  fs.writeFileSync(path.resolve(HOOK_SEC_PATH, `${hookName}/index.ts`), `export default function ${hookName}() {\n  }`, {
    encoding: "utf-8",
  });
  fs.writeFileSync(
    path.resolve(HOOK_SEC_PATH, `${hookName}/index.test.ts`),
    `
  import { useSetup } from "../../utils/test-helper";
  import {hookName} from './${hookName}';

  describe('测试${hookName}', () => {
    it('基本使用', () => {

    });
  });
    `.trim(),
    {
      encoding: "utf-8",
    },
  );
  const configContent = fs.readFileSync(DOC_SIDEBAR_CONFIG_PATH, { encoding: "utf-8" });
  const config = JSON.parse(configContent);
  config.push({ text: hookName, link: `/base/${hyphenate(hookName)}/` });
  fs.writeFileSync(
    DOC_SIDEBAR_CONFIG_PATH,
    JSON.stringify(config, null, 2),
  );
};

const createDocFile = (hookName) => {
  const hookDocPath = path.resolve(DOC_SRC_PATH, hookName);
  fs.mkdirSync(hookDocPath);
  fs.mkdirSync(path.resolve(hookDocPath, "demo"));
  fs.writeFileSync(path.resolve(hookDocPath, "index.md"), `---
map:
  path: /base/${hyphenate(hookName)}
---
# ${hookName}`, {
    encoding: "utf-8",
  });
  fs.writeFileSync(
    path.resolve(hookDocPath, "demo/demo.vue"),
    `<template>
  <div>
  </div>
</template>
<script>
  import { ${hookName} } from '@charrue/composable';
  export default {
    setup() {
    }
  }
</script>`.trim(),
    {
      encoding: "utf-8",
    },
  );
};

(async () => {
  const { hookName } = await prompts({
    type: "text",
    name: "hookName",
    message: "请输入新建的hook名称",
  });

  // 取消输入
  if (!hookName) return;

  if (checkHookExist(hookName)) {
    console.log("hook已存在");
    return;
  }
  createHookFile(hookName);
  createDocFile(hookName);
})();
