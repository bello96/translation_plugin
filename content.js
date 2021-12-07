// 翻译面板的构造函数
function Panel() {
    // 划词翻译默认是关闭状态
    this.selectState = 'off';
    // 用于存储选中的文本内容
    this.origintext = '';
    // 记录开始的top和left
    this.oldTop = 0;
    this.oldLeft = 0;
    // 记录处于放大还是缩小状态
    this.is_enlarge_narrow_status = true;
    // 是否点击查询
    this.isClickQuery = false;
    // 调用create函数（作用：在页面上挂载翻译面板的dom元素）
    this.create();
    this.createIcon();
    // 初始化关闭按钮事件
    this.bindClose();
    this.iconClose();
    // loding_dom
    this.loding_dom = `<svg
        width="23"
        height="23"
        viewBox="0 0 50 50"
        style="enable-background: new 0 0 50 50"
        xml:space="preserve"
    >
        <path
            fill="#BBB"
            d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z"
            transform="rotate(275.098 25 25)"
        >
            <animateTransform
                attributeType="xml"
                attributeName="transform"
                type="rotate"
                from="0 25 25"
                to="360 25 25"
                dur="1.2s"
                repeatCount="indefinite"
            ></animateTransform>
        </path>
    </svg>`
};

// 创建翻译icon
Panel.prototype.createIcon = function () {
    // 创建一个icon图标
    let iconDom = document.createElement('div');
    let icon = `<svg
        class="translate_icon_yi"
        viewBox="0 0 1024 1024"
        version="1.1"
        p-id="2454"
        width="30"
        height="30"
    >
        <path
            d="M512 1024C230.4 1024 0 793.6 0 512S230.4 0 512 0s512 230.4 512 512-230.4 512-512 512z m0-938.666667C277.333333 85.333333 85.333333 277.333333 85.333333 512s192 426.666667 426.666667 426.666667 426.666667-192 426.666667-426.666667S746.666667 85.333333 512 85.333333z"
            p-id="2455"
            fill="#1296db"
        ></path>
        <path
            d="M631.466667 635.733333H768v76.8h-136.533333v76.8h-89.6v-76.8H418.133333v-46.933333c-93.866667 89.6-110.933333 106.666667-119.466666 123.733333v-4.266666c-8.533333-17.066667-29.866667-46.933333-42.666667-55.466667 12.8-12.8 29.866667-38.4 29.866667-72.533333v-166.4H226.133333V409.6h145.066667v200.533333l21.333333-21.333333c8.533333 17.066667 17.066667 42.666667 25.6 59.733333v-12.8h123.733334v-25.6h-102.4v-76.8h102.4v-42.666666h89.6v42.666666h102.4v76.8h-102.4v25.6zM307.2 388.266667c-12.8-29.866667-42.666667-76.8-64-115.2l68.266667-42.666667c21.333333 34.133333 55.466667 81.066667 68.266666 110.933333L307.2 388.266667z m473.6-115.2c-25.6 51.2-64 93.866667-106.666667 132.266666 38.4 12.8 76.8 25.6 123.733334 34.133334-17.066667 17.066667-42.666667 51.2-55.466667 76.8-55.466667-12.8-102.4-34.133333-145.066667-59.733334-51.2 25.6-106.666667 46.933333-162.133333 64-8.533333-21.333333-29.866667-59.733333-46.933333-76.8 46.933333-8.533333 93.866667-25.6 136.533333-42.666666-25.6-25.6-46.933333-51.2-68.266667-81.066667h-38.4V247.466667h290.133334l17.066666-4.266667 55.466667 29.866667z m-234.666667 51.2c12.8 12.8 29.866667 29.866667 46.933334 42.666666 17.066667-12.8 38.4-25.6 51.2-42.666666h-98.133334z"
            p-id="2456"
            fill="#1296db"
        ></path>
    </svg>`;
    iconDom.innerHTML = icon;
    iconDom.classList.add('translate_icon_dom');
    document.body.appendChild(iconDom);
    this.iconDom = iconDom;
};

