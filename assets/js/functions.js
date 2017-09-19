var helpers = {
    propertyCache: {},
    vendors: [null, ['-webkit-', 'webkit'], ['-moz-', 'Moz'], ['-o-', 'O'], ['-ms-', 'ms']],

    clamp: function (value, min, max) {
        return min < max
            ? (value < min ? min : value > max ? max : value)
            : (value < max ? max : value > min ? min : value);
    },

    data: function (element, name) {
        return helpers.deserialize(element.getAttribute('data-' + name));
    },

    deserialize: function (value) {
        if (value === 'true') {
            return true;
        } else if (value === 'false') {
            return false;
        } else if (value === 'null') {
            return null;
        } else if (!isNaN(parseFloat(value)) && isFinite(value)) {
            return parseFloat(value);
        } else {
            return value;
        }
    },

    camelCase: function (value) {
        return value.replace(/-+(.)?/g, (match, character) => {
            return character ? character.toUpperCase() : '';
        });
    },

    accelerate: function (element) {
        helpers.css(element, 'transform', 'translate3d(0,0,0) rotate(0.0001deg)');
        helpers.css(element, 'transform-style', 'preserve-3d');
        helpers.css(element, 'backface-visibility', 'hidden');
    },

    transformSupport: function (value) {
        let element = document.createElement('div'),
            propertySupport = false,
            propertyValue = null,
            featureSupport = false,
            cssProperty = null,
            jsProperty = null;
        for (let i = 0, l = helpers.vendors.length; i < l; i++) {
            if (helpers.vendors[i] !== null) {
                cssProperty = helpers.vendors[i][0] + 'transform';
                jsProperty = helpers.vendors[i][1] + 'Transform';
            } else {
                cssProperty = 'transform';
                jsProperty = 'transform';
            }
            if (element.style[jsProperty] !== undefined) {
                propertySupport = true;
                break;
            }
        }
        switch (value) {
            case '2D':
                featureSupport = propertySupport;
                break;
            case '3D':
                if (propertySupport) {
                    let body = document.body || document.createElement('body'),
                        documentElement = document.documentElement,
                        documentOverflow = documentElement.style.overflow,
                        isCreatedBody = false;

                    if (!document.body) {
                        isCreatedBody = true;
                        documentElement.style.overflow = 'hidden';
                        documentElement.appendChild(body);
                        body.style.overflow = 'hidden';
                        body.style.background = '';
                    }

                    body.appendChild(element);
                    element.style[jsProperty] = 'translate3d(1px,1px,1px)';
                    propertyValue = window.getComputedStyle(element).getPropertyValue(cssProperty);
                    featureSupport = propertyValue !== undefined && propertyValue.length > 0 && propertyValue !== 'none';
                    documentElement.style.overflow = documentOverflow;
                    body.removeChild(element);

                    if (isCreatedBody) {
                        body.removeAttribute('style');
                        body.parentNode.removeChild(body);
                    }
                }
                break;
        }
        return featureSupport;
    },

    css: function (element, property, value) {
        let jsProperty = helpers.propertyCache[property];
        if (!jsProperty) {
            for (let i = 0, l = helpers.vendors.length; i < l; i++) {
                if (helpers.vendors[i] !== null) {
                    jsProperty = helpers.camelCase(helpers.vendors[i][1] + '-' + property);
                } else {
                    jsProperty = property;
                }
                if (element.style[jsProperty] !== undefined) {
                    helpers.propertyCache[property] = jsProperty;
                    break;
                }
            }
        }
        element.style[jsProperty] = value;
    }
};

