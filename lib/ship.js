(function(){
"use strict";

  var Asteroids = window.Asteroids = window.Asteroids || {};
  var RADIUS = 20;
  var COLOR = "white";
  var MAX = 1.5;
   var Ship = Asteroids.Ship = function(pos, game){
    this.vel = [0,0];
    this.pos = pos;
    this.radius = RADIUS;
    this.color = COLOR;
    this.game = game;
    this.angle = 0;
    this.thrust = false;
    this.leftTurn = false;
    this.rightTurn = false;
    this.firing = false;
    this.invulnerable = true;
    setTimeout(function(){this.invulnerable = false;}.bind(this), 3000);
  };


  Asteroids.Util.inherits(Asteroids.Ship, Asteroids.MovingObject);

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

  Ship.prototype.fireBullet = function(){
    if (!this.firing){
      var newPos = [this.pos[0], this.pos[1]];
      var addPos = Asteroids.Util.calcVec(this.radius, this.angle);
      newPos[0] += addPos[0]*1.5;
      newPos[1] += addPos[1]*1.5;
      this.game.bullets.push(new Asteroids.Bullet(this.vel, newPos, this.game, this.radius, this.angle, this.thrust));
      this.firing = true;
      setTimeout(function(){this.firing = false;}.bind(this), 1000);
    }
  };

  Ship.prototype.collideWith = function(otherObject){

    if (otherObject instanceof Asteroids.Powerup){
      this.setInvulnerable();
      this.game.remove(otherObject);
    }
  };

  Ship.prototype.setAngle = function(angleDiff){
    this.angle += angleDiff;

  };

  Ship.sprite = new Image();

  Ship.prototype.draw = function(ctx){

    ctx.save();
    ctx.translate(this.pos[0], this.pos[1]);

    ctx.rotate((this.angle + 90) * Math.PI/180);

    Ship.sprite.src = './assets/speedship.png';

    ctx.drawImage(Ship.sprite, 0, 0, 70, 70, -30, -30, 60, 60);

    ctx.restore();

    if (this.invulnerable){
      // ctx.fillStyle = "green";
      ctx.save();
      ctx.fillStyle = "rgba(20, 255, 20, 0.2)";
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
      }
  };

  Ship.prototype.move = function(ctx){
    var velo;
    if (this.leftTurn){
      this.angle -= 2;
    }
    else if (this.rightTurn){
      this.angle += 2;
    }
    if (this.thrust){
      velo = Asteroids.Util.calcVec(0.70, this.angle);

      this.pos[0] += this.vel[0] + velo[0];
      this.pos[1] += this.vel[1] + velo[1];
      // delta = this.angle
      this.vel[0] = velo[0];
      this.vel[1] = velo[1];



    }
    else{
      //  velo = Asteroids.Util.calcVec(0.70, this.angle);
      this.pos[0] += this.vel[0];
      this.pos[1] += this.vel[1];

    }

    // if (this.firing){
    //
    // }

    this.pos = this.game.wrap(this.pos);

  };


})();