// 显示翻译icon
Panel.prototype.showIcon = function () {
    this.iconDom.classList.add('show_icon_dom');
};

// 隐藏翻译icon
Panel.prototype.hideIcon = function () {
    this.iconDom.classList.remove('show_icon_dom');
};

// 设置icon的位置
Panel.prototype.setIconP = function (x, y) {
    this.iconDom.style.top = y + 'px';
    this.iconDom.style.left = x + 'px';
    this.iconDom.setAttribute('x', x);
    this.iconDom.setAttribute('y', y);
};

// icon的点击事件
Panel.prototype.iconClose = function () {
    this.iconDom.onclick = () => {
        // 显示翻译面板
        let x = this.iconDom.getAttribute('x');
        let y = this.iconDom.getAttribute('y');
        this.hideIcon()
        this.showPanel(x, y, this.origintext);
    }
};

// 创建翻译面板
Panel.prototype.create = function () {
    // 创建一个翻译面板容器
    let container = document.createElement('div');
    // 原语种选择框
    let fromSelect = `<select id="translate_from">
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
        </select>`;

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
        </select>`;

    // 翻译面板dom结构
    let html = `
        <header class="translate_header">
            <span class="translate_title_text">划词翻译</span>
            <span class="translate_operation">
                <span class="translate_query translate_icon" title="输入">
                    <svg
                        viewBox="0 0 1024 1024"
                        version="1.1"
                        p-id="3797"
                        width="18"
                        height="18"
                    >
                        <path
                            d="M957.9 908.2L833.4 783.7c56.4-66.7 92.7-151.4 98.6-245.3 14.6-232-161.7-431.9-393.8-446.5-9-0.6-17.9-0.8-26.8-0.8-220.4 0-405.7 171.5-419.7 394.5-14.6 232 161.7 431.9 393.8 446.5 9 0.6 17.9 0.8 26.8 0.8 102.8 0 197.9-37.3 271.6-99.8l124.5 124.5c6.8 6.8 15.8 10.3 24.7 10.3 9 0 17.9-3.4 24.7-10.3 13.7-13.6 13.7-35.7 0.1-49.4z m-206.2-140C686.4 829.3 601.4 863 512.3 863c-7.4 0-14.9-0.2-22.4-0.7-47.3-3-92.6-15.1-134.6-36-40.6-20.3-76.5-47.9-106.6-82.1-30.2-34.2-53.1-73.3-68.1-116.1-15.5-44.3-21.9-90.7-18.9-138 5.6-89.7 44.8-172.8 110.4-234.2 65.3-61.1 150.3-94.8 239.5-94.8 7.4 0 14.9 0.2 22.3 0.7 47.3 3 92.6 15.1 134.6 36 40.6 20.3 76.5 47.9 106.6 82.1 30.2 34.2 53.1 73.3 68.1 116.1 15.5 44.3 21.9 90.7 18.9 138-5.7 89.6-44.9 172.8-110.4 234.2z"
                            p-id="3798"
                            fill="#8a8a8a"
                        ></path>
                    </svg>
                </span>
                <span class="translate_copy translate_icon" title="复制译文">
                    <svg
                        viewBox="0 0 1024 1024"
                        version="1.1"
                        p-id="12150"
                        width="20"
                        height="20"
                    >
                        <path
                            d="M619.008 153.6l8.192 0.256A123.392 123.392 0 0 1 742.4 276.992V307.2h25.6a102.4 102.4 0 0 1 102.4 102.4v358.4a102.4 102.4 0 0 1-102.4 102.4H409.6a102.4 102.4 0 0 1-102.4-102.4v-25.6h-30.208l-8.192-0.256A123.392 123.392 0 0 1 153.6 619.008V276.9408l0.256-8.0896A123.392 123.392 0 0 1 276.992 153.6h342.1184zM768 358.4H409.6a51.2 51.2 0 0 0-50.8416 45.2096L358.4 409.6v358.4a51.2 51.2 0 0 0 45.2096 50.8416L409.6 819.2h358.4a51.2 51.2 0 0 0 50.8416-45.2096L819.2 768V409.6a51.2 51.2 0 0 0-45.2096-50.8416L768 358.4z m-179.2 102.4a25.6 25.6 0 0 1 25.1904 20.992L614.4 486.4l-0.0512 76.8H691.2a25.6 25.6 0 0 1 4.608 50.7904L691.2 614.4H614.4v76.8a25.6 25.6 0 0 1-50.7904 4.608L563.2 691.2V614.4H486.4a25.6 25.6 0 0 1-4.608-50.7904L486.4 563.2h76.7488L563.2 486.4a25.6 25.6 0 0 1 25.6-25.6z m30.208-256H276.992l-7.0144 0.3072A72.192 72.192 0 0 0 204.8 276.992v342.1184l0.3072 6.9632A72.192 72.192 0 0 0 276.992 691.2H307.2V409.6a102.4 102.4 0 0 1 102.4-102.4h281.6v-30.208l-0.3072-7.0144A72.192 72.192 0 0 0 619.008 204.8z"
                            p-id="12151"
                            fill="#8a8a8a"
                        ></path>
                    </svg>
                </span>
                <span class="translate_enlarge_narrow translate_icon" title="放大">
                    <svg
                        viewBox="0 0 1024 1024"
                        class="translate_fangda"
                        version="1.1"
                        p-id="7209"
                        width="16"
                        height="16"
                    >
                        <path
                            d="M181 357.5V181.2h176.4c14.3 0 25.9-11.6 25.9-25.9v-31.1c0-14.3-11.6-25.9-25.9-25.9H118c-11 0-20 9-20 20v239.4c0 14.3 11.6 25.9 25.9 25.9H155c14.4-0.1 26-11.7 26-26.1zM668.6 181.2H845v176.4c0 14.3 11.6 25.9 25.9 25.9H902c14.3 0 25.9-11.6 25.9-25.9V118.2c0-11-9-20-20-20H668.6c-14.3 0-25.9 11.6-25.9 25.9v31.1c0 14.3 11.6 26 25.9 26zM357.4 845.2H181V668.8c0-14.3-11.6-25.9-25.9-25.9H124c-14.3 0-25.9 11.6-25.9 25.9v239.4c0 11 9 20 20 20h239.4c14.3 0 25.9-11.6 25.9-25.9v-31.1c-0.1-14.4-11.7-26-26-26zM845 668.8v176.4H668.6c-14.3 0-25.9 11.6-25.9 25.9v31.1c0 14.3 11.6 25.9 25.9 25.9H908c11 0 20-9 20-20V668.8c0-14.3-11.6-25.9-25.9-25.9H871c-14.4 0-26 11.6-26 25.9z"
                            p-id="7210"
                            fill="#8a8a8a"
                        ></path>
                    </svg>
                    <svg
                        viewBox="0 0 1024 1024"
                        version="1.1"
                        class="translate_suoxiao translate_hide"
                        p-id="2412"
                        width="16"
                        height="16"
                    >
                        <path
                            d="M65.991363 679.954822c-12.104086 0-21.912081-9.807995-21.912081-21.91208s9.807995-21.912081 21.912081-21.912081h183.177057c38.183147 0 72.85129 15.590743 97.994906 40.734359 25.143616 25.11527 40.734359 59.811759 40.73436 97.994907v183.177057c0 12.104086-9.807995 21.912081-21.912081 21.91208s-21.912081-9.807995-21.91208-21.91208v-183.177057c0-26.079061-10.686746-49.805337-27.893257-67.011848s-40.932787-27.893257-67.011848-27.893257H65.991363z m613.935112 278.082162c0 12.104086-9.807995 21.912081-21.91208 21.91208s-21.912081-9.807995-21.912081-21.91208v-183.177057c0-38.183147 15.590743-72.85129 40.73436-97.994907 25.11527-25.143616 59.811759-40.734359 97.994906-40.734359h183.205404c12.104086 0 21.912081 9.807995 21.91208 21.912081s-9.807995 21.912081-21.91208 21.91208h-183.205404c-26.079061 0-49.805337 10.686746-67.011848 27.893257s-27.893257 40.932787-27.893257 67.011848v183.177057z m278.110509-613.963459c12.104086 0 21.912081 9.807995 21.91208 21.91208s-9.807995 21.912081-21.91208 21.912081h-183.205404c-38.183147 0-72.85129-15.590743-97.994906-40.73436s-40.734359-59.840106-40.73436-97.994906V65.963016c0-12.104086 9.807995-21.912081 21.912081-21.91208s21.912081 9.807995 21.91208 21.91208v183.205404c0 26.050714 10.686746 49.77699 27.893257 66.983501 17.206511 17.234858 40.932787 27.921603 67.011848 27.921604h183.205404zM344.073525 65.963016c0-12.104086 9.807995-21.912081 21.91208-21.91208s21.912081 9.807995 21.912081 21.91208v183.205404c0 38.1548-15.590743 72.85129-40.73436 97.994906s-59.811759 40.734359-97.994906 40.73436H65.991363c-12.104086 0-21.912081-9.807995-21.912081-21.912081s9.807995-21.912081 21.912081-21.91208h183.177057c26.079061 0 49.805337-10.686746 67.011848-27.893257 17.206511-17.234858 27.893257-40.932787 27.893257-67.011848V65.963016z"
                            p-id="2413"
                            fill="#8a8a8a"
                        ></path>
                    </svg>
                </span>
                <span class="translate_close translate_icon" title="关闭">
                    <svg
                        viewBox="0 0 1024 1024"
                        version="1.1"
                        p-id="3842"
                        width="20"
                        height="20"
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
        `;
    container.innerHTML = html;
    container.classList.add('translate_panel_box');
    document.body.appendChild(container);
    this.container = container;
    // 关闭按钮
    this.close = container.querySelector('.translate_operation .translate_close');
    // 复制按钮
    this.copy = container.querySelector('.translate_operation .translate_copy');
    // 搜索按钮
    this.query = container.querySelector('.translate_operation .translate_query')
    // 放大缩小按钮
    this.enlarge_narrow = container.querySelector('.translate_operation .translate_enlarge_narrow');
    // 翻译面板大容器
    this.contentpanel = container.querySelector(".translate_contentpanel");
    // 需要翻译的内容盒子
    this.source = container.querySelector('.translate_source .translate_content');
    // 翻译后的内容盒子
    this.dest = container.querySelector('.translate_dest .translate_content');
    // 切换要翻译的语种选择框
    this.toSelectdom = container.querySelector('#translate_to');
    // 切换原文语种下拉选择
    this.fromSelectdom = container.querySelector('#translate_from');
    // 切换的外层盒子
    this.fromSelectdomFater = container.querySelector('#translate_from');
    // 头部容器
    this.header_box = container.querySelector('.translate_header');
};

//显示翻译面板
Panel.prototype.show = function () {
    this.container.classList.add('show_panel');
    // 注册拖拽事件
    this.startDrop(this.header_box, this.container);
};

//隐藏翻译面板
Panel.prototype.hide = function () {
    this.container.classList.remove('show_panel');
    document.onmousemove = null;
    this.isClickQuery = false;
    this.enlarge_narrow.setAttribute('title', '放大');
    let textarea_btn_dom = this.contentpanel.querySelector('.translate_textarea_btn');
    if (textarea_btn_dom) {
        textarea_btn_dom.remove();
    }
    this.is_enlarge_narrow_status = true;
    this.container.classList.remove('translate_panel_box_max');
    this.contentpanel.classList.remove('translate_contentpanel_max');
    this.source.classList.remove('translate_content_max');
    this.dest.classList.remove('translate_content_max');
    this.enlarge_narrow.querySelector('.translate_fangda').classList.remove('translate_hide');
    this.enlarge_narrow.querySelector('.translate_suoxiao').classList.add('translate_hide');
    document.body.classList.remove('body-popup-parent--hidden')
};

// 关闭面板事件
Panel.prototype.bindClose = function () {
    this.close.onclick = () => {
        this.hide();
        this.container.classList.remove('translate_panel_box_max');
        this.contentpanel.classList.remove('translate_contentpanel_max');
        this.enlarge_narrow.querySelector('.translate_fangda').classList.remove('translate_hide');
        this.enlarge_narrow.querySelector('.translate_suoxiao').classList.add('translate_hide');
        this.source.classList.remove('translate_content_max');
        this.dest.classList.remove('translate_content_max');
        this.is_enlarge_narrow_status = true;
    }
};

// 设置翻译面板的位置
Panel.prototype.setPos = function (pos) {
    this.container.style.top = pos.y + 'px';
    this.container.style.left = pos.x + 'px';
};

// 显示面板 执行翻译功能
Panel.prototype.showPanel = function (x, y, origin) {
    // 设置翻译面板的位置
    this.setPos({ x, y });
    // 调用翻译接口
    this.translate(origin);
    // 显示翻译面板
    this.show();
};

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
};

// 翻译函数（谷歌翻译） (origin:选中的文本内容 )
Panel.prototype.translate = function (origin = '') {
    if(!origin) return
    this.dest.innerHTML = this.loding_dom;
    if (!this.isClickQuery) {
        this.source.innerHTML = this.loding_dom;
    }
    
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

        // 判断如果字数过多 需切割分批处理
        let newArr = this.appointSplitStr(origin, 1000);
        let yuanwen = '';
        let yiwen = '';

        new Promise((reslove, reject) => {
            let temp_arr_all = [];
            for (let i = 0; i < newArr.length; i++){
                //谷歌翻译接口
                this.translate_google_api(slValue, toLang, newArr[i]).then(res => {
                    let result = res;
                    if (!!result) {
                        // 自动选择赋值检测的语种文本
                        if (i === 0) {
                            let targetDoms = this.getAttributeValueDom(this.fromSelectdom, 'option', 'value', result[2]);
                            if (targetDoms && targetDoms.length > 0) {
                                this.container.querySelector('.translate_source .translate_title').innerText = targetDoms[0].innerHTML;
                            } else {
                                this.container.querySelector('.translate_source .translate_title').innerText = result[2];
                            }
                        }
                        temp_arr_all = [...temp_arr_all, ...result[0]];
                        if (i === newArr.length -1) {
                            reslove(temp_arr_all);
                        }
                    } else {
                        reject(false);
                    }
                })
            }
        }).then(res => {
            let result = res;
            if (!!result) {
                result.forEach((item, index) => {
                    if (!this.isClickQuery) {
                        yuanwen += `<p idx="${index}" class="translate_translation">${item[1]}</p>`;
                     }
                    yiwen += `<p idx="${index}" class="translate_original">${item[0]}</p>`;
                })
                if (!this.isClickQuery) {
                    this.source.innerHTML = yuanwen;
                }
                this.dest.innerHTML = yiwen;
            } else {
                if (!this.isClickQuery) {
                    this.source.innerHTML = '处理失败';
                }
                this.dest.innerHTML = '处理失败';
            }
        })
    })
};

// 调用谷歌翻译
Panel.prototype.translate_google_api = function (slValue, toLang, origin) {
    // 谷歌翻译接口
    // sl:源语种
    // tl:目标语种
    // q:内容
    let url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${slValue}&tl=${toLang}&dt=t&q=${origin}`;
    return fetch(url).then(res => res.json());
};

