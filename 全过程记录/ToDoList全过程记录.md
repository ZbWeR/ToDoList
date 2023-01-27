# ToDoList全过程记录

## 设计阶段

### 1.功能设计

(1.18初版)

#### 待办事项的细分

待办事项通常具有不同的场景,需要先进行类型的划分.~~例如一两句话即可说清楚的事项"出门前倒垃圾",再例如文字内容较多的详细事项"回家的路上帮女朋友带一杯黄金真奶要全糖去冰,再带一份手抓饼,要鸡蛋热狗里脊",对于这两种情况,我们将其命名为**短文本**和**长文本**.再~~

例如有的事项可能有一两周的时间去完成,而有的事项需要一两天内完成,我们将这两种情况归纳为**短期待办**和**长期待办**.事项本身可能是与学习相关,与工作相关,根据相关性我们将不同事项分为**生活,学习和工作**三种.

综上，新增待办时我们要让用户明确待办的类型(这决定了待办事项的展示效果)，具体待办内容和待办截止日期(可选).

> 1.19更新删除线部分: 在做 UI 页面设计时,一直做不出想象中短长文本的效果,反而使得页面凌乱,仔细思考应用场景之后觉得这一分类完全是画蛇添足,遂删去.最终决定所有文本都单行显示,文本较长则用省略号断开.点击待办进入详情页则可查看完整内容.

**不同类型展示效果**

| 类型              |                                                    展示效果                                                    |
| ----------------- | :------------------------------------------------------------------------------------------------------------: |
| ~~长文本/短文本~~ | ~~均采用块状盒子的方式显示.<br>短文本显示内容,DDL,长短期类型<br>长文本仅显示内容,最长字数待定,超出字数则隐藏~~ |
| 短期 / 长期       |  1.默认情况:长期短期两个模块分开显示,短期在长期之上<br>2.设置精确DDL时:长期任务在ddl前2天变成短期任务并标红.   |
| 生活/学习/工作    |         颜色色相依次对应:~~黄/绿/蓝(具体颜色取值待定)~~<br>黄:#FEF9D7<br>绿:#b5f291<br>蓝:#d1eeff<br>          |

> 1.19更新颜色具体取值: 参考了 即时设计官网的部分色彩.

#### 待办的增删查改

(1.18初版)

**预期效果**

1. 增加: 点击**新建**(+)启动增加待办模块,用户选择【短期/长期】【生活/学习/工作】,填写具体内容，选填DDL,即可生成待办.
2. 删除/修改: 点击**设置**进入管理模式,所有待办右侧出现**删除和编辑**两个选项,点击删除然后二次确认即可.
3. 查找: 不考虑增加该功能.

**其他想法**

采用类似终端输入的方法,放置一个输入框在整个页面上方,输入不同的指令来完成**增删改**的功能.

1. 增加

   例如`add -s -study -[DDL] content `表示添加一个短期学习待办.`DDL`的格式限制为`year.month.day`.

   其他参数说明:`-s/l`short短期/long长期 ;`-study/life/work`分别对应学习生活工作.

   带有`-`的参数均可选,默认值为 短期生活无DDL 待办.

2. 删除:`del -s/l index`表示删除编号为index的短期/长期待办. 增加待办后会自动给待办事项编号,显示在待办左侧.

3. 修改:`set -s/l index -s/l -study -[DDL] content`表示修改编号为index的短期/长期待办,其他参数与增加时相同.

==最终版本见UI设计模块==

### 2.UI设计

网页端：预期采用Flex布局,移动端表现为上下排列.

![image-20230119220619209](%E6%95%B4%E4%BD%93%E9%A1%B5%E9%9D%A2.png)

最终**增删改查**的实现:==1.19更新== 

+ 直接在输入框中输入待办事项回车,弹窗如下,进行具体设置即可实现增加操作.
+ 对于删除操作,点击待办左侧的小圆圈即可触发删除操作,第一天变为灰色,第二天自动抹去.
+ 对于更改操作,点击待办进入类似与下图弹窗的**待办详情**,即可重新修改.

![image-20230119220808365](%E6%96%B0%E5%BB%BA%E5%BE%85%E5%8A%9E.png)

>第一个方案比较类似于移动端交互,在做UI设计的时候发现没有好看并且合适的icon,并且icon的位置也让我很为难,遂放弃.
>
>第二个方案在做的时候感觉后期js要写的东西比较多,而且这些参数的设置也不是很便于操作,遂放弃.
>
>思考后决定结合两者,保留终端输入,但是舍弃繁琐的参数.具体参数由用户回车后(免除了icon的选择)自己点击来设置.
>
>怎么说呢？体验了一把UI设计倒逼功能设计😎

## 代码阶段

1.19 : 构建网页主体部分(除弹窗基本完成)；待解决问题: 长文本省略与emoji重合，事件增添的过渡效果.

1.20 : 完成功能模块：增加和删除.

遇见的困难如下:

