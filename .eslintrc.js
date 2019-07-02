module.exports = {
  parser: 'babel-eslint',
  extends: ['airbnb', 'prettier'],
  rules: {
      "arrow-parens": "off", /* too restrictive */
      "class-methods-use-this": "off", /* might want to revisit, but very restrictive */
      "import/prefer-default-export": "off", /* bad for new files that only have a single export */
      "indent": ["error", 2, { "SwitchCase": 1 }],
      "jsx-a11y/no-static-element-interactions": "off", /* prevents divs from having click handlers... common */
      "jsx-quotes": ["error", "prefer-single"],
      "max-len": ["warn", { "code": 120, "tabWidth": 4, "ignoreComments": true }],
      "new-cap": ["error", { "capIsNewExceptions": ["DragDropContext"] }],
      "no-confusing-arrow": ["error", { "allowParens": true }],
      "no-mixed-operators": ["error", { "allowSamePrecedence": true }],
      "no-plusplus": "off",
      "no-underscore-dangle": "off",
      "no-unused-vars": [1, { "vars": "all", "args": "none" }], /* bad detection with object rest params */
      "no-use-before-define": "off",
      "prefer-arrow-callback": "off",
      "quotes": ["error", "single", { "allowTemplateLiterals": true }],
      "react/jsx-filename-extension": ["error", { "extensions": [".js", ".jsx"] }],
      "react/forbid-prop-types": "off", /* array and object fail, very common */
      "react/jsx-indent": ["error", 2],
      "react/jsx-indent-props": ["error", 2],
      "react/jsx-no-bind": "off",
      "react/no-find-dom-node": "off", /* revisit if no-string-refs is deprecated */
      "react/no-multi-comp": "error",
      "react/no-unused-prop-types": "warn", /* bad detection with object rest params */
      "react/prop-types": ["error", { "ignore": ["dispatch"] }],

      "import/no-unresolved": "off",
      "import/no-extraneous-dependencies": "off",
      "import/no-duplicates": "off",
      "import/no-named-as-default": "off",
      "import/no-named-as-default-member": "off"
  },
  env: {
      browser: true,
      jest: true,
  },
};
