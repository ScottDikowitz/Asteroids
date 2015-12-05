(function(){
"use strict";

  var Asteroids = window.Asteroids = window.Asteroids || {};
  var RADIUS = 10;
  var COLOR = "blue";
  var MAX = 1.5;
   var Powerup = Asteroids.Powerup = function(obj){
    this.vel = Asteroids.Util.randomVec(1);
    this.pos = obj.pos;
    this.radius = RADIUS;
    this.color = COLOR;
    this.game = obj.game;

  };


  Asteroids.Util.inherits(Asteroids.Powerup, Asteroids.MovingObject);

    Asteroids.Powerup.prototype.collideWith = function(mvgObj){
    };

})();
