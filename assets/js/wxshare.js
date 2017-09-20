var wxshare = (function () {
    function wxshareFriend(_shareTitle, _descContent, _lineLink, _imgUrl) {
        if (wx) {
            wx.onMenuShareAppMessage({
                title: _shareTitle,
                desc: _descContent,
                link: _lineLink,
                imgUrl: _imgUrl,
                success: function () {
                },
                cancel: function () {
                }
            });
        }
    }

    function wxshareTimeline(_shareTitle, _lineLink, _imgUrl) {
        if (wx) {
            wx.onMenuShareTimeline({
                title: _shareTitle,
                link: _lineLink,
                imgUrl: _imgUrl,
                success: function () {
                },
                cancel: function () {
                }
            });
        }
    }

    function wxshareQQ(_shareTitle, _descContent, _lineLink, _imgUrl) {
        if (wx) {
            wx.onMenuShareQQ({
                title: _shareTitle,
                desc: _descContent,
                link: _lineLink,
                imgUrl: _imgUrl,
                success: function () {
                },
                cancel: function () {
                }
            });
        }
    }

    function wxshareWeibo(_shareTitle, _descContent, _lineLink, _imgUrl) {
        if (wx) {
            wx.onMenuShareWeibo({
                title: _shareTitle,
                desc: _descContent,
                link: _lineLink,
                imgUrl: _imgUrl,
                success: function () {
                },
                cancel: function () {
                }
            });
        }
    }

    function wxshareQZone(_shareTitle, _descContent, _lineLink, _imgUrl) {
        if (wx) {
            wx.onMenuShareQZone({
                title: _shareTitle,
                desc: _descContent,
                link: _lineLink,
                imgUrl: _imgUrl,
                success: function () {
                },
                cancel: function () {
                }
            });
        }
    }

    function setWx(opts) {
        if (!wx) {
            return false;
        }
        let initData = opts.initData;
        let setData = opts.setData;

        wx.config({
            appId: initData.appid,
            timestamp: initData.timestamp,
            nonceStr: initData.noncestr,
            signature: initData.signature,
            jsApiList: ['onMenuShareAppMessage', 'onMenuShareTimeline', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone']
        });

        let shareTitle = setData.title || shareMsg.common.title,
            descContent = setData.descContent || shareMsg.common.descContent,
            lineLink = window.location.href,
            imgUrl = setData.imgUrl || shareMsg.common.imgUrl;


        wx.ready(function () {
            wxshareWeibo(shareTitle, descContent, lineLink, imgUrl);
            wxshareQZone(shareTitle, descContent, lineLink, imgUrl);
            wxshareQQ(shareTitle, descContent, lineLink, imgUrl);
            wxshareFriend(shareTitle, descContent, lineLink, imgUrl);
            wxshareTimeline(shareTitle, lineLink, imgUrl);
        });
    };

    return {
        Friend: wxshareFriend,
        Timeline: wxshareTimeline,
        QQ: wxshareQQ,
        Weibo: wxshareWeibo,
        QZone: wxshareQZone,
        init: setWx,
    };
})();
