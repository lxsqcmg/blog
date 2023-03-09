# Vue

> vue2.0 中有一个特点，对一个数据的操作是分散在各个对象中的。
>
> Vue3.0 组合 API（一些方法），把对一个数据的操作全部组合在一起，代码可读性更高。
>
> Vue3.0 中利用了 new Proxy() 代理对象来管理数据响应式(Vue3.0 的一个双向数据绑定原理)

## 1.$set和$delete

通过这两个方法对`Object.defineProperty`进行数组的数据劫持

```js
this.$set(要修改的数组，要修改的下标，要修改成的值)

this.$delete(要删除的数组,*要删除的下标*);
```

## 2.Vuex

```js
const store = new Vuex.Store({
    /*
       获取store中state的数据：
       (1)this.$store.state.products
       (2){{ $store.state.products }}
    */
  state:{//相当于data
    products: [
      {name: '鼠标', price: 20},
      {name: '键盘', price: 40}
    ]
  },

    /*
       获取getters中的数据：
       (1)this.$store.getters.aa
       (2){{ $store.getters.aa }}
    */
  getters:{//相当于计算属性computed
    aa: (state) => {
      let bb = state.products.map( product => {
        return {
          name: product.name,
          price: product.price / 2
        }
      })
      return bb;
    }
  },

   /*
       注意:调用mutaions中回调函数, 只能使用store.commit(type, payload)
       例如：this.$store.commit('minusPrice', 2); //提交`minusPrice,payload为2
   */
  mutations:{//相当于methods,用来修改state，绝不允许出现异步
    minusPrice (state, payload ) {
      let newPrice = state.products.forEach( product => {
        product.price -= payload
      })
    }
  },

    /*
       传值：
       this.$store.dispatch('minusPriceAsync', 5); //分发actions中的minusPriceAsync这个异步函数
    */
  actions:{ //相当于mutations，但允许有异步
    minusPriceAsync( context, payload ) {
      setTimeout( () => {
        context.commit( 'minusPrice', payload ); //context提交
      }, 2000)
    }
  }，

    /*
        操作：
        store.state.a // -> moduleA 的状态
        store.state.b // -> moduleB 的状态
    */
   modules: {//模块化
     a: moduleA,
     b: moduleB
   }

})
```

```js
const moduleA = {
  state: { ... },
  mutations: { ... },
  actions: { ... },
  getters: { ... }
}

const moduleB = {
  state: { ... },
  mutations: { ... },
  actions: { ... }
}
```

## 3.修饰符

(1) `.native`

组件事件的监听，比如说要监听一个组件，必须加上这个修饰符(Vue2.0)。Vue3 好像不需要这个了。

```js
<组件 @click.native="btnClick"></组件>

new Vue({
    methods:{
        btnClick(){
            console.log("组件监听");
        }
    }
})
```

## 4.父子组件生命周期顺序

> 父 beforeCreate -> 父 created -> 父 beforeMount -> 子 beforeCreate -> 子 created -> 子 beforeMount -> 子 mounted -> 父 mounted

## 5.父子组件更新时的生命周期顺序

> 父 beforeUpdate->子 beforeUpdate->子 updated->父 updated

## 6.跨域问题解决

Vue3.0 中新建一个 vue.config.js 文件，然后输入以下代码：

```js
module.exports = {
  devServer: {
    proxy: {
      //跨域代理
      "/api": {
        //target:"代理服务器的目标地址"
        target: "https://pvp.qq.com/",
        //是否允许跨域
        changeOrigin: true,
        ws: true,
        //路径重写
        pathRewrite: {
          "^/api": "",
        },
      },
    },
  },
};

