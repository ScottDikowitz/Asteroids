(function(){
"use strict";

  var Asteroids = window.Asteroids = window.Asteroids || {};
  var RADIUS = 20;
  var COLOR = "white";
  var MAX = 1.5;
   var Ship = Asteroids.Ship = function(pos, game){
    this.vel = [0,0];
    this.pos = pos;
    this.shields = 1000;
    this.radius = RADIUS;
    this.color = COLOR;
    this.game = game;
    this.angle = 0;
    this.damaged = false;
    this.rotateSpeed = 1;
    this.thrust = false;
    this.leftTurn = false;
    this.fireSpeed = 1;
    this.speed = 1;
    this.rightTurn = false;
    this.firing = false;
    this.numShots = 0;
    this.numHits = 0;
    this.numBullets = 1;
    this.friction = 1;
    this.invulnerable = true;
    setTimeout(function(){this.invulnerable = false;}.bind(this), 3000);
    setInterval(function(){if (!this.game.paused){this.shields += 5; if (this.shields > 1000) {this.shields = 1000;}} console.log(this.shields);}.bind(this), 3000);
  };


  Asteroids.Util.inherits(Asteroids.Ship, Asteroids.MovingObject);

  Ship.prototype.weaponUpgrade = function(){
    this.numBullets += 1;
  };

  Ship.prototype.setInvulnerable = function(){
    this.invulnerable = true;
    setTimeout(function(){this.invulnerable = false;}.bind(this), 3000);
  };

  Ship.prototype.relocate = function(){
    this.pos = this.game.randomPosition();
    this.vel = [0,0];
    this.invulnerable = true;
    setTimeout(function(){this.invulnerable = false;}.bind(this), 5000);
  };
  Ship.prototype.accuracy = function(){
    if (this.numShots === 0)
      return 0;
    else
      return Math.floor((this.numHits/this.numShots) * 100) / 100;
  };

  Ship.prototype.fireBullet = function(){
    if (!this.firing){
      var newPos = [this.pos[0], this.pos[1]];
      var addPos = Asteroids.Util.calcVec(this.radius, this.angle);
      newPos[0] += addPos[0]*1.5;
      newPos[1] += addPos[1]*1.5;

      var forwardPos = [
        (this.pos[0] + Math.sin(this.angle/180 * Math.PI) * 1),
        (this.pos[1] - Math.cos(this.angle/180 * Math.PI) * 1)
      ];
      var leftPos = [
        (this.pos[0] + Math.sin(this.angle/180 * Math.PI) * 10),
        (this.pos[1] - Math.cos(this.angle/180 * Math.PI) * 10)
      ];
      var rightPos = [
        (this.pos[0] + Math.sin(this.angle/180 * Math.PI) * -10),
        (this.pos[1] - Math.cos(this.angle/180 * Math.PI) * -10)
      ];
      var angledLeft = [
        (this.pos[0] + Math.sin((this.angle - 20)/180 * Math.PI) * 5),
        (this.pos[1] - Math.cos((this.angle - 20)/180 * Math.PI) * 5)
      ];
      var angledRight = [
        (this.pos[0] + Math.sin((this.angle + 20)/180 * Math.PI) * -5),
        (this.pos[1] - Math.cos((this.angle + 20)/180 * Math.PI) * -5)
      ];

      var idx = 1;
      while (idx <= this.numBullets){
        if (idx === 1)
          this.game.bullets.push(new Asteroids.Bullet(this.vel, forwardPos, this.game, this.radius, this.angle, this.thrust));
        else if (idx === 2){
          this.game.bullets.push(new Asteroids.Bullet(this.vel, rightPos, this.game, this.radius, this.angle + 1, this.thrust));
        }
        else if (idx === 3){
          this.game.bullets.push(new Asteroids.Bullet(this.vel, leftPos, this.game, this.radius, this.angle - 1, this.thrust));
        }
        else if (idx === 4){
          this.game.bullets.push(new Asteroids.Bullet(this.vel, angledLeft, this.game, this.radius, (this.angle - 7), this.thrust));
        }
        else{
          this.game.bullets.push(new Asteroids.Bullet(this.vel, angledRight, this.game, this.radius, (this.angle + 7), this.thrust));
        }

        idx += 1;
      }

      this.firing = true;
      setTimeout(function(){this.firing = false;}.bind(this), 1150 - (this.fireSpeed * 150));
    }
  };

  Ship.prototype.collideWith = function(otherObject){

    if (otherObject instanceof Asteroids.Powerup){
      if (otherObject.power === "invincible"){
        this.setInvulnerable();
      }
      else if (otherObject.power === "weapons"){
        this.numBullets += 1;
      }
      else if (otherObject.power === "reload" && this.fireSpeed !== 6){
        this.fireSpeed += 1;
      }
      else if (otherObject.power === "life"){
        this.game.lives += 1;
      }
      this.game.remove(otherObject);
    }
  };

  Ship.prototype.takeHit = function(dmg) {
    if (!this.damaged){
      this.damaged = true;
      setTimeout(function(){this.shields -= dmg; this.damaged = false;}.bind(this), 20);
    }
  };

  Ship.prototype.setAngle = function(angleDiff){
    this.angle += (angleDiff * this.rotateSpeed);

  };

  Ship.sprite = new Image();

  Ship.prototype.draw = function(ctx){

    ctx.save();
    ctx.translate(this.pos[0], this.pos[1]);

    ctx.rotate((this.angle + 90) * Math.PI/180);

    // if (this.thrust){
    //   Ship.sprite.src = './assets/speedship-thrust.png';
    // }
    // else {
    //   Ship.sprite.src = './assets/speedship.png';
    // }
// ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
    Ship.sprite.src = './assets/speedship-merge.png';
    if (!this.thrust){
      ctx.drawImage(Ship.sprite, 0, 0, 70, 70, -30, -30, 64, 64);
    }
    else {
      ctx.drawImage(Ship.sprite, 68, 0, 70, 70, -30, -30, 64, 64);
    }

    if (this.leftTurn){
      ctx.drawImage(Ship.sprite, 204, 0, 70, 70, -30, -30, 64, 64);
    }
    else if (this.rightTurn){
      ctx.drawImage(Ship.sprite, 136, 0, 70, 70, -30, -30, 64, 64);
    }
    else if (this.thrust){
      ctx.drawImage(Ship.sprite, 68, 0, 70, 70, -30, -30, 64, 64);
    }
    else{
      ctx.drawImage(Ship.sprite, 0, 0, 70, 70, -30, -30, 64, 64);
    }

    ctx.restore();

    // if (this.invulnerable){
      // ctx.fillStyle = "green";
      ctx.save();
      // this.shields = 101;
      var alphas = [0.2, 0.5];
      var alphaColor = this.shields > 100 ? alphas[0] : alphas[1];
      var green = Math.floor(this.shields / 3.92);
      ctx.fillStyle = "rgba("+ (255 - green) + " ," + green + " , 20, " + alphaColor + ")";
      ctx.beginPath();
      ctx.arc(
        this.pos[0],
        this.pos[1],
        this.radius + 10,
        0,
        2 * Math.PI,
        true
      );
      ctx.fill();
      ctx.restore();
      // }

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

  Ship.prototype.move = function(delta){
    var velo;
    if (this.leftTurn){
      this.setAngle(-3);
    }
    else if (this.rightTurn){
      this.setAngle(3);
    }
    if (this.thrust){
      this.friction = 1;
      velo = Asteroids.Util.calcVec(this.speed, this.angle);

      this.pos[0] += this.vel[0] + velo[0];
      this.pos[1] += this.vel[1] + velo[1];
      // delta = this.angle
      this.vel[0] = velo[0];
      this.vel[1] = velo[1];
    }
    else{
      //  velo = Asteroids.Util.calcVec(0.70, this.angle);
      this.friction *= 0.9999;
      this.vel[0] *= this.friction;
      this.vel[1] *= this.friction;

      this.pos[0] += this.vel[0];
      this.pos[1] += this.vel[1];

    }

    // if (this.firing){
    //
    // }

    this.pos = this.game.wrap(this.pos);

  };


})();
