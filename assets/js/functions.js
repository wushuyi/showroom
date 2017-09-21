var helpers = {
    clamp: function (value, min, max) {
        return min < max
            ? (value < min ? min : value > max ? max : value)
            : (value < max ? max : value > min ? min : value);
    },
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
    } : false);
    document.addEventListener('touchmove', function (event) {
        event.preventDefault();
    }, supportsPassiveOption ? {
        passive: false,
        capture: true
    } : false);
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


// var queue = new createjs.LoadQueue(false);
var images = [
    "./assets/imgs/deng1.png",
    "./assets/imgs/deng2.png",
    "./assets/imgs/deng3.png",
    "./assets/imgs/bg.png",
    "./assets/imgs/normalmusic.svg",
];
// queue.loadManifest(images);
// queue.on("progress", handleFileLoad, this);
// queue.on("complete", function () {
//     setTimeout(handleComplete, 600);
// }, this);
// queue.load();
var loader = new PxLoader();
$.each(images, function (index, item) {
    loader.addImage(item);
});
var $progress = $('.progress');

loader.addProgressListener(function (e) {
    var num = parseInt(e.completedCount / e.totalCount * 100) + '%';
    $progress.text(num);
});

loader.addCompletionListener(handleComplete);
loader.start();

function handleComplete(e) {
    $('.loading').hide();

    var $el = {}, winH, winW,
        myScroll, gallery,
        pageFontSzie, dbBgMargin, bgMargin = 0, initialBeta, scale;
    $el.body = $('body');
    $el.body.append($('#tpl').html());

    $el.html = $('html');
    $el.win = $(window);
    $el.wrapper = $('.wrapper');
    $el.scroll = $('.scroll');
    $el.bg = $('.bg');
    $el.deng1 = $('.deng1');
    $el.deng2 = $('.deng2');
    $el.deng3 = $('.deng3');


    var bgScale = 11040 / 1242;
    var TILT_LIMIT = 20;


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
                var text = '作品出自：' + item.title + ' <br/> 我要学学龄: ' + item.time;
                if (item.text) {
                    text = text + ' <br/> 老师点评: <br/> ' + item.text;
                }
                captionEl.children[0].innerHTML = text;
                return true;
            },
        };

// Initializes and opens PhotoSwipe
        gallery = new PhotoSwipe($('.pswp').get(0), PhotoSwipeUI_Default, dataItems, options);
        gallery.init();
    });
    // $el.showclose.on('click', function (evt) {
    //     $el.showbox.hide();
    // });


    $.fn.ready(compute);
    $el.win.on('resize', function () {
        compute();
        setTimeout(compute, 300);
        gallery && gallery.close();
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
                transform: 'translate(' + pxToMoveX + 'px, ' + pxToMoveY + 'px) scale3d(' + scale + ', ' + scale + ', 1)'
                // transform: 'translate(' + pxToMoveX + 'px, ' + pxToMoveY + 'px) scale(' + scale + ')'
            });
            $el.deng1.css({
                transform: 'translate(' + pxToMoveX * -0.5 + 'px, ' + pxToMoveY * -0.2 + 'px) scale3d(1,1,1)'
            });
            $el.deng2.css({
                transform: 'translate(' + pxToMoveX * -0.5 + 'px, ' + pxToMoveY * -0.2 + 'px) scale3d(1,1,1)'
            });
            $el.deng3.css({
                transform: 'translate(' + pxToMoveX * -0.5 + 'px, ' + pxToMoveY * -0.2 + 'px) scale3d(1,1,1)'
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