//随便一个vue文件下发送axios请求
axios({
  // 默认为get请求
  url: "/api/web201605/js/herolist.json",
})
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
```

## 7. Vue 中的声明式渲染是什么？

1）界面能根据**初始数据做初始渲染**显示， 不需要手动操作 DOM 来显示;
2）要更新界面，只需要更新数据即可， **不用手动操作 DOM 来更新界面**。

## 8. MVC 和 MVVM 的区别

**MVC**

<img src="C:%5CUsers%5C20837%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5Cimage-20230219161023616.png" alt="image-20230219161023616" style="zoom:80%;" />

**1). Model（模型）**是应用程序中用于处理应用程序**数据逻辑**的部分。
　　通常模型对象负责在数据库中存取数据。

**2). View（视图）**是应用程序中**处理数据显示**的部分。
　　通常视图是依据模型数据创建的。

**3). Controller（控制器）**是应用程序中**处理用户交互**的部分。
　　通常控制器负责从视图读取数据，控制用户输入，并向模型发送数据。

最典型的`MVC`就是`JSP + serverlet + javabean`的模式

**MVVM**

![image-20230219160507389](C:%5CUsers%5C20837%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5Cimage-20230219160507389.png)

**1). M**： Model 模型, 也就是**包含数据的`js`对象**(只包含属性, 不包含方法)

**2). V**： View 视图，动态显示模型对象中的**数据显示界面**

**3). VM**： `ViewModel`**视图模型**, 本质是一个`vm`, 通过`vm`读取 model 中的数据显示到 view 上, 同时 view 输入数据改变, `vm`也可以将输入数据保存到 model 中

**MVVM 的优势**: 不用亲自操作 DOM, 数据是响应式的, 一旦数据变化, 自动更新界面

## 9.怎样理解 Vue 的单向数据流？

1. 所有的 prop 都使得其父子 prop 之间形成了一个单向下行绑定：**父级 prop 的更新会向下流动到子组件中，但是反过来则不行**。这样会防止从子组件意外改变父级组件的状态，从而导致你的应用的数据流向难以理解。

2. 每次父级组件发生更新时，子组件中所有的 prop 都将会更新为最新的值。这意味着你不应该在一个子组件内部改变 prop。如果你这样做了，Vue 会在浏览器的控制台中发出警告。**子组件想修改时，可以通过 $emit 派发一个自定义事件**，父组件接收到后，由父组件修改。

## 10. computed 和 watch 的区别和运用的场景？

1. **computed**： 是计算属性，依赖其它属性值，并且 computed 的值有缓存，只有它依赖的属性值发生改变，下一次获取 computed 的值时才会重新计算 computed 的值；

2. **watch**： 更多的是「观察/监视」的作用，类似于某些数据的监听回调 ，每当监听的数据变化时都会执行回调进行后续操作；

## 11. 谈谈你对 Vue 生命周期的理解？

Vue 实例有一个完整的生命周期，也就是从开始创建、初始化数据、编译模版、挂载 Dom -> 渲染、更新 -> 重新渲染、卸载等一系列过程，我们称这是 Vue 的生命周期。

| **生命周期**    | **描述**                                                                                |
| --------------- | --------------------------------------------------------------------------------------- |
| `beforeCreate`  | 组件实例被创建之初，组件的属性生效之前                                                  |
| `created`       | 组件实例已经完全创建，属性也绑定，但真实 dom 还没有生成，$el 还不可用                   |
| `beforeMount`   | 在挂载开始之前被调用：相关的 render 函数首次被调用, 但页面还没有挂载显示, $ref 还不可用 |
| `mounted`       | 已挂载, 也就是已经显示到界面上了, 此时可能通过$ref 访问到页面元素或组件对象             |
| `beforeUpdate`  | 组件数据更新之后, 界面更新之前调用, 如果此时获取的界面是旧的界面                        |
| `updated`       | 界面更新之后调用, 如果此时获取界面主是新的界面了                                        |
| `activited`     | keep-alive 专属，组件激活时调用                                                         |
| `deactivated`   | keep-alive 专属，组件失活时调用                                                         |
| `beforeDestory` | 组件销毁前调用, 一般在此做一些收尾的工作, 如: 取消定时器, 解绑监听                      |
| `destoryed`     | 组件销毁后调用                                                                          |

## 12. Vue 的父组件和子组件生命周期钩子函数执行顺序？

Vue 的父组件和子组件生命周期钩子函数执行顺序可以归类为以下 4 部分：

**1. 加载渲染过程**

父 `beforeCreate` –> 父 `created` –> 父` beforeMount` –> 子 `beforeCreate`

–> 子` created` –> 子 `beforeMount` –> 子 `mounted` –> 父` mounted`

**2. 子组件更新过程**

父 `beforeUpdate` –> 子` beforeUpdate` –> 子 `updated `–> 父 `updated`

**3. 父组件更新过程**

父 `beforeUpdate` –> 父 `updated`

**4. 销毁过程**

父 `beforeDestroy` –> 子 `beforeDestroy` –> 子 `destroyed` –> 父 `destroyed`

## 13.谈谈你对 keep-alive 的了解

keep-alive 是 Vue 内置的一个组件，可以使被包含的组件保留状态，避免重新渲染 ，其有以下特性：

1. 一般结合路由一起使用，用于缓存路由组件；

2. 提供 include 和 exclude 属性，两者都支持字符串和正则表达式， include 表示只有名称匹配的组件会被缓存，exclude 表示任何名称匹配的组件都不会被缓存 ，其中 exclude 的优先级比 include 高；

3. 对应两个钩子函数 activated 和 deactivated ，当组件被激活时，触发钩子函数 activated，当组件离开时，触发钩子函数 deactivated。

## 14.组件中 data 为什么是一个函数

当 `data` 的值是一个对象时，它会在这个组件的所有实例之间共享

1. 如果组件中的 data 选项是对象，那这个组件的每个实例都是通过配置的**data 属性**得到的， 因此**组件的多个标签实例 data 共用一个 data 数据对象**, 一旦有一个组件对象改变了 data 中的数据， 其它组件对象界面也会更新

2. 如果组件中 data 选项是一个函数，那每个组件对象都是通过执行配置的**data 函数**得到的 data 数据对象， 因此**组件的多个组件对象的 data 都不是同一个对象**，一个组件对象修改其 data 内数据， 其它组件对象不会更新，因为 data 中的数据没有变化。

## 15. v-model 的原理

**1. v-model 用在 html 标签上：**

1). text 和 textarea 类型 input 标签 使用 value 属性和 input 事件；

2). checkbox 和 radio 类型 input 标签 使用 checked 属性和 change 事件；

3). select 标签使用 value 属性和 input 事件。

以 input 表单元素为例：

```js
<input v-model='something'>
```

相当于

```js
<input v-bind:value="something" v-on:input="something = $event.target.value">
```

**2. v-model 用在组件标签上: 则会传入 value 属性 和绑定 input 事件监听**

父组件：

```js
<ModelChild v-model="message"></ModelChild>
<!-- 等价于 -->
<ModelChild :value="message" @input="message=$event"></ModelChild>

