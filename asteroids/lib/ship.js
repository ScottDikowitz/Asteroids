(function(){
"use strict";

  var Asteroids = window.Asteroids = window.Asteroids || {};
  var RADIUS = 8;
  var COLOR = "black";
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

  Asteroids.Ship.prototype.power = function(impulse){
    this.vel[0] += impulse[0];
    this.vel[1] += impulse[1];

    if (this.vel[0] > 2)
    this.vel[0] = 2;
    else if (this.vel[0] < -2)
    this.vel[0] = -2;

    if (this.vel[1] > 2)
    this.vel[1] = 2;
    else if (this.vel[1] < -2)
    this.vel[1] = -2;
  };


})();
