# H5-CSS3-JS

## 1.回流与重绘

- **回流：** 元素布局、尺寸的改变，需要重新构建页面

  以下情况会触发回流：

  1. 当元素的尺寸或者位置发生了变化，就需要重新计算渲染树，这就是回流

  2. DOM 元素的几何属性(`width/height/padding/margin/border`)发生变化时会触发回流

  3. DOM 元素移动或增加会触发回流

  4. 读写` offset/scroll/client` 等属性时会触发回流

  5. 调用 `window.getComputedStyle` 会触发回流

- **重绘：** 元素外观、颜色的改变，不影响页面布局，只是外观的改变，所依赖的框架不变。跟`vue`里面的具名插槽差不多。

  1. DOM 样式发生了变化，但没有影响 DOM 的几何属性时，会触发重绘，而不会触发回流。重绘由于 DOM 位置信息不需要更新，省去了布局过程，因而性能上优于回流


**如何减少回流**

1. 使用`class`替代` style`，减少 style 的使用

2. 使用 `resize、scroll` 时进行防抖和节流处理，这两者会直接导致回流

3. 使用` visibility` 替换` display: none`，因为前者只会引起重绘，后者会引发回流

4. 批量修改元素时，可以先让元素脱离文档流，等修改完毕后，再放入文档流

5. 避免触发同步布局事件，我们在获取 `offsetWidth` 这类属性的值时，可以使用变量将查询结果存起来，避免多次查询，每次对 offset/scroll/client 等属性进行查询时都会触发回流

6. 对于复杂动画效果,使用绝对定位让其脱离文档流，复杂的动画效果会频繁地触发回流重绘，我们可以将动画元素设置绝对定位从而脱离文档流避免反复回流重绘。

## 2.三角形绘制

```css
.sanjiao {
  width: 0px;
  height: 0px;
  border: 50px solid;
  /* transparent:透明 */
  border-color: transparent green transparent transparent;
}
```

## 3.Vue 中建项目时的 runtime-compiler 和 runtime-only 的区别

其实就是 main.js 入口函数的不同。

runtime-compiler

> template-->ast(语法树)-->render-->vdom-->UI

```js
new Vue({
  el: "#app",
  router,
  components: { App },
  template: "<App/>",
});
```

runtime-only

> render-->vdom-->UI
>
> 性能更高，代码量更少

```
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
```

## 3.前端渲染和后端渲染

- **后端(服务端)渲染阶段**：比如 jsp，前台发生网络请求，后台响应数据时是可以写 html 代码的，也就是把页面渲染后响应到前端。它由后端处理 URL 和页面之间的映射关系。

- **(前端渲染)前后端分离阶段**：后端只负责提供 API 接口，不负责任何阶段的内容。前端通过 AJAX 请求后端接口，把 json 数据拿到后，可以写 html 代码渲染到页面。

- **前端路由阶段(SPA 页面)**：整个网站只有一个 html 页面。最开始加载的时候是把所有的静态资源服务器里的东西拿出来，然后通过前端路由来管理。改变 url 的时候，页面不进行刷新。

## 4.$router和$route 的区别

- $router:拿到的是全局路由里的对象
- $route:拿到的是当前活跃路由里的对象

$router和$route 都是往 Vue 的原型上加的

所有组件都是 Vue 的原型，所以可以在 Vue 的原型上面挂载全局组件，方法或者变量

比如：

```
Vue.prototype.$axios=Axios;
```

## 5.常见图片格式

- jpg(jpeg)
- png
- gif
- webp
- svg

## 6.link 和@import 的区别

- link 是 HTML 标签；@import 是 css 中定义的，只能加载样式文件
- link 在页面载入时同时加载；@import 在页面加载完成后载入
- link 支持使用 JavaScript 修改样式； @import 不支持 JavaScript 改变样式

## 7.1 像素边框问题解决

**viewport + rem+js 方案**

在页面初始化时，在头部引入原始默认状态如下：

```html
<meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
<meta
  name="viewport"
  id="WebViewport"
  content="initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no"
/>
//这句话定义了本页面的viewport的宽度为设备宽度，初始缩放值和最大缩放值都为1，并禁止了用户缩放。
```

接下来的任务就是 js 的动态修改缩放比 以及 实现 rem 根元素字体大小的设置。

```js
var viewport = document.querySelector("meta[name=viewport]");
if (window.devicePixelRatio == 1) {
  //1倍屏
  viewport.setAttribute(
    "content",
    "width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no"
  );
}
if (window.devicePixelRatio == 2) {
  //2倍屏
  viewport.setAttribute(
    "content",
    "width=device-width, initial-scale=0.5, maximum-scale=0.5, minimum-scale=0.5, user-scalable=no"
  );
}
if (window.devicePixelRatio == 3) {
  //3倍屏
  viewport.setAttribute(
    "content",
    "width=device-width, initial-scale=0.333333333, maximum-scale=0.333333333, minimum-scale=0.333333333, user-scalable=no"
  );
}

var docEl = document.documentElement;
var fontsize = 10 * (docEl.clientWidth / 320) + "px";
docEl.style.fontSize = fontsize;
```

**box-shadow 方案**

```css
-webkit-box-shadow: 0 1px 1px -1px rgba(0, 0, 0, 0.5);
//参数分别表示: 水平阴影位置，垂直阴影位置，模糊距离， 阴影尺寸，阴影颜色，将外部阴影改为内部阴影，后四个可选。
```

**transform: scale(0.5) 方案 - 推荐: 很灵活**

```
设置height: 1px，根据媒体查询结合transform缩放为相应尺寸。也可用::after和::befor设置

div {
    height:1px;
    background:#000;
    -webkit-transform: scaleY(0.5);
    -webkit-transform-origin:0 0;
    overflow: hidden;
}
```

## 8.标准盒模型和怪异盒模型的区别

在标准模式下，一个块的总宽度= width + margin(左右) + padding(左右) + border(左右)

```css
  .main1 {
    width: 200px;
    height: 200px;
    background-color: aqua;
    box-sizing: content-box; // 标准盒模型
    padding: 10px;
    margin: 10px;
  }
  ```

在怪异模式下，一个块的总宽度= width + margin(左右)（即 width 已经包含了 padding 和 border 值）

```css
  .main2 {
    width: 200px;
    height: 200px;
    background-color: red;
    box-sizing: border-box; /* 怪异盒模型 */
    padding: 10px;
    margin: 10px;
  }
  ```

## 9.多行文本溢出

使用 webkit 的 css 扩展属性——只在-webkit-内核的浏览器中有效

```css
.box {
  width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;

  display: -webkit-box; /* 将元素转换为弹性伸缩盒 */
  -webkit-line-clamp: 2; /* 文本内容显示的行数 */
  -webkit-box-orient: vertical; /* 弹性伸缩盒子元素排列方式 */
}
```

使用伪元素模拟溢出显示省略号——兼容性较好(也就是在后面加三点)

  ```css
  .box {
    width: 200px;
    height: 40px; /*是行高的倍数*/
    line-height: 20px;
    overflow: hidden;
    position: relative;
  }
  .box::after {
    content: "...";
    position: absolute;
    right: 2px;
    bottom: 0;
    background: #fff;
    padding: 0 5px;
  }
  ```

