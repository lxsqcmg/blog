# AJAX

## 1.什么是AJAX

1. AJAX 是 『Asynchronous JavaScript and XML』的缩写。它是指一种创建交互式网页应用的网页开发技术。

2. 客户端与服务器，可以在**不刷新整个浏览器**的情况下，与服务器进行异步通讯的技术



## 2.原生 AJAX 请求处理

| 方法/属性              | 描述                                                         |
| ---------------------- | ------------------------------------------------------------ |
| open(method,url,async) | 规定请求的类型、URL 以及是否异步处理请求。<br/>**method**：请求的类型；GET 或 POST<br/>**url**：文件在服务器上的位置<br/>**async**：true（异步）或 false（同步） |
| send(string)           | 将请求发送到服务器。string：仅用于 POST 请求                 |
| status                 | 200: "OK"                                                    |
| responseText           | 获得字符串形式的响应数据。                                   |
| responseXML            | 获得 XML 形式的响应数据。                                    |
| readyState             | 存有 XMLHttpRequest 的状态。请求发送到后台后，状态会从 0 到 4 发生变化。 <br/> **0**: 请求未初始化   <br/>**1**: 服务器连接已建立   <br/>**2**: 请求已接收   <br/>**3**: 请求处理中   <br/>**4**: 请求已完成，且响应已就绪 |
| onreadystatechange     | 每当 readyState 属性改变时，就会调用该函数。                 |

```js
// get请求
// 1.创建对象
var xhr = new XMLHttpRequest();
// 2.连接服务器，设置（请求参数，请求地址，同步还是异步）
xhr.open('GET', '/api/user?id=333', true);
// 3.发送请求
xhr.send();
// 4.监听事件，获取返回的数据
xhr.onreadystatechange = function (e) {
  if (xhr.readyState == 4 && xhr.status == 200) {
    console.log(xhr.responseText);
  }
};
```

```js
// post请求
// 1.创建对象
var xhr = new XMLHttpRequest();
// 2.连接服务器，设置（请求参数，请求地址，同步还是异步）
xhr.open('POST', '/api/user', true);
// 3.POST请求需要设置此参数（设置请求头）
xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
// 4.发送请求
xhr.send('name=33&ks=334');
// 5.监听事件，获取返回的数据
xhr.onreadystatechange = function (e) {
  if (xhr.readyState == 4 && xhr.status == 200) {
    console.log(xhr.responseText);
  }
};
```



## 3.请解释一下 JavaScript 的同源策略

同源策略指的是：协议，域名，端口相同，**同源策略是一种安全协议，指一段脚本只能读取来自同一来源的窗口和文档的属性**。



## 4. 如何解决跨域问题

**1. 跨域的概念：**

协议、域名、端口都相同才同域，否则都是跨域

**2. 解决跨域问题：**

1). 使用JSONP（json+padding）把数据内填充起来
2). CORS 方式（跨域资源共享），在后端上配置可跨域
3). 服务器代理，通过服务器的文件能访问第三方资源（比如nginx）