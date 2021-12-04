module.exports = {
  root: true,
  env: {
    jest: true,
    node: true,
  },
  parser: "@babel/eslint-parser",
  parserOptions: {
    ecmaVersion: 8,
    requireConfigFile: false,
  },
  extends: ["eslint-config-charrue-base"],
  rules: {
    "no-console": "off",
    "no-debugger": "error",
    "max-statements": "off",
  },
  overrides: [
    {
      files: ["*.js"],
      parser: "@babel/eslint-parser",
    },
    {
      files: ["*.ts"],
      extends: ["plugin:@typescript-eslint/eslint-recommended", "plugin:@typescript-eslint/recommended"],
      parser: "@typescript-eslint/parser",
      plugins: ["@typescript-eslint/eslint-plugin"],
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      rules: {
        "@typescript-eslint/no-empty-function": "off",
      },
    },
  ],
  globals: {
  },
};