## 10.单行文本溢出

```css
overflow: hidden;
text-overflow: ellipsis;
white-space: nowrap;
```

## 11.BFC

本质：块格式化上下文。一个封闭的盒子,是页面上的一个独立的渲染区域，容器中子元素不会影响到外面的元素，反之亦然。

**怎样生成 BFC？**

  ```
  根元素（html）

  浮动元素float: left|right;

  绝对定位元素position: absolute|fifixed;

  行内块display: inline-block;

  overflow: hidden|auto|scroll;

  弹性元素（display 值为 flex 或 inline-flex 元素的直接子元素）

  网格元素（display 值为 grid 或 inline-grid 元素的直接子元素）

  ```

**BFC 解决的问题：**

① 外边距塌陷；② 子元素浮动父元素高度塌陷；③ 防止文字环绕；④ 两栏 / 三栏自适应

## 12.跨域

**什么是跨域：**

浏览器的对 javaScript 的一种同源策略的限制，如果协议、域名或者端口有一个不同就是跨域，Ajax 请求会失败。请求发出去了，但是没有响应回数据。

**解决**

  1.JSONP

  利用 `<script> `元素的这个开放策略，网页可以得到从其他 来源动态产生的 JSON 数据,但是有缺点只能用 get 请求。

  ```js
  <script src="http://domain/api?param1=a&param2=b&callback=jsonp"></script>
  <script>
  function jsonp(data){
    console.log(data)
  }
  </script>
  ```

​ 2.CORS

实现 CORS 通信的关键是服务器。只要服务器实现了 CORS 接口，就可以跨源通信

```
//SpringBoot中加一个注解
@CrossOrigin //解决跨域问题
```

3.服务器端设置 http header

## 13.CSRF 攻击

中文名称：跨站请求伪造

> `CSRF` 攻击的原理大致描述如下：有两个网站，其中 A 网站是真实受信任的网站，而 B 网站是危险网站。在用户登陆了受信任的 A 网站是，本地会存储 A 网站相关的 Cookie，并且浏览器也维护这一个 Session 会话。这时，如果用户在没有登出 A 网站的情况下访问危险网站 B，那么危险网站 B 就可以模拟发出一个对 A 网站的请求（跨域请求）对 A 网站进行操作，而在 A 网站的角度来看是并不知道请求是由 B 网站发出来的（Session 和 Cookie 均为 A 网站的），这时便成功发动一次 CSRF 攻击。
>
> 因而 CSRF 攻击可以简单理解为：攻击者盗用了你的身份，以你的名义发送而已请求。CSRF 能够做的事情包括：以你名义发送邮件，发消息，盗取你的账号，甚至于购买商品，虚拟货币转账......造成的问题包括：个人隐私泄露以及财产安全。

## 14.html5 新标签

```html
<div>
  //头部，页眉
  <header>
    //导航
    <nav></nav>
  </header>

  //主要区域
  <main>
    //独立的内容容器
    <article>
      //定义一个区块
      <section>
        //视频
        <video
          src="河正宇《小姐》-副本.mp4"
          preload="auto"
          muted
          controls
          width="800"
          height="200"
        ></video>
        //音频
        <audio controls preload="auto">
          <source src="守夜人.mp3" type="audio/mp3" />
        </audio>
      </section>

      //定义一个区块
      <section>
        //表单时间
        <input
          type="date"
          step="5"
          min="2020-09-22"
          max="2025-01-15"
          name="datetime"
        />
        <input type="week" />
        <input type="month" />
      </section>
    </article>

    //附加区域
    <aside></aside>
  </main>

  //脚部，页脚
  <footer></footer>
</div>
```

## 15.作用域

- 作用域链只向上查找，找到全局 window 即终止

- 使用 `let/const` 可以将变量声明在块作用域中（放在新的环境中，而不是全局中）

**静态作用域 & 动态作用域**

  JavaScript 采用**静态作用域**

  **静态** ：因为 JavaScript 采用的是词法作用域，函数的作用域在函数定义的时候就决定了。
  **动态** ：而与词法作用域相对的是动态作用域，函数的作用域是在函数调用时才决定的。

```javascript
var value = 1; //全局作用域
function foo() {
  console.log(value);
}
function bar() {
  var value = 2; //函数作用域，这里并没有改变外层的值
  foo();
}
bar(); // 输出神马呢？

// 假设：JavaScript采用的是静态作用域。
// 那么函数的作用域在函数定义时就决定了。
// 执行到foo函数，先从foo函数内部查找局部变量value。
// 如果没有就根据书写位置，查找上面一层代码，也就是value = 1。
// 所以结果是1。

// 假设：JavaScript采用的是动态作用域。
// 那么函数的作用域在函数调用时决定。
// 执行到foo函数，先从foo函数内部查找局部变量value。
// 如果没有就从调用函数的作用域，也就是bar函数内部查找value变量，也就是value = 2。
// 所以结果是2。
```

作用域主要有：全局作用域、函数作用域、块作用域、静态作用域、动态作用域

```js
var qqq = 123; //全局作用域
b = 222; // 全局作用域，是 window.b = 222 的简写

function foo() {
  console.log(qqq); //123 函数作用域(静态作用域，声明时已确定，与test()函数内部变量无联系)，作用域从该处往上一级找，上一级作用域为全局作用域
}

function test() {
  yuy = 9090; //全局作用域
  var cheshi = 1234; //函数作用域
  var qqq = "哈哈哈"; //函数作用域
  if (cheshi > 1) {
    let zz = 2; //块级作用域
    const xx = 3; //块级作用域
    var yy = 4; //函数作用域,该变量会提升到test()下
  }

  foo();

  console.log(this.b); //this作用域为动态作用域，使用时才会往上找
  console.log(cheshi); //1234
  console.log(qqq); //哈哈哈
  console.log(zz); //报错，not defined
  console.log(xx); //报错，not defined
  console.log(yy); //4
}

test();
console.log(yuy); // 9090
console.log(cheshi); //报错，not defined
```

## 16.闭包

相当于一个在函数内部的子函数，子函数可以访问外部作用域变量，它本身也可以被外部作用域访问。

闭包的特性：

- 能够读取函数内部的变量
- 能让这些变量的值始终保持在内存中

## 17.防抖与节流

用一句话总结防抖和节流的区别：防抖是将多次执行变为最后一次执行，节流是将多次执行变为每隔一段时间执行

防抖：搞一个定时器，比如说是 1s 后执行。如果 1s 之内还有操作发生，那么它会清空定时时间，重新计时。(比如搜索引擎的搜索功能)

节流：搞一个定时器，比如说是 1s 内执行一次。如果 1s 之内还有操作发生，那么我直接忽视你，等我这 1s 结束之后才鸟你一眼。(比如验证码的发送，间隔 60s)

## 18.浅拷贝深拷贝

不管是深拷贝还是浅拷贝，你都得创建一个新的对象来让它把值复制进去。

浅拷贝：只执行一层，不能进行深层次的复制

- Object.assign

