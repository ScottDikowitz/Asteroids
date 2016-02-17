(function(){
"use strict";

  var Asteroids = window.Asteroids = window.Asteroids || {};
  var RADIUS = 5;
  var COLOR = "red";
  var Explosion = Asteroids.Explosion = function(obj){
    this.pos = obj.pos;
    this.radius = RADIUS;
    this.color = COLOR;
    this.index = 0;
    this.game = obj.game;
  };

  Explosion.sprite = new Image();
  Explosion.prototype.draw = function(ctx) {

    if (this.index > 81) {
      this.game.remove(this);
    }
    ctx.save();
    ctx.translate(this.pos[0], this.pos[1]);


    var rows = 9;
    var cols = 9;
    var width = 100;
    var height = 100;

    var x = this.index % (cols - 1) * width;
    var y = Math.floor(this.index / (rows - 1)) * height;
    Explosion.sprite.src = './assets/explosion-sheet.png';
    ctx.drawImage(Explosion.sprite, x, y, 100, 100, -30, -30, 64, 64);
    this.index += 1;
    ctx.restore();
  };

})();
