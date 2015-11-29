(function(){
"use strict";

  var Asteroids = window.Asteroids = window.Asteroids || {};
  var RADIUS = 8;
  var COLOR = "black";
  var MAX = 1.5;
  Asteroids.Ship = function(pos, game){
    this.vel = [0,0];
    this.pos = pos;
    this.radius = RADIUS;
    this.color = COLOR;
    this.game = game;
  };

  Asteroids.Util.inherits(Asteroids.Ship, Asteroids.MovingObject);

  Asteroids.Ship.prototype.relocate = function(){
    this.pos = this.game.randomPosition();
    this.vel = [0,0];
  };

  Asteroids.Ship.prototype.fireBullet = function(){
    this.game.bullets.push(new Asteroids.Bullet(this.vel, this.pos, this.game, this.radius));

  };

  Asteroids.Ship.prototype.power = function(impulse){

    if (this.vel[1] < 0 && impulse[1] > 0){
      impulse[1] = 1.1;
    }
    else if (this.vel[1] > 0 && impulse[1] < 0){
      impulse[1] = -1.1;
    }

    if (this.vel[0] < 0 && impulse[0] > 0){
      impulse[0] = 1.1;
    }
    else if (this.vel[0] > 0 && impulse[0] < 0){
      impulse[0] = -1.1;
    }

    this.vel[0] += impulse[0];
    this.vel[1] += impulse[1];

    if (this.vel[0] > MAX)
    this.vel[0] = MAX;
    else if (this.vel[0] < -MAX)
    this.vel[0] = -MAX;

    if (this.vel[1] > MAX)
    this.vel[1] = MAX;
    else if (this.vel[1] < -MAX)
    this.vel[1] = -MAX;
  };


})();