1. 本地持久化存储数据 loaclStorage 的使用以及如何利用其保存 json 数组
2. js 中如何拼接出json数据->需要借助eval方法和反引号.
3. 由于DOM树改变导致按钮绑定的事件失效问题如何解决->通过body绑定.
4. 如何通过点击按钮来获取父元素以达到正确删除的目的-> e.target.parentElement
5. 本地无数据时如何初始化,初始化的json数据长什么样,整个数据库中的json格式又应该是什么样的?
6. 如何导入本地json->利用fetch,但是会产生CORS问题,如何解决->livesever或者部署到服务器.

> 对javaScript的各种API掌握还是不熟练啊啊啊啊啊啊啊,每次都是要用才去翻文档,一路磕磕绊绊.有的东西可能解决后总结起来一两行字,但其实花了我很多时间绕了很多弯路.
>
> 比如在json格式设置这方面,对于每一个待办最开始我是想让它拥有一个index,这样执行删除操作时比较方便,但是这个index的获取和处理在当时想起来又比较麻烦.又是就换了思路,管它什么时间复杂度,直接遍历数据库匹配去删除,这样对于每一个待办只需要有一个唯一标识id就行了,我最开始是想根据待办的内容去进行md5加密,然后以加密后的值为id,但是想想觉得没必要,直接利用加入待办的事件戳为id就好了,还能方便后面ddl功能的处理.



### 学习总结

#### 1.遮罩层和页内弹窗的实现

基本思路: 用`mask`盒子实现黑色遮罩层,在`mask`中再实现页内弹窗.初始时将遮罩层设为透明并且置底,后续再通过鼠标或键盘事件触发显示.遮罩层显示后，需要实现点击遮罩层关闭,但是点击内容时不关闭.

HTML代码

```html
<div class="mask ">
    <div class="addAlert">
        业内弹窗代码部分
    </div>
</div>
```

CSS代码

```css
.mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    min-height: 100vh;
    /* 以上用来保证遮罩层滚动时也能覆盖整个页面 */
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, .8);
    opacity: 0;
    transition: all .5s;
    /* 以上用来实现显示与消失的渐变效果 */
    z-index: -1;
	/* 置于页面底部以免妨碍其他操作	*/
}
.active {
    opacity: 1;
    transition: all .3s;
    z-index: 1;
    /* 置顶并设置为不透明 */
}
```

JS核心代码: 给需要触发的地方添加如下语句即可.

```js
$('.mask').addClass('active'); // 显示
$('.mask').removeClass('active'); // 隐藏
```

点击遮罩层关闭: 最初我是直接给`.mask`添加一个点击事件,点击后执行隐藏语句,但是由于**事件冒泡**的原因,在点击遮罩层中的内容部分时,也会将遮罩层关闭.解决方法有两种,一种是给遮罩内容部分即`addAlert`添加点击事件并阻止事件冒泡.第二种方法代码如下:

```javascript
$('.mask').bind('click', (e) => { // bind 用于绑定事件
    let mask = document.querySelector('.mask');
    e = e || window.event; 		// 实现各浏览器兼容
    if (e && e.target == mask)  // 判断点击的是遮罩还是内容
        $('.mask').removeClass('active');
})
```

