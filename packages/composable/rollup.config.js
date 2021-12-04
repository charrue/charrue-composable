import fs from 'fs';
import esbuild from "rollup-plugin-esbuild";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import dts from "rollup-plugin-dts";

const VUE_DEMI_IIFE = fs.readFileSync(require.resolve('vue-demi/lib/index.iife.js'), 'utf-8')

const config = [
  {
    external: ["vue-demi"],
    plugins: [
      // resolve(),
      // commonjs(),
      esbuild({
        minify: false,
        sourceMap: false,
        target: "esnext",
      }),
    ],
    input: "./src/index.ts",
    output: [
      {
        dir: "./dist",
        format: "es",
        globals: {
          'vue-demi': 'VueDemi'
        },
        entryFileNames: () => "[name].es.js",
      },
    ],
  },
];
export default config;
