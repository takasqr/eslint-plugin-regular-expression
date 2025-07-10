---
title: eslint-plugin-regular-expression | Custom ESLint rules with regexp
description: eslint-plugin-regular-expression is a plugin that allows you to define ESLint rules using regular expressions. You can specify required or forbidden patterns for variable names, function names, strings, and more using regular expressions.
createDate: 2025/07/10
updated: 
cover: '/ogp_image.webp'
alt: eslint-plugin-regular-expression
---

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

## Rule List

* [banned](#banned)
* [banned-identifier](#banned-identifier)
* [banned-literal](#banned-literal)
* [required](#required)
* [required-identifier](#required-identifier)
* [required-literal](#required-literal)

### banned

#### Description

Prohibits identifiers and literals matching the given regular expressions.

| Target     | Examples                       | Supported |
| ---------- | ------------------------------ | --------- |
| Identifier | Variable names, function names | ✅         |
| Literal    | Strings, numbers               | ✅         |

#### Options

* `patterns`: An array of regular expression patterns to ban.

#### Example

```js
rules: {
  'regexp-rules/banned': ["error", { "patterns": ["^foo", "abc$"] }]
}
```

#### ❌ Invalid

```js
const fooVar = "test";
// Identifier "fooVar" is banned by pattern "^foo".eslint(regexp-rules/banned)
const str = "myabc";
// Literal "myabc" is banned by pattern "abc$".eslint(regexp-rules/banned)
```

#### ✅ Valid

```js
const barVar = "test"; // OK
const str = "defghi"; // OK
```

### banned-identifier

#### Description

Prohibits identifiers (e.g., variable or function names) that match specified regular expressions.

| Target     | Examples                       | Supported |
| ---------- | ------------------------------ | --------- |
| Identifier | Variable names, function names | ✅         |
| Literal    | Strings, numbers               | ❌         |

#### Options

* `patterns`: An array of regular expression patterns to ban.

#### Example

```js
rules: {
  'regexp-rules/banned-identifier': ["error", { "patterns": ["^foo", "bar$"] }]
}
```

#### ❌ Invalid

```js
const fooVariable = 1;
// Identifier "fooVariable" is banned by pattern "^foo".eslint(regexp-rules/banned-identifier)
let myBar = "test";
// Identifier "bar" is banned by pattern "bar$".eslint(regexp-rules/banned-identifier)
```

#### ✅ Valid

```js
const testVariable = 1; // OK
let baz = "test"; // OK
```

### banned-literal

#### Description

Prohibits literals (e.g., strings, numbers) that match specified regular expressions.

| Target     | Examples           | Supported |
| ---------- | ------------------ | --------- |
| Identifier | Variable, function | ❌         |
| Literal    | Strings, numbers   | ✅         |

#### Options

* `patterns`: An array of regular expression patterns to ban.

#### Example

```js
rules: {
  'regexp-rules/banned-literal': ["error", { "patterns": ["^abc", "xyz$"] }]
}
```

#### ❌ Invalid

```js
const str = "abcTest";
// Literal "abcTest" is banned by pattern "^abc".eslint(regexp-rules/banned-literal)
const another = "endxyz";
// Literal "endxyz" is banned by pattern "xyz$".eslint(regexp-rules/banned-literal)
```

#### ✅ Valid

```js
const str = "defTest";
const another = "end";
```

### required

#### Description

Identifiers or literals must match at least one of the specified regular expressions.

| Target     | Examples                       | Supported |
| ---------- | ------------------------------ | --------- |
| Identifier | Variable names, function names | ✅         |
| Literal    | Strings, numbers               | ✅         |

#### Options

* `patterns`: An array of required regular expression patterns.

#### Example

```js
rules: {
  'regexp-rules/required': ["error", { "patterns": ["^foo", "bar"] }]
}
```

#### ❌ Invalid

```js
const varName = "invalid";
// No identifiers or literals matching the required patterns: ^foo, bar.eslint(regexp-rules/required)
```

#### ✅ Valid

```js
const fooVar = "barValue";
// OK
```

### required-identifier

#### Description

Identifiers must match at least one of the specified regular expressions.

| Target     | Examples                       | Supported |
| ---------- | ------------------------------ | --------- |
| Identifier | Variable names, function names | ✅         |
| Literal    | Strings, numbers               | ❌         |

#### Options

* `patterns`: An array of required regular expression patterns.

#### Example

```js
rules: {
  'regexp-rules/required-identifier': ["error", { "patterns": ["^my", "^foo"] }]
}
```

#### ❌ Invalid

```js
const varName = 1;
// No identifiers matching the required patterns: ^my, ^foo.eslint(regexp-rules/required-identifier)
```

#### ✅ Valid

```js
const myVar = 1;
const fooBar = 2;
// OK
```

### required-literal

#### Description

Literals must match at least one of the specified regular expressions.

| Target     | Examples         | Supported |
| ---------- | ---------------- | --------- |
| Identifier | Variable, func.  | ❌         |
| Literal    | Strings, numbers | ✅         |

#### Options

* `patterns`: An array of required regular expression patterns.

#### Example

```js
rules: {
  'regexp-rules/required-literal': ["error", { "patterns": ["hello", "world"] }]
}
```

#### ❌ Invalid

```js
const text = "invalid";
// No string literals matching the required patterns: hello, world.eslint(regexp-rules/required-literal)
```

#### ✅ Valid

```js
const greeting = "hello";
const place = "world";
// OK
```
