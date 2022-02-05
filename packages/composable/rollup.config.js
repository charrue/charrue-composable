import path from "path";
const rimraf = require("rimraf");
const fs = require("fs");
const { nodeResolve } = require("@rollup/plugin-node-resolve");
const commonJs = require("@rollup/plugin-commonjs");
const rollupEsBuildPlugin = require("rollup-plugin-esbuild");
const pkg = require("./package.json");

const esbuild = rollupEsBuildPlugin.default ? rollupEsBuildPlugin.default : rollupEsBuildPlugin;
const { minify } = rollupEsBuildPlugin;

const VUE_DEMI_IIFE = fs.readFileSync(require.resolve("vue-demi/lib/index.iife.js"), "utf-8");
const injectVueDemi = {
  name: "inject-vue-demi",
  renderChunk(code) {
    return `${VUE_DEMI_IIFE};\n;${code}`;
  },
};
let deps = pkg.dependencies || {};
deps = Object.keys(deps);

const commonPlugins = [
  esbuild({
    target: "es2015",
  }),
  nodeResolve(),
  commonJs(),
];

const input = path.resolve(__dirname, "./src/index.ts");
const getOutput = (filename) => path.resolve(__dirname, "./dist", filename);

const config = [
  {
    input,
    output: {
      file: getOutput("index.cjs.js"),
      format: "cjs",
      globals: {
        "vue-demi": "VueDemi",
      },
    },
    external(id) {
      return /^vue/.test(id);
    },
    plugins: commonPlugins,
  },
  {
    input,
    output: {
      file: getOutput("index.es.js"),
      format: "es",
      globals: {
        "vue-demi": "VueDemi",
      },
    },
    external(id) {
      return /^vue/.test(id);
    },
    plugins: commonPlugins,
  },
  {
    input,
    output: {
      file: getOutput("index.iife.min.js"),
      name: "CharrueComposable",
      format: "iife",
      extend: true,

      globals: {
        "vue-demi": "VueDemi",
      },
    },
    external(id) {
      return /^vue/.test(id);
    },
    plugins: [
      ...commonPlugins,
      deps["vue-demi"] && injectVueDemi,
      minify(),
    ],
  },
];

rimraf.sync("./dist");
export default config;