data () {
  return {
    message: 'Hello atguigu'
  }
}
```

子组件：

```js
<div>
  <input type="text" :value="value" @input="$emit('input', $event.target.value)">
</div>

props: ['value']
```

## 16. Vue 组件间通信有哪几种方式

**1. 方式一: props**

1). 实现父向子通信: 属性值是非函数
2). 实现子向父通信: 属性值是函数

**2. 方式二: vue 自定义事件**

1). 用来实现子组件向父组件通信

2). 相关语法:

● 父组件中绑定自定义事件监听:

```js
<Child @eventName="callback">
```

● 子组件中分发事件

```js
this.$emit("eventName", data);
```

3.**方式三: v-model**

1). 实现父子之间相互通信

2). 组件标签上的 v-model 的本质

● 父组件:

```js
<CustomInput v-model="name"/>
<!-- 等价于 -->
<CustomInput :value="name" @input="name=$event"/>
```

● 子组件:

```js
<input type="text" :value="value" @input="$emit('input', $event.target.value)">

props: ['value']
```

**4. $attrs与$listeners**

1). $attrs

● 实现当前组件的父组件向当前组件的子组件通信

● 它是包含所有父组件传入的标签属性(排除 props 声明, class 与 style 的属性)的对象

● 使用: 通过 v-bind=”$attrs” 将父组件传入的 n 个属性数据传递给当前组件的子组件

2). $listeners

● 实现当前组件的子组件向当前组件的父组件通信

● $listeners 是包含所有父组件传入的自定义事件监听名与对应回调函数的对象

● 使用: 通过 v-on=”$listeners” 将父组件绑定给当前组件的事件监听绑定给当前组件的子组件

**5. $refs, $children, $parent**

1). $refs

● 实现父组件向指定子组件通信

● $refs 是包含所有有 ref 属性的标签对象或组件对象的容器对象

● 使用: 通过 this.$refs.child 得到子组件对象, 从而可以直接更新其数据或调用其方法更新数据

2). $children

● 实现父组件向多个子组件通信

● $children 是所有直接子组件对象的数组

● 使用: 通过 this.$children 遍历子组件对象, 从而可以更新多个子组件的数据

3). $parent

● 实现子组件向父组件通信

● $parent 是当前组件的父组件对象

● 使用: 通过 this.$parent 得到父组件对象, 从而可以更新父组件的数据

**6. Vuex**

1). 实现任意组件间通信

2). Vuex 是一个专为 Vue 应用程序设计的管理多组件共享状态数据的 Vue 插件

● 任意组件都可以读取到 Vuex 中 store 的 state 对象中的数据

● 任意组件都可以通过 dispatch()或 commit()来触发 store 去更新 state 中的数据

● 一旦 state 中的数据发生变化, 依赖于这些数据的组件就会自动更新

**7. 全局事件总线**

1). 实现任意组件间通信

2). 编码:

● 将入口`js`中的`vm`作为全局事件总线对象:

```js
beforeCreate() {
    Vue.prototype.$bus = this
}
```

● 分发事件/传递数据的组件:

```js
this.$bus.$emit("eventName", data);
```

● 处理事件/接收数据的组件:

```js
this.$bus.$on("eventName", (data) => {});
```

**8. `.sync`**

1). 实现父子之间相互通信

2). 组件标签的属性上使用.sync 的本质

● 父组件:

```js
<child :money.sync="total"/>
<!-- 等价于 -->
<Child :money="total" @update:money="total=$event"/>

