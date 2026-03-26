import js from '@eslint/js'
import globals from 'globals'
import preferArrow from 'eslint-plugin-prefer-arrow'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist', 'HTML']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    plugins: {
      'prefer-arrow': preferArrow,
    },
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      'func-style': ['error', 'expression'],
      'prefer-arrow-callback': ['error', { allowNamedFunctions: false, allowUnboundThis: true }],
      'prefer-arrow/prefer-arrow-functions': [
        'error',
        { disallowPrototype: true, singleReturnOnly: false, classPropertiesAllowed: false },
      ],
    },
  },
])
