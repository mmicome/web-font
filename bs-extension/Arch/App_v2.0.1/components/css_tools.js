mouseout是冒泡的,mouseleave是不冒泡的 

在一个多层容器结构中，如果只有你需要的那一层容器有绑移除事件，两个没有区别 ；如果多层绑有移除事件，前者有冒泡，结果是移出内层（可能还没有移出外层）触发内层的移除事件后，会冒泡到外层触发外层的移除的事件。后者的话只会触发内层的移出事件不会冒泡到外层。

mouseover 事件和 mouseenter 的不同之处是事件的冒泡的方式。

mouseover：
不论鼠标指针穿过被选元素或其子元素，都会触发 mouseover 事件。
支持事件冒泡。
相对应 mouseout 事件。
mouseenter :
只有在鼠标指针穿过被选元素时，才会触发 mouseenter 事件。
不支持事件冒泡。
相对应 mouseleave 事件。

作者：IMGUOC
链接：https://www.jianshu.com/p/f4b7dd6f727e
来源：简书
简书著作权归作者所有，任何形式的转载都请联系作者获得授权并注明出处。
