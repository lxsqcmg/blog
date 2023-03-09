# 常用技巧

## 1. addEventListener 监听事件

语法： 

> dom节点.addEventListener('事件', 事件回调)

示例：

```js
const aa = document.querySelector('.aa');

aa.addEventListener('click', checkGuess);

function checkGuess(){}
```

注意：

> `addEventListener()` 中作为参数的函数名不加括号。

## 2. in 操作符

描述：如果指定的属性在指定的对象或其原型链中，则 **`in`** **运算符**返回 `true`。

语法：

> prop in object

示例：

```js
let mycar = {make: "Honda", model: "Accord", year: 1998};
delete mycar.make;
"make" in mycar;  // 返回 false

// 如果你只是将一个属性的值赋值为undefined，而没有删除它，则 in 运算仍然会返回true。
let mycar = {make: "Honda", model: "Accord", year: 1998};
mycar.make = undefined;
"make" in mycar;  // 返回 true
```

## 3. 逻辑空赋值（??）

描述：当左侧的操作数为 [`null`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/null) 或者 [`undefined`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/undefined) 时，返回其右侧操作数，否则返回左侧操作数。

语法：

> leftExpr ?? rightExpr

示例：

```js
const nullValue = null;
const emptyText = ""; // 空字符串，是一个假值，Boolean("") === false
const someNumber = 42;

const valA = nullValue ?? "valA 的默认值";
const valB = emptyText ?? "valB 的默认值";
const valC = someNumber ?? 0;

console.log(valA); // "valA 的默认值"
console.log(valB); // ""（空字符串虽然是假值，但不是 null 或者 undefined）
console.log(valC); // 42
```

## 4. 可选链运算符（?.）

描述：允许读取位于对象链深处的属性的值，而不必明确验证链中的每个引用是否有效，在引用为空 ([nullish](https://developer.mozilla.org/zh-CN/docs/Glossary/Nullish) ) ([`null`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/null) 或者 [`undefined`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/undefined)) 的情况下不会引起错误，该表达式短路返回值是 `undefined`。

语法：

> obj.val?.prop     obj.val?.[expr]    obj.func?.(args)

示例：

```js
let customer = {
  name: "Carl",
  details: {
    age: 82,
    location: "Paradise Falls" // details 的 address 属性未有定义
  }
};
let customerCity = customer.details?.address?.city; // undefined
```
