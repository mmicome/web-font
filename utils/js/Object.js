/**
* 判断这两个集合里面的对象个数、属性、值是否相等
*/

// JSON.stringify 字符串比较
obj=[{id:1,name:'a'},{id:2,name:'b'}]
obj2=[{id:1,name:'a'},{id:2,name:'b'}]
obj3=[{id:1,name:'a'},{id:3,name:'c'}]
obj==obj2;//false
JSON.stringify(obj)==JSON.stringify(obj2);//true
JSON.stringify(obj)==JSON.stringify(obj3);//false

// underscor 的 isEqual
a = [ { name: 'wang' }, { name: 'liu' } ]
b = [ { name: 'wang' }, { name: 'liu' } ]
_.isEqual(a, b) // true

//ES6 Set
function eqSet(as, bs) {
  if(as.size !== bs.size) return false;
  if(var a of as) if（!bs.has(a)） return false;
  return true;
}
var a = new Set([1,2,3]);
var b = new Set([1,3,2]);
console.log(eqSet(a, b)); // true

//ES5 常规方案
function compare(obj1,obj2){
    if(Object.keys(obj1).length != Object.keys(obj2).length){
      return false
    }else{
      for(key in obj1){
        if(obj2.hasOwnProperty(key)){
            if( !Object.is(obj1[key],obj2[key])){
                return false;
            }
        }else{
          return false
        }
      }
      return true
    }
}

//Object.is 
Comment = `
  Object.is() 判断两个值是否相同。如果下列任何一项成立，则两个值相同：
    两个值都是 undefined
    两个值都是 null
    两个值都是 true 或者都是 false
    两个值是由相同个数的字符按照相同的顺序组成的字符串
    两个值指向同一个对象
    两个值都是数字并且
    都是正零 +0
    都是负零 -0
    都是 NaN
    都是除零和 NaN 外的其它同一个数字
`
