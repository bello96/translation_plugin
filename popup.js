// 此文件用来设置是否开启划词翻译功能
// 每次点开都会执行

//获取弹出层中的switch按钮
let selectNode = document.querySelector('.container_popup .switch-input')
//默认划词翻译功能是关闭状态
let statusValue = 'off'

// 每次初始化都需要查询是否开启 划词翻译 功能，控制按钮样式
chrome.storage.sync.get(['switchStatus'], function (res) {
    // 通过获取 switch 值控制switch按钮的显示样式（打开or关闭）
    if (res.switchStatus === 'on') {
        selectNode.classList.add('checked')
    } else {
        selectNode.classList.remove('checked')
    }
});

// 给按钮注册点击事件
selectNode.onclick = function () {
    if (statusValue === 'off') {
        statusValue = 'on'
        selectNode.classList.add('checked')
    } else {
        statusValue = 'off'
        selectNode.classList.remove('checked')
    }
    // 存储是否开启翻译功能的状态值
    chrome.storage.sync.set({ switchStatus: statusValue })

    // 通知 content.js 用户选择的是开启还是关闭
    // 由于chrome浏览器上可能开启了多个窗口&标签页，所以需要先找到currentWindow，和当前活动的网页 active
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        // 给当前标签页发送信息（筛选出来的该标签的第一个的id）
        chrome.tabs.sendMessage(tabs[0].id, { switch: statusValue })
    })
}
