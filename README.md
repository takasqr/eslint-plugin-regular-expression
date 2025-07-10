# eslint-plugin-regular-expression

![logo](https://eslint.regexp.app/icon.png)

**Custom ESLint rules with regexp**

![logo](https://eslint.regexp.app/screenshot.webp)

## Overview

`eslint-plugin-regular-expression` is a plugin that enables defining ESLint rules using regular expressions. You can specify **forbidden** or **required** patterns for variable names, function names, string literals, and more.

## Features

* **Ban Patterns**: Prohibit specific patterns using regular expressions for variable names, function names, strings, and more.
* **Require Patterns**: Enforce the presence of specific patterns (expressed with regular expressions) in your code.

## Installation

Install with the following command:

```bash
npm i eslint eslint-plugin-regular-expression -D
```

## Usage

After installation, add the plugin to your ESLint config. `eslint-plugin-regular-expression` supports Flat Config.

Example:

**eslint.config.js**

```js
import regexpRules from 'eslint-plugin-regular-expression';

export default [
  {
    files: ["*.js", "*.ts"],
    plugins: {
      'regexp-rules': regexpRules,
    },
    rules: {
      'regexp-rules/banned': ['error', { patterns: ["forbidde*"] }],
      'regexp-rules/required': ['error', { patterns: ["required"] }],
    },
  },
];
```

In this example:

* The `banned` rule prohibits patterns matching `forbidde*`.
* The `required` rule enforces that the pattern `required` appears somewhere in the code.

This plugin can be used in both JavaScript and TypeScript projects.

## Document

[English](https://eslint.regexp.app/en/) | [日本語](https://eslint.regexp.app/ja/)
