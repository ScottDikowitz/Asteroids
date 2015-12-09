(function(){
"use strict";

  var Asteroids = window.Asteroids = window.Asteroids || {};

  var COLOR = "grey";
  var RADIUS = 30;

  var Asteroid = Asteroids.Asteroid = function (obj) {
  this.durability = obj.durability;
  this.pos = obj.pos;
  this.color = COLOR;
  this.radius = RADIUS;
  this.vel = Asteroids.Util.randomVec(1);
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
      if (this.durability <= 0){
        setTimeout(function(){this.game.remove(this); }.bind(this), 80);
        this.removed = true;
      }
      else if (this.durability === 1){
        setTimeout(function(){
          this.game.remove(this);
          this.game.asteroids.push(
            new Asteroids.Asteroid({ pos: [this.pos[0] - 20, this.pos[1] - 20],
                                    game: this.game,
                                    durability: 1
            }));
          this.game.asteroids.push(
            new Asteroids.Asteroid({ pos: [this.pos[0] + 20, this.pos[1] + 20],
                                    game: this.game,
                                    durability: 1
            }));
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
    if (!otherObject.invulnerable){
      this.game.removeLife();
      // this.game.lives -= 1;
      // otherObject.relocate();
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
  ctx.drawImage(Asteroid.sprite, 0, 140, 90, 90, -40, -40, 100, 100);

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
