module.exports = {
  env: {
    browser: true,
    es2021: true,
    "jest/globals": true,
  },
  extends: ["airbnb-base", "prettier"],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  rules: {
    "no-shadow": "off",
    "no-param-reassign": ["error", { props: false }],
    "func-names": "off",
    "import/prefer-default-export": "off",
    "max-len": [
      "error",
      { code: 1045, ignoreRegExpLiterals: true, ignoreComments: true },
    ],
    "no-console": "off",
    "no-alert": "off",
  },
  plugins: ["jest"],
};
