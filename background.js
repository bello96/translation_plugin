// 1.当用户在页面上选择了文本内容并鼠标右键后，会有该插件的一个菜单选项；
// 2.点击该菜单选项，跳转到一个新标签页，内容是百度翻译刚才选中的文本
// 3.时刻运行，即使关闭划词翻译功能

chrome.runtime.onInstalled.addListener(function () {
    // 创建一个chrome的 menu（页面上右键时出现的菜单）
    chrome.contextMenus.create({
        // 唯一id
        "id": "translate_baidu",
        // title 是当用户右键页面后，在页面上显示的该插件的名字
        "title": "百度翻译： %s",
        // 只有鼠标选中了内容，右键后才会出现插件menu
        "contexts": ["selection"]
    });
});

//监听点击事件,当菜单被点击时触发该事件
chrome.contextMenus.onClicked.addListener(function (info) {
    if (info.menuItemId === 'translate_baidu') {
        // 创建并跳转到一个新标签页
        chrome.tabs.create({ url: `https://fanyi.baidu.com/#lang-auto/lang-auto/${info.selectionText}` })
    }
})
