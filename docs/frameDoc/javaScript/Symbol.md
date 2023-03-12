# Symbol

Symbol 用于防止属性名冲突而产生的，比如向第三方对象中添加属性时。

Symbol 的值是唯一的，独一无二的不会重复的

## 基础知识

### Symbol

```js
let sb = Symbol();
let edu = Symbol();

console.log(sb); // Symbol()
console.log(sb == edu); // false
```

Symbol 不可以添加属性

```js
let sb = Symbol();
sb.name = "语文";

console.log(sb.name); // undefined
```

### 描述参数

可传入字符串用于描述 Symbol，方便在控制台分辨 Symbol

```js
let sb = Symbol("这是语文");
let edu = Symbol("这是数学");

console.log(sb); // Symbol(这是语文)
console.log(edu); // Symbol(这是数学)
```

传入相同参数 Symbol 也是独立唯一的，因为参数只是描述而已，但使用 `Symbol.for` 则不会

```js
let sb = Symbol("语文");
let edu = Symbol("语文");
console.log(sb == edu); //false
```

使用`description`可以获取传入的描述参数

```js
let sb = Symbol("语文");
console.log(sb.description); // 语文
```

### Symbol.for

根据描述获取 Symbol，如果不存在则新建一个 Symbol

- 使用`Symbol.for`会在系统中将 Symbol 登记
- 使用`Symbol`则不会登记

```js
let sb = Symbol.for("语文");
let edu = Symbol.for("语文");
console.log(sb == edu); // true
```

### Symbol.keyFor

`Symbol.keyFor` 根据使用`Symbol.for`登记的`Symbol`返回描述，如果找不到返回`undefined` 。

```js
let sb = Symbol.for("语文");
console.log(Symbol.keyFor(sb)); //语文

let edu = Symbol("语文");
console.log(Symbol.keyFor(edu)); //undefined
```

### 对象属性

Symbol 是独一无二的所以可以保证对象属性的唯一。

- Symbol 声明和访问使用 `[]`（变量）形式操作

- 也不能使用 `.` 语法因为 `.`语法是操作字符串属性的。

下面写法是错误的，会将`symbol` 当成字符串`symbol`处理

```js
let symbol = Symbol("语文");
let obj = {
  symbol: "数学",
};
console.log(obj); // {symbol: '数学'}
```

正确写法是以`[]` 变量形式声明和访问

```js
let symbol = Symbol("语文");
let obj = {
  [symbol]: "数学",
};
console.log(obj[symbol]); // 数学
```
