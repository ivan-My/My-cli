import axios from 'axios';

export const wxShare = function() {
    //let imgUrl = document.querySelector('.shareimg img').src;
    let imgUrl = '';
    const data = {
        title: '寻找下一个马克西姆',
        desc: '2018雅马哈CLAVINOVA数码钢琴挑战赛火热开赛',
        link: 'http://' + location.host,
        imgUrl: imgUrl,
    };
    axios.post("/video/ShareInfo").then(res => {
        data = Object.assign(data, res.data);
        wx.config(Object.assgin(data, {
            debug: false,
            jsApiList: [
                "checkJsApi",
                "onMenuShareTimeline",
                "onMenuShareAppMessage",
            ]
        }))
        wx.ready(function() {
            wx.onMenuShareTimeline(data);
            wx.onMenuShareAppMessage(data);
        });
    })
};