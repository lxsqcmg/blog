# 基本概念

## 下载安装

阿里云镜像：
[https://mirrors.aliyun.com/centos/8.5.2111/isos/x86_64/?spm=a2c6h.25603864.0.0.610a44cbe2gh66](https://mirrors.aliyun.com/centos/8.5.2111/isos/x86_64/?spm=a2c6h.25603864.0.0.610a44cbe2gh66)

<br />
环境：
[http://mirrors.aliyun.com/centos/8/BaseOS/x86_64/os/](http://mirrors.aliyun.com/centos/8/BaseOS/x86_64/os/)

## 基础指令

### 日期（date）
显示日期与时间
```sh
date

# 格式化输出
date +%Y/%m/%d

date +%H:%M
```

### 日历（cal）
显示日历
>语法为 `cal [month] [year]`

```sh
# 当前月
cal

# 显示整年
cal 2023

# 显示某年某月
cal 10 2023
```

### 计算器（bc）
```sh
bc
# 然后输入计算公式，按回车显示结果
2+5
```

## 操作热键

### 命令补全（tab）
tab 具有 `命令补全、文件补齐` 的功能

### ctrl+c
中断指令

### ctrl+d
通常代表键盘输入结束

### 文本翻页
翻页功能，在文本界面执行某些指令时，输出的信息很长，导致前面的部分已不再当前屏幕中了， 就可以使用该按键来前后翻页
```sh
# 上一页
shift + Page UP
# 下一页
shift + Page Down
```
