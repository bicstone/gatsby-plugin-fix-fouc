import eslintConfigLove from "eslint-config-love";

/** @type { import("eslint").Linter.Config[] } */
export default [
  {
    ...eslintConfigLove,
    files: ["**/*.ts", "**/*.tsx"],
    rules: {
      ...eslintConfigLove.rules,
      // Tentatively changed from error to warn due to migration
      // Keep the options from eslint-config-love; ESLint 10.8+ requires them
      "@typescript-eslint/no-magic-numbers": [
        "warn",
        ...eslintConfigLove.rules["@typescript-eslint/no-magic-numbers"].slice(
          1,
        ),
      ],
    },
  },
  {
    ignores: [".yarn/", "coverage/", "e2e/", "*.js", "*.d.ts"],
  },
];
