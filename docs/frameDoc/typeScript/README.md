# TypeScript

## 安装

### （1）全局

```ts
npm install -g typescript // 全局安装

tsc -v // 版本查看
```

### （2）局部

```ts
npm init -y // 初始化

npm add -D typescript // 局部安装

npm tsc -v // 版本查看
```

### （3）编译TS

```ts
tsc hd.ts //会编译生成 hd.js 文件，编译过程中有 ts 错误将在命令行报出

tsc hd.ts -w // 自动监听 ts 文件，无需每次手动编译
```

常见问题

- ... 因为在此系统上禁止运行脚本 ...

解决方法：

- 需要以管理员身份执行 powerShell，然后执行以下命令，在出现的提示选择 `Y`

- ```js
  set-ExecutionPolicy RemoteSigned
  ```

## 基本类型设置

### （1）string 字符串

```ts
const hd:string = 'houdunren.com'
```

### （2）number 数值

```ts
const hd:number = 100
```

### （3）boolean 布尔值

```ts
const hd:boolean = true
```

### （4）Array 数组

```ts
let hd:string[] =[] // 值为string类型的数组
hd.push('houdunren','后盾人') // 只能插入string类型

let hd1:Array<string | number> = []; // 泛型：值为string,number类型的数组
hd1.push('houdunren','后盾人',9) // 可插入string,number类型
```

### （6）元组

说明：明确数组每个成员值类型的数组为元组。数组中元素数据类型不同称为元组。

```ts
let hd: [string, number, boolean]

hd = ['houdunren.com', 2090, true]

console.log(hd);
```

### （7）Object 对象

```ts
// 加?来限定，指为可选值，非必填项，可选参数必须跟在必需参数后面
function testObject(hd:{name: string,year: number,url?: string}){}  
testObject({name:'后盾人',year:2010})
```

### （8）any 与 unknown

说明：

- unknown 用于表示未知的类型
- 会进行 TS 的类型检查，any 不进行 TS 检查
- 使用 unknown 类型时可以使用 `as` 类型断言来明确类型

```ts
let xj:any ='后盾人'
let hd:unknown = 'houdurnen'

let a:string = xj
let b:string=hd //报错: 'unknown'未知类型不能赋值给'string'类型

// unknown 类型需要明确类型后赋值，即as断言
let c:string=hd as string
```

### （9）函数

```ts
// 参数是可选的，使用 ? 修饰
function sum(a: number, b: number, ratio?: number):number { 
    return a + b; // 4
}
// 参数设置默认值了就不需要可选参数符号?了
function sum(a: number, b: number, ratio: number = .8):number {
    return (a + b) * ratio; // 3.2
}
console.log(sum(2, 2));

/**
    通用泛型函数
*/
function firstElement<T>(arr: T[]): T | undefined {
  return arr[0];
}
// s is of type 'string'
const s = firstElement(["a", "b", "c"]);
// n is of type 'number'
const n = firstElement([1, 2, 3]
);

/**
    约束
*/
function longest<T extends { length: number }>(a: T, b: T) {// T被约束为{ length: number }
  if (a.length >= b.length) {
    return a;
  } else {
    return b;
  }
}
或
interface Lengthwise {
  length: number;
}
function longest<T extends Lengthwise>(a: T, b: T) {// T被约束为{ length: number }
  if (a.length >= b.length) {
    return a;
  } else {
    return b;
  }
}

// longerArray is of type 'number[]'
const longerArray = longest([1, 2], [1, 2, 3]);
// longerString is of type 'alice' | 'bob'
const longerString = longest("alice", "bob");
// Error! Numbers don't have a 'length' property
// Argument of type 'number' is not assignable to parameter of type '{ length: number; }'.
const notOK = longest(10, 100);
```

### （10）union联合类型

```ts
function printId(id: number | string) {
  if (typeof id === "string") {
    // 在这个分支中，id 的类型是'string'
    console.log(id.toUpperCase());
  } else {
    // Here, id is of type 'number'
    console.log(id);
  }
}
```

### （11）type类型别名