// 指定个数切割字符串
Panel.prototype.appointSplitStr = function (str, num) {
    let arr = [],
        length = str.length,
        index = 0;
    for (let i = 0; i < length; i++) {
        if (i % num === 0 && i !== 0) {
            arr.push(str.slice(index, i));
            index = i;
        }
        if (i + 1 === length) {
            arr.push(str.slice(index, i + 1));
        }
    }
    return arr;
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
        e.preventDefault();
        if (!this.is_enlarge_narrow_status) return
        let { left, top } = this.getOffsetXY(panel_dom),
            { pageX, pageY } = e,
            boxX = pageX - left,
            boxY = pageY - top;
        document.onmousemove = function (e) {
            e.preventDefault();
            let { pageX, pageY } = e;
            if (pageX <= 0) { pageX = 0 }
            if (pageY <= 0) { pageY = 0 }
            panel_dom.style.left = `${pageX - boxX}px`;
            panel_dom.style.top = `${pageY - boxY}px`;
        };
        document.onmouseup = () => (document.onmousemove = null);
    };
};

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
    return { top, left }
};

// 鼠标移入移出高亮公共函数
Panel.prototype.moveAndOutFn = function (e, vdom, addOrRemove) {
    let idx = e.target.getAttribute('idx');
    e.target.classList[addOrRemove]('translate_active');
    let childs = vdom.childNodes;
    let scrollTopValue = 0;
    childs.forEach(item => {
        if (item.getAttribute('idx') === idx) {
            item.classList[addOrRemove]('translate_active');
        }
        if (parseInt(item.getAttribute('idx')) < parseInt(idx)) {
            scrollTopValue += item.scrollHeight;
        }
    })
    vdom.scrollTop = scrollTopValue;
};