// ios 10 禁止缩放
(function () {
    var supportsPassiveOption = false;
    try {
        var opts = Object.defineProperty({}, 'passive', {
            get: function () {
                supportsPassiveOption = true;
            }
        });
        window.addEventListener('test', null, opts);
    } catch (e) {
    }

    document.addEventListener('touchstart', function (event) {
        if (event.touches.length > 1) {
            event.preventDefault();
        }
    }, supportsPassiveOption ? {
        passive: false,
        capture: true
    } : true);
    document.addEventListener('touchmove', function (event) {
        event.preventDefault();
    }, supportsPassiveOption ? {
        passive: false,
        capture: true
    } : true);
    var lastTouchEnd = 0;
    document.addEventListener('touchend', function (event) {
        var now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
            1;
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, supportsPassiveOption ? {
        passive: false,
        capture: false
    } : false);
})();

var queue = new createjs.LoadQueue();
var images = [
    "./assets/imgs/back-arrows.svg",
    "./assets/imgs/close.svg",
    "./assets/imgs/deng2.png",
    "./assets/imgs/img1.png",
    "./assets/imgs/img4.png",
    "./assets/imgs/bg.png",
    "./assets/imgs/deng1.png",
    "./assets/imgs/deng3.png",
    "./assets/imgs/img3.png",
    "./assets/imgs/normalmusic.svg",
];
queue.loadManifest(images);
queue.on("progress", handleFileLoad, this);
queue.on("complete", function () {
    setTimeout(handleComplete, 600);
}, this);
queue.load();
var $progress = $('.progress');

function handleFileLoad(e) {
    $progress.text(parseInt(e.loaded * 100) + '%');
}

function handleComplete(e) {
    $('.loading').hide();
    $('body').append($('#tpl').html());
    var $el = {}, winH, winW,
        myScroll, textScroll,
        pageFontSzie, dbBgMargin, bgMargin = 0, initialBeta, scale;
    var bgScale = 11040 / 1242;
    var TILT_LIMIT = 20;

    $el.html = $('html');
    $el.body = $('body');
    $el.win = $(window);
    $el.wrapper = $('.wrapper');
    $el.scroll = $('.scroll');
    $el.bg = $('.bg');
    $el.deng1 = $('.deng1');
    $el.deng2 = $('.deng2');
    $el.deng3 = $('.deng3');

    $el.showbox = $('.showbox');
    $el.showclose = $('.showclose');
    $el.text = $el.showbox.find('.showtext');
    $el.img = $el.bg.find('.img');
    $el.audio_btn = $('#audio_btn');

    function compute() {
        pageFontSzie = parseFloat($el.html.prop('style').fontSize);
        winH = $el.win.height();
        winW = $el.win.width();
        if (winH > winW) {
            $el.html.addClass('vertical');
        } else {
            $el.html.removeClass('vertical');
        }
        $el.wrapper.css({
            width: winW,
            height: winH,
        });

        dbBgMargin = hotcss.px2rem(TILT_LIMIT * 2) * pageFontSzie;
        scale = (dbBgMargin + winH) / winH;
        bgMargin = dbBgMargin / 2;
        var scrollWidth = winH * bgScale * scale - dbBgMargin;
        var bgMarginLeft = (scrollWidth - winH * bgScale) / 2;
        // var res = scrollWidth - (winH * bgScale) / 2
        $el.scroll.css({
            width: scrollWidth,
        });
        // //
        $el.bg.css({
            marginLeft: bgMarginLeft,
        });

        // $el.bg.css({
        //     transform: ''
        // });

        if (!myScroll) {
            myScroll = new IScroll($el.wrapper.get(0), {
                scrollX: true,
                scrollY: false,
                bounce: false,
                HWCompositing: false,
                // momentum: false,
            });
            // textScroll = new IScroll($el.text.get(0), {
            //     scrollX: false,
            //     scrollY: true,
            //     bounce: false,
            //     HWCompositing: false,
            //     // momentum: false,
            // });
        } else {
            myScroll.refresh();
            // textScroll.refresh();
        }
        initialBeta = undefined;
    }

    $el.img.on('click', function (evt) {
        // $el.showbox.show();
        // textScroll.refresh();
        var $this = $(this);
        var index = $el.img.index($this);


// build items array
        var items = [
            {
                src: './assets/imgs/img1.png',
                w: 1632,
                h: 1244,
                title: '阿王',
                time: '298天',
                text: '　　“作者这幅钢笔速写建筑物风景作品 ，作者在建筑物细节方面的处理还是非常细致的，尤其是屋檐特别提神；作者用了比较强的对比度来体现了其体积感，视觉冲击力很大。背景的植物虚化的非常到位做到了陪衬的效果。”——我要学平台亓老师',
            },
            {
                src: './assets/imgs/img3.png',
                w: 600 * 2,
                h: 900 * 2,
                title: '腹有诗书气自华',
                time: '393天',
                text: '　　“同学你好，这张工笔作品画的感觉还是非常不错的，整个作品的线条流畅自然有力道，叶子与花瓣的晕染都非常自然，最后花蕾的点缀都表现的非常到位，是一张非常棒的作品。”——我要学平台谷老师',
            },
            {
                src: './assets/imgs/img4.png',
                w: 1714,
                h: 3264,
                title: '海洋',
                time: '41天',
                text: '　　“同学，你好，这三幅画着重体现了你对于光影的把控，在画面层次尤其是灰度和高光的理解上有了自己的见解，所以整体的画面感是非常不错的，希望有时间和大家分享你的技法和心得。”——我要学平台韩老师',
            }
        ];

// define options (if needed)
        var options = {
            // optionName: 'option value'
            // for example:
            index: index,
            shareEl: false,
            arrowKeys: false,
            arrowEl: false,
            zoomEl: false,
            loop: true,
            pinchToClose: true,
            addCaptionHTMLFn: function (item, captionEl, isFake) {
                // if (!item.author) {
                //     captionEl.children[0].innerText = '';
                //     return false;
                // }
                captionEl.children[0].innerHTML = '作品出自：' + item.title + ' <br/> 我要学学龄: ' + item.time + ' <br/> 老师点评: <br/> ' + item.text;
                return true;
            },
        };

// Initializes and opens PhotoSwipe
        var gallery = new PhotoSwipe($('.pswp').get(0), PhotoSwipeUI_Default, items, options);
        gallery.init();
        window.gallery = gallery;
    });
    // $el.showclose.on('click', function (evt) {
    //     $el.showbox.hide();
    // });


    $.fn.ready(compute);
    $el.win.on('resize', function () {
        compute();
        setTimeout(compute, 300);
        gallery.close();
    });

    var swiftclick = SwiftClick.attach(document.body);


    var cssPropNamePrefixes = ['O', 'MS', 'Moz', 'Webkit'];

    var deviceOrientation = FULLTILT.getDeviceOrientation({'type': 'world'});
    deviceOrientation.then(function (orientationData) {

        orientationData.listen(function () {

            var box = {
                minBoundX: -bgMargin,
                minBoundY: -bgMargin,
                maxBoundX: bgMargin,
                maxBoundY: bgMargin,
            };


            // Display calculated screen-adjusted deviceorientation

            var euler = orientationData.getScreenAdjustedEuler();

            if (euler.beta > 85 && euler.beta < 95) {
                return;
            }
            if (!initialBeta) {
                initialBeta = euler.beta;
            }
            var tiltX = euler.gamma;
            var tiltY = euler.beta - initialBeta;

            tiltX = helpers.clamp(tiltX, -TILT_LIMIT, TILT_LIMIT);
            tiltY = helpers.clamp(tiltY, -TILT_LIMIT, TILT_LIMIT);

            var pxOffsetX = (tiltX * winW / 10) / TILT_LIMIT;
            var pxOffsetY = (tiltY * winW / 10) / TILT_LIMIT;

            var pxToMoveX = Math.max(box.minBoundX, Math.min(pxOffsetX, box.maxBoundX));
            var pxToMoveY = Math.max(box.minBoundY, Math.min(pxOffsetY, box.maxBoundY));
            $el.bg.css({
                transform: 'translate(' + pxToMoveX + 'px, ' + pxToMoveY + 'px) scale(' + scale + ')'
            });
            $el.deng1.css({
                transform: 'translate(' + pxToMoveX * -0.5 + 'px, ' + pxToMoveY * -0.2 + 'px)'
            });
            $el.deng2.css({
                transform: 'translate(' + pxToMoveX * -0.5 + 'px, ' + pxToMoveY * -0.2 + 'px)'
            });
            $el.deng3.css({
                transform: 'translate(' + pxToMoveX * -0.5 + 'px, ' + pxToMoveY * -0.2 + 'px)'
            });
        });

    });

//sound
    var sound = new Howl({
        src: ['./assets/sound/bg.mp3'],
        loop: true,
        volume: 0.5,
        perload: true,
    });
    sound.play();
    sound.on('play', function () {
        $el.audio_btn.addClass('rotate');
    });
    sound.on('pause', function () {
        $el.audio_btn.removeClass('rotate');
    });
    $el.audio_btn.on('click', function () {
        var playing = sound.playing();
        playing ? sound.pause() : sound.play();
    });


}