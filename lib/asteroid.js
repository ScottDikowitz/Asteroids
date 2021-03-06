(function(){
"use strict";

  var Asteroids = window.Asteroids = window.Asteroids || {};

  var COLOR = "grey";
  var RADIUS = 30;

  var Asteroid = Asteroids.Asteroid = function (obj) {
  this.durability = obj.durability;
  this.pos = obj.pos;
  this.color = COLOR;
  this.speed = obj.speed || 1;
  this.radius = (this.durability == 2) ? 30 : 15;
  if (obj.left){
    this.pos[0] -= 10;
    this.vel = Asteroids.Util.smallVec(this.speed, -1);
  }
  else if (obj.right){
    this.pos[0] += 10;
    this.vel = Asteroids.Util.smallVec(this.speed, 1);
  }
  else {
    this.vel = Asteroids.Util.randomVec(this.speed);
  }
  this.game = obj.game;
  this.angle = Math.random()*360;
  this.rotate();
  this.spin = Math.random() * 2.5;
  this.removed = false;
  // this.spin = 1;
};

Asteroids.Util.inherits(Asteroids.Asteroid, Asteroids.MovingObject);

Asteroid.prototype.removeCheck = function(){
    if (this.removed === false){
      this.game.score += 10;
      this.game.scoreWindow += 10;
      if (this.durability <= 0){
        setTimeout(function(){this.game.remove(this); }.bind(this), 80);
        this.removed = true;
      }
      else if (this.durability === 1){
        setTimeout(function(){
          this.game.remove(this);
          this.removed = true;
          setTimeout(function(){
            this.game.asteroids.push(
              new Asteroids.Asteroid({ pos: [this.pos[0] - 20, this.pos[1] - 20],
                                      game: this.game,
                                      durability: 1,
                                      speed: 2.5,
                                      left: true
              }));
            this.game.asteroids.push(
              new Asteroids.Asteroid({ pos: [this.pos[0] + 20, this.pos[1] + 20],
                                      game: this.game,
                                      durability: 1,
                                      speed: 2.5,
                                      right: true
              })); }.bind(this), 0);
        }.bind(this), 80);
        this.removed = true;
      }
    }
};

Asteroid.prototype.rotate = function(){
  // setInterval(function(){this.angle += 1; }.bind(this), Math.random() * 100);
};

Asteroid.prototype.collideWith = function(otherObject){
  if (otherObject instanceof Asteroids.Ship){
    if (!otherObject.invulnerable && otherObject.shields <= 0 ){

      var that = this;
      this.game.explosions.push(new Asteroids.Explosion({pos: otherObject.pos, game: that.game}));
      this.game.removeLife();
      this.durability -= 1;
      this.removeCheck();
      // this.game.lives -= 1;
      // otherObject.relocate();
      }
      else {
        this.game.ship.takeHit(10);
      }

    }
};

Asteroid.sprite = new Image();


Asteroid.prototype.draw = function(ctx){


  ctx.save();
  ctx.translate(this.pos[0], this.pos[1]);

  ctx.rotate((this.angle + 90) * Math.PI/180);

  Asteroid.sprite.src = './assets/asteroid.png';

  // ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
  if (this.radius === 30){
    ctx.drawImage(Asteroid.sprite, 0, 140, 90, 90, -40, -40, 100, 100);
  }
  else{
    ctx.drawImage(Asteroid.sprite, 0, 140, 90, 90, -20, -20, 50, 50);
  }

  ctx.restore();


  // ctx.save();
  // ctx.fillStyle = this.color;
  // ctx.beginPath();
  // ctx.arc(
  //   this.pos[0],
  //   this.pos[1],
  //   this.radius,
  //   0,
  //   2 * Math.PI,
  //   true
  // );
  // ctx.fill();
  // ctx.restore();

};


})();
