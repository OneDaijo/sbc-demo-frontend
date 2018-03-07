module.exports = {
  "env": {
    "browser": true,
    "node": true,
  },
  "extends": "airbnb",
  "globals": {
    "ASSETS_URI": false,
  },
  "rules": {
    "comma-dangle": ["error", {
      "arrays": "only-multiline",
      "objects": "only-multiline",
      "imports": "only-multiline",
      "exports": "only-multiline",
      "functions": "ignore",
    }],
    "function-paren-newline": [0],
    "indent": ["error", 2, {
      "MemberExpression": 0,
      "SwitchCase": 1,
    }],
    "max-len": ["error", 160],
    "no-lonely-if": 0,
    "no-underscore-dangle": 0,
    "object-curly-newline": 0,
    "prefer-destructuring": 0,
    "jsx-a11y/anchor-is-valid": ["off", {
      "components": [ "Link" ],
    }],
    "jsx-a11y/click-events-have-key-events": 0,
    "jsx-a11y/no-static-element-interactions": 0,
    "react/forbid-prop-types": 0,
    "react/jsx-curly-spacing": 0,
    "react/jsx-filename-extension": 0,
    "react/prefer-stateless-function": 0,
    "react/sort-comp": 0,
  },
};
