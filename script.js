var inputBox = document.querySelector('#userInput');
// 加载本地存储数据
var blankList = new Array();
var ToDoList = new Array();

// 用于展示本地数据库
function loadAndShow() {
    ToDoList = JSON.parse(localStorage.getItem('ToDoList'));
    console.log(ToDoList);
}

function getInputData() {
    // 获得输入的数据
    let timeType = $('input[name="timeType"]:checked').val();
    let funType = $('input[name="type"]:checked').val();
    let content = $('#creatEve').val();
    let endTime = Date.parse($('#inputDate').val());
    if ($('#detailSubmit').prop('class')) {
        let tmpToDoList = {};
        for (let listName in ToDoList) {
            let key = eval("ToDoList." + listName);
            let tmpKey = key.filter(item => item.startTime != $('#detailSubmit').prop('class'));
            // console.log(tmpKey);
            eval("tmpToDoList." + listName + "=tmpKey");
        }
        ToDoList = tmpToDoList;
        localStorage.setItem('ToDoList', JSON.stringify(ToDoList));
        draw(false);
    }
    // 数据格式化为json
    let tmpStr = `{"Class":"${funType}" , "content":"${content}","endTime":${endTime},"startTime":${Date.now()}}`;
    let tmpjson = eval("(" + tmpStr + ")");
    addList(tmpjson, timeType);
}

// 新增待办
function addList(inputValue, timeType) {
    ToDoList = JSON.parse(localStorage.getItem('ToDoList'));
    if (timeType == 's')
        ToDoList.shortList.push(inputValue);
    else
        ToDoList.longList.push(inputValue);
    localStorage.setItem('ToDoList', JSON.stringify(ToDoList));
    addElement(inputValue, timeType);
    // loadAndShow();
}

//展示某个待办的详细信息
function showDetail(id) {
    // $(`#${id}`)
    let detailData = undefined;
    for (let listName in ToDoList) {
        let key = eval("ToDoList." + listName);
        if (key.length)
            for (let i = 0; i < key.length; i++)
                if (key[i].startTime == id) {
                    detailData = key[i];
                    $(`input[value="${listName[0]}"]`).prop("checked", true);
                    $(`input[value="${key[i].Class}"]`).prop("checked", true);
                    $('#creatEve').val(key[i].content);
                    // $('.mask').css("display", "flex");
                    $('.mask').addClass('active');
                    return
                }
    }
}

// 绘制新增的元素
function addElement(data, timeType) {
    // console.log(data);
    let items;
    let con = `${data.content}`;
    // console.log(con, typeof (con));
    if (timeType == 's') items = document.querySelector('.short .items');
    else items = document.querySelector('.long .items');
    items.innerHTML += `<div class="${data.Class}" id="s${data.startTime}">
                            <button></button>
                            <p>${data.content}</p>
                            </div>`;
    $(document).off('click', `#s${data.startTime} button`);
    $(document).on('click', `#s${data.startTime} button`, toggList);
    $(document).on('click', `#s${data.startTime}`, () => {
        showDetail(`${data.startTime}`);
        $('#detailSubmit').addClass(`${data.startTime}`);
    });
    $('#detailSubmit').removeClass();
}
// 删除点击按钮对应的待办
function toggList(e) {
    // 阻止事件冒泡
    e.stopPropagation();
    // 在页面上切换finish状态
    let delBox = e.target.parentElement;

    let timeType = $(delBox).parent().parent().attr('class');
    // 触发动画效果
    $(delBox).fadeOut(500);
    e.target.disabled = true;
    setTimeout(() => {
        console.log(delBox);
        $(delBox).toggleClass('finish');
        e.target.disabled = false;
    }, 600)
    $(delBox).fadeIn(300);
    // 在数据库中切换状态
    let delId = delBox.id.substring(1, delBox.id.length);
    // console.log("id:", delId);
    ToDoList = JSON.parse(localStorage.getItem('ToDoList'));
    let listName = eval("ToDoList." + timeType + "List");
    // console.log(listName);
    for (let i = 0; i < listName.length; i++) {
        if (listName[i].startTime == delId) {
            let tmpClass = listName[i].Class;
            if (tmpClass != 'finish') {
                listName[i].LastClass = tmpClass;
                listName[i].Class = 'finish';
            }
            else
                listName[i].Class = listName[i].LastClass;
            delId = -1;
            break;
        }
    }
    if (delId == -1) {
        console.log("切换后数据库状态", ToDoList);
        localStorage.setItem('ToDoList', JSON.stringify(ToDoList));
        console.log("delete Success!");
    }
}

