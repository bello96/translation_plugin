
// 翻译面板的构造函数
function Panel() {
    // 划词翻译默认是关闭状态
    this.selectState = 'off';
    // 用于存储选中的文本内容
    this.origintext = '';
    // 调用create函数（作用：在页面上挂载翻译面板的dom元素）
    this.create();
    // 初始化关闭按钮事件
    this.bindClose();
}

// 在Panel的原型链上创建一个create方法
Panel.prototype.create = function () {
    // 创建一个翻译面板容器
    let container = document.createElement('div');

    // 原语种选择框
    let fromSelect = `
        <select id="translate_from">
            <option value="auto" data-key="自动检测" selected>自动检测</option>
            <option value="zh-CN" data-key="简体中文">简体中文</option>
            <option value="en" data-key="英文">英文</option>
            <option value="ja" data-key="日语">日语</option>
            <option value="ko" data-key="韩语">韩语</option>
            <option value="fr" data-key="法语">法语</option>
            <option value="ru" data-key="俄语">俄语</option>
            <option value="ar" data-key="阿拉伯语">阿拉伯语</option>
            <option value="is" data-key="冰岛语">冰岛语</option>
            <option value="de" data-key="德语">德语</option>
            <option value="nl" data-key="荷兰语">荷兰语</option>
            <option value="it" data-key="意大利语">意大利语</option>
            <option value="lo" data-key="老挝语">老挝语</option>
            <option value="pt" data-key="葡萄牙语">葡萄牙语</option>
            <option value="es" data-key="西班牙语">西班牙语</option>
            <option value="tr" data-key="土耳其语">土耳其语</option>
            <option value="ne" data-key="尼泊尔语">尼泊尔语</option>
            <option value="mn" data-key="蒙古语">蒙古语</option>
            <option value="la" data-key="拉丁语">拉丁语</option>
            <option value="cs" data-key="捷克语">捷克语</option>
            <option value="eo" data-key="世界语">世界语</option>
            <option value="my" data-key="缅甸语">缅甸语</option>
            <option value="el" data-key="希腊语">希腊语</option>
            <option value="ga" data-key="爱尔兰语">爱尔兰语</option>
            <option value="bg" data-key="保加利亚语">保加利亚语</option>
            <option value="fa" data-key="波斯语">波斯语</option>
            <option value="tl" data-key="菲律宾语">菲律宾语</option>
            <option value="hr" data-key="克罗地亚语">克罗地亚语</option>
            <option value="hu" data-key="匈牙利语">匈牙利语</option>
            <option value="fi" data-key="芬兰语">芬兰语</option>
        </select>`

    // 译文语种选择框
    let toSelect = `
        <select id="translate_to">
            <option value="zh-CN" data-key="简体中文" selected>简体中文</option>
            <option value="zh-TW" data-key="繁体中文">繁体中文</option>
            <option value="en" data-key="英文">英文</option>
            <option value="ja" data-key="日语">日语</option>
            <option value="ko" data-key="韩语">韩语</option>
            <option value="fr" data-key="法语">法语</option>
            <option value="ru" data-key="俄语">俄语</option>
            <option value="ar" data-key="阿拉伯语">阿拉伯语</option>
            <option value="is" data-key="冰岛语">冰岛语</option>
            <option value="de" data-key="德语">德语</option>
            <option value="nl" data-key="荷兰语">荷兰语</option>
            <option value="it" data-key="意大利语">意大利语</option>
            <option value="lo" data-key="老挝语">老挝语</option>
            <option value="pt" data-key="葡萄牙语">葡萄牙语</option>
            <option value="es" data-key="西班牙语">西班牙语</option>
            <option value="tr" data-key="土耳其语">土耳其语</option>
            <option value="ne" data-key="尼泊尔语">尼泊尔语</option>
            <option value="mn" data-key="蒙古语">蒙古语</option>
            <option value="la" data-key="拉丁语">拉丁语</option>
            <option value="cs" data-key="捷克语">捷克语</option>
            <option value="eo" data-key="世界语">世界语</option>
            <option value="my" data-key="缅甸语">缅甸语</option>
            <option value="el" data-key="希腊语">希腊语</option>
            <option value="ga" data-key="爱尔兰语">爱尔兰语</option>
            <option value="bg" data-key="保加利亚语">保加利亚语</option>
            <option value="fa" data-key="波斯语">波斯语</option>
            <option value="tl" data-key="菲律宾语">菲律宾语</option>
            <option value="hr" data-key="克罗地亚语">克罗地亚语</option>
            <option value="hu" data-key="匈牙利语">匈牙利语</option>
            <option value="fi" data-key="芬兰语">芬兰语</option>
        </select>`

    // 翻译面板dom结构
    let html = `
        <header>
            <span>划词翻译</span>
            <span class="translate_close">✖</span>
            </header>
        <main>
            <div class="translate_source">
                <div class="title-box">
                    <span class="translate_describe">原文</span>
                    <span class="translate_title">英语</span>
                    ${fromSelect}
                </div>
                <div class="translate_content"></div>
            </div>
            <div class="translate_line"></div>
            <div class="translate_dest">
                <div class="title-box">
                    <span class="translate_describe">译文</span>
                    <span class="translate_title">中文</span>
                    ${toSelect}
                </div>
                <div class="translate_content">...</div>
            </div>
        </main>
        `

    container.innerHTML = html;
    container.classList.add('translate_panel_box');
    document.body.appendChild(container);
    this.container = container;

    // 关闭按钮
    this.close = container.querySelector('.translate_close');
    // 需要翻译的内容盒子
    this.source = container.querySelector('.translate_source .translate_content');
    // 翻译后的内容盒子
    this.dest = container.querySelector('.translate_dest .translate_content');
    // 切换要翻译的语种选择框
    this.toSelectdom = container.querySelector('#translate_to');
    // 切换原文语种下拉选择
    this.fromSelectdom = container.querySelector('#translate_from');
}

