var inputBox = document.querySelector('#userInput');
// 加载本地存储数据
var shortList = JSON.parse(localStorage.getItem('ShortList'));
// 【删除操作】要用到index啊啊啊啊啊,有空调整以下json格式
// 新增待办
function addList(inputValue) {
    // 上传倒本地数据
    let tmpStr = '{"Class":"life","content":"' + inputValue + '","ddl":"none"}';
    let tmpjson = eval("(" + tmpStr + ")");
    // console.log(tmpjson);
    shortList.push(tmpjson);
    localStorage.setItem('ShortList', JSON.stringify(shortList));
    addElement(tmpjson);
}
// 绘制新增的元素
function addElement(data) {
    let items = document.querySelector('.items');
    items.innerHTML += `<div class="${data.Class}">
    <button></button>
    <p>${data.content}</p>
</div>`;
}

function init() {
    console.log("init");
    let jsonA = new Array();
    let intro = '{ "Class": "life", "content": "欢迎来到ToDoList", "ddl": "none" }';
    let iniJSON = eval("(" + intro + ")");
    jsonA.push(iniJSON);
    // intro = '{ "Class": "work", "content": "好烦啊！", "ddl": "none" }';
    // iniJSON = eval("(" + intro + ")");
    // jsonA.push(iniJSON);
    // console.log(jsonA);
    localStorage.setItem('ShortList', JSON.stringify(jsonA));
    // let hahah = JSON.parse(localStorage.getItem('ShortList'));
    // hahah.push(iniJSON);
    // console.log(hahah[0]);
    shortList = jsonA;
    // localStorage.clear();
}
/*
本地存储一个名为"ShortList"的json数组,
每次打开网页时,先加载本地数据.
如果该数组为null,就进行初始化,然后更新这个json数组.
随后通过js生成DOM元素加载网页.
在增加操作时,将新的json存起来,然后调用addElem方法去新增DOM元素.


*/

function show() {
    console.log(shortList.content);
}

$(function () {
    // init();
    // 本地无数据就先初始化
    if (shortList == null) init();
    // show();

})

inputBox.addEventListener('keydown', (e) => {
    let tmpValue = inputBox.value;
    if (e.key === 'Enter' && tmpValue != '')
        addList(tmpValue);
})