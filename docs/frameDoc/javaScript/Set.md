# Set

用于存储任何类型的<mark>唯一值</mark>，无论是基本类型还是对象引用。

- 只能保存值没有键名
- 严格类型检测如字符串数字不等于数值型数字
- 值是唯一的
- 遍历顺序是添加的顺序，方便保存回调函数

## Set

### 基本使用

使用数组做初始数据

```js
let set = new Set(["语文", "yuwen"]);

console.log(set.values()); // SetIterator {'语文', 'yuwen'}
```

`Set` 中是严格类型约束的，下面的数值`1`与字符串`1`属于两个不同的值

```js
let set = new Set();
set.add(1);
set.add("1");
console.log(set); //Set(2) {1, "1"}
```

### 添加元素(`add`)

使用 `add` 添加元素，不允许重复添加值

```js
let set = new Set();

set.add("语文");
set.add("数学");
set.add("数学");

console.log(set.values()); // SetIterator {'语文', '数学'}
```

### 删除元素(`delete，clear`)

使用 `delete` 方法删除单个元素，返回值为`boolean`类型

```js
let set = new Set();
set.add("语文");
set.add("数学");

console.log(set.delete("语文")); // true
console.log(set.values()); // SetIterator {'数学'}
```

使用 `clear` 删除所有元素

```js
let set = new Set();
set.add("语文");
set.add("数学");

set.clear();
console.log(set.values()); // SetIterator {}
```

### 获取数量(`size`)

```js
let set = new Set(["语文", "yuwen"]);

console.log(set.size); // 2
```

### 元素检测(`has`)

检测元素是否存在

```js
let set = new Set();
set.add("语文");
console.log(set.has("语文")); // true
```

### 数组转换

可以使用 `展开语法` 或 `Array.form` 静态方法将`Set`类型转为数组，这样就可以使用数组处理函数了

```js
let set = new Set(["语文", "yuwen"]);

console.log([...set]); // ['语文', 'yuwen']
console.log(Array.from(set)); // ['语文', 'yuwen']
```

### 去重

去除字符串重复

```js
console.log([...new Set("abcdddeeefff")].join("")); // abcdef
```

去除数组重复

```js
const arr = [1, 2, 3, 5, 2, 3];
console.log(...new Set(arr)); // 1,2,4,5
```

### 遍历数据

使用 `keys()/values()/entries()` 都可以返回迭代对象，因为`set`类型只有值所以 `keys`与`values` 方法结果一致

```js
let set = new Set(["语文", "yuwen"]);

console.log(set.values()); // SetIterator {'语文', 'yuwen'}
console.log(set.keys()); // SetIterator {'语文', 'yuwen'}
console.log(set.entries()); // SetIterator {'语文' => '语文', 'yuwen' => 'yuwen'}
```

可以使用 `forEach` 遍历`Set`数据，默认使用 `values` 方法创建迭代器。

为了保持和遍历数组参数统一，函数中的`value`与`key`是一样的。

```js
let arr = [7, 6, 2, 8, 2, 6];
let set = new Set(arr);
//使用forEach遍历
set.forEach((item, key) => console.log(item, key));
```

也可以使用 `for...of` 遍历`Set`数据，默认使用 `values` 方法创建迭代器

```js
//使用for/of遍历
let set = new Set([7, 6, 2, 8, 2, 6]);

for (const iterator of set) {
  console.log(iterator); // 7 6 2 8
}
```

### 交集

获取两个集合中共同存在的元素

```js
let set1 = new Set(["语文", "数学"]);
let set2 = new Set(["英语", "语文"]);
let newSet = new Set([...set1].filter((item) => set2.has(item)));

console.log(newSet); // Set(1) {'语文'}
```

### 差集

在集合 a 中出现但不在集合 b 中出现元素集合

```js
let set1 = new Set(["语文", "数学"]);
let set2 = new Set(["英语", "语文"]);
let newSet = new Set([...set1].filter((item) => !set2.has(item)));

console.log(newSet); // Set(1) {'数学'}
```

### 并集

将两个集合合并成一个新的集合，由于 Set 特性当然也不会产生重复元素。

```js
let set1 = new Set(["语文", "数学"]);
let set2 = new Set(["英语", "语文"]);
let newSet = new Set([...set1, ...set2]);

console.log(newSet); // Set(3) {'语文', '数学', '英语'}
```

## WeakSet

`WeakSet`结构同样不会存储重复的值，它的成员<mark>必须只能是对象类型的值。</mark>

- 垃圾回收不考虑`WeakSet`，即被`WeakSet`引用时引用计数器不加一，所以对象不被- 引用时不管`WeakSet`是否在使用都将删除
- 因为`WeakSet` 是弱引用，由于其他地方操作成员可能会不存在，所以不可以进行`forEach( )`遍历等操作
- 也是因为弱引用，`WeakSet` 结构没有`keys( )，values( )，entries( )`等方法和 size 属性
- 因为是弱引用所以当外部引用删除时，希望自动删除数据时使用 `WeakMap`

### 声明定义

以下操作由于数据不是对象类型将产生错误

```js
new WeakSet(["语文", "数学"]); //Invalid value used in weak set

new WeakSet("语文"); //Invalid value used in weak set
```

WeakSet 的值必须为对象类型

```js
new WeakSet([["语文"], ["数学"]]);
```

### 基本操作

下面是 WeakSet 的常用指令

```js
const ws = new WeakSet();
const arr = ["语文"];

//添加操作
ws.add(arr);
console.log(ws.has(arr)); // true

//删除操作
ws.delete(arr);

//检索判断
console.log(ws.has(arr)); // false
```

### 垃圾回收

`WeaSet`保存的对象不会增加引用计数器，如果一个对象不被引用了会自动删除。

- 下例中的数组被 `arr` 引用了，引用计数器+1
- 数据又添加到了 `ws` 的`WeaSet`中，引用计数还是 1
- 当 `arr` 设置为`null`时，引用计数-1 此时对象引用为 0
- 当垃圾回收时对象被删除，这时`WakeSet`也就没有记录了

```js
const ws = new WeakSet();
let arr = ["语文"];
ws.add(arr);
console.log(ws.has(arr));

arr = null;
console.log(ws); //WeakSet {Array(1)}

setTimeout(() => {
  console.log(ws); //WeakSet {}
}, 1000);
```