// 选中文本公共方法
Panel.prototype.selectText = function (ele) {
    if (document.body.createTextRange) {
        var range = document.body.createTextRange();
        range.moveToElementText(ele);
        range.select();
    } else if (window.getSelection) {
        var selection = window.getSelection();
        var range = document.createRange();
        range.selectNodeContents(ele);
        selection.removeAllRanges();
        selection.addRange(range);
    }
};

//实例化一个翻译面板
let panel = new Panel();

// 复制全部译文
panel.copy.onclick = function () {
    panel.selectText(panel.dest);
    document.execCommand("Copy");
    window.getSelection().empty();
};

// 搜索按钮
panel.query.onclick = function () {
    // 点击搜索切换出搜索界面
    if (panel.isClickQuery) return
    let textarea = `<textarea autofocus="autofocus" placeholder="请输入" class="translate_textarea"></textarea>`;
    panel.source.innerHTML = textarea;
    panel.source.querySelector('.translate_textarea').value = panel.origintext;
    // 判断放大还是缩小状态 设置输入框的高
    if (!panel.is_enlarge_narrow_status) {
        panel.source.querySelector('.translate_textarea').classList.add('translate_textarea_max');
    }
    let queryBtn = `<button class="translate_textarea_btn">翻译</button>`;
    panel.contentpanel.querySelector('select').insertAdjacentHTML('beforebegin',queryBtn)
    panel.contentpanel.querySelector('.translate_textarea_btn').onclick = function () {
        // 开始翻译
        let textarea_value = panel.source.querySelector('.translate_textarea').value;
        panel.translate(textarea_value);
    }
    panel.source.style.height = '99%';
    panel.source.style.overflow = 'visible';
    panel.isClickQuery = true;
}

