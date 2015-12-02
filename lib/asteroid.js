(function(){
"use strict";

  var Asteroids = window.Asteroids = window.Asteroids || {};

  var COLOR = "grey";
  var RADIUS = 20;

  Asteroids.Asteroid = function (obj) {

  this.pos = obj.pos;
  this.color = COLOR;
  this.radius = RADIUS;
  this.vel = Asteroids.Util.randomVec(1);
  this.game = obj.game;
};

Asteroids.Util.inherits(Asteroids.Asteroid, Asteroids.MovingObject);

Asteroids.Asteroid.prototype.collideWith = function(otherObject){
  if (otherObject instanceof Asteroids.Ship){
      otherObject.relocate();

    }
};


})();
