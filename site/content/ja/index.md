# eslint-plugin-regular-expression

**正規表現で ESLint のルールを定義する**

## 概要

`eslint-plugin-regular-expression` は、ESLint に正規表現を使ったルール定義を可能にするプラグインです。変数名、関数名、文字列リテラルなどに対して、**禁止**または**必須**のパターンを正規表現で指定できます。命名規則の統一や危険な文字列の排除、スタイルの一貫性を正規表現だけで実現できます。

コードパターンを細かく制御し、厳格な構造を求めるチームやプロジェクトに最適です。

## 特徴

* **禁止パターン（Ban）**：変数名や関数名、リテラルなどに対して、特定のパターンを正規表現で禁止できます。
* **必須パターン（Require）**：識別子やリテラルが特定のパターンに一致していることを強制できます。

## インストール

以下のコマンドでインストールします：

```bash
npm i eslint eslint-plugin-regular-expression -D
```

## 使い方

インストール後、ESLint 設定ファイルにプラグインを追加して使用します。以下はその例です：

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

この例では：

* `banned` ルールは、`forbidde*` に一致する識別子やリテラルを禁止します。
* `required` ルールは、`required` を含む識別子やリテラルを必須とします。

このプラグインは JavaScript や TypeScript プロジェクトにシームレスに統合できます。

## ルール一覧

* [banned](#banned)
* [banned-identifier](#banned-identifier)
* [banned-literal](#banned-literal)
* [required](#required)
* [required-identifier](#required-identifier)
* [required-literal](#required-literal)

### banned

#### 説明

正規表現に一致する識別子やリテラルを禁止します。

#### オプション

* `patterns`: 禁止する正規表現パターンの配列。

#### 設定例

```js
rules: {
  'pattern-rules/banned': ["error", { "patterns": ["^foo", "abc$"] }]
}
```

#### NG 例：

```js
const fooVar = "test";
const str = "myabc";
```

#### OK 例：

```js
const barVar = "test";
const str = "defghi";
```

### banned-identifier

#### 説明

指定した正規表現に一致する識別子（変数名や関数名など）を禁止します。

#### オプション

* `patterns`: 禁止する正規表現パターンの配列。

#### 設定例

```js
rules: {
  'pattern-rules/banned-identifier': ["error", { "patterns": ["^foo", "bar$"] }]
}
```

#### NG 例：

```js
const fooVariable = 1;
let myBar = "test";
```

#### OK 例：

```js
const testVariable = 1;
let baz = "test";
```

### banned-literal

#### 説明

正規表現に一致する文字列リテラルを禁止します。

#### オプション

* `patterns`: 禁止する正規表現パターンの配列。

#### 設定例

```js
rules: {
  'pattern-rules/banned-literal': ["error", { "patterns": ["^abc", "xyz$"] }]
}
```

#### NG 例：

```js
const str = "abcTest";
const another = "endxyz";
```

#### OK 例：

```js
const str = "defTest";
const another = "end";
```

### required

#### 説明

識別子やリテラルが、いずれかの正規表現パターンに一致している必要があります。

#### オプション

* `patterns`: 必須とする正規表現パターンの配列。

#### 設定例

```js
rules: {
  'pattern-rules/required': ["error", { "patterns": ["^foo", "bar"] }]
}
```

#### NG 例：

```js
const varName = "invalid";
```

#### OK 例：

```js
const fooVar = "barValue";
```

### required-identifier

#### 説明

識別子が指定された正規表現のいずれかに一致している必要があります。

#### オプション

* `patterns`: 必須とする正規表現パターンの配列。

#### 設定例

```js
rules: {
  'pattern-rules/required-identifier': ["error", { "patterns": ["^my", "^foo"] }]
}
```

#### NG 例：

```js
const varName = 1;
```

#### OK 例：

```js
const myVar = 1;
const fooBar = 2;
```

### required-literal

#### 説明

文字列リテラルが指定された正規表現のいずれかに一致している必要があります。

#### オプション

* `patterns`: 必須とする正規表現パターンの配列。

#### 設定例

```js
rules: {
  'pattern-rules/required-literal': ["error", { "patterns": ["hello", "world"] }]
}
```

#### NG 例：

```js
const text = "invalid";
```

#### OK 例：

```js
const greeting = "hello";
const place = "world";
```
