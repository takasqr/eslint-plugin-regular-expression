# eslint-plugin-regular-expression

**Define ESLint rules using regular expressions**

## Overview

`eslint-plugin-regular-expression` is an ESLint plugin that enables rule definitions using regular expressions. It allows you to specify **banned** or **required** patterns for variable names, function names, string literals, and more. You can enforce naming conventions, eliminate unsafe strings, and maintain consistent code styles using just regular expressions.

It’s ideal for teams and projects that require fine-grained control over code patterns and strict structure.

## Features

* **Banned Patterns**: You can ban specific patterns in variable names, function names, literals, etc., using regular expressions.
* **Required Patterns**: You can enforce that identifiers or literals match certain regular expression patterns.

## Installation

Install with the following command:

```bash
npm i eslint eslint-plugin-regular-expression -D
```

## Usage

After installing, add the plugin to your ESLint config. Example:

**eslint.config.js**

```js
import patternRules from 'eslint-plugin-regular-expression';

export default [
  {
    files: ["*.js", "*.ts"],
    plugins: {
      'pattern-rules': patternRules,
    },
    rules: {
      'pattern-rules/banned': ['error', { patterns: ["forbidde*"] }],
      'pattern-rules/required': ['error', { patterns: ["required"] }],
    },
  },
];
```

In this example:

* The `banned` rule disallows identifiers or literals matching `forbidde*`.
* The `required` rule enforces the presence of identifiers or literals that include `required`.

This plugin integrates seamlessly with JavaScript and TypeScript projects.

## Document

[English](https://eslint.regexp.app/en/) | [日本語](https://eslint.regexp.app/ja/)
