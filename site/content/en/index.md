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

## 概要

`eslint-plugin-regular-expression` は、ESLint に正規表現を使ったルール定義を可能にするプラグインです。変数名、関数名、文字列などに対して、**禁止**または**必須**のパターンを正規表現で指定できます。

## 特徴

* **禁止パターン（Ban）**：変数名や関数名、文字列などに対して、特定のパターンを正規表現で禁止できます。
* **必須パターン（Require）**：ファイル内のコードに、正規表現で表した特定のパターンが登場することを強制できます。

## インストール

以下のコマンドでインストールします：

```bash
npm i eslint eslint-plugin-regular-expression -D
```

## 使い方

インストール後、ESLint 設定ファイルにプラグインを追加して使用します。`eslint-plugin-regular-expression`は Flat Config に対応しています。

以下はその例です：

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

この例では：

* `banned` ルールは、`forbidde*` に一致する変数名や関数名、文字列などを禁止します。
* `required` ルールは、`required` がコード内に含まれることを必須とします。

このプラグインは JavaScript や TypeScript プロジェクトで使用することができます。

## ルール一覧

* [banned](#banned)
* [banned-identifier](#banned-identifier)
* [banned-literal](#banned-literal)
* [required](#required)
* [required-identifier](#required-identifier)
* [required-literal](#required-literal)

### banned

#### 説明

指定した正規表現に一致する識別子やリテラルを禁止します。

| 対象 | 例 | 対応 |
|---|---|---|
| 識別子 | 変数名、関数名など | ⭕️ |
| リテラル | 文字列、数字など | ⭕️ |


#### オプション

* `patterns`: 禁止する正規表現パターンの配列。

#### 設定例

```js
rules: {
  'regexp-rules/banned': ["error", { "patterns": ["^foo", "abc$"] }]
}
```

#### NG 例：

```js
const fooVar = "test";
// Identifier "fooVar" is banned by pattern "^foo".eslint(regexp-rules/banned)
const str = "myabc";
// Literal "myabc" is banned by pattern "abc$".eslint(regexp-rules/banned)
```

#### OK 例：

```js
const barVar = "test"; // OK
const str = "defghi"; // OK
```

### banned-identifier

#### 説明

指定した正規表現に一致する識別子（変数名や関数名など）を禁止します。

| 対象 | 例 | 対応 |
|---|---|---|
| 識別子 | 変数名、関数名など | ⭕️ |
| リテラル | 文字列、数字など | ❌ |

#### オプション

* `patterns`: 禁止する正規表現パターンの配列。

#### 設定例

```js
rules: {
  'regexp-rules/banned-identifier': ["error", { "patterns": ["^foo", "bar$"] }]
}
```

#### NG 例：

```js
const fooVariable = 1;
// Identifier "fooVariable" is banned by pattern "^foo".eslint(regexp-rules/banned-identifier)
let myBar = "test";
// Identifier "bar" is banned by pattern "bar$".eslint(regexp-rules/banned-identifier)
```

#### OK 例：

```js
const testVariable = 1; // OK
let baz = "test"; // OK
```

### banned-literal

#### 説明

指定した正規表現に一致するリテラル（文字列、数字など）を禁止します。

| 対象 | 例 | 対応 |
|---|---|---|
| 識別子 | 変数名、関数名など | ❌ |
| リテラル | 文字列、数字など | ⭕️ |

#### オプション

* `patterns`: 禁止する正規表現パターンの配列。

#### 設定例

```js
rules: {
  'regexp-rules/banned-literal': ["error", { "patterns": ["^abc", "xyz$"] }]
}
```

#### NG 例：

```js
const str = "abcTest";
// Literal "abcTest" is banned by pattern "^abc".eslint(regexp-rules/banned-literal)
const another = "endxyz";
// Literal "endxyz" is banned by pattern "xyz$".eslint(regexp-rules/banned-literal)
```

#### OK 例：

```js
const str = "defTest";
const another = "end";
```

### required

#### 説明

コード内の識別子やリテラルが、いずれかの正規表現パターンに一致している必要があります。

| 対象 | 例 | 対応 |
|---|---|---|
| 識別子 | 変数名、関数名など | ⭕️ |
| リテラル | 文字列、数字など | ⭕️ |

#### オプション

* `patterns`: 必須とする正規表現パターンの配列。

#### 設定例

```js
rules: {
  'regexp-rules/required': ["error", { "patterns": ["^foo", "bar"] }]
}
```

#### NG 例：

```js
const varName = "invalid";
// No identifiers or literals matching the required patterns: ^foo, bar.eslint(regexp-rules/required)
```

#### OK 例：

```js
const fooVar = "barValue";
// OK
```

### required-identifier

#### 説明

コード内の識別子が、いずれかの正規表現パターンに一致している必要があります。

| 対象 | 例 | 対応 |
|---|---|---|
| 識別子 | 変数名、関数名など | ⭕️ |
| リテラル | 文字列、数字など | ❌ |

#### オプション

* `patterns`: 必須とする正規表現パターンの配列。

#### 設定例

```js
rules: {
  'regexp-rules/required-identifier': ["error", { "patterns": ["^my", "^foo"] }]
}
```

#### NG 例：

```js
const varName = 1;
// No identifiers matching the required patterns: ^my, ^foo.eslint(regexp-rules/required-identifier)
```

#### OK 例：

```js
const myVar = 1;
const fooBar = 2;
// OK
```

### required-literal

#### 説明

コード内のリテラルが、いずれかの正規表現パターンに一致している必要があります。

| 対象 | 例 | 対応 |
|---|---|---|
| 識別子 | 変数名、関数名など | ❌ |
| リテラル | 文字列、数字など | ⭕️ |

#### オプション

* `patterns`: 必須とする正規表現パターンの配列。

#### 設定例

```js
rules: {
  'regexp-rules/required-literal': ["error", { "patterns": ["hello", "world"] }]
}
```

#### NG 例：

```js
const text = "invalid";
// No string literals matching the required patterns: hello, world.eslint(regexp-rules/required-literal)
```

#### OK 例：

```js
const greeting = "hello";
const place = "world";
// OK
```
