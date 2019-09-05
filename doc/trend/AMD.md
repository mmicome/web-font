# AMD

AMD规范全称是Asynchronous Module Definition，即异步模块加载机制。
从它的规范描述页面看，AMD很短也很简单，但它却完整描述了模块的定义，依赖关系，引用关系以及加载机制。
从它被requireJS，NodeJs，Dojo，JQuery使用也可以看出它具有很大的价值，没错，JQuery近期也采用了AMD规范。

## 规范简单到只有一个API，即define函数：

define([module-name?], [array-of-dependencies?], [module-factory-or-object]);
　　其中：
　　module-name: 模块标识，可以省略。
　　array-of-dependencies: 所依赖的模块，可以省略。
　　module-factory-or-object: 模块的实现，或者一个JavaScript对象。

从中可以看到，第一个参数和第二个参数都是可以省略的，第三个参数则是模块的具体实现本身。后面将介绍在不同的应用场景下，他们会使用不同的参数组合。
