(function(){
"use strict";

  var Asteroids = window.Asteroids = window.Asteroids || {};
  var RADIUS = 5;
  var COLOR = "red";
  Asteroids.Bullet = function(vel, pos, game, radius, angle, thrust){
    var newVel = Asteroids.Util.calcVec(0.70, angle);
        this.vel = [newVel[0]*10, newVel[1]*10];
        // this.pos = [(pos[0] + (vel[0]*10)), (pos[1] + (vel[1]*10))];
    if ((vel[0] === 0 && vel[1] === 0) || thrust === false){
        newVel = Asteroids.Util.calcVec(0.70, angle);
        this.vel[0] = newVel[0]*10;
        this.vel[1] = newVel[1]*10;
      }

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
      this.game.ship.numShots += 1;
      this.game.ship.numHits += 1;
      otherObject.durability -= 1;
      otherObject.removeCheck();
      var that = this;
      this.game.explosions.push(new Asteroids.Explosion({pos: that.pos, game: that.game}));
      this.game.remove(this);

      this.game.checkScore();

    }
  };

})();
