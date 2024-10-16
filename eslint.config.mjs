import eslintConfigLove from "eslint-config-love";

/** @type { import("eslint").Linter.Config[] } */
export default [
  {
    ...eslintConfigLove,
    files: ["**/*.ts", "**/*.tsx"],
    rules: {
      ...eslintConfigLove.rules,
      // Tentatively changed from error to warn due to migration
      "@typescript-eslint/no-magic-numbers": "warn",
    },
  },
  {
    ignores: [".yarn/", "coverage/", "e2e/", "*.js", "*.d.ts"],
  },
];