// 右击选中目标段落
panel.contentpanel.oncontextmenu = function (e) {
    e.preventDefault();
    panel.selectText(e.target);
};

// 全屏 缩放按钮
panel.enlarge_narrow.onclick = function () {
    // 判断是放大还是缩小
    if (panel.is_enlarge_narrow_status) {
        // 记录top和left的值（还原时使用)
        let { top: oldTop, left: oldLeft } = panel.getOffsetXY(panel.container);
        panel.oldTop = oldTop;
        panel.oldLeft = oldLeft;
        panel.enlarge_narrow.querySelector('.translate_fangda').classList.add('translate_hide');
        panel.enlarge_narrow.querySelector('.translate_suoxiao').classList.remove('translate_hide');
        panel.enlarge_narrow.setAttribute('title', '缩小');
        if (panel.isClickQuery) {
            panel.source.querySelector('.translate_textarea').classList.add('translate_textarea_max');
            panel.source.style.height = '99%';
            panel.source.style.overflow = 'visible';
        }
        panel.container.classList.add('translate_panel_box_max');
        panel.container.style.top = 0;
        panel.container.style.left = 0;
        // 放大缩小标志
        panel.is_enlarge_narrow_status = false;
        panel.contentpanel.classList.add('translate_contentpanel_max');
        panel.source.classList.add('translate_content_max');
        panel.dest.classList.add('translate_content_max');
        document.body.classList.add('body-popup-parent--hidden');
    } else {
        panel.container.classList.remove('translate_panel_box_max');
        panel.container.style.top = `${panel.oldTop}px`;
        panel.container.style.left = `${panel.oldLeft}px`;
        panel.contentpanel.classList.remove('translate_contentpanel_max');
        panel.source.classList.remove('translate_content_max');
        panel.dest.classList.remove('translate_content_max');
        if (panel.isClickQuery) {
            panel.source.querySelector('.translate_textarea').classList.remove('translate_textarea_max');
        }
        panel.enlarge_narrow.querySelector('.translate_fangda').classList.remove('translate_hide');
        panel.enlarge_narrow.querySelector('.translate_suoxiao').classList.add('translate_hide');
        panel.enlarge_narrow.setAttribute('title', '放大');
        panel.is_enlarge_narrow_status = true;
        panel.source.removeAttribute('style');
        document.body.classList.remove('body-popup-parent--hidden');
    }
};

