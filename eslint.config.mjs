import eslintConfigLove from 'eslint-config-love'
// import eslintPluginImport from "eslint-plugin-import";

export default [
  {
    ...eslintConfigLove,
    // TODO: eslintPluginImport
    files: ['**/*.js', '**/*.ts', '**/*.tsx'],
    ignores: ['.yarn', 'coverage', 'node_modules', '*.js', '*.d.ts', 'e2e']
  }
]
