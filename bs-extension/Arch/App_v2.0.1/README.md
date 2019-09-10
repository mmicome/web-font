# Arch

    Arch is a map of IT technology, Add

## will do

- css 模块化
- 组件解耦
- dom 封装
- 数据格式最终确定

## features

## work it step by step

- build Arch frame (map)
- build every app's project at github (node of map)
- make a series of tools of wen front dev

## 创建交互式Web组件：

- 仅使用属性：使用属性来初始化组件以及与外部世界进行交互。

- 仅使用已创建的函数：使用API函数初始化并与组件交互。

- 使用混合方法：应该使用IMO。在这种方法中，使用属性初始化组件，并且对于所有后续交互，只需使用对其API的调用。

## 组件之间解耦合

> **接口层：** 组件`<template id="id">`及 `getter`, `setter`设计之初必须规划好， template `id` dom 引用接口， `getter`, `setter` 数据交互接口

```js
    get list() {
      return this._list;
    }

    set list(list) {
      this._list = list;
      this.render();
    }
```

> **逻辑层：** 通过传递结构化的json数据进行状态更新，从而组件迭代分离

```js

```

> **view: ** 

```js

```

> **模板：** 

- template.html， template.js 独立开发

```js
var app-tmp = `<template id="app-tmp">...</template>`
model.export(app-tmp);
```
- export to template.js, 

```js
var app-tmp = require('./app-tmp')
```

- webpack package

优点： 减少不必要的 fetch 请求， 完全集成为独立js 组件模块， 不影响开发便易性

