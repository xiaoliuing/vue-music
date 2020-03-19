# 做一个音乐webApp

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

1、font-awesome

报如下错：

```js
These relative modules were not found:
* ../fonts/fontawesome-webfont.eot in ./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-3-1!./node_modules/postcss-loader/src??ref--8-oneOf
// ........
```

解决办法，将`_path.scss`的所有`url`改为`url-loader`

```css
//   ./font-awesome/scss/_path.scss
@font-face {
  font-family: 'FontAwesome';
  src: url('#{$fa-font-path}/fontawesome-webfont.eot?v=#{$fa-version}');
  src: url('#{$fa-font-path}/fontawesome-webfont.eot?#iefix&v=#{$fa-version}') format('embedded-opentype'),
    url('#{$fa-font-path}/fontawesome-webfont.woff2?v=#{$fa-version}') format('woff2'),
  /* ....... */
}

/* ----- 修改 ------- */

@font-face {
  font-family: 'FontAwesome';
  src: url-loader('#{$fa-font-path}/fontawesome-webfont.eot?v=#{$fa-version}');
  src: url-loader('#{$fa-font-path}/fontawesome-webfont.eot?#iefix&v=#{$fa-version}') format('embedded-opentype'),
    url-loader('#{$fa-font-path}/fontawesome-webfont.woff2?v=#{$fa-version}') format('woff2'),
  /* ....... */
}
```

2、ts类型检查不通过

```ts
// 1---
// @ts-ignore

// 2---
private children: unknown

this.children = (this.$refs.bannerGroup as HTMLElement).children  // children不通过
```

3、$refs类型检测不通过

原因：不知道$refs存的属性是什么，所以需要手动指定类型

```js
private $refs {
  banner: HTMLDivElement
}
```