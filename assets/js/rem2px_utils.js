/*
用法:

1. 将编译出的 rem 转成 px 用于在chrome上调整
Design.setDom($0, Design.rem_px(`
    background: red;
    opacity: 0.5;
    width: 14.89082rem;
    height: 13.47633rem;
    position: absolute;
    top: 8.143rem;
    left: 0.54106rem;
    border-radius: 0.32077rem;
`))

2. 将px转成 px2rem 用于保存到 scss文件
Design.px_px2rem(`
    background: red;
    opacity: 0.5;
    width: 1156px;
    height: 1046px;
    position: absolute;
    top: 632px;
    left: 42px;
    border-radius: 25px;
`)

3. rem 转成 px 用于从 scss文件中复制源代码 直接在 chrome 上生效// 此方法没 appendCss 给力
Design.setDom($0, Design.px2rem_px(`
  width: px2rem(385.3);
  height: px2rem(348.7);
  position: absolute;
  top: px2rem(210.7);
  left: px2rem(14.0);
  border-radius: px2rem(8.3);
`))

4.  rem 转成 px 用于从 scss文件中复制源代码 直接在 chrome 上生效
Design.appendCss(`.containers-UITest2-___style__hftpBox___1USc-`, Design.px2rem_px(`
  width: px2rem(385.3);
  height: px2rem(348.7);
  position: absolute;
  top: px2rem(210.7);
  left: px2rem(14.0);
  border-radius: px2rem(8.3);
`))
 */

window.Design = (function () {
  function px_px2rem(str) {
    return str.replace(/(-?\d+)px/g, function (match, p1, offset, str) {
      return `px2rem(${(p1 / hotcss.dpr).toFixed(1)})`;
    });
  }

  function px2rem_px(str) {
    return str.replace(/px2rem\((-?\d+(?:.\d+))\)/g, function (match, p1, offset, str) {
      return `${Math.round(p1 * hotcss.dpr)}px`;
    });
  }

  function rem_px(str) {
    let fontSzie = parseFloat(document.documentElement.style.fontSize.split('px')[0]);
    return str.replace(/(-?\d+(?:.\d+))rem/g, function (match, p1, offset, str) {
      return `${Math.round(p1 * fontSzie)}px`;
    });
  }

  function str2obj(str) {
    let res = str.split(';');
    let obj = {};
    res = res.forEach(function (item, index) {
      item = $.trim(item);
      item = item.split(':');
      if (item[0]) {
        obj[item[0]] = item[1];
      }
    });

    return obj;
  }

  function setDom(el, str) {
    $(el).css(str2obj(str));
  }

  function appendCss(className, str) {
    let style = document.createElement('style');
    style.textContent = ` ${className}{
      ${str}
    }`;
    document.head.appendChild(style);
  }

  return {
    px_px2rem: px_px2rem,
    px2rem_px: px2rem_px,
    rem_px: rem_px,
    str2obj: str2obj,
    setDom: setDom,
    appendCss: appendCss
  };

})();
