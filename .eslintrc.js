module.exports = {
  extends: ['plugin:gm-react-app/recommended'],
  rules: {
    'import/no-named-default': 'off',
    "react/jsx-handler-names": 'off'
  },
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      rules: {
        // eslint-plugin-gm-react-app 的 ts overrides 链会重新启用该规则，
        // 其依赖的 @typescript-eslint/parser 2.x 无法解析 @types/react 18 的 d.ts
        'import/namespace': 'off',
      },
    },
  ],
}
