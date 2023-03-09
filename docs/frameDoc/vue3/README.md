# Vue3

## 数据的响应式

注意：响应式数据应用在template(即html)中的时候不需要带后缀 .value 进行数据的渲染，其只在js中使用。

### ref

用途：用于声明一个响应式变量，类型一般是boolean、string、number。

```js
import { ref } from 'vue'

// 1.声明
let a = ref();

// 2.修改响应式变量
a.value = 5;

// 3.输出
console.log(a.value) // 5 
```

```ts
import { ref } from 'vue'
import type { Ref } from 'vue'

// 1.类型声明
const a: Ref<string | number> = ref('2020')
const b = ref<string | number>('2020')

// 2.修改响应式变量
a.value = 2022 
b.value = 2022

// 3.输出
console.log(a.value) // 2022
console.log(b.value) // 2022
```

### reactive

用途：用于声明一个响应式对象，类型一般是object、array。

```js
import { reactive } from 'vue'

// 1.声明
let a = reactive({
    name: '你好'
});

// 2.修改响应式对象
a.name = "我不好";

// 3.输出
console.log(a.name) // 我不好
```

```ts
import { reactive } from 'vue'

// 接口约束类型
interface Imessage {
  name: string
}

// 1.声明
let a: Imessage = reactive({
    name: '你好'
});

// 2.修改响应式对象
a.name = "我不好";

// 3.输出
console.log(a.name) // 我不好
```

### toRefs

用途：响应解构。其中结果对象的每个 property 都是指向原始对象相应 property 的 [`ref`](https://v3.cn.vuejs.org/api/refs-api.html#ref)

```js
// 1.声明
let a = reactive({
    name: '你好',
    age: 90
});

// 2.转换‘链接’
let { name,age } = toRefs(a);
name.value = 'hhhhh';

// 3.输出
console.log(name.value,age.value); // hhhhh 90
console.log(a.name,a.age); // hhhhh 90
```

## 计算属性

用途：具有侦听器的功能，当一个响应式变量改变时，声明的计算属性也跟着改变。

### 只读

```js
import { ref, computed } from 'vue'

// 1.声明
let a = ref('aaa');
let b = computed(()=>{
    return a;
}) 

// 2.修改响应式变量,b不可修改
a.value = "我不好";

// 3.输出
console.log(a.value) // 我不好
console.log(b.value); // 我不好
```

```ts
import { ref, computed } from 'vue'

// 1.声明
let a = ref('aaa');
let b = computed<string>(()=>{
    return a;
}) 

// 2.修改响应式变量,b不可修改
a.value = "我不好";

// 3.输出
console.log(a.value) // 我不好
console.log(b.value); // 我不好
```

### 可写

```js
import { ref, computed } from 'vue'

// 1.声明
let a = ref('aaa');
let b = computed({
    get:()=>{ // 这里作为读取
        return a.value + "哈哈哈"
    },
    set:(val)=>{ // 这里可传入参数作为修改
        a.value = val
    }
}) 

// 2.修改响应式变量,b可修改（借b修改a的值）
a.value = "不";
b.value = "我很好";

// 3.输出
console.log(a.value) // 我很好
console.log(b.value); // 我很好哈哈哈
```

## 侦听器

用途：侦听的数据源可以是ref和reactive的响应式数据，它是惰性的，仅在数据源发生改变时侦听，如果要一开始就侦听，用 watchEffect 。

### 单一源

```js
// 侦听ref
let a = ref('11');
watch(a,(newValue,oldValue)=>{
    console.log("新值，旧值:",newValue,oldValue); // 新a... aaa
})

// 侦听reactive
let b = reactive({
    name: 'bbb'
});
watch(
  ()=>b.name,
  (newValue,oldValue)=>{
    console.log("新值，旧值:",newValue,oldValue); // 新b... bbb
  },
  { deep: true } // 深层监听
)

// 定时器
setTimeout(()=>{
    a.value = '新a...';
    b.name = '新b...';
},2000)
```

### 多个源

```js
// 侦听ref
let a = ref('11');
let b = ref('22');
let c = ref('33');
watch([a,b,c],([newA,newB,newC],[oldA,oldB,oldC])=>{
    console.log("新值，旧值:",newA,oldA); // 新a... 11
    console.log("新值，旧值:",newB,oldB); // 新b... 22
    console.log("新值，旧值:",newC,oldC); // 新c... 33
})

// 定时器
setTimeout(()=>{
    a.value = '新a...';
    b.value = '新b...';
    c.value = '新c...';
},2000)
```

## 生命周期

用途：一个组件的创建到销毁，在此过程中可以调api请求后台数据或者做其它操作。

```js
onBeforeMount(()=>{}) // 在实例初始化之后、进行数据侦听和事件/侦听器的配置之前同步调用
onMounted(()=>{}) // 在实例创建完成后被立即同步调用,实例已完成对选项的处理，意味着以下内容已被配置完毕：数据侦听、计算属性、方法、事件/侦听器的回调函数
onBeforeUpdate(()=>{}) // 在挂载开始之前被调用：相关的 render 函数首次被调用。
onUpdated(()=>{}) // 在实例挂载完成后被调用。mounted 不会保证所有的子组件也都被挂载完成。如果你希望等待整个视图都渲染完毕，可以在 mounted 内部使用 vm.$nextTick
onBeforeUnmount(()=>{}) // 在数据发生改变后，DOM 被更新之前被调用
onUnmounted(()=>{}) // 在数据更改导致的虚拟 DOM 重新渲染和更新完毕之后被调用。
```

## 组件通信

### props

描述：父传子，向下传递数据，传递一层

第一种形式

```js
// 定义接收
const props = defineProps({
  title: { 
    type: String, 
    required: true,
    default() {
      return 'Default'
    }
  },
  likes: Number
})

// 使用
console.log(props.title)
```

第二种形式

```ts
// 定义接收
const props = defineProps<{
  title: string // 必要的
  likes?: number // 非必要的
}>()

// 使用
console.log(props.title)
```

第三种形式

```ts
interface Props {
  foo: string
  bar?: number 
}

const props = defineProps<Props>() 

// 加默认值，默认解构
interface Props {
  foo: string
  bar?: number
}

const { foo, bar=100 } = defineProps<Props>()
```

### emit

描述：子传父，向上传递数据，传递一层

第一种方式

```js
// 子组件发射
<button @click="$emit('someEvent',1)">click me</button>

// 父组件注册
<MyComponent @some-event="callback" />
```

第二种方式

```ts
const emit = defineEmits<{
  (e: 'change', id: number): void  // (e: '事件', 值: 类型)
  (e: 'update', value: string): void
}>()
```

### Provide(供给)/Inject(注入)

描述：父传子，向下传递数据，传递一到多层，子组件都可复用

provide

```js
import { ref, provide } from 'vue'

const count = ref('你好')
provide('key', count) // provide('注入名',值)
```

inject

```js
import { inject } from 'vue'

const message = inject('key') // inject(注入名)

console.log(message.value) // 你好
```




