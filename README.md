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

设置成响应式的方法：（只要保证能够触发setter/getter）
- 在data中生命是，给可能需要用的数据设置一个默认值，比如null或者undefined
- vue提供的Api Vue.set方法
- 使用this.dog = Object.assign({}, this.dog, { name: 'sfs'})
  - 由于this.dog是响应式数据，通过上面方式会新生成一个对象，改变原来的指针，从而触发this.dog的setter，重新编属性，生成新的对象


# 2、请简述 Diff 算法的执行过程

diff 的过程就是调用名为 patch 的函数，比较新旧节点，一边比较一边给真实的 DOM 打补丁。
patch 函数接收两个参数 oldVnode 和 Vnode 分别代表
新的节点和之前的旧节点,这个函数会比较 oldVnode 和 vnode 是否是相同的, 即函数 sameVnode(oldVnode, vnode)

- 老节点不存在，直接添加新节点到父元素
- 新节点不存在，从父元素删除老节点。
- 新老节点都存在
    - 判断是否是相同节点（根据key、tag、isComment、data同时定义或不定义）相同直接返回，不是相同节点如果新老节点都是静态的，且key相同。
从老节点拿过来，跳过比对的过程。
如果新节点是文本节点，设置节点的text，新节点不是文本节点。新老节点子节点都存在且不同，使用updateChildren函数来更新子节点
只有新节点字节点存在，如果老节点子节点是文本节点，删除老节点的文本，将新节点子节点插入
只有老节点存在子节点，删除老节点的子节点
    - updateChildren
给新老节点定义开始、结束索引
循环比对新节点开始VS老节点开始、新节点结束VS老节点结束、新节点开始VS老节点结束、新节点结束VS老节点开始并移动对应的索引，向中间靠拢
根据新节点的key在老节点中查找，没有找到则创建新节点。
循环结束后，如果老节点有多的，则删除。如果新节点有多的，则添加。