data () {
  return {
    total: 1000
  }
}
```

● 子组件:

```js
<button @click="$emit('update:money', money-100)">花钱</button>

props: ['money']
```

## 17.说说 SSR 的优缺点？

**1. 服务端渲染的优点：**

1). **更好的 SEO**： 因为 SPA 页面的内容是通过 Ajax 获取，而搜索引擎爬取工具并不会等待 Ajax 异步完成后再抓取页面内容，所以在 SPA 中是抓取不到页面通过 Ajax 获取到的内容；而 SSR 是直接由服务端返回已经渲染好的页面（数据已经包含在页面中），所以搜索引擎爬取工具可以抓取渲染好的页面；

2). **更快的内容到达时间（首屏加载更快）**： SPA 会等待所有 Vue 编译后的 js 文件都下载完成后，才开始进行页面的渲染，文件下载等需要一定的时间等，所以首屏渲染需要一定的时间；SSR 直接由服务端渲染好页面直接返回显示，无需等待下载 js 文件及再去渲染等，所以 SSR 有更快的内容到达时间；

**2. 服务端渲染的缺点：**

1). **更多的开发条件限制**： 例如服务端渲染只支持 beforCreate 和 created 两个钩子函数，这会导致一些外部扩展库需要特殊处理，才能在服务端渲染应用程序中运行；并且与可以部署在任何静态文件服务器上的完全静态单页面应用程序 SPA 不同，服务端渲染应用程序，需要处于 Node.js server 运行环境；

2). **更多的服务器负载**：在 Node.js 中渲染完整的应用程序，显然会比仅仅提供静态文件的 server 更加大量占用 CPU 资源 (CPU-intensive – CPU 密集)，因此如果你预料在高流量环境 ( high traffic ) 下使用，请准备相应的服务器负载，并明智地采用缓存策略。

## 18. `vue`的`diff`算法

**是什么：**

`diff` 算法是一种通过同层的树节点进行比较的高效算法

其有两个特点：

- 比较只会在同层级进行, 不会跨层级比较
- 在`diff`比较的过程中，循环从两边向中间比较

## 19.`Proxy` 与 `Object.defineProperty` 优劣对比

**1. Proxy 的优势如下:**

1). Proxy 可以**直接监听对象**而非属性；

2). Proxy 可以**直接监听数组**的变化；

3). Proxy 有多达**13 种拦截方法**,不限于 apply、ownKeys、deleteProperty、has 等等是 Object.defineProperty 不具备的；

4). Proxy 返回的是一个新对象,我们可以只操作新的对象达到目的,而 Object.defineProperty 只能遍历对象属性直接修改；

5). Proxy 作为新标准将受到浏览器厂商重点持续的性能优化，也就是传说中的新标准的性能红利；

**2. Object.defineProperty 的优势如下:**

兼容性好，支持 IE9，而 Proxy 的存在浏览器兼容性问题,而且无法用 polyfill 磨平，因此 Vue 的作者才声明需要等到下个大版本( 3.0 )才能用 Proxy 重写。

## 20.简述虚拟 DOM 实现原理

虚拟 DOM 的简单实现原理主要包括以下 3 部分：

1. 用` JavaScript 对象`模拟真实 DOM 树，对真实 DOM 进行抽象；

2. `diff `算法 比较`两棵虚拟 DOM 树`的差异；

3. `pach` 算法 将两个虚拟 DOM 对象的差异应用到真正的 DOM 树。

## 21. `vue-router` 路由钩子

路由钩子函数有三种：

- 全局钩子： `beforeEach`(全局前置守卫)、 `afterEach`(全局后置钩子)
- 路由独享的守卫(单个路由里面的钩子)： `beforeEnter`
- 组件路由：`beforeRouteEnter`、 `beforeRouteUpdate`、 `beforeRouteLeave`

## 22. Vue2 响应式原理（如何实现数据绑定的）

Vue 主要通过以下 4 个步骤来实现数据绑定的：

1. **实现一个监听器 `Observer`**：对数据对象进行遍历，包括子属性对象的属性，利用 `Object.defineProperty() `对属性都加上`setter`和 `getter`。这样的话，给这个对象的某个值赋值，就会触发 setter，那么就能监听到了数据变化。

2. **实现一个解析器 `Compile`**：解析 `Vue `模板指令，将模板中的变量都替换成数据，然后初始化渲染页面视图，并将每个指令对应的节点绑定更新函数，添加监听数据的订阅者，一旦数据有变动，收到通知，调用更新函数进行数据更新。

3. **实现一个订阅者 `Watcher`**：`Watcher `订阅者是 Observer 和 Compile 之间通信的桥梁 ，主要的任务是订阅 Observer 中的属性值变化的消息，当收到属性值变化的消息时，触发解析器 Compile 中对应的更新函数。

4. **实现一个发布者 `Dep`**：订阅器（发布者）采用 发布-订阅 设计模式，用来收集订阅者 Watcher，对**监听器 `Observer`** 和 **订阅者`Watcher`**进行统一管理。

## 23.`Vue3`的响应式原理

1.`Proxy`代理对象用于创建一个对象的代理，从而实现基本操作的拦截和自定义（如属性查找、赋值、枚举、函数调用等）。也就是拦截对象中任意属性的变化，包括：属性值的读写、属性的添加、属性的删除等。**直接监听对象而非属性。**

2.`Reflect`反射，对源对象的属性进行操作

**通过`Proxy`（代理）：** 拦截对象中任意属性的变化，包括：属性值的读写，属性的增加，属性的删除等。

**通过`Reffect`（反射）：** 一个通常**以函数作为属性的对象**，对源对象的属性进行操作

## 23. `vue2`和`vue3`的区别

**1)双向数据绑定原理不同**

**vue2**：vue2 的双向数据绑定是利用**ES5 的一个 API。Object.defineProperty()** 对数据进行劫持，结合发布订阅模式的方式来实现的。

**vue3**：vue3 中使用了**ES6 的 Proxy API**对数据代理。相比 vue2.x，使用 proxy 的优势如下：

- defineProperty 只能监听某个属性，不能对全对象监听

- 可以省去 for in，闭包等内容来提升效率(直接绑定整个对象即可)

- 可以监听数组，不用再去单独的对数组做特异性操作 vue3.x 可以检测到数组内部数据的变化。

**2)`API`类型不同**

**vue2**：vue2 使用**选项类型 api**，选项型 api 在代码里分割了不同的属性：data,computed,methods 等。

**vue3**：`vue3`使用**组合式`api`**，新的组合式`api`能让我们使用方法来分割，相比于旧的`api`使用属性来分组，这样代码会更加简便和整洁。

**3)定义数据变量和方法不同**

**vue2**：vue2 是把数据放入 data 中，在 vue2 中定义数据变量是**data(){}**，创建的方法要在**methods:{}**中。

**vue3**：，vue3 就需要使用一个新的 setup()方法，此方法在组件初始化构造的时候触发。使用以下三个步骤来建立反应性数据：

- 从 vue 引入**reactive**；
- 使用**reactive()** 方法来声明数据为响应性数据；
- 使用 setup()方法来返回我们的响应性数据，从而**template**可以获取这些响应性数据。

**4）生命周期钩子函数不同**

**`vue2`中的生命周期**：

- beforeCreate 组件创建之前
- created 组件创建之后
- beforeMount 组价挂载到页面之前执行
- mounted 组件挂载到页面之后执行
- beforeUpdate 组件更新之前
- updated 组件更新之后

**`vue3`中的生命周期**：

- `setup` 开始创建组件
- `onBeforeMount` 组价挂载到页面之前执行
- `onMounted `组件挂载到页面之后执行
- `onBeforeUpdate `组件更新之前
- `onUpdated` 组件更新之后

而且 vue3.x 生命周期在调用前需要先进行引入。除了这些钩子函数外，vue3.x 还增加了`onRenderTracked` 和`onRenderTriggered`函数。

## 24.`vue`与`react`的区别

**1. 相同点：**

1). React 采用特殊的 JSX 语法，Vue 在组件开发中也推崇编写.vue 特殊文件格式，对文件内容都有一些约定，两者都需要编译后使用。

2). 内部都使用虚拟 DOM 与 DOM Diff 算法来提升效率

3). 中心思想相同：一切都是组件，组件实例之间可以嵌套。

4). 都提供合理的钩子函数，可以让开发者定制化地去处理需求。

5). 都不内置列数 AJAX，Route 等功能到核心包，而是以插件的方式加载。

6). 在组件开发中都支持 mixins 的特性。

**2. 不同点：**

1). React: 基于`JSX`编码, 单向数据绑定, 不能直接更新状态数据必须`setState()`指定新数据

2). `Vue`: 基于模板语法, 双向数据绑定, 直接更新 data 数据

## 25.`npm run dev`的执行过程

在`npm run dev`的时候，首先会去项目的`package.json`文件里找`scripts `里找对应的`dev`，然后执行 `dev `的命令。

例如启动`vue`项目 `npm run serve`的时候，实际上就是执行了`vue-cli-service serve` 这条命令。