//显示翻译面板
Panel.prototype.show = function () {
    this.container.classList.add('show_panel');
}
//隐藏翻译面板
Panel.prototype.hide = function () {
    this.container.classList.remove('show_panel');
}

// 关闭面板事件
Panel.prototype.bindClose = function () {
    this.close.onclick = () => {
        this.hide();
    }
}

// 翻译函数 (origin:选中的文本内容 )
Panel.prototype.translate = function (origin = '') {
    //翻译前的文本内容
    // this.source.innerHTML = origin
    //翻译后的文本内容(由于获取到翻译后的内容是一个异步过程,此时还没有开始翻译,先把翻译后的文本设置为...,后面等异步完成,获取到翻译后的内容后,再重新把内容插入进去)
    this.dest.innerText = '...';
    // this.source.innerText = '...'

    //用户选中的需要翻译的语言 如需要把英文翻译成中文,这里指的就是英文
    let slValue = 'auto';
    let toLang = 'zh-CN';

    // 查看用户是否已经设置了要翻译成哪个语种
    chrome.storage.sync.get(['sl', 'tl'], (result) => {
        if (result.sl) {
            slValue = result.sl.value;
            this.container.querySelector('.translate_source .translate_title').innerText = result.sl.key;
            // 修改下拉框
            this.fromSelectdom.value = slValue;
        }
        if (result.tl) {
            toLang = result.tl.value;
            this.container.querySelector('.translate_dest .translate_title').innerText = result.tl.key;
            // 修改下拉框值
            this.toSelectdom.value = toLang;
        }

        //谷歌翻译接口 
        //sl：需要翻译的语言（en 英语） 
        //tl：需要翻译成哪种语言 (zh-CN 中文) 
        //q：需要翻译的内容
        let url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${slValue}&tl=${toLang}&dt=t&q=${origin}`
        fetch(url).then(res => res.json()).then(res => {
            // 自动选择赋值检测的语种文本
            let targetDoms = getAttributeValueDom(this.fromSelectdom, 'option', 'value', res[2])
            if (targetDoms && targetDoms.length > 0) {
                this.container.querySelector('.translate_source .translate_title').innerText = targetDoms[0].innerHTML;
            } else {
                this.container.querySelector('.translate_source .translate_title').innerText = res[2];
            }
            
            let newarr = res[0];
            let yiwen = '';
            let yuanwen = '';
            newarr.forEach(item => {
                yiwen += `<p>${item[0]}</p>`;
                yuanwen += `<p>${item[1]}</p>`;
            })
            setTimeout(() => {
                this.dest.innerHTML = yiwen;
                this.source.innerHTML = yuanwen;
            }, 50)
        })
    })
}

// 设置翻译面板的位置
Panel.prototype.setPos = function (pos) {
    this.container.style.top = pos.y + 'px';
    this.container.style.left = pos.x + 'px';
}

// 判断鼠标点击的是不是面板外层
Panel.prototype.isFatcher = function (p, c) {
    var newc = c;
    while (newc.parentNode) {
        newc = newc.parentNode;
        if (newc.className == p.className)
            return true;
    }
    return false;
}

//实例化一个翻译面板
let panel = new Panel()

// 原文语种切换事件
panel.fromSelectdom.onchange = function () {
    let key = this.selectedOptions[0].getAttribute('data-key');
    chrome.storage.sync.set({ 'sl': { key: key, value: this.value } });
    panel.translate(panel.origintext);
}

// 要翻译成的语种切换事件
panel.toSelectdom.onchange = function () {
    let key = this.selectedOptions[0].getAttribute('data-key');
    chrome.storage.sync.set({ 'tl': { key: key, value: this.value } });
    panel.translate(panel.origintext);
}

// 查看之前有没有存储 'switch' 这一项(查看用户之前是否已选择开启/关闭划词翻译功能,只要选择过,都会存储在switch里)
chrome.storage.sync.get(['switch'], function (result) {
    //如果有设置
    if (result.switch) {
        //把值(on / off)赋值给网页上翻译插件的状态变量
        panel.selectState = result.switch;
    }
});

//运行时，监听是否有数据传过来
chrome.runtime.onMessage.addListener(
    function (request) {
        // 如果有传 'switch' (当选项[开启]/[关闭]发生改变时,popup.js都会给当前活动标签页传递switch数据,也就是用户选择的选项是什么)
        if (request.switch) {
            //把用户修改的选项的值赋值给该变量
            panel.selectState = request.switch;
        }
    }
);

//监听鼠标的释放事件
window.onmouseup = function (e) {
    // 判断是否开启翻译
    if (panel.selectState === 'off') return
    // 判断点击的是否是外层父元素
    if (panel.isFatcher(panel.container, e.target)) return
    // 获取鼠标选中的内容
    let origin = window.getSelection().toString().trim();
    // 存储选中的文本内容 备用
    panel.origintext = origin;
    // 如果鼠标选中的内容为空 直接隐藏翻译面板
    if (!origin) {
        panel.hide();
        return
    }
    // 光标释放时在页面上的位置
    let x = e.pageX;
    let y = e.pageY;

    //设置翻译面板的位置
    panel.setPos({ x, y });
    // 调用翻译接口
    panel.translate(origin);
    // 显示翻译面板
    panel.show();
}

// 通过属性值获取dom
function getAttributeValueDom(parent, tagName, name, value) {
    var selectDom = [];
    var doms = parent.getElementsByTagName(tagName);
    for (var i = 0; i < doms.length; i++) {
        if (value === doms[i].getAttribute(name)) {
            selectDom.push(doms[i]);
        }
    }
    return selectDom;
}