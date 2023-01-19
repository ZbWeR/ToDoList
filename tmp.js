var tmpjson = {
    "sites": [
        { "name": "菜鸟教程", "url": "www.runoob.com" },
        { "name": "google", "url": "www.google.com" },
        { "name": "微博", "url": "www.weibo.com" }
    ],
    "Low": [
        { "opt": "title", "content": "完成todoList项目构建", "ddl": "none" }
    ]
};
// console.log(tmpjson.Low[0].content);
// 测试localStorage存储json数据
// console.log(JSON.parse(localStorage.getItem('List')));
// localStorage.setItem('List', JSON.stringify(tmpjson));
// localStorage.clear();    

function tmp() {
    var last = localStorage.getItem("qwq");
    console.log(last);
    var cont = document.querySelector('input').value;
    localStorage.setItem("qwq", cont);
}
var mask = document.querySelector('.mask');
function show() {
    console.log(mask);
    mask.style.display = 'flex';
}

function hide() {
    mask.style.display = 'none';
}

mask.addEventListener('click', (e) => {
    e = e || window.event;
    // 点击内容之外的mask就关闭遮罩
    if (e && e.target == mask)
        mask.style.display = 'none';
})