说明：任何*类型*的名称

```ts
type ID = number | string;

type Point = {
  x: number;
  y: number;
};

function printCoord(pt: Point) {
  console.log("x值为 " + pt.x);
  console.log("y值为 " + pt.y);
}

printCoord({ x: 100, y: 100 });
```

### （12）interface接口

```ts
interface Point {
  x: number;
  y: number;
}

function printCoord(pt: Point) {
  console.log("x值为 " + pt.x);
  console.log("y值为 " + pt.y);
}

printCoord({ x: 100, y: 100 });
```

### （13）type与interface的区别

- 拓展类型的方式不同

```ts
// interface接口
interface Animal {
  name: string
}

interface Bear extends Animal {
  honey: boolean
}

const bear = getBear() 
bear.name
bear.honey

// type声明
type Animal = {
  name: string
}

type Bear = Animal & { 
  honey: boolean 
}

const bear = getBear();
bear.name;
bear.honey;
```

- interface可在现有基础上添加新字段，type不行

```ts
interface Window {
  title: string
}
interface Window {
  ts: TypeScriptAPI
}
// success

type Window = {
  title: string
}
type Window = {
  ts: TypeScriptAPI
}
// Error: Duplicate identifier 'Window'.
```

## 断言

### （1）as 断言

描述：as 断言的意思就是用户断定这是什么类型，不使用系统推断的类型，说白了就是『我说是什么，就是什么』

语法：值 as 类型    或    <类型>值

```ts
function hd(arg: number) {
  return arg ? 'houdunren' : 2030
}

let f = hd(1) as string //let f: string 
或
let f = <string>hd(1) //let f: string 
```

## 对象类型

### （1）属性修饰

```ts
// 匿名
function greet(person: { name: string; age: number }) {
  return "Hello " + person.name;
}

// 接口
interface Person {
  name: string;
  age: number;
}
function greet(person: Person) {
  return "Hello " + person.name;
}

// 类型别名
type Person = {
  name: string;
  age: number;
};

function greet(person: Person) {
  return "Hello " + person.name;
}
```

### （2）可选属性 ?:

```ts
// 在其名称末尾添加问号`？`
interface PaintOptions {
  shape: Shape;
  xPos?: number;
  yPos?: number;
}

function paintShape(opts: PaintOptions) {
  // ...
}

const shape = getShape();
paintShape({ shape });
paintShape({ shape, xPos: 100 });
```

### （3）索引签名 [key:string]:any

说明：用来描述可能的值类型

```ts
interface UserInterface {
    name: string;
    age: number;
    isLock: boolean;
    [key:string]:any // 索引签名
    [key: string]: number | string; // 索引签名
}
```

### （4）扩展类型 extends

```ts
interface Colorful {
  color: string;
}

interface Circle {
  radius: number;
}

// 相当于从其它命名类型复制成员，并添加任何想要的新成员
interface ColorfulCircle extends Colorful, Circle {
  name: string;
}

const cc: ColorfulCircle = {
  color: "red",
  radius: 42,
  name: '画师'
};
```

### （5）交叉类型 &

说明：将两个或几个接口或者类型别名组合成新的类型

```ts
interface Colorful {
  color: string;
}
interface Circle {
  radius: number;
}
// ---cut---
function draw(circle: Colorful & Circle) {
  console.log(`Color was ${circle.color}`);
  console.log(`Radius was ${circle.radius}`);
}

// okay
draw({ color: "blue", radius: 42 });
```

### （6）通用对象类型

```ts
interface Box<Type> {
  contents: Type;
}

let box: Box<string>;
```

## 泛型

```ts
function identity(arg: any): any {
  return arg;
}

function identity<Type>(arg: Type): Type {
  return arg;
}

let output = identity<string>("myString"); // let output: string

let output = identity("myString"); // let output: string
```

```ts
interface GenericIdentityFn<Type> {
  (arg: Type): Type;
}

function identity<Type>(arg: Type): Type {
  return arg;
}

let myIdentity: GenericIdentityFn<number> = identity;
```

