import eslintPluginJs from "@eslint/js";
import { rules } from "eslint-config-prettier";
export default [
  {
    ...eslintPluginJs.configs.recommended,
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "commonjs"
    },
    linterOptions: { reportUnusedDisableDirectives: true }
  },
  {
    files: ["**/*.js"],
    plugins: [],
    rules: {
      ...require("eslint-config-prettier")
    }
  }
];
