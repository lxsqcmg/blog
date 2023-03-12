# Map

## Map

Map 是一组<mark>键值对</mark>的结构，用于解决以往不能用对象做为键的问题

- 具有极快的查找速度
- 函数、对象、基本类型都可以作为键或值

### 声明定义

可以接受一个数组作为参数，该数组的成员是一个表示键值对的数组。

```js
// 方式一
let m = new Map([
  ["aaa", "语文"],
  ["bbb", "数学"],
]);

console.log(m); // Map(2) {'aaa' => '语文', 'bbb' => '数学'}

// 方式二
let map = new Map();

let obj = {
  name: "木子李",
};

map.set(obj, "哈哈哈");

console.log(map.get(obj)); // 哈哈哈
```

### 获取元素（`get`）

```js
let m = new Map([
  ["aaa", "语文"],
  ["bbb", "数学"],
]);

console.log(m.get("aaa")); // 语文
```

### 添加修改元素（`set`）

```js
let m = new Map([
  ["aaa", "语文"],
  ["bbb", "数学"],
]);

// set方法添加或修改元素，支持链式操作
m.set("ccc", "英语").set("ddd", "物理");

console.log(m); // Map(4) {'aaa' => '语文', 'bbb' => '数学', 'ccc' => '英语', 'ddd' => '物理'}
```

### 删除元素（`delete、clear`）

删除单个

```js
let m = new Map([
  ["aaa", "语文"],
  ["bbb", "数学"],
]);

m.delete("aaa");

console.log(m); // Map(1) {'bbb' => '数学'}
```

全部删除

```js
let m = new Map([
  ["aaa", "语文"],
  ["bbb", "数学"],
]);

m.clear("aaa");

console.log(m); // Map(0) {size: 0}
```

### 获取数量（`size`）

获取数据的数量

```js
let m = new Map([
  ["aaa", "语文"],
  ["bbb", "数学"],
]);

console.log(m.size); // 2
```

### 检测元素（`has`）

```js
let m = new Map([
  ["aaa", "语文"],
  ["bbb", "数学"],
]);

console.log(m.has("aaa")); // true
```

### 遍历数据

使用 `keys()/values()/entries()` 都可以返回可遍历的迭代对象。

```js
let m = new Map([
  ["aaa", "语文"],
  ["bbb", "数学"],
]);

console.log(m.keys()); // MapIterator {'aaa', 'bbb'}
console.log(m.values()); // MapIterator {'语文', '数学'}
console.log(m.entries()); // MapIterator {'aaa' => '语文', 'bbb' => '数学'}
```

可以使用`keys/values`函数遍历键与值

```js
let m = new Map([
  ["aaa", "语文"],
  ["bbb", "数学"],
]);

for (const key of m.keys()) {
  console.log(key); // aaa bbb
}
for (const value of m.values()) {
  console.log(value); // 语文 数学
}
```

使用`for/of`遍历操作，直接遍历`Map`等同于使用`entries()`

```js
let m = new Map([
  ["aaa", "语文"],
  ["bbb", "数学"],
]);

for (const [key, value] of m) {
  console.log(`[${key},${value}]`); // [aaa,语文] [bbb,数学]
}
```

使用`forEach`遍历操作

```js
let m = new Map([
  ["aaa", "语文"],
  ["bbb", "数学"],
]);

m.forEach((value, key) => {
  console.log(`[${key},${value}]`); // [aaa,语文] [bbb,数学]
});
```

### 类型转换

可以使用 `展开语法` 或 `Array.form` 静态方法将 Set 类型转为数组，这样就可以使用数组处理函数了

```js
let m = new Map([
  ["aaa", "语文"],
  ["bbb", "数学"],
]);

console.log(...m); // ['aaa', '语文'] ['bbb', '数学']
console.log(...m.keys()); // aaa bbb
console.log(...m.values()); // 语文 数学
console.log(...m.entries()); // ['aaa', '语文'] ['bbb', '数学']
```

## WeakMap

WeakMap 对象是一组键/值对的集

- 键名必须是对象
- `WeaMap`对键名是弱引用的，键值是正常引用
- 垃圾回收不考虑`WeaMap的`键名，不会改变引用计数器，<mark>键在其他地方不被引用时即删除</mark>
- 因为`WeakMap` 是弱引用，由于其他地方操作成员可能会不存在，所以不可以进行`forEach( )`遍历等操作
- 也是因为弱引用，`WeaMap` 结构没有`keys( )，values( )，entries( )`等方法和`size` 属性
- 当键的外部引用删除时，希望自动删除数据时使用 `WeakMap`

### 声明定义

以下操作由于键不是对象类型将产生错误

```js
new WeakSet("木子李"); //TypeError: Invalid value used in weak set
```

### 基本操作

```js
const wm = new WeakMap();
const arr = ["木子李"];
//添加操作
wm.set(arr, "语文");
console.log(wm); // WeakMap {Array(1) => '语文'}
console.log(wm.has(arr)); //true

//删除操作
wm.delete(arr);

//检索判断
console.log(wm.has(arr)); //false
```

### 垃圾回收

`WakeMap`的键名对象不会增加引用计数器，<mark>如果一个对象不被引用了会自动删除。</mark>

- 下例当 `wm` 删除时内存即清除，因为 `WeakMap` 是弱引用不会产生引用计数
- 当垃圾回收时因为对象被删除，这时 `WakeMap` 也就没有记录了

```js
let map = new WeakMap();
let wm = {
    'aa': '语文'
};
map.set(wm, "木子李");
console.log('1',map);

wm = null;
console.log('2',map);

setTimeout(() => {
  console.log('3',map);
}, 1000);
```
