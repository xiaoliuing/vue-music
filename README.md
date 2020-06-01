# 做一个音乐webApp

## 参考相关

vue使用ts相关文档: [http://bk.jzgylm.cn/frontEnd/vue-ts/](http://bk.jzgylm.cn/frontEnd/vue-ts/)

云音乐接口文档：[https://binaryify.github.io/NeteaseCloudMusicApi](https://binaryify.github.io/NeteaseCloudMusicApi)

云音乐接口封装源码：[https://github.com/Binaryify/NeteaseCloudMusicApi](https://github.com/Binaryify/NeteaseCloudMusicApi)

## 过程记录

1、fastclick：解决移动端点击300ms延迟
```js
// main.ts

import fastclick from 'fastclick'

// @ts-ignore
fastclick.attach(document.body);
```
2、babel-polyill：转义语法

3、better-scroll做轮播


## 遇到的问题

1、ts类型检查不通过

```ts
// 1---
// @ts-ignore

// 2---
private children: unknown

this.children = (this.$refs.bannerGroup as HTMLElement).children  // children不通过
```

2、$refs类型检测不通过

原因：不知道$refs存的属性是什么，所以需要手动指定类型

```js
public $refs!: {
  banner: HTMLDivElement
}
```

3、动画不流畅

使用`requestAnimationFrame`
