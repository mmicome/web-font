# attention： 该版本已不再推荐使用

- html import 方式存在争议, 

    **issues：** js, css, html 混合模式下，通过 import导入 运行时报错， 出现内联 js 限制 CSP： [解决方案](https://stackoverflow.com/questions/25625412/chrome-extension-content-security-policy-executing-inline-code) (三种方案插件模式下测试均失败)

- 部分 api 已经废弃， 不再推荐使用

    **issues：** 将js 提取出来，通过src引入， 报错， document.registerElement 已被移除

## 结论：

> html import 方式不推荐使用， 此版本存在的意义：

- 致敬web标准不断更新， 权当怀念
- 造轮子， 即使是错误的轮子， 从错误到正确， 理解web标准发展历程， 在发展中对比， 在对比中学会创新，提出更好的方案

> 该版本会随个人能力持续更进， 新版本完全更进新标准， 使用新思路（`app_v2.0.1`）
