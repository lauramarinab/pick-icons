module.exports = {
  extends: [
    "react-app",
    "plugin:jsx-a11y/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
  ],
  plugins: ["jsx-a11y", "sort-keys-fix", "typescript-sort-keys", "sort-destructure-keys", "import"],
  rules: {
    "import/no-anonymous-default-export": "error",
    "import/no-named-as-default-member": "off",
    "import/no-webpack-loader-syntax": "off",
    "import/order": ["error", { alphabetize: { caseInsensitive: true, order: "asc" }, "newlines-between": "always" }],
    "jsx-a11y/anchor-is-valid": "off",
    "jsx-a11y/click-events-have-key-events": "off",
    "jsx-a11y/label-has-associated-control": "off",
    "jsx-a11y/no-onchange": "off",
    "jsx-a11y/no-static-element-interactions": "off",
    "react/jsx-sort-props": [
      "error",
      { callbacksLast: true, ignoreCase: true, reservedFirst: true, shorthandFirst: true },
    ],
    "react/react-in-jsx-scope": "off",
    "sort-destructure-keys/sort-destructure-keys": "error",
    "sort-keys-fix/sort-keys-fix": ["error", "asc", { natural: true }],
    "typescript-sort-keys/interface": ["error", "asc", { natural: true, requiredFirst: true }],
    "typescript-sort-keys/string-enum": ["error", "asc", { natural: true }],
  },
  settings: {
    "import/resolver": {
      typescript: {}, // this loads <rootdir>/tsconfig.json to eslint
    },
  },
};