```js
//Object.assign 函数可简单的实现浅拷贝，它是将两个对象的属性叠加后面对象属性会覆盖前面对象同名属性
let user1 = {
  name: "后盾人",
};
let hd = {
  stu: Object.assign({}, user1), // 两对象合一起，相同的取其中一个(后面的覆盖前面的)
};
hd.stu.name = "hdcms";
console.log(user1.name); //后盾人
```

- 展开语法

```js
//使用展示语法也可以实现浅拷贝
let obj = {
  name: "后盾人",
};
let hd1 = {
  ...obj,
};
hd1.name = "hdcms";
console.log("展示语法：");
console.log(hd1.name); //hdcms
console.log(obj.name); //后盾人
```

- for/in

```js
//使用for/in执行对象拷贝
let obj2 = {
  name: "后盾人",
};
let hd2 = {};
for (const key in obj2) {
  console.log(key);
  hd2[key] = obj2[key];
}
hd2.name = "hdcms";
console.log("for-in：");
console.log(hd2); //hdcms
console.log(obj2); //后盾人
```

深拷贝:可深层复制，通过一个函数来递归。如果键的后面还是一个对象或者数组，那么就需要进行深拷贝了

```js
//有数组
let obj4 = {
  name: "后盾人",
  user: {
    name: "hdcms",
  },
  data: [],
};

function copy(object) {
  //1.判断传进来的对象是一个数组对象还是一个字面量对象，方便知道创建空对象的类型
  let obj4 = object instanceof Array ? [] : {};
  //2.通过对象迭代的方式来进行深拷贝
  for (const [k, v] of Object.entries(object)) {
    //判断键后面的是不是一个对象，如果是，再调用一次本身(递归)
    //注：{}和[]都属于object对象类型，也就是说数组也是一个对象
    obj4[k] = typeof v == "object" ? copy(v) : v;
  }
  return obj4;
}
let hd4 = copy(obj4);
hd4.data.push("向军");
console.log("1:" + JSON.stringify(hd4, null, 2));
console.log(JSON.stringify(obj4, null, 2));
```

## 19.宏任务与微任务

任务的执行顺序是同步任务、微任务、宏任务。(事件循环机制)

```js
console.log("后盾人");//同步任务
setTimeout(function() {
  console.log("定时器");//异步宏任务
}, 0);
Promise.resolve()//同步任务
  .then(function() {
    console.log("promise1");//异步微任务
  })
  .then(function() {
    console.log("promise2");//异步微任务
  });
console.log("houdunren.com");//同步任务

#输出结果为
后盾人
houdunren.com
promise1
promise2
定时器
```

```js
console.log('1');

setTimeout(function() {
    console.log('2');
    process.nextTick(function() {
        console.log('3');
    })
    new Promise(function(resolve) {
        console.log('4');
        resolve();
    }).then(function() {
        console.log('5')
    })
})
process.nextTick(function() { // 在事件循环的下一次迭代中调用回调函数
    console.log('6');
})
new Promise(function(resolve) {
    console.log('7');
    resolve();
}).then(function() {
    console.log('8')
})

setTimeout(function() {
    console.log('9');
    process.nextTick(function() {
        console.log('10');
    })
    new Promise(function(resolve) {
        console.log('11');
        resolve();
    }).then(function() {
        console.log('12')
    })
})

// 以上代码执行结果为
整个代码，一共经过了3次事件循环，完整的输出为1,7,6,8,2,4,3,5,9,11,10,12。
```

```js
async function async1() {
  console.log("async1 start"); // 同2
  await async2(); // await之前的为同步任务，立即执行，然后执行async2()函数，输出 'async2'，将 ‘console.log('async1 end')’分配到microtask（微任务）队列中
  console.log("async1 end"); // 异微6
}

async function async2() {
  console.log("async2"); // 同3
}

console.log("script start"); // 同1

setTimeout(function () {
  console.log("setTimeout"); // 异宏8
}, 0);

async1();

new Promise(function (resolve) {
  console.log("promise1"); // 同4
  resolve();
}).then(function () {
  console.log("promise2"); // 异微7
});

console.log("script end"); // 同5
/*
    script start
    async1 start
    async2
    promise1
    script end
    async1 end
    promise2
    setTimeout
*/
```

```js
// 从第一行代码直到（并包括）第一个 await 表达式（如果有的话）都是同步运行的，
async function async1() {
  console.log("async1 start"); // 同2
  await console.log(async2()); // 同3，等待异步返回
  // 以下都加入到微任务队列里
  await a(); // 异一层6
  await c(); // 异二层8
  console.log("async1 end"); // 异微三层9
}

function a() {
  console.log("8");
}

async function c() {
  await console.log("99");
}

async function async2() {
  new Promise((resolve) => {
    setTimeout(() => {
      console.log("async2"); // 异宏11
    }, 2000);
  });
}

console.log("script start"); // 同1

async1();

setTimeout(function () {
  console.log("setTimeout"); // 异宏10
}, 0);

new Promise(function (resolve) {
  console.log("promise1"); // 同4
  resolve();
}).then(function () {
  console.log("promise2"); // 异一层7
});

console.log("script end"); // 同5

/*
script start
async1 start
Promise {<fulfilled>: undefined} // 这里就是async1()后面的async2()方法开始执行
promise1
script end
8
promise2
99
async1 end
setTimeout
async2 // async2()最后才出结果
*/
```

## 20.原型与继承

**原型：**

每个对象都有一个原型`prototype`对象，通过函数创建的对象也将拥有这个原型对象。原型是**一个指向对象的指针**。

当我们用`obj.xxx`访问一个对象的属性时，JavaScript 引擎先在当前对象上查找该属性，如果没有找到，就到其原型对象上找，如果还没有找到，就一直上溯到`Object.prototype`对象，最后，如果还没有找到，就只能返回`undefined`。

**原型链：**

```js
例如，创建一个Array对象：

var arr = [1, 2, 3];

其原型链是：

arr ----> Array.prototype ----> Object.prototype ----> null

Array.prototype定义了indexOf()、shift()等方法，因此你可以在所有的Array对象上直接调用这些方法。
```

**继承：**

当对象中没使用的属性时，JS 会从原型上获取这就是继承在 JavaScript 中的实现。

因为有时根据得到的对象获取构造函数，然后再创建新对象所以需要保证构造函数存在，但如果直接设置了 `Admin.prototype` 属性会造成`constructor`丢失，所以需要再次设置`constructor`值。

```js
function User() {}
function Admin() {}

/*Admin原型对象继承User原型对象，你不能够直接这样：Admin.prototype = User.prototype
这不是继承，这只是把原型对象改变了而已*/
Admin.prototype = Object.create(User.prototype);
Admin.prototype.role = function () {};

let xj = new Admin();
console.log(xj.constructor); //constructor丢失，返回User构造函数

Admin.prototype.constructor = Admin;

let hd = new Admin();
console.log(hd.constructor); //正确返回Admin构造函数
```

## 21.Promise 异步

- promise 是一个拥有 `then` 方法的对象或函数

- 一个 `promise` 必须有一个 `then` 方法用于处理状态改变

**1.三种状态**：`resolve`(指已经解决)、`reject`(指拒绝处理)、`pending`(指等待)

```js
//等待
console.log(
  new Promise((resolve, reject) => {
      /*resolve,和reject都没有使用，所以为等待状态*/
  });
); //Promise {<pending>}

//成功
console.log(
  new Promise((resolve, reject) => {
    resolve("fulfilled");
  })
); //Promise {<resolved>: "fulfilled"}

//失败
console.log(
  new Promise((resolve, reject) => {
    reject("rejected");
  })
); //Promise {<rejected>: "rejected"}
```

**2.then**

`then` 是对上个 promise 的`rejected` 的处理，每个 `then` 会是一个新的 promise，默认传递 `fulfilled`状态

```js
new Promise((resolve, reject) => {
  reject();
})
.then(
  resolve => console.log("fulfilled"),
  reject => console.log("rejected")
)
.then(
  resolve => console.log("fulfilled"),
  reject => console.log("rejected")
)
.then(
  resolve => console.log("fulfilled"),
  reject => console.log("rejected")
);

# 执行结果如下
  ejected
  fulfilled
  fulfilled
```

**3.catch**

`catch` 可以捕获之前所有 `promise` 的错误，所以建议将 `catch` 放在最后。下例中 `catch` 也可以捕获到了第一个 `then` 返回 的 `promise` 的错误。

```js
new Promise((resolve, reject) => {
  resolve();
})
  .then(() => {
    return new Promise((resolve, reject) => {
      reject(".then ");
    });
  })
  .then(() => {})
  .catch((msg) => {
    console.log(msg);
  });
```

**4.finally**

无论状态是`resolve` 或 `reject` 都会执行此动作，`finally` 与状态无关。

```js
const promise = new Promise((resolve, reject) => {
  reject("hdcms");
})
  .then((msg) => {
    console.log("resolve");
  })
  .catch((msg) => {
    console.log("reject");
  })
  .finally(() => {
    console.log("resolve/reject状态都会执行");
  });
```

**5. async/await**

使用 `async/await` 是 promise 的语法糖，可以让编写 promise 更清晰易懂，也是推荐编写 promise 的方式。

- `async/await` 本质还是 promise，只是更简洁的语法糖书写
- `async/await` 使用更清晰的 promise 来替换 promise.then/catch 的方式

async:

下面在 `hd` 函数前加上 async，函数将返回 promise，我们就可以像使用标准 Promise 一样使用了

```js
async function hd() {
  return "houdunren.com";
}
console.log(hd());
hd().then((value) => {
  console.log(value);
});
```

await:

使用 `await` 关键词后会等待 promise 结束后执行

- `await` 后面一般是 promise，如果不是直接返回
- `await` 必须放在 async 定义的函数中使用
- `await` 用于替代 `then` 使编码更优雅

下例会在 await 这行暂停执行，直到等待 promise 返回结果后才继执行。

```js
async function hd() {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("houdunren.com");
    }, 2000);
  });
  let result = await promise;
  console.log(result);
}
hd();
```

错误处理：

catch

```js
async function get(name) {
  return await ajax(`http://localhost:8888/php/user.php?name=${name}`);
}

get("向军小哥").catch((error) => {
  alert("用户不存在");
});
```

如果`promise` 被拒绝将抛出异常，可以使用 `try...catch` 处理错误

```js
async function get(name) {
  try {
    let user = await ajax(`http://localhost:8888/php/user.php?name=${name}`);
    console.log(user);
  } catch (error) {
    alert("用户不存在");
  }
}
get("向军老师");
```

## 22. js_DOM 节点增删改查

**创建节点**：

```html
<div id="app2">这是spp2</div>
<script>
  // 获取已存在节点
  let app2 = document.querySelector("#app2");
  // 创建节点
  let span2 = document.createElement("span");
  // 节点内容
  span2.innerHTML = "houdunren你好";
  // 将创建的节点插入文档流
  app2.append(span2); //最后插入到#app2里面的最后
</script>
```

**查**：节点获取

```html
<div id="app">
  <div class="houdunren" data="hd">houdunren.com</div>
  <div class="houdunwang">houdunwang.com</div>
  <div class="xiangjun"><!-- 向军大叔 --></div>
</div>

<script>
  const app = document.querySelector(`#app`);
  console.log(app.children); //所有子元素
  console.log(app.firstElementChild); //第一个子元素 div.houdunren
  console.log(app.lastElementChild); //最后一个子元素 div.xiangjun

  const houdunwang = document.querySelector(".houdunwang");
  console.log(houdunwang.parentElement); //父元素 div#app

  console.log(houdunwang.previousElementSibling); //上一个兄弟元素 div.houdunren
  console.log(houdunwang.nextElementSibling); //下一个兄弟元素 div.xiangjun
</script>
```

**改**：

改属性：

直接设置元素的属性

```html
<div id="app">
  <div data="hd">houdunren.com</div>
  <div>houdunwang.com</div>
</div>
<script>
  const app = document.querySelector(`#app`);
  app.className = "houdunren呀";
</script>
```

通过`setAttribute`设置属性

```html
<div id="app">
  <div data="hd">houdunren.com</div>
  <div>houdunwang.com</div>
</div>
<script>
  const app = document.querySelector(`#app`);
  app.setAttribute("className", "houdunren呀");
</script>
```

改内容`innerHTML`：

```html
<div id="app5">houdunren.com</div>
<script>
  let app5 = document.querySelector("#app5");
  let h5 = document.createElement("h4");
  h5.append("houdunwang.com改内容5");
  app5.innerHTML = h5.innerHTML;
</script>
```

改内容和标签`replaceWith`，把节点也换了

```html
<div id="app4">houdunren.com</div>
<script>
  let app4 = document.querySelector("#app4");
  let h4 = document.createElement("h4");
  h4.append("houdunwang.com改内容4");
  app4.replaceWith(h4);
</script>
```

增：

```html
<div id="app6">这里是元素</div>
<script>
  let app6 = document.querySelector("#app6");

  //插入字符串或节点,不能够直接解析html标签,所以需要创建
  let afterDom = "<h5>";
  afterDom += "-houdunwang.com6元素本身后面</h5>";

  let beforep = document.createElement("p");
  beforep.className = "beforep";
  beforep.innerHTML = "-houdunwang.com6元素本身前面";

  app6.before(beforep);
  app6.prepend("-houdunwang.com6元素内部前面");
  //用古老的方式(appendChild)只能插入节点,不能够直接插入字符串
  app6.append("-houdunwang.com6元素内部后面");
  app6.after(afterDom);

  //会解析html标签
  let before6 = "本身";
  let beforebegin6 = "<h4>" + "元素" + before6 + "前面" + "</h4>";

  let abgin = "内部";
  let afterbegin6 = `
                     <div>
                       <h4>
                         元素${abgin}前面
                       </h4>        
                     </div>
                    `;
  let afterend6 = "<div>";
  afterend6 += "<h4>元素本身后面</h4>";
  afterend6 += "</div>";
  app6.insertAdjacentHTML("beforebegin", beforebegin6); //元素本身前面
  app6.insertAdjacentHTML("afterbegin", afterbegin6); //元素内部前面
  app6.insertAdjacentHTML("beforeend", "<h4>元素内部后面</h4>");
  app6.insertAdjacentHTML("afterend", afterend6); //元素本身后面
