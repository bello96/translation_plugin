
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
        <header class="translate_header">
            <span>划词翻译</span>
            <span class="translate_operation">
                <span class="translate_copy translate_icon" title="复制译文">
                    <svg
                        viewBox="0 0 1024 1024"
                        version="1.1"
                        p-id="3989"
                        width="16"
                        height="16"
                    >
                        <path
                            d="M394.666667 106.666667h448a74.666667 74.666667 0 0 1 74.666666 74.666666v448a74.666667 74.666667 0 0 1-74.666666 74.666667H394.666667a74.666667 74.666667 0 0 1-74.666667-74.666667V181.333333a74.666667 74.666667 0 0 1 74.666667-74.666666z m0 64a10.666667 10.666667 0 0 0-10.666667 10.666666v448a10.666667 10.666667 0 0 0 10.666667 10.666667h448a10.666667 10.666667 0 0 0 10.666666-10.666667V181.333333a10.666667 10.666667 0 0 0-10.666666-10.666666H394.666667z m245.333333 597.333333a32 32 0 0 1 64 0v74.666667a74.666667 74.666667 0 0 1-74.666667 74.666666H181.333333a74.666667 74.666667 0 0 1-74.666666-74.666666V394.666667a74.666667 74.666667 0 0 1 74.666666-74.666667h74.666667a32 32 0 0 1 0 64h-74.666667a10.666667 10.666667 0 0 0-10.666666 10.666667v448a10.666667 10.666667 0 0 0 10.666666 10.666666h448a10.666667 10.666667 0 0 0 10.666667-10.666666v-74.666667z"
                            p-id="3990"
                            fill="#8a8a8a"
                        ></path>
                    </svg>
                </span>
                <span class="translate_close translate_icon">
                    <svg
                        viewBox="0 0 1024 1024"
                        version="1.1"
                        p-id="3842"
                        width="18"
                        height="18"
                    >
                        <path
                            d="M286.165333 798.165333L512 572.330667l225.834667 225.834666 60.330666-60.330666L572.330667 512l225.834666-225.834667-60.330666-60.330666L512 451.669333 286.165333 225.834667 225.834667 286.165333 451.669333 512l-225.834666 225.834667z"
                            p-id="3843"
                            fill="#8a8a8a"
                        ></path>
                    </svg>
                </span>
            </span>
        </header>
        <input class="copy_input" style="position: fixed;top: 3000px;left: 3000px;opacity: 0;" />
        <main class="translate_contentpanel">
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
    this.close = container.querySelector('.translate_operation .translate_close');
    // 复制按钮
    this.copy = container.querySelector('.translate_operation .translate_copy');
    // 翻译面板大容器
    this.contentpanel = container.querySelector(".translate_contentpanel")
    // 需要翻译的内容盒子
    this.source = container.querySelector('.translate_source .translate_content');
    // 翻译后的内容盒子
    this.dest = container.querySelector('.translate_dest .translate_content');
    // 切换要翻译的语种选择框
    this.toSelectdom = container.querySelector('#translate_to');
    // 切换原文语种下拉选择
    this.fromSelectdom = container.querySelector('#translate_from');
    // 头部容器
    this.header_box = container.querySelector('.translate_header');
    // 用于复制的文本框
    this.copy_input = container.querySelector('.copy_input');
}

//显示翻译面板
Panel.prototype.show = function () {
    this.container.classList.add('show_panel');
    // 注册拖拽事件
    this.startDrop(this.header_box, this.container)
}
//隐藏翻译面板
Panel.prototype.hide = function () {
    this.container.classList.remove('show_panel');
    document.onmouseup = null;
}

// 关闭面板事件
Panel.prototype.bindClose = function () {
    this.close.onclick = () => {
        this.hide();
    }
}


//  通过属性值获取对应dom
Panel.prototype.getAttributeValueDom = function (parent, tagName, name, value) {
    var selectDom = [];
    var doms = parent.getElementsByTagName(tagName);
    for (var i = 0; i < doms.length; i++) {
        if (value === doms[i].getAttribute(name)) {
            selectDom.push(doms[i]);
        }
    }
    return selectDom;
}

