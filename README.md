# task03-01

# 1、当我们点击按钮的时候动态给 data 增加的成员是否是响应式数据，如果不是的话，如何把新增成员设置成响应式数据，它的内部原理是什么。
```
let vm = new Vue({
 el: '#el'
 data: {
  o: 'object',
  dog: {}
 },
 method: {
  clickHandler () {
   // 该 name 属性是否是响应式的
   this.dog.name = 'Trump'
  }
 }
})
```

答：当点击按钮时，动态给data增加成员不是响应式数据，vue实例在初始化时，会遍历data属性中的成员，通过Object.defineProperty转化成getter/setter注入到vue实例中，同时，也会通过Object.defineProperty将data中的成员转化成响应式数据，在转换data成员过程中，会判断data的属性是否是对象，如果是对象，也会将该属性的成员转化成对象，如果该属性赋值是一个对象，该对象是响应式数据。

当点击给一个响应式数据新增属性时，该属性不是一个响应式数据，在已转化成响应式数据的属性上进行赋值操作是，会触发该属性的setter，从而间接触发defineReactive函数对data拦截的setter操作，而新增的属性没有通过Object.defineProperty拦截，没有设置相应的setter，所以不是响应式数据

设置成响应式的方法：（只要保证能够触发）
- 在data中生命是，给可能需要用的数据设置一个默认值，比如null或者undefined
- vue提供的Api Vue.set方法
- 使用this.dog = Object.assign({}, this.dog, { name: 'sfs'})
  - 由于this.dog是响应式数据，通过上面方式会新生成一个对象，改变原来的指针，从而触发this.dog的setter，重新编属性，生成新的对象


# 2、请简述 Diff 算法的执行过程