</script>
```

![image-20211101212337599](C:%5CUsers%5C20837%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5Cimage-20211101212337599.png)

**删：**

```html
<div id="app7">
  <p>删除</p>
  <p>这是药删除的节点1</p>
  <span>这是药删除的节点2</span>
</div>
<script>
  //直接删
  let app7 = document.querySelector("#app7>p:nth-of-type(2)");
  app7.remove(); //第二个p已经删除了

  //先获取父元素,再获取本身元素,根据父元素来删
  let Fuapp7 = document.querySelector("#app7");
  let chapp7 = document.querySelector("#app7>span");
  Fuapp7.removeChild(chapp7); //span也已经删除
</script>
```

**复制，克隆**

```html
<h2>复制</h2>
<div id="app8">复制,克隆1</div>
<script>
  let app8 = document.querySelector("#app8");
  let newApp8 = app8.cloneNode(true);
  document.body.appendChild(newApp8);
</script>
```

## 23.HTTP 请求

- GET：用于获取数据，GET 是在 URL 上传递数据（网址后面的东西），存储量较少，安全系数比较低。

- POST：用于上传数据，POST 安全性一般比（GET 好一些），容量几乎是无限（多用于表单）。

## 24.ajax&&axios

原生 ajax,四个步骤：

> 1. -创建 Ajax
> 2. -连接服务器
> 3. -发送请求
> 4. -接收返回值

```js
// 1.创建对象 XMLHttpRequest()
var xhr = new XMLHttpRequest();
// 2.连接服务器，配置参数，（请求方式，请求地址，同异步）
xhr.open("get", "abc.txt", true); //async 类型为 Boolean 值, 设置 true 时代码该请求使用异步， 设置 false 时代码该请求使用同步。
// 3.发送数据
xhr.send(); // 如果是读取本地文件，可以设置为空
// 4.监听事件，接收返回的数据，改变页面
xhr.onreadystatechange = function () {
  //
  // 同时满步骤4和状态码为200时
  if (xhr.readyState === 4 && xhr.status === 200) {
    console.log("请求成功：", xhr.responseText);
    // 这里可以改变页面内容了
  }
};
```

jQuery-Ajax

```js
// jQuery：请求地址，请求方式，发送的数据，接收返回值
$.ajax({
  url: "abc111.txt", // 请求地址
  type: "get", // 请求方式（类型）
  data: "", // 要发送的数据
  success(data) {
    // 请求成功时执行的函数，形参就是获取的数据
    console.log("请求成功：", data);
    // 改变页面操作可以写在这里
  },
  error(err) {
    // 请求出错时执行的函数，形参是错误信息
    console.log("请求出错：", err);
  },
});
```

```js
$.ajax({
  url: "", // 请求的地址
  cache: 布尔值, // 是否缓存，get请求如果url没有发生变化，则会走缓存
  type: "", // 请求的方式（get/post），默认为get
  timeout: "", // 设置请求超时时间，单位毫秒
  data: "", // 发送到后端的数据
  dataType: "", // 预期服务器返回的数据类型，有xml, html, script, json, jsonp, text
  success: function (data) {}, // 成功的回调
  error: function (err) {}, // 失败的回调
  complete: function () {}, // 请求完成后调用的函数，请求成功或失败均调用
  global: true, // 是否触发全局的ajax事件，默认为true
});
```

axios

```js
axios({
  method: "post", // 请求方式get/post
  url: "api", //后台地址
  data: obj, // 传递的参数，这里必须使用URLSearchParams或FormData类型
  responseType: "json", //响应数据类型  相当于Ajax中的dataType，默认是json
})
  .then((response) => {
    //请求成功
    let res = response.data; //获取响应数据
    console.log(res);
  })
  .catch((error) => {
    //请求失败
    console.log(error);
  });
```

```js
//get请求模板
axios
  .get("url?id=12345")
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.log(error);
  });

或者;
axios
  .get("url", {
    params: {
      id: 12345,
    },
  })
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.log(error);
  });
```

```js
//post请求模板
axios
  .post("url", "name=迪丽热巴&age=23")
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.log(err);
  });

或者;
axios
  .post("url", {
    name: "迪丽热巴",
    age: 23,
  })
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.log(err);
  });
```

## 25.数组

```js
/* 展开语法 */
let a1 = [1, 2, 3, "a", "b", "c"];
let b1 = [...a1, "哈哈哈", "真好"];
console.log("展开语法:" + b1); //展开语法:1,2,3,a,b,c,哈哈哈,真好

/* 解构赋值 */
let [a2, b2] = ["赋值给a2", "赋值给b2"];
console.log(`数组解构：${a2}。${b2}`); //数组解构：赋值给a2。赋值给b2
let { a22, b22 } = { a22: "赋值给a22", b22: "赋值给b22" };
console.log(`对象解构：${a22}。${b22}`); //对象解构：赋值给a22。赋值给b22

/* 剩余解构 */
let [a3, ...b3] = ["赋值给a3", "b3的", "还是b3的", "还是b3的"];
console.log(`剩余解构：${a3}。${b3}`); //剩余解构：赋值给a3。b3的,还是b3的,还是b3的

/* 增删改查、排序、过滤、迭代 */

//数组后面压入:push
let a4 = [1, 2, 3];
a4.push("压入1", "压入2");
console.log(`数组后面压入:${a4}`); //数组后面压入:1,2,3,压入1,压入2

//数组后面弹出:pop
let a5 = [1, 2, 3];
a5.pop();
console.log(`数组后面弹出:${a5}`); //数组后面弹出:1,2

//数组前面压入:unshift
let a6 = [1, 2, 3];
a6.unshift("压入1", "压入2");
console.log(`数组前面压入:${a6}`); //数组前面压入:压入1,压入2,1,2,3

//数组前面弹出:shift
let a7 = [1, 2, 3];
a7.shift();
console.log(`数组前面弹出:${a7}`); //数组前面弹出:2,3

//数组复制:slice
let a8 = [1, 2, 3];
let b8 = a8.slice(); //全部复制
let c8 = a8.slice(1, 2); //左闭右开[1,2)，不传第二个参数时默认复制到最后
console.log(`数组复制a8:${a8}。b8:${b8}`); //数组复制a8:1,2,3。b8:1,2,3
console.log(`数组按需复制:${c8}`); //数组按需复制:2

//数组按需增删改：splice(从哪开始删除，删除数量，添加)
let a9 = [1, 2, 3, 4, 5];
a9.splice(1, 2); //从下标为1开始，往后删除2个
console.log(`splice删除：${a9}`); //splice删除：1,4,5

let a10 = [1, 2, 3, 4, 5];
a10.splice(1, 2, "好", "靓仔", "哈好好"); //不管后面有多少个，都是要增进去的
console.log(`splice先删后增:${a10}`); //splice先删后增:1,好,靓仔,哈好好,4,5

//清空数组
let a11 = [1, 2, 3];
a11 = []; //清空
console.log("清空：" + a11);