// 初始化页面
function init() {
    console.log("init");
    // 初始化一个测试json
    let jsonA = new Array();
    fetch('./init.json')
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log("初始数据:", data);
            localStorage.setItem('ToDoList', JSON.stringify(data));
            ToDoList = data;
            draw(false);
        });
}

// 绘制所有待办
function draw(isFinish) {
    let shortitems = document.querySelector('.short .items');
    let longitems = document.querySelector('.long .items');
    shortitems.innerHTML = '';
    longitems.innerHTML = '';
    console.log("draw", ToDoList);
    // 找出所有状态为finish的并从数据库中删除
    if (isFinish) {
        let tmpToDoList = {};
        for (let listName in ToDoList) {
            let key = eval("ToDoList." + listName);
            let tmpKey = key.filter(item => item.Class != 'finish');
            eval("tmpToDoList." + listName + "=tmpKey");
        }
        ToDoList = tmpToDoList;
        localStorage.setItem('ToDoList', JSON.stringify(ToDoList));
        console.log("数据库清空finish后:", ToDoList);
    }
    for (let listName in ToDoList) {
        let key = eval("ToDoList." + listName);
        if (key.length)
            for (let i = 0; i < key.length; i++)
                addElement(key[i], listName[0]);
    }
}

$(function () {
    // 本地无数据就先初始化
    // localStorage.clear();
    // ToDoList = JSON.parse(localStorage.getItem('ToDoList'))
    fetch('./blank.json').then(response => response.json()).then(data => blankList = data);
    if (ToDoList == null) init();
    else draw(false);
})

// 显示待办详情的弹窗
function showAlert(tmpValue) {
    $('#creatEve').val(tmpValue).focus();
    $('.mask').addClass('active');
    // $('.mask').css("display", "flex");
}

// 输入框绑定事件
inputBox.addEventListener('keydown', (e) => {
    let tmpValue = inputBox.value;
    if (e.key === 'Enter' && tmpValue != '') {
        // 清除数据库
        if (tmpValue == 'clear All') {
            localStorage.clear();
            console.log('clear all data');
            ToDoList = blankList;
            localStorage.setItem('ToDoList', JSON.stringify(ToDoList));
            inputBox.value = 'Clear Data Success!';
            draw(false);
            // console.log(ToDoList);
        }
        // 删除finish数据
        else if (tmpValue == 'Finish') {
            draw(true);
        }
        else if (tmpValue == 'init') {
            init();
        }
        // 展示数据库
        else if (tmpValue == 'show') {
            loadAndShow();
        } else {
            $('#detailSubmit').removeClass()
            showAlert(tmpValue);
            inputBox.value = '';
        }
    }
})

$('#creatEve').bind('keydown', (e) => {
    if (e.which == 13)
        $('#detailSubmit').click();
})

// 遮罩层绑定关闭事件
$('.mask').bind('click', (e) => {
    let mask = document.querySelector('.mask');
    e = e || window.event;
    // 点击内容之外的mask就关闭遮罩
    if (e && e.target == mask)
        $('.mask').removeClass('active');
})
// 遮罩弹窗页面的提交按钮
$('#detailSubmit').bind('click', () => {
    getInputData();
    $('#detailSubmit').text('Success').addClass('subOk');
    setTimeout(() => {
        $('.mask').removeClass('active');
        $('#detailSubmit').text('确定').removeClass('subOk');
    }, 500)
})