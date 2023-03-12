# 媒体查询

## 媒体设备

下面是常用媒体类型，当然主要使用的还是 `screen`

| 选项   | 说明                               |
| ------ | ---------------------------------- |
| all    | 所有媒体类型                       |
| screen | 用于电脑屏幕，平板电脑，智能手机等 |
| print  | 打印设备                           |
| speech | 应用于屏幕阅读器等发声设备         |

- 可以使用 link 与 style 中定义媒体查询
- 也可以使用 @import url(screen.css) screen 形式媒体使用的样式
- 可以用逗号分隔同时支持多个媒体设备
- 未指定媒体设备时等同于 all

### style

```css
/* 电脑手机 */
<style media="screen">
    h1 {
        font-size: 3em;
        color: blue;
    }
</style>

/* 打印设备 */
<style media="print">
    h1 {
        font-size: 8em;
        color: red;
    }

    h2,
    hr {
        display: none;
    }
</style>
```

### link

在 link 标签中通过 media 属性可以设置样式使用的媒体设备。

- common.css 没有指定媒体所以全局应用
- screen.css 应用在屏幕设备
- print.css 应用在打印设备

> 可以在 CSS 文件中使用 @media 再定义媒体样式

```css
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>木子李的松</title>
    /* 全局应用 */
    <link rel="stylesheet" href="common.css">
    /* 屏幕设备 */
    <link rel="stylesheet" href="screen.css" media="screen">
    /* 打印设备 */
    <link rel="stylesheet" href="print.css" media="print">
</head>
```

### @import

使用@import 可以引入指定设备的样式规则。

```css
<style>

    @import url(screen.css) screen;
    @import url(print.css) print;

</style>
```

### @media

可以使用 `@media` 做到更细的控制，即在一个样式表中为多个媒体设备定义样式。

```css
<style>
    @media screen {
        h1 {
            font-size: 3em;
            color: blue;
        }
    }

    @media print {
        h1 {
            font-size: 8em;
            color: red;
        }

        h2,
        hr {
            display: none;
        }
    }
</style>
```

### 多设备支持

可以用逗号分隔同时支持多个媒体设备。

```css
@import url(screen.css) screen, print;

<link rel="stylesheet" href="screen.css" media="screen,print" > @media screen,
print {
  ...;
}
```

### 设备方向

使用 `orientation` 属性可以定义设备的方向

| 值        | 说明                   |
| --------- | ---------------------- |
| portrait  | 竖屏设备即高度大于宽度 |
| landscape | 横屏设备即宽度大于高度 |

```css
/* 尺寸小于 768px 或是 横屏 时使用蓝色字体 */
<style media="screen and (min-width: 768px),screen and (orientation:landscape)">
  body {
    color: blue;
  }
</style>
<h1>baidu</h1>
```

## 查询条件

### 逻辑与（`and`）

需要满足多个条件时才使用样式，多个条件使用 `and` 连接

```css
<style>
    /**
        横屏显示
        宽度不能超过 600px
    */
    @media screen and (orientation: landscape) and (max-width: 600px) {
        body {
            background: #8e44ad;
        }

        h1 {
            font-size: 3em;
            color: white;
        }
    }
</style>
```

### 逻辑或（`,`）

多个 `或` 条件查询使用逗号`,`连接，不像其他程序中使用 `or`语法。

```css
<style>
    /* 如果设备是横屏显示 或 宽度不超 600px 时就使用样式规则 */
    @media screen and (orientation: landscape),
    screen and (max-width: 600px) {
        body {
            background: #8e44ad;
        }

        h1 {
            font-size: 3em;
            color: white;
        }
    }
</style>
```

### 不应用（`not`）

`not` 表示不应用样式，即所有条件都满足时不应用样式。

> 必须将 `not` 写在查询的最前面

```css
<style>
    @media not screen and (orientation: landscape) and (max-width:600px) {
        body {
            background: #8e44ad;
        }

        h1 {
            font-size: 3em;
            color: white;
        }
    }
</style>
```

### 排除不支持（`only`）

用来排除不支持媒体查询的浏览器。

- 对支持媒体查询的设备，正常调用样式，此时就当 `only` 不存在
- 对不支持媒体查询的设备不使用样式
- `only` 和 `not` 一样只能出现在媒体查询的开始

```css
@media only screen and (orientation: landscape) and (max-width: 600px) {
  ...;
}
```

## 查询特性

根据查询特性筛选出使用样式的设备。

### 常用特性

常用的媒体查询特性

| 特性                               | 说明                          |
| ---------------------------------- | ----------------------------- |
| orientation: landscape \| portrait | landscape 横屏，portrait 竖屏 |
| width                              | 设备宽度                      |
| height                             | 设备高度                      |
| min-width                          | 最小宽度                      |
| max-width                          | 最大宽度                      |
| min-height                         | 最小高度                      |
| max-height                         | 最大高度                      |

### 使用示例

在设备宽度为 `750px` 时使用样式

```css
@media only screen and (width: 750px) {
  ...;
}
```

在设备不小于 `750px` 时使用样式

```css
@media only screen and (min-width: 750px) {
  ...;
}
```

橫屏设备并且宽度大于 `750px` 时使用样式

```css
@media only screen and (orientation: landscape) and (min-width: 750px) {
  ...;
}
```
