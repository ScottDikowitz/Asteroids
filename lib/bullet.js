(function(){
"use strict";

  var Asteroids = window.Asteroids = window.Asteroids || {};
  var RADIUS = 2;
  var COLOR = "white";
  Asteroids.Bullet = function(vel, pos, game, radius){
    pos = [(pos[0] + (vel[0]*20)), (pos[1] + (vel[1]*20))];
    this.vel = [vel[0]*4, vel[1]*4];
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