//合并拆分
//合并：通过什么合并
let a12 = [1, "a", "还好", 2];
//合并后从一个object对象类型变成了一个string字符类型
console.log(`合并:${a12.join("")}`); //合并:1a还好2
console.log(`合并:${a12.join("-")}`); //合并:1-a-还好-2
//拆分：通过什么拆开
let a13 = "123,abc";
console.log(`拆分：${a13.split(",")}`); //拆分：123,abc,1ac,3cb
console.log(`拆分：${a13.split("c")}`); //拆分：123,ab,,1a,,3,b
//先拆再反转后合并
let a14 = "123abc";
console.log(`先拆再反转后合并:${a14.split("").reverse().join("-")}`); //先拆再反转后合并:c-b-a-3-2-1

//查
let a15 = [1, 2, 3, "a", "b", "c"];

//返回元素的下标，查不到返回-1
//从前往后查：indexOf,查找元素出现的位置(就算元素重复，但我查到第一个之后就把它的下标返回，常用于过滤)
console.log("indexOf从前往后查:" + a15.indexOf(3)); //indexOf从前往后查:2
console.log("indexOf从前往后查:" + a15.indexOf("b")); //indexOf从前往后查:4
console.log(
  "indexOf从前往后查(第二个参数指定从哪里开始查):" + a15.indexOf("b", 3)
); //indexOf从前往后查(第二个参数指定从哪里开始查):4
console.log("indexOf从前往后查(查不到):" + a15.indexOf(5)); //indexOf从前往后查(查不到):-1
//从后往前查：lastIndexOf
console.log("lastIndexOf从后往前查:" + a15.lastIndexOf(3)); //lastIndexOf从后往前查:2
console.log("lastIndexOf从后往前查:" + a15.lastIndexOf("b")); //lastIndexOf从后往前查:4
console.log(
  "lastIndexOf从后往前查(第二个参数指定从哪里开始查):" + a15.lastIndexOf("b", 3)
); //lastIndexOf从后往前查(第二个参数指定从哪里开始查):-1
console.log("lastIndexOf从后往前查(查不到):" + a15.lastIndexOf(5)); //lastIndexOf从后往前查(查不到):-1

//返回布尔值includes，不能查找引用类型比如：对象、数组
console.log("includes返回布尔值：" + a15.includes("a")); //includes返回布尔值：true
const a16 = [{ name: "李四" }, { name: "张三" }, { name: "qq" }];
const includes = a16.includes({ name: "qq" });
console.log(includes); //false

//返回具体值：find，可以方便的查找引用类型
/*
find()方法，用于找出第一个符合条件的数组成员。它的参数是一个回调函数，所有数组成员依次执行该回调函数，
直到找出第一个返回值为true的成员，然后返回该成员。如果没有符合条件的成员，则返回undefined。

findIndex()方法的用法与find()方法非常类似，返回第一个符合条件的数组成员的位置，
如果所有成员都不符合条件，则返回-1。
*/
const a17 = [{ name: "李四" }, { name: "张三" }, { name: "qq" }];
const b17 = [1, 2, 5, 6, -2, -3];
const find1 = a17.find((a17) => a17.name == "张三"); //查找数组对象中名字为"张三"的对象
const find2 = b17.find((b17) => b17 < 0); //查找数组中小于0的第一个值
const find3 = b17.findIndex((b17) => b17 < 0); //查找数组中小于0的第一个值的下标
console.log(find1); //{name: '张三'}
console.log(find2); //-2
console.log(find3); //4

//排序sort
let a18 = [1, 4, 3, 6, 8];
let lessons = [
  { title: "媒体查询响应式布局", click: 78 },
  { title: "FLEX 弹性盒模型", click: 12 },
  { title: "MYSQL多表查询随意操作", click: 99 },
];
console.log("默认从小到大：" + a18.sort()); //默认从小到大：1,3,4,6,8
//参数一与参数二比较，返回 正数:降序。负数：升序
console.log("正数降序：" + a18.sort((a, b) => b - a)); //降序：8,6,4,3,1
console.log("负数升序：" + a18.sort((a, b) => a - b)); //升序：1,3,4,6,8
console.log(lessons.sort((a, b) => a.click - b.click));

//遍历
let a19 = [
  { title: "媒体查询响应式布局", category: "css" },
  { title: "FLEX 弹性盒模型", category: "css" },
  { title: "MYSQL多表查询随意操作", category: "mysql" },
];
//for循环
let b19 = [];
for (let i = 0; i < a19.length; i++) {
  b19[i] = a19[i].title; //下标也对应起来，相当于浅拷贝了
}
console.log("for循环：");
console.log(b19); //['媒体查询响应式布局', 'FLEX 弹性盒模型', 'MYSQL多表查询随意操作']

//forEach:forEach使函数作用在每个数组元素上，但是没有返回值。
console.log("forEach：");
a19.forEach((item, index, array) => {
  //(元素，下标,数组整体本身)
  console.log(item);
  /*
{title: '媒体查询响应式布局', category: 'css'}
{title: 'FLEX 弹性盒模型', category: 'css'}
{title: 'MYSQL多表查询随意操作', category: 'mysql'}
*/
});

//for...in...
console.log("for...in...：");
for (const key in a19) {
  //key为下标索引
  console.log(key + ":" + a19[key].title);
  /*
0:媒体查询响应式布局
1:FLEX 弹性盒模型
2:MYSQL多表查询随意操作
*/
}

//for...of...
console.log("for...of...:");
for (const item of a19) {
  //item为元素值
  console.log(item);
  /*
{title: '媒体查询响应式布局', category: 'css'}
{title: 'FLEX 弹性盒模型', category: 'css'}
{title: 'MYSQL多表查询随意操作', category: 'mysql'}
*/
}

//迭代,通过遍历辅助迭代的执行
//获取索引：keys
console.log("迭代下标索引keys:");
const a20 = ["a", "b", "c"];
for (const key of a20.keys()) {
  console.log(key); //0 1 2
}
//获取值：values
console.log("迭代值values:");
for (const item of a20.values()) {
  //其实用了for..of迭不迭代item都是值，values()就没有存在的必要了
  console.log(item); //a b c
}
//获取键和值：entries
console.log("迭代键值对entries:");
for (const [k, v] of a20.entries()) {
  console.log(k, v);
  /*
0 'a'
1 'b'
2 'c'
*/
}

