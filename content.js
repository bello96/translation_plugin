
// 翻译面板的构造函数
function Panel() {
    // 划词翻译默认是关闭状态
    this.selectState = 'off'
    // 用于存储选中的文本内容
    this.origintext = ''
    // 调用create函数（作用：在页面上挂载翻译面板的dom元素）
    this.create()
    // 初始化关闭按钮事件
    this.bindClose()
}

// 在Panel的原型链上创建一个create方法
Panel.prototype.create = function () {
    // 创建一个翻译面板容器
    let container = document.createElement('div')

    // 切换要翻译对应的语种选择框
    let toSelect = `
        <select id="to" class="select">
            <option value="zh-CN" data-key="中文" selected>中文</option>
            <option value="en" data-key="English">English</option>
            <option value="ja" data-key="日本語">日本語</option>
            <option value="fr" data-key="Français">Français</option>
            <option value="de" data-key="Deutsch">Deutsch</option>
            <option value="ru" data-key="русский язык">русский язык</option>
            <option value="mn" data-key="Монгол улс">Монгол улс</option>
            <option value="ar" data-key="العربية">العربية</option>
        </select>`

    // 翻译面板dom结构
    let html = `
        <header>划词翻译<span class="close">✖</span></header>
        <main>
            <div class="source">
                <div class="title">英语</div>
                <div class="content"></div>
            </div>
            <div class="dest">
                <div class="title">简体中文</div>${toSelect}
                <div class="content">...</div>
            </div>
        </main>
        `

    container.innerHTML = html
    container.classList.add('translate_panel_box')
    document.body.appendChild(container)
    this.container = container

    // 关闭按钮
    this.close = container.querySelector('.close')
    // 需要翻译的内容盒子
    this.source = container.querySelector('.source .content')
    // 翻译后的内容盒子
    this.dest = container.querySelector('.dest .content')
    // 切换要翻译的语种选择框
    this.toSelectdom = container.querySelector('#to')
}

//显示翻译面板
Panel.prototype.show = function () {
    this.container.classList.add('show_panel')
}
//隐藏翻译面板
Panel.prototype.hide = function () {
    this.container.classList.remove('show_panel')
}

// 关闭面板事件
Panel.prototype.bindClose = function () {
    this.close.onclick = () => {
        this.hide()
    }
}

// 翻译函数 (origin:选中的文本内容 )
Panel.prototype.translate = function (origin = '') {
    //翻译前的文本内容
    // this.source.innerHTML = origin
    //翻译后的文本内容(由于获取到翻译后的内容是一个异步过程,此时还没有开始翻译,先把翻译后的文本设置为...,后面等异步完成,获取到翻译后的内容后,再重新把内容插入进去)
    this.dest.innerText = '...'
    // this.source.innerText = '...'

    //用户选中的需要翻译的语言 如需要把英文翻译成中文,这里指的就是英文
    let slValue = 'en'
    let toLang = 'zh-Hans'

    // 查看用户是否已经设置了要翻译成哪个语种
    chrome.storage.sync.get(['sl', 'tl'], (result) => {
        if (result.sl) {
            slValue = result.sl.value
            this.container.querySelector('.source .title').innerText = result.sl.key
        }
        if (result.tl) {
            toLang = result.tl.value
            this.container.querySelector('.dest .title').innerText = result.tl.key
            // 修改下拉框值
            this.toSelectdom.value = toLang
        }

        //谷歌翻译接口 
        //sl：需要翻译的语言（en 英语） 
        //tl：需要翻译成哪种语言 (zh-Hans 中文) 
        //q：需要翻译的内容
        let url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${slValue}&tl=${toLang}&dt=t&q=${origin}`
        fetch(url).then(res => res.json()).then(res => {
            let newarr = res[0]
            let yiwen = ''
            let yuanwen = ''
            newarr.forEach(item => {
                yiwen += `<p>${item[0]}</p>`
                yuanwen += `<p>${item[1]}</p>`
            })
            setTimeout(() => {
                this.dest.innerHTML = yiwen
                this.source.innerHTML = yuanwen
            }, 50)
        })
    })
}

// 设置翻译面板的位置
Panel.prototype.setPos = function (pos) {
    this.container.style.top = pos.y + 'px'
    this.container.style.left = pos.x + 'px'
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

// 要翻译成的语种切换事件
panel.toSelectdom.onchange = function () {
    let key = this.selectedOptions[0].getAttribute('data-key')
    chrome.storage.sync.set({ 'tl': { key: key, value: this.value } })
    panel.translate(panel.origintext)
}

// 查看之前有没有存储 'switch' 这一项(查看用户之前是否已选择开启/关闭划词翻译功能,只要选择过,都会存储在switch里)
chrome.storage.sync.get(['switch'], function (result) {
    //如果有设置
    if (result.switch) {
        //把值(on / off)赋值给网页上翻译插件的状态变量
        panel.selectState = result.switch
    }
});

//运行时，监听是否有数据传过来
chrome.runtime.onMessage.addListener(
    function (request) {
        // 如果有传 'switch' (当选项[开启]/[关闭]发生改变时,popup.js都会给当前活动标签页传递switch数据,也就是用户选择的选项是什么)
        if (request.switch) {
            //把用户修改的选项的值赋值给该变量
            panel.selectState = request.switch
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
    let origin = window.getSelection().toString().trim()
    // 存储选中的文本内容 备用
    panel.origintext = origin
    // 如果鼠标选中的内容为空 直接隐藏翻译面板
    if (!origin) {
        panel.hide()
        return
    }

    // 光标释放时在页面上的位置
    let x = e.pageX
    let y = e.pageY

    //设置翻译面板的位置
    panel.setPos({ x, y })
    // 调用翻译接口
    panel.translate(origin)
    // 显示翻译面板
    panel.show()
}