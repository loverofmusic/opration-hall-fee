let [designW, designH] = [null, null];

const Cfg = {
  designW: designW || 1920, //设计图宽度
  designH: designH || 1080 //设计图高度
};

let docEl = document.documentElement;
let [pageW, pageH] = [docEl.clientWidth, docEl.clientHeight];
let isWider = pageW / pageH > Cfg.designW / Cfg.designH;
let [scaleW, scaleH] = [pageW / Cfg.designW, pageH / Cfg.designH];

// set 1rem = viewWidth / 10
let rem = docEl.clientWidth / 10;
docEl.style.fontSize = rem + "px";

function getRatio(domEle) {
  if (isWider) {
    domEle.style.width = (pageH * Cfg.designW) / Cfg.designH + "px";
    domEle.style.height = "100%";
  } else {
    domEle.style.height = (pageW * Cfg.designH) / Cfg.designW + "px";
    domEle.style.width = "100%";
  }
}

let scale = isWider ? scaleH : scaleW;
export { scale, getRatio };
