const spriteDefs = {
  screenBorderTopLeft: {x: 0, y: 0, w: 8, h: 8, pattern: false},
  screenBorderTopRight: {x: 16, y: 0, w: 8, h: 8, pattern: false},
  screenBorderBottomLeft: {x: 0, y: 16, w: 8, h: 8, pattern: false},
  screenBorderBottomRight: {x: 16, y: 16, w: 8, h: 8, pattern: false},
  screenBorderTop: {x: 8, y: 0, w: 8, h: 8, pattern: true},
  screenBorderLeft: {x: 0, y: 8, w: 8, h: 8, pattern: true},
  screenBorderBottom: {x: 8, y: 16, w: 8, h: 8, pattern: true},
  screenBorderRight: {x: 16, y: 8, w: 8, h: 8, pattern: true},
  screenBackground: {x: 8, y: 8, w: 8, h: 8, pattern: true},
  iPiece: {x: 24, y: 32, w: 32, h: 8, pattern: false},
  tPiece: {x: 0, y: 24, w: 24, h: 16, pattern: false},
  sPiece: {x: 64, y: 0, w: 24, h: 16, pattern: false},
  zPiece: {x: 40, y: 0, w: 24, h: 16, pattern: false},
  lPiece: {x: 24, y: 16, w: 24, h: 16, pattern: false},
  jPiece: {x: 48, y: 16, w: 24, h: 16, pattern: false},
  oPiece: {x: 24, y: 0, w: 16, h: 16, pattern: false}
};
let sprites = {
  currentTemplate: "6ix9ine"
};
function loadTemplate(dir, name) {
  if (name && sprites.currentTemplate && name != sprites.currentTemplate) {
    function templateLoaded(e) {
      for (let [key, val] of Object.entries(spriteDefs)) {
        sprites[key].context.clearRect(0, 0, val.w, val.h);
        sprites[key].context.drawImage(e.target, -val.x, -val.y);
        if (val.pattern) {
          sprites[key].pattern = ctx.createPattern(sprites[key].sprite, "repeat");
        }
      }
      //drawRotatedPieces();
    }
    if (sprites[name]) {
      templateLoaded({target: sprites[name]});
    }
    else {
      sprites[name] = new Image();
      sprites[name].src = dir;
      sprites[name].onload = templateLoaded;
    }
    sprites.currentTemplate = name;
  }
}
function createOffscreenCanvases() {
  for (const [key, val] of Object.entries(spriteDefs)) {
    sprites[key] = {};
    sprites[key].sprite = document.createElement("canvas");
    sprites[key].sprite.width = val.w;
    sprites[key].sprite.height = val.h;
    sprites[key].context = sprites[key].sprite.getContext("2d");
  }
  //tetrominos can be found in defs.js
  for (let key of Object.keys(tetrominos)) {
    let len = tetrominos[key].bits.length;
    let bboxwidth = (tetrominos[key].bits[0].length - 2) * tileSize;
    for (let i = 0; i < len; i++) {
      tetrominos[key].tex[i] = document.createElement("canvas");
      tetrominos[key].tex[i].width = bboxwidth;
      tetrominos[key].tex[i].height = bboxwidth;
    }
  }
}