// 翻译函数（谷歌翻译） (origin:选中的文本内容 )
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
            let targetDoms = this.getAttributeValueDom(this.fromSelectdom, 'option', 'value', res[2])
            if (targetDoms && targetDoms.length > 0) {
                this.container.querySelector('.translate_source .translate_title').innerText = targetDoms[0].innerHTML;
            } else {
                this.container.querySelector('.translate_source .translate_title').innerText = res[2];
            }
            let temp = res[0];
            let yuanwen = '';
            let yiwen = '';
            temp.forEach((item,index) => {
                yuanwen += `<p idx="${index}" class="translate_translation">${item[1]}</p>`;
                yiwen += `<p idx="${index}" class="translate_original">${item[0]}</p>`;
            })
            setTimeout(() => {
                this.source.innerHTML = yuanwen;
                this.dest.innerHTML = yiwen;
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

// 注册拖拽事件
Panel.prototype.startDrop = function (drop_dom, panel_dom) {
    drop_dom.onmousedown = e => {
        e.preventDefault()
        let { left, top } = this.getOffsetXY(panel_dom),
          { pageX, pageY } = e,
          boxX = pageX - left,
          boxY = pageY - top;
        document.onmousemove = function (e) {
          e.preventDefault()
          let { pageX, pageY } = e;
          if (pageX <= 0) { pageX = 0 }
          if (pageY <= 0) { pageY = 0 }
          panel_dom.style.left = `${pageX - boxX}px`;
          panel_dom.style.top = `${pageY - boxY}px`;
        };
        document.onmouseup = () => (document.onmousemove = null);
    };
}

// 获取距离最外层偏移量
Panel.prototype.getOffsetXY = function (element) {
    let parent = element.offsetParent,
      top = element.offsetTop,
      left = element.offsetLeft;
    while (parent) {
      left += parent.clientLeft;
      left += parent.offsetLeft;
      top += parent.clientTop;
      top += parent.offsetTop;
      parent = parent.offsetParent;
    }
    return { top, left };
}

// 鼠标移入移出高亮公共函数
Panel.prototype.moveAndOutFn = function (e, vdom, addOrRemove) {
    let idx = e.target.getAttribute('idx');
    e.target.classList[addOrRemove]('translate_active');
    let childs = vdom.childNodes;
    let scrollTopValue = 0;
    childs.forEach(item => {
        if (item.getAttribute('idx') === idx) {
            item.classList[addOrRemove]('translate_active')
        }
        if (parseInt(item.getAttribute('idx')) < parseInt(idx)) {
            scrollTopValue += item.scrollHeight
        }
    })
    vdom.scrollTop = scrollTopValue;
}

//实例化一个翻译面板
let panel = new Panel()

// 复制译文
panel.copy.onclick = function () {
    // console.log(panel.dest.innerHTML);
    let tempText = panel.dest.innerText;
    let input = panel.copy_input;
    input.value = tempText;
    input.select();
    document.execCommand("copy")
}


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

// 鼠标移入高亮 事件处理
panel.contentpanel.onmouseover = e => {
    if (e.target.className === 'translate_translation') {
        // 鼠标移入原文
        panel.moveAndOutFn(e, panel.dest, 'add')
    }
    if (e.target.className === 'translate_original') {
        // 鼠标移入译文
        panel.moveAndOutFn(e, panel.source, 'add')
    }
}

// 鼠标移出 给每一个p标签都加（原文p)
panel.contentpanel.onmouseout = function (e) {
    if (e.target.className === 'translate_translation translate_active') {
        // 鼠标移出原文
        panel.moveAndOutFn(e, panel.dest, 'remove')
    }
    if (e.target.className === 'translate_original translate_active') {
        // 鼠标移出译文
        panel.moveAndOutFn(e, panel.source, 'remove')
    }
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
    // 如果鼠标选中的内容为空 直接隐藏翻译面板
    if (!origin) {
        panel.hide();
        return
    }
    // 存储选中的文本内容 备用
    panel.origintext = origin;
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



