export const Tips = function(msgs, times) {
    var msg = msgs === undefined ? '&nbsp;' : msgs;
    var tips = document.querySelector('.tips');
    var time = times || 1000;
    if (tips) {
        tips.innerHTML = msg;
        if (window.tipsTimer) {
            clearTimeout(tipsTimer);
        }
        window.tipsTimer = setTimeout(function() {
            tips.parentNode.removeChild(tips);
        }, time);
    } else {
        var style = 'text-align:center;padding: 10px 15px;color: #ffffff;border-radius: 10px;font-size:12px;background-color:#E84442;position: fixed;z-index:10;top: 200px;left: 50%;transform: translate(-50%, 0);display: inline-block;max-width: -webkit-calc(100% - 2em);max-width: calc(100% - 2em);overflow: hidden;text-overflow: ellipsis;white-space:nowrap;';
        var html = '<span class="tips" style="' + style + '">' + msg + '</span>';
        document.body.insertAdjacentHTML('beforeend', html);
        tips = document.querySelector('.tips');
        window.tipsTimer = setTimeout(function() {
            tips.parentNode.removeChild(tips);
        }, time);
    }
};

export const Toast = {
    show: function() {
        let info = "loading...";
        const ele = `
            <div class="loading">
                <div class="loading-text">
                    <svg class="loading-icon"
                         viewBox="0 -2 59.75 60.25"
                         width="100%"
                         height="100%"
                    >
                        <path fill="#ccc"
                              d="M29.69-.527C14.044-.527 1.36 12.158 1.36 27.806S14.043 56.14 29.69 56.14c15.65 0 28.334-12.686 28.334-28.334S45.34-.527 29.69-.527zm.185 53.75c-14.037 0-25.417-11.38-25.417-25.417S15.838 2.39 29.875 2.39s25.417 11.38 25.417 25.417-11.38 25.416-25.417 25.416z"
                        />
                        <path
                            fill="none"
                            stroke="#108ee9"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeMiterlimit="10"
                            d="M56.587 29.766c.37-7.438-1.658-14.7-6.393-19.552"
                        />
                    </svg>
                    <div class="loading-info">${info}</div>
                </div>
            </div>`;
        document.body.insertAdjacentHTML('beforeend', ele);
    },
    close: function() {
        let load = document.querySelector('.loading');
        load && document.body.removeChild(load);
    }
};