// 原文语种切换事件
panel.fromSelectdom.onchange = function () {
    let key = this.selectedOptions[0].getAttribute('data-key');
    chrome.storage.sync.set({ 'sl': { key: key, value: this.value } });
    if (panel.isClickQuery) {
        let textareavalue = panel.source.querySelector('.translate_textarea').value;
        panel.translate(textareavalue);
    } else {
        panel.translate(panel.origintext);
    }
};

// 目标语种切换事件
panel.toSelectdom.onchange = function () {
    let key = this.selectedOptions[0].getAttribute('data-key');
    chrome.storage.sync.set({ 'tl': { key: key, value: this.value } });
    if (panel.isClickQuery) {
        let textareavalue = panel.source.querySelector('.translate_textarea').value;
        panel.translate(textareavalue);
    } else {
        panel.translate(panel.origintext);
    }
};

// 鼠标移入高亮 事件处理
panel.contentpanel.onmouseover = e => {
    if (e.target.className === 'translate_translation') {
        // 鼠标移入原文
        panel.moveAndOutFn(e, panel.dest, 'add');
    }
    if (e.target.className === 'translate_original') {
        // 鼠标移入译文
        panel.moveAndOutFn(e, panel.source, 'add');
    }
};

// 鼠标移出 给每一个p标签都加（原文p)
panel.contentpanel.onmouseout = function (e) {
    if (e.target.className === 'translate_translation translate_active') {
        // 鼠标移出原文
        panel.moveAndOutFn(e, panel.dest, 'remove');
    }
    if (e.target.className === 'translate_original translate_active') {
        // 鼠标移出译文
        panel.moveAndOutFn(e, panel.source, 'remove');
    }
};

// 初始化查看是否开启翻译功能
chrome.storage.sync.get(['statusValue'], function (result) {
    //如果有设置
    if (result.statusValue) {
        //把值(on / off)赋值给网页上翻译插件的状态变量
        panel.selectState = result.statusValue;
    }
});

//运行时，实时监听是否有数据传过来
chrome.runtime.onMessage.addListener(
    function (request) {
        if (request.statusValue) {
            //把用户修改的选项的值赋值给该变量
            panel.selectState = request.statusValue;
        }
    }
);

//监听鼠标的释放事件
window.onmouseup = function (e) {
    // 判断是否开启翻译
    if (panel.selectState === 'off') return
    // 判断点击的是否是外层父元素
    if (panel.isFatcher(panel.container, e.target)) return
    panel.hide();
    // 获取鼠标选中的内容
    let origin = window.getSelection().toString().trim();
    // 如果鼠标选中的内容为空 直接隐藏翻译面板
    if (!origin) {
        panel.hideIcon();
        return
    }
    // 存储选中的文本内容 备用
    panel.origintext = origin;
    // 光标释放时在页面上的位置
    let x = e.pageX;
    let y = e.pageY;
    panel.setIconP(x, y);
    panel.showIcon();
};