//过滤
//filter
/*
filter 为数组中的每个元素调用一次 callback 函数，并利用所有使得 callback 返回 true 或 等价于 true 的值 的元素创建一个新数组。
那些没有通过 callback 测试的元素会被跳过，不会被包含在新数组中。
filter 不会改变原数组。
*/
console.log("过滤器：");
let a21 = [1, 5, 2, 5, 2, 8, 12, 16];
let b21 = a21.filter((item) => item > 10); // 为true的就把它拿出来
let c21 = a21.filter((item, index, array) => {
  /*
indexOf用于查找元素出现的位置，为0 1 2 1 2 5 6 7
index为元素下标，为0 1 2 3 4 5 6 7
*/
  return array.indexOf(item) === index; //数组去重
});
console.log(b21); //[12, 16]
console.log(c21); //[1, 5, 2, 8, 12, 16]
```

## 26.http 和 https

**http:**

- 超文本传输协议，传输数据以明文形式显示，端口为 80

- 无状态：协议对客户端没有状态存储，对事物处理没有“记忆”能力，比如访问一个网站需要反复进行登录操作。

- 无连接：每次请求需要通过 TCP 三次握手四次挥手，和服务器重新建立连接。报文从运用层传送到运输层，运输层通过 TCP 三次握手和服务器建立连接，四次挥手释放连接。

**针对无状态的一些解决策略：**

1. 通过`Cookie/Session`技术
2. HTTP/1.1 持久连接（HTTP keep-alive）方法，只要任意一端没有明确提出断开连接，则保持 TCP 连接状态，在请求首部字段中的`Connection: keep-alive`即为表明使用了持久连接

<img src="C:%5CUsers%5C20837%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5Cimage-20211105161917931.png" alt="image-20211105161917931" style="zoom:50%;" />

**https:**

- 超文本传输加密协议，端口为 433，身披 SSL/TLS 外壳的 HTTP。经由 HTTP 进行通信，利用 SSL/TLS 建立全信道，加密数据包。
- 内容加密：采用混合加密技术，中间者无法直接查看明文内容
- 验证身份：通过证书认证客户端访问的是自己的服务器
- 保护数据完整性：防止传输的内容被中间人冒充或者篡改

## 27.js_BOM

> `window` : BOM 中最顶层对象
>
> `location`： 地址栏对象
>
> `history`：历史记录对象
>
> `navigator`： 浏览器信息对象
>
> `document` ： 文档对象
>
> `screen` ：屏幕对象
>
> `frames` :框架集

**(1)window 对象**

```js
//浏览器的事件 ---window可以省略不写

//加载时间.表示当前页面所有内容都加载完成再加载这个函数
window.onload = function () {};

//当浏览器的尺寸发生改变时回触发
onresize = function () {};

//当看看去的滚动条发生滚动的时候会触发
onscroll = function () {};
```

**(2)location 对象**

```js
window.location.href;  //获取当前地址栏的地址
window.location.href = “http://www.baidu.com”; // 设置当前地址栏的地址
window.location.reload();  //刷新
window.location.reload(true);  //强制刷新
```

**(3)history 对象**

```js
window.history.forword(); //上一步
window.history.back(); //下一步
window.history.go(0); //接收参数 0   表示刷新当前页面
window.history.go(2); //接收正整数  表示前进2个页面
window.history.go(-2); //接收负整数  表示后退2个页面
```

**(4)navigator 对象**

```js
console.log(navigator);

/*
    appName---浏览器名称 NetScape
    appCodeName---浏览器内核
    appVersion---浏览器版本
    userAgent---浏览器的整体信息
*/
```

**(5)document 对象**

```js
浏览器当中也是有DOM的，不过它代表的是全局

//结构操作:
document.documentElenment---html标签
document.body---body标签
document.head---head标签
document.title---titile标签

//滚动的距离
document.documnetElement.scrollTop-------有文档声明时使用
document.body.scrollTop------没有文档声明使用-----兼容写法使用短路运算
```

**(6)screen 对象**

```js
//除了任务栏外的高度-宽度
screen.availHeight;
screen.availWidth;
//包含了任务栏的高度-高度
screen.height;
screen.width;
```

**(7)三大家族**

- offset 家族

  > offsetWidth / offsetHeight ： 获取的宽高包含：边框 + 内边距 + 元素宽高
  > offsetParent ： 获取元素的第一个定位祖先元素 ，如果没有定位的则获取到的是 body
  > offsetLeft /offsetTop ：获取元素到第一个定位元素的偏移量，如果没有定位的则获取到的是到 body 的偏移量

- client 家族

  > clientWidth / clientHeight ： 获取的宽高包含内边距 + 元素宽高
  > clientLeft /clientHeight ： 获取 元素的 左边框 或者 顶部边框

- scroll 家族

  > scrollWidth / scrollHeight ：当内容没超出元素范围时 获取的是 内边框 + 元素宽高
  > 当内容超出元素范围时 获取的是 内边框 + 元素宽高+超出的宽度
  > scrollTop / scrollLeft ：Top 获取的是内容超出顶部内边距的距离 Left 获取的是内容超出左边内边距的距离

## 28.本地存储与会话

**cookie**：

存储在本地，存在浏览器缓存中，有指定时间 ，Cookie 在计算机中是个存储在浏览器目录中的文本文件

**localStorage**:

存储在本地，需要手动删除才会消失，不主动清除一直存在

```js
// 本地存储
localStorage.setItem("name", "xzp");
//对象需要使用 JSON.stringify()
localStorage.setItem("goto", JSON.stringify({ age: 18 }));
//获取数据
let name = localStorage.getItem("name");
//对象需要使用 JSON.parse()
let obj = JSON.parse(localStorage.getItem("goto"));
```

**sessionStorage**:

存储在本地，关闭浏览器和标签页就会消失

```js
// 本地存储
sessionStorage.setItem("name", "xzp");
//对象需要使用 JSON.stringify()
sessionStorage.setItem("goto", JSON.stringify({ age: 18 }));
//获取数据
let name = sessionStorage.getItem("name");
//对象需要使用 JSON.parse()
let obj = JSON.parse(sessionStorage.getItem("goto"));
```

**session**:

存储在服务器上

**token:**

token 是用户身份的验证方式，我们通常叫它：令牌

**sessionStorage 、localStorage 和 cookie 之间的区别**：

共同点：都是保存在浏览器端，且都遵循同源策略。

不同点：

1. localStorage 是持久化的，存储在其中的数据是永远不会过期的，需要手动删除。一般为 5MB 左右。
2. sessionStorage 是临时性的本地存储，它是会话级别的存储，当会话结束（页面被关闭）时，存储内容也随之被释放。一般为 5MB 左右。
3. cookie 一般由服务器生成，可设置失效时间，如果在浏览器端生成 cookie，默认关闭浏览器后失效。cookie 大约在 4k 左右。

## 29.基本数据类型和判断

> **基本类型**：字符串（String）、数字(Number)、布尔(Boolean)、对空（Null）、未定义（Undefined）
>
> **引用类型**：对象(Object)、数组(Array)、函数(Function)

```js
var a = "iamstring";
var b = 222;
var c= [1,2,3];

1.最常见的判断方法：typeof
alert(typeof a)  ------------> string
alert(typeof b)  ------------> number
alert(typeof c)  ------------> object

2.判断已知对象类型的方法： instanceof
alert(c instanceof Array) ---------------> true
```

## 30.事件委托

把原本需要绑定在子元素的响应事件委托给父元素，让父元素担当事件监听的职务。事件委托的原理是 DOM 元素的事件冒泡。

## 31.怎么阻止默认动作？

```js
var $a = document.getElementsByTagName("a")[0];
$a.onclick = function(e){
alert("跳转动作被我阻止了")
e.preventDefault();
//return false;//也可以
}
默认事件没有了。
```

## 32.如何阻止事件冒泡

w3c 的方法是 `e.stopPropagation()`，IE 则是使用 `e.cancelBubble = true`

## 33.页面加载，url 到得到 html 的详细过程

- 从输入 url 到得到 html 的详细过程

  <img src="C:%5CUsers%5C20837%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5Cimage-20211116124807246.png" alt="image-20211116124807246" style="zoom: 50%;" />

  <img src="C:%5CUsers%5C20837%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5Cimage-20211116125137968.png" alt="image-20211116125137968" style="zoom: 50%;" />

- window.onload 和 DOMContentLoaded 的区别

## 34.常见状态码

- 200：成功态
- 301：永久重定向
- 302：临时重定向
- 403：服务器拒绝该次访问
- 404：路径有错
- 500：服务器出错

## 35.js 和 jQuery 对象的转换

需要强调的是 jquery 对象是数组对象，基于此原理,可以进行 jquery 对象与 js 对象之间的相互转换。

**js 转 jQuery:**

```js
//只需要加上$()
var domObj = document.getElementById("exampleId");
var jqueryObj = $(domObj);
```

**jQuery 转 js:**

```js
//根据索引
var $jqueryObj =$("#exampleId); //此时该对象为一个jquery对象
var domObj = $jqueryObj[0];
```

## 36. var 变量提升

使用 `var` 定义的代码，声明会被提升到前面，赋值还在原位置。仅仅是用 var 声明的，用 let\const 的不会。

```js
console.log(a); //undefined
var a = 1;
console.log(a); //1

//以上代码解析器执行过程如下
var a;
console.log(a); //undefined
a = 1;
console.log(a); //1
```

## 37. 字符串

1.截取

```text
let hd = 'houdunren.com';
```

```js
1. substring
(1)从左往右截取（左闭右开）(2)第二个参数为截取的结束位置 (3)小的做为起始位置 (4)负数转为0
console.log(hd.substring(3)); //dunren.com
console.log(hd.substring(3, 6)); //dun
console.log(hd.substring(3, 0)); //hou 较小的做为起始位置
console.log(hd.substring(3, -9)); //hou 负数转为0

2. slice
(1)正数从左往右截取（左闭右开）(2)第二个参数为截取的结束位置 (3)小的做为起始位置 (4)负数从后算
console.log(hd.slice(3)); //dunren.com
console.log(hd.slice(3, 6)); //dun
console.log(hd.slice(3, -1)); //dunren.co 第二个为负数表示从后面计算的字符位置
console.log(hd.slice(-2));//om 从末尾取(从后面计算，计算到该位置后还是往右截取)

3. substr
(1)正数从左往右截取 (2)第二个参数为截取的字符数量 (4)负数从后算
console.log(hd.substr(3)); //dunren.com
console.log(hd.substr(3, 6)); //dunren
console.log(hd.substr(-3, 2)); //co 从后面第三个开始往右取两个
```

## 38. 数组去重

```js
const aa = [34, 11, 11, 22, 33, 22, "46", "we", "we", "hog"];

// 方法一
let bb = aa.filter((item, index, arr) => {
  return arr.indexOf(item) === index;
});
console.log(bb); // [34, 11, 22, 33, '46', 'we', 'hog']

// 方法二
let cc = Array.from(new Set(aa));
console.log(cc); // [34, 11, 22, 33, '46', 'we', 'hog']

// 方法三
let dd = aa.reduce((calArr, item) => {
  calArr.includes(item) ? "" : calArr.push(item);
  return calArr;
}, []);
console.log(dd); // [34, 11, 22, 33, '46', 'we', 'hog']

// 方法四
let ee = [...new Set(aa)];
console.log(ee); // [34, 11, 22, 33, '46', 'we', 'hog']
```

## 39.变量/垃圾回收机制

**下列代码存在几个变量没有被回收？**

```js
答案：3

var i = 1;   // 全局变量不会被回收
var i = 2;   // 这里重复声明变量i,因此var声明被忽略，只是把i赋值为2
var add = function() {  // 全局变量不会被回收
    var i = 0;  // 局部变量
    return function() {
        i++;
        console.log(i); // 被另一个作用域引用导致不会被回收
    }
}();
add();
```

**1.变量回收原则**

1. 全局变量**不会被回收**。
2. 局部变量会**被回收**，也就是函数一旦运行完以后，函数内部的东西都会被销毁。
3. 只要被另外一个作用域所引用就**不会被回收**（闭包）

**2.JS 的垃圾回收机制**

（1）标记清除

JS 中最常见的垃圾回收方式是**标记清除**
标记清除的概念也好理解，**从根部出发看是否能达到某个对象，如果能达到则认定这个对象还被需要，如果无法达到，则释放它**，这个过程大致分为三步：

- 垃圾回收器创建 roots 列表，roots 通常是代码中保留引用的全局变量，在 js 中，我们一般认定全局对象 window 作为 root，也就是所谓的根部。
- 从根部出发检查所有 的 roots，所有的 children 也会被递归检查，能从 root 到达的都会被标记为 active。
- 未被标记为 active 的数据被认定为不再需要，垃圾回收器开始释放它们。

（2）引用计数

**工作原理**：跟踪记录每个值被引用的次数

## 40. apply/call/bind 函数相关方法

**1. apply/call/bind**

改变 this 指针，也可以理解为对象借用方法，就现像生活中向邻居借东西一样的事情。

1）apply

`apply`接受两个参数，第一个参数是`this`的指向，第二个参数是函数接受的参数，以数组的形式传入；立即执行

```js
function fn(...args) {
  console.log(this, args);
}
let obj = {
  myname: "张三",
};

fn.apply(obj, [1, 2]); // this会变成传入的obj，传入的参数必须是一个数组；
fn(1, 2); // this指向window

// 当第一个参数为null、undefined的时候，默认指向window(在浏览器中)
fn.apply(null, [1, 2]); // this指向window
fn.apply(undefined, [1, 2]); // this指向window
```

2）call

`call`方法的第一个参数也是`this`的指向，后面传入的是一个参数列表（分开传参）；立即执行

```js
function fn(...args) {
  console.log(this, args);
}
let obj = {
  myname: "张三",
};

fn.call(obj, 1, 2); // this会变成传入的obj，传入的参数必须是分开的；
fn(1, 2); // this指向window
```

3）bind

bind 方法和 call 很相似，第一参数也是`this`的指向，后面传入的也是一个参数列表(但是这个参数列表可以分多次传入)；不立即执行

```js
function fn(...args) {
  console.log(this, args);
}
let obj = {
  myname: "张三",
};

const bindFn = fn.bind(obj); // this 也会变成传入的obj ，bind不是立即执行需要执行一次
bindFn(1, 2); // this指向obj
fn(1, 2); // this指向window
```

**三者区别：**

- 三者都可以改变函数的`this`对象指向
- 三者第一个参数都是`this`要指向的对象，如果如果没有这个参数或参数为`undefined`或`null`，则默认指向全局`window`
- 三者都可以传参，但是`apply`是数组，而`call`是参数列表，且`apply`和`call`是一次性传入参数，而`bind`可以分为多次传入
- `bind`是返回绑定 this 之后的函数，`apply`、`call` 则是立即执行
