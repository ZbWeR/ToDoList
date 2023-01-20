var inputBox = document.querySelector('#userInput');
// 加载本地存储数据
var shortList = new Array();

// 用于展示本地数据库
function loadAndShow() {
    shortList = JSON.parse(localStorage.getItem('ShortList'));
    console.log(shortList);
}

// 新增待办
function addList(inputValue) {
    // 将input数据转化为json
    let tmpStr = '{"Class":"life","content":"' + inputValue + '","endTime":"none","startTime":' + Date.now() + '}';
    let tmpjson = eval("(" + tmpStr + ")");
    // console.log(tmpjson);
    // 获取本地数据
    shortList = JSON.parse(localStorage.getItem('ShortList')) || new Array();
    // 将json与原数据合并后上传到本地.
    shortList.push(tmpjson);
    localStorage.setItem('ShortList', JSON.stringify(shortList));
    // 在页面中绘制新增的待办
    addElement(tmpjson);
    loadAndShow();
}
// 绘制新增的元素
function addElement(data) {
    let items = document.querySelector('.items');
    items.innerHTML += `<div class="${data.Class}" id="s${data.startTime}">
    <button></button>
    <p>${data.content}</p>
</div>`;
    // 在已完成的待办之前插入
    $(document).on('click', `#s${data.startTime} button`, delList);
    let newFile = document.querySelector(`#s${data.startTime}`);
    let oldFile = document.querySelector('.finish');
    oldFile.parentNode.insertBefore(newFile, oldFile);
    // console.log(oldFile);
}
// 删除点击按钮对应的待办
function delList(e) {
    console.log('delete', e.target.parentElement);
    // 在页面上设置为finish状态
    let delBox = e.target.parentElement;
    $(delBox).fadeOut(500);
    setTimeout(() => {
        $(delBox).addClass('finish');
    }, 600)
    $(delBox).fadeIn(300);
    // 在数据库中设为finish状态
    let delId = delBox.id.substring(1, delBox.id.length);
    console.log("id:", delId);
    shortList = JSON.parse(localStorage.getItem('ShortList'));
    for (let i = 0; i < shortList.length; i++) {
        console.log(shortList[i]);
        if (shortList[i].startTime == delId) {
            shortList[i].Class = "finish";
            delId = -1;
            break;
        }
    }
    if (delId == -1) {
        localStorage.setItem('ShortList', JSON.stringify(shortList));
        console.log("delete Success!");
    }
}


function init() {
    console.log("init");
    // 初始化一个测试json
    let jsonA = new Array();
    fetch('./init.json')
        .then(response => {
            return response.json();
        })
        .then(data => {
            // console.log(data);
            localStorage.setItem('ShortList', JSON.stringify(data));
            shortList = data;
            draw();
        });
    // let intro = `{ "Class": "life", "content": "欢迎来到ToDoList", "endTime": "none","startTime": ${Date.now()}}`;
    // let iniJSON = eval("(" + intro + ")");
    // jsonA.push(iniJSON);
    // localStorage.setItem('ShortList', JSON.stringify(jsonA));
    // shortList = jsonA;
}
/*
本地存储一个名为"ShortList"的json数组,
每次打开网页时,先加载本地数据.
如果该数组为null,就进行初始化,然后更新这个json数组.
随后通过js生成DOM元素加载网页.
在增加操作时,将新的json存起来,然后调用addElem方法去新增DOM元素.
*/

function draw() {
    console.log("draw");
    for (let i = 0; i < shortList.length; i++) {
        let items = document.querySelector('.items');
        items.innerHTML += `<div class="${shortList[i].Class}" id="s${shortList[i].startTime}">
        <button></button>
        <p>${shortList[i].content}</p>
    </div>`;
        $(document).on('click', `#s${shortList[i].startTime} button`, delList);
    }
}

$(function () {
    // 本地无数据就先初始化
    localStorage.clear();
    shortList = JSON.parse(localStorage.getItem('ShortList'))
    if (shortList == null) init();
    // draw();
    // 给按钮绑定删除事件
    $('.items>div>button').bind('click', delList);
})

inputBox.addEventListener('keydown', (e) => {
    let tmpValue = inputBox.value;
    if (e.key === 'Enter' && tmpValue != '') {
        // 清除数据库
        if (tmpValue == 'clear') {
            localStorage.clear();
            shortList = new Array();
            inputBox.value = 'Success!';
        }
        else if (tmpValue == 'show') {
            loadAndShow();
        } else {
            addList(tmpValue);
            inputBox.value = '';
        }
    }
})