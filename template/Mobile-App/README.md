# Mobile-App

Mobile App dev

## you need know

**1. Mobile-App 开发模式**

> native app

> web app

> hybird app (现在比较流行的混合方案主要有三种，主要是在UI渲染机制上的不同：)

- 基于 WebView UI 的基础方案，市面上大部分主流 App 都有采用，例如微信JS-SDK，通过 JSBridge 完成 H5 与 Native 的双向通讯，从而赋予H5一定程度的原生能力。
- 基于 Native UI 的方案，例如 React-Native、Weex。在赋予 H5 原生API能力的基础上，进一步通过 JSBridge 将js解析成的虚拟节点树(Virtual DOM)传递到 Native 并使用原生渲染。
- 另外还有近期比较流行的小程序方案，也是通过更加定制化的 JSBridge，并使用双 WebView 双线程的模式隔离了JS逻辑与UI渲染，形成了特殊的开发模式，加强了 H5 与 Native 混合程度，提高了页面性能及开发体验。

以上的三种方案，其实同样都是基于 JSBridge 完成的通讯层，第二三种方案，其实可以看做是在方案一的基础上，继续通过不同的新技术进一步提高了应用的混合程度。因此，JSBridge 也是整个混合应用最关键的部分，例如我们在设置微信分享时用到的 JS-SDK，wx对象 便是我们最常见的 JSBridge:

_hybird开发相关资源_

- [Hybrid App技术解析 -- 原理篇](https://segmentfault.com/a/1190000015678155)
- [浅谈 Hybrid App](https://zhuanlan.zhihu.com/p/21387961)

_hybird框架_

- [lonic](https://ionicframework.com/)
- [cordova](https://cordova.apache.org/)

**2. JavaScriptCore**

- [JavaScriptCore 开发文档](https://developer.apple.com/documentation/javascriptcore)
- [https://zhuanlan.zhihu.com/p/29454668](https://zhuanlan.zhihu.com/p/29454668)
- [JavaScriptCore 整体介绍](https://zhuanlan.zhihu.com/p/29663994)

