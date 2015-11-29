(function(){
"use strict";

  var Asteroids = window.Asteroids = window.Asteroids || {};
  var RADIUS = 2;
  var COLOR = "black";
  Asteroids.Bullet = function(vel, pos, game, radius){
    pos = [(pos[0] + (vel[0]*15)), (pos[1] + (vel[1]*15))];
    this.vel = [vel[0]*2, vel[1]*2];
    this.pos = pos;
    this.radius = RADIUS;
    this.color = COLOR;
    this.game = game;
  };

  Asteroids.Util.inherits(Asteroids.Bullet, Asteroids.MovingObject);

  Asteroids.Bullet.prototype.isWrappable = function(){
    return false;
  };

  Asteroids.Bullet.prototype.collideWith = function(otherObject){

    if (otherObject instanceof Asteroids.Asteroid){
      this.game.remove(otherObject);
      this.game.remove(this);
    }
  };

})();
