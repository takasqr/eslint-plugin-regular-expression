---
title: eslint-plugin-regular-expression | Custom ESLint rules with regexp
description: eslint-plugin-regular-expression is a plugin that allows you to define ESLint rules using regular expressions. You can specify required or forbidden patterns for variable names, function names, strings, and more using regular expressions.
createDate: 2025/07/10
updated: 
cover: '/ogp_image.webp'
alt: eslint-plugin-regular-expression
---

# eslint-plugin-regular-expression

**c**

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

## Rule List

* [banned](#banned)
* [banned-identifier](#banned-identifier)
* [banned-literal](#banned-literal)
* [required](#required)
* [required-identifier](#required-identifier)
* [required-literal](#required-literal)

### banned

#### Description

Bans identifiers or literals that match the specified regular expressions.

#### Options

* `patterns`: An array of regular expressions to ban.

#### Example Configuration

```js
rules: {
  'pattern-rules/banned': ["error", { "patterns": ["^foo", "abc$"] }]
}
```

#### Invalid Example (NG):

```js
const fooVar = "test";
const str = "myabc";
```

#### Valid Example (OK):

```js
const barVar = "test";
const str = "defghi";
```

### banned-identifier

#### Description

Bans identifiers (such as variable or function names) that match the specified regular expressions.

#### Options

* `patterns`: An array of regular expressions to ban.

#### Example Configuration

```js
rules: {
  'pattern-rules/banned-identifier': ["error", { "patterns": ["^foo", "bar$"] }]
}
```

#### Invalid Example (NG):

```js
const fooVariable = 1;
let myBar = "test";
```

#### Valid Example (OK):

```js
const testVariable = 1;
let baz = "test";
```

### banned-literal

#### Description

Bans string literals that match the specified regular expressions.

#### Options

* `patterns`: An array of regular expressions to ban.

#### Example Configuration

```js
rules: {
  'pattern-rules/banned-literal': ["error", { "patterns": ["^abc", "xyz$"] }]
}
```

#### Invalid Example (NG):

```js
const str = "abcTest";
const another = "endxyz";
```

#### Valid Example (OK):

```js
const str = "defTest";
const another = "end";
```

### required

#### Description

Requires that identifiers or literals match at least one of the specified regular expression patterns.

#### Options

* `patterns`: An array of required regular expressions.

#### Example Configuration

```js
rules: {
  'pattern-rules/required': ["error", { "patterns": ["^foo", "bar"] }]
}
```

#### Invalid Example (NG):

```js
const varName = "invalid";
```

#### Valid Example (OK):

```js
const fooVar = "barValue";
```

### required-identifier

#### Description

Requires that identifiers match at least one of the specified regular expressions.

#### Options

* `patterns`: An array of required regular expressions.

#### Example Configuration

```js
rules: {
  'pattern-rules/required-identifier': ["error", { "patterns": ["^my", "^foo"] }]
}
```

#### Invalid Example (NG):

```js
const varName = 1;
```

#### Valid Example (OK):

```js
const myVar = 1;
const fooBar = 2;
```

### required-literal

#### Description

Requires that string literals match at least one of the specified regular expressions.

#### Options

* `patterns`: An array of required regular expressions.

#### Example Configuration

```js
rules: {
  'pattern-rules/required-literal': ["error", { "patterns": ["hello", "world"] }]
}
```

#### Invalid Example (NG):

```js
const text = "invalid";
```

#### Valid Example (OK):

```js
const greeting = "hello";
const place = "world";
```
