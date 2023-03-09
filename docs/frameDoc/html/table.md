# 表格和音视频

## 表格

```html
<table border="1">
  <caption>
    表格标题
  </caption>
  <thead>
    <tr>
      <th>标题</th>
      <th>描述</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>木子李的松</td>
      <td>一个个人博客</td>
    </tr>
  </tbody>
</table>
```

![mark标签](../../images/html/10.png)

**基本属性**
|属性| 说明|
|-----|-----|
|caption| 表格标题|
|thead |表头部分|
|tbody| 表格主体部分|
|tfoot |表格尾部|
|colspan | 行合并 |
|rowspan | 列合并|

## 视频

```html
<video
  src="文件地址"
  autoplay="autoplay"
  loop
  muted
  controls
  width="800"
  height="200"
>
  <source src="xxxx.mp4" type="video/mp4" />
</video>
```

**基本属性**
|属性 |描述|
|--------|----------|
|autoplay |如果出现该属性，则视频在就绪后马上播放（需要指定类型如 type="video/mp4")。|
|preload |如果出现该属性，则视频在页面加载时进行加载，并预备播放。如果使用 "autoplay"，则忽略该属性。如果视频观看度低可以设置为 preload="none" 不加载视频数据减少带宽。如果设置为 preload=metadata 值将加载视频尺寸或关键针数据，目的也是减少带宽占用。设置为 preload="auto" 时表示将自动加载视频数据 |
|controls |如果出现该属性，则向用户显示控件，比如播放按钮。|
|height| 设置视频播放器的高度。|
|width |设置视频播放器的宽度。|
|loop |如果出现该属性，则当媒介文件完成播放后再次开始播放。|
|muted |规定视频的音频输出应该被静音。|
|poster| 规定视频下载时显示的图像，或者在用户点击播放按钮前显示的图像。|
|src |要播放的视频的 URL。|

## 音频

```html
<audio controls autoplay loop preload="auto">
  <source src="xxxxx.mp3" type="audio/mp3" />
</audio>
```

**基本属性**
|属性 |描述|
|------|-----|
|autoplay |如果出现该属性，则视频在就绪后马上播放。|
|preload |如果出现该属性，则视频在页面加载时进行加载，并预备播放。如果使用 "autoplay"，则忽略该属性。如果视频观看度低可以设置为 preload="none" 不加载视频数据减少带宽。如果设置为 preload="metadata"值将加载视频尺寸或关键针数据，目的也是减少带宽占用。设置为 preload="auto" 时表示将自动加载视频数据|
|controls |如果出现该属性，则向用户显示控件，比如播放按钮。|
|loop| 如果出现该属性，则当媒介文件完成播放后再次开始播放。|
|muted |规定视频的音频输出应该被静音。|
|src| 要播放的视频的 URL。|
