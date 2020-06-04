/**
* toString() 是 Object 的原型方法，调用该方法，默认返回当前对象的 [[Class]] 。这是一个内部属性，其格式为 [object Xxx] ，其中 Xxx 就是对象的类型。
* 对于 Object 对象，直接调用 toString()  就能返回 [object Object] 。而对于其他对象，则需要通过 call / apply 来调用才能返回正确的类型信息。
* 相关：https://www.cnblogs.com/onepixel/p/5126046.html
  Object.prototype.toString.call('') ;   // [object String]
  Object.prototype.toString.call(1) ;    // [object Number]
  Object.prototype.toString.call(true) ; // [object Boolean]
  Object.prototype.toString.call(Symbol()); //[object Symbol]
  Object.prototype.toString.call(undefined) ; // [object Undefined]
  Object.prototype.toString.call(null) ; // [object Null]
  Object.prototype.toString.call(new Function()) ; // [object Function]
  Object.prototype.toString.call(new Date()) ; // [object Date]
  Object.prototype.toString.call([]) ; // [object Array]
  Object.prototype.toString.call(new RegExp()) ; // [object RegExp]
  Object.prototype.toString.call(new Error()) ; // [object Error]
  Object.prototype.toString.call(document) ; // [object HTMLDocument]
  Object.prototype.toString.call(window) ; //[object global] window 是全局对象 global 的引用
*/

export default {
  type(varb) {
    return Object.prototype.toString.call(varb).match(/\s(\w+)]$/)[1];
  }
}

