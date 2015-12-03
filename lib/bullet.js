(function(){
"use strict";

  var Asteroids = window.Asteroids = window.Asteroids || {};
  var RADIUS = 2;
  var COLOR = "white";
  Asteroids.Bullet = function(vel, pos, game, radius, angle, thrust){
        this.vel = [vel[0]*10, vel[1]*10];
    if ((vel[0] === 0 &vel[1] === 0) || thrust === false){
        var newVel = Asteroids.Util.calcVec(0.70, angle);
        this.vel[0] = newVel[0]*10;
        this.vel[1] = newVel[1]*10;
      }

    pos = [(pos[0] + (vel[0]*20)), (pos[1] + (vel[1]*20))];
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
