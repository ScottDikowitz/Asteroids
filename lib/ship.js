(function(){
"use strict";

  var Asteroids = window.Asteroids = window.Asteroids || {};
  var RADIUS = 15;
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
  };

  Asteroids.Util.inherits(Asteroids.Ship, Asteroids.MovingObject);

  Ship.prototype.relocate = function(){
    this.pos = this.game.randomPosition();
    this.vel = [0,0];
  };

  Ship.prototype.fireBullet = function(){

    var newPos = [this.pos[0], this.pos[1]];
    var addPos = Asteroids.Util.calcVec(this.radius, this.angle);
    newPos[0] += addPos[0];
    newPos[1] += addPos[1];
    this.game.bullets.push(new Asteroids.Bullet(this.vel, newPos, this.game, this.radius));

  };

  Ship.prototype.setAngle = function(angleDiff){
    this.angle += angleDiff;

  };

  Ship.sprite = new Image();

  Ship.prototype.draw = function(ctx){
    // debugger; ctx.save();
    // ctx.translate(this.pos[0], this.pos[1]);
    ctx.save();
  ctx.translate(this.pos[0], this.pos[1]);
  ctx.rotate(this.angle * Math.PI/180);

    Ship.sprite.src = './assets/speedship.png';


    // ctx.drawImage(Asteroids.Ship.sprite, 0, 0, 58, 64, 0, 0, 58, 64);
    ctx.drawImage(Ship.sprite, 0, 0, 70, 70, -30, -30, 60, 60);
    // ctx.restore();
    ctx.restore();
  };

  Ship.prototype.move = function(ctx){
    if (this.thrust){
      var velo = Asteroids.Util.calcVec(0.70, this.angle);

      this.pos[0] += this.vel[0] + velo[0];
      this.pos[1] += this.vel[1] + velo[1];
      // delta = this.angle
      this.vel[0] = velo[0];
      this.vel[1] = velo[1];


    }
    else{
      this.pos[0] += this.vel[0];
      this.pos[1] += this.vel[1];
    }
    this.pos = this.game.wrap(this.pos);

  };

  // Ship.prototype.power = function(impulse){
  //
  //
  //   this.vel[0] += impulse[0];
  //   this.vel[1] += impulse[1];
  //
  //
  // };


})();