> target 属性获取最初发生事件的元素,而非冒泡后的最终事件.
>
> 在JQuery中有很多种绑定事件的方法,本项目代码中用到了bind和on两种方法，两者的异同可以参考[jquery on和bind的区别是什么](https://www.php.cn/js-tutorial-464730.html#:~:text=jquery,on和bind的区别：1、bind方法给每个子元素都添加一个事件，会影响到性能，而on方法不会；2、bind动态添加元素时，不能动态绑定事件，而on方法可以。 本教程操作环境：windows7系统、jquery1.10.2版，该方法适用于所有品牌电脑。): bind方法在选中的元素较多时会影响性能,并且不能动态绑定事件. on方法解决了bind的两个缺点,尽量使用on方法.

#### 2.单选框相关

+ label 的 for 属性是对应 input标签的 id 属性.
+ 要实现单选效果,需要保证所有radio类型的**name**属性值相同.
+ 通过语句`$('input[name="type"]:checked').val()`可以获得用户到底选择了哪一个选项.

#### 3. CSS相关

单行文本溢出省略

```css
white-space: nowrap;	// 不换行
overflow: hidden;		// 超出隐藏
text-overflow: ellipsis;// 超出文本用省略号代替
```

利用flex的order属性实现已完成待办的沉底

```css
.items .finish {
    text-decoration: line-through;	// 删除线
    color: #9c9c9c;					// 颜色变灰
    order: 100;						// order越大排在越后面
}
```

#### 4. localStorage

在web本地存储数据的场景上,HTML5给我们提供了两种工具: **localStorage**和**sessionStorage**.他们的异同如下:

| 分类           | 声明周期                                               | 储存容量                   | 储存位置                                         |
| -------------- | ------------------------------------------------------ | -------------------------- | ------------------------------------------------ |
| localStorage   | 理论上是永久有效,除非主动清除                          | 4.98MB(不同浏览器情况不同) | 保存在客户端，不与服务器端进行交互.节省网络流量. |
| sessionStorage | 仅在当前网页会话下有效,关闭页面或浏览器后会被自动清除. | 4.98MB(部分浏览器没有限制) | 同上                                             |

由于本项目需要持久化缓存数据,在关闭页面再次打开也能有之前的数据,所以本项目中我选择了**localStorage**.值得注意的是,如果你的浏览器设置了关闭自动清除数据,那么**localStorage**中的数据也会被清除.

**localStorage**具有以下方法:

```javascript
localStorage.setItem("name", "value");	// 添加数据: name:value 也可修改数据,名称重复则覆盖原有数据
localStorage.getItem("name"); 			// 查询数据: => 'value'
localStorage.removeItem("name");		// 删除指定数据
localStorage.clear(); 					// 删除所有数据
```

其他操作：

```javascript
localStorage.setItem('ToDoList', JSON.stringify(ToDoList));		// 存放json类型的数据
ToDoList = JSON.parse(localStorage.getItem('ToDoList'));		// 获取并解析json类型的数据
```

#### 5. json相关

1. 动态拼接字符串并转化为json格式的数据

```javascript
// 采用反引号的引入变量来拼接字符串
let tmpStr = `{"Class":"${funType}" , "content":"${content}","endTime":${endTime},"startTime":${Date.now()}}`;
// 将字符串转为json格式
let tmpjson = eval("(" + tmpStr + ")");
```

2. 读取外部json文件

```javascript
fetch('../json/init.json')
    .then(response => {
    	return response.json();
	})
    .then(data => {
    	ToDoList = data;
	});
```

需要注意的是上述方法在本地调试时需使用`liveServer`, 否则会发生CORS跨域错误.

3. json 数据的遍历(本质上就是对象的遍历)

本项目中json数据格式如下:

```json
{
    "shortList": [
        {"Class": "life","content": "欢迎来到ToDoList","endTime": "none","startTime": -1},
        {"Class": "life","content": "添加待办：输入框输入内容","endTime": "none","startTime": -2}
    ],
    "longList": [
        {"Class": "life","content": "更多操作：","endTime": "none","startTime": -7},
        {"Class": "life","content": "clear All 清空本地数据库","endTime": "none","startTime": -8}
    ]
}
```

采用的遍历方法如下:

```js
for (let listName in ToDoList) {
    // listName 即 shortList 和 longList
    // key 则为包含json的数组
    let key = ToDoList[listName];	//此处用的是中括号语法
    // let key = eval("ToDoList." + listName); // 此处用的是点语法,但是需要搭配eval使用.
    let tmpKey = key.filter(item => item.Class != 'finish');
}
```

#### 其他小技巧

+ jQuery获得/设置元素的属性值: 1.`attr()`2.`prop()`

```js
// 1. attr()
$('img').attr('src'); 						// 返回img标签的src属性值
$('img').attr('src','test.jpg');			// 设置属性值
// 2. prop()
$('#detailSubmit').prop('class'); 			// 返回对应元素class的属性值
$('#detailSubmit').prop('class'，'active'); // 设置对应元素class的属性值
// 一个参数返回属性值,两个参数设置属性值
```

**两者的区别**：

attr 是从页面搜索获得元素值，所以页面必须**明确定义元素**才能获取值，相对来说比较慢。而 prop 是从属性对象中取值，属性对象中有多少属性，就能获取多少值，不需要在页面中显示定义。例如:

```html
<input name="test" type="checkbox">
```

在该行语句中,我们没有声明`checked`属性的值,但我们知道它的默认值为`false`即未被选中.

```js
$('input:checkbox').attr('checked');	// 返回undefined , 因为checked属性在HTML标签中并未声明
$('input:checkbox').prop('checked');	// 返回false
```

其次, attr 获取的是初始化值，除非通过`attr(‘name’,’value’)`改变，否则值不变而 prop 属性值是动态的.

总结:

1. 对于HTML元素本身就带有的固有属性，在处理时，使用prop方法.

2. 对于HTML元素我们自己自定义的DOM属性，在处理时，使用attr方法.s

参考文档:

1. [js中的prop方法和attr方法的区别_麻衣Protector的博客-CSDN博客_js中的prop是什么](https://blog.csdn.net/qq_43656119/article/details/90045402?utm_medium=distribute.pc_relevant.none-task-blog-2~default~baidujs_baidulandingword~default-1-90045402-blog-106299731.pc_relevant_3mothn_strategy_and_data_recovery&spm=1001.2101.3001.4242.2&utm_relevant_index=4)
2. [prop(n|p|k,v|f) | jQuery API 3.2 中文文档 | jQuery API 在线手册 (cuishifeng.cn)](https://jquery.cuishifeng.cn/prop.html)

+ 阻止事件冒泡: `e.stopPropagation();`

参考资料:[JavaScript阻止事件冒泡的两种方式（兼容性解决方案） - 掘金 (juejin.cn)](https://juejin.cn/post/7069356019121389598)

+ 
