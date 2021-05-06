/* 
  1、
 隐藏类型：js引擎在解析时会将对象转换成21种隐藏类型之一，隐藏类型是对一个对象整体结构的描述
*/
class RectArea { // HC0
  constructor(l, w) {
    this.l = l //HC1
    this.w = w // HC2
  }
}

const rect_primary = new RectArea(3, 4)
const rect_second = new RectArea(5, 6)

/* 
  2、
  car2 便不能重复使用car1的隐藏类型 HC1
*/
const car1 = { color: 'red' } // car1为HC0 
car1.seats = 4 // car1 为 HC1

const car2 = { seats: 2 } // car2为HC2
car2.color = 'blue' // car2 为HC4

// 且初始化时的对象属性是-n-object属性，可以直接访问，性能较高
// 后添加的对象属性是 normal/fast属性，存储在property store里面需要用过描述数组间接查找，性能较低

/* 3、
  v8推荐将类数组先转化为数组，在进行操作，v8对数组做了极高的性能优化
*/

// 通常遍历一个类数组的方式
Array.prototype.forEach.call(arrLikeObj, (value, index) => { console.log(value, index); }) // 不如真实数组效率高

// v8下先转化为数组
const arr = Array.prototype.slice.call(arrLikeObj, 0); 
// 或
const arr2 = Array.from(arrLikeObj)
arr.forEach((value, index) => { console.log(value, index); })  // 即使先进行转化，再遍历，性能也比较高


/* 4、 
  避免越界查找（超过数组长度的比较）
*/

for (let index = 0; index < array.length + 1; index++) { // 多进行了一次array.length + 1 位置上的查找，同时造成沿原型链的查找，性能相差 ！！六倍！！
  array[index] > 100 // 多进行了一次undefined 的大小比较，造成业务上无效，出错
  
}

/* 5、避免元素类型转换 */
// 对于一个确定的数组如果元素类型不再发生变动则，v8会进行对应的优化
