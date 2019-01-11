import React from 'react'
import ReactDom from 'react-dom'

export const main = function (Main) {
    ReactDom.render(<Main />, document.getElementById('root'));
};

export const scrollAnimation = function (currentY, targetY) {
    /**
     * 动画垂直滚动到页面指定位置
     * @param { Number } currentY 当前位置
     * @param { Number } targetY 目标位置
     */

        // 计算需要移动的距离
    let needScrollTop = targetY - currentY;
    let _currentY = currentY;

    setTimeout(() => {
        // 一次调用滑动帧数，每次调用会不一样
        const dist = Math.ceil(needScrollTop / 5);
        _currentY += dist;
        window.scrollTo(_currentY, currentY);
        // 如果移动幅度小于十个像素，直接移动，否则递归调用，实现动画效果
        if (needScrollTop > 10 || needScrollTop < -10) {
            utils.scrollAnimation(_currentY, targetY)
        } else {
            window.scrollTo(_currentY, targetY)
        }
    }, 0)
};



function getBrowser() {
    var ua = window.navigator.userAgent;
    /**
     * 不要随意直接在getOs中添加任何新属性，如果添加，一定要添加形如ua.match(/android [\d\.]+/i)格式的正则
     */
    var getOs = {
        android: ua.match(/android [\d\.]+/i),
        ios: ua.match(/(iphone|ipad|ipod|itouch);[\w\s]+[\d_]+/i),
        mac: ua.match(/mac[\w\s]+[\d_]+/i),
        windows: ua.match(/windows[\w\s]+[\d\.]+/i),
        ie: ua.match(/(Edge|ie|rv)[\/\s:][\d.]+/i),
        weixin: ua.match(/micromessenger\/[\d\.]+/i),
        mqqbrowser: ua.match(/mqqbrowser\/[\d\.]+/i),
        weibo: ua.match(/weibo[\d\._]+/i),
        qq: ua.match(/qq\/[\d\._]+/i),
        chrome: ua.match(/chrome[\/\s]+[\d\._]+/i),
    };
    var tmpVersion = {};
    for (var i in getOs) {
        if (getOs.hasOwnProperty(i)) {
            if (getOs[i]) {
                var result = getOs[i][0];
                var version = result.match(/[\d\._]+/)[0];
                version = version.replace(/^_+|_+$/g, '');
                version = version.replace(/_+/g, '.');
                tmpVersion[i + 'V'] = version;
                getOs[i] = true;
            }
        }
    }
    getOs = Object.assign({}, getOs, tmpVersion);
    getOs.mobile = /mobile/i.test(ua) ? true : null;
    getOs.nettype = /nettype/i.test(ua) ? ua.match(/nettype\/\w+/i)[0].split('/')[1].toLowerCase() : null;
    getOs.tbs = /tbs/i.test(ua) ? ua.match(/tbs\/\d+/i)[0].split('/')[1] : null;
    if (getOs.chrome && getOs.chromeV.match(/\d+/ > 100)) {
        getOs.chrome = null;
        getOs.chromeV = null;
    }
    return getOs;
};
export const browser = getBrowser();


