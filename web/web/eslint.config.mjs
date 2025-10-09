import { fixupConfigRules } from "@eslint/compat";
import { FlatCompat } from "@eslint/eslintrc";
import pluginJs from "@eslint/js";
import globals from "globals";
import { dirname } from "path";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";
import tseslint from "typescript-eslint";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  resolvePluginsRelativeTo: __dirname,
});

export default tseslint.config(
  {
    languageOptions: {
      globals: globals.browser,
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...fixupConfigRules(pluginReactConfig),
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // Ignore all files in the generated folder
  {
    ignores: ["src/generated/**"],
  },
);
