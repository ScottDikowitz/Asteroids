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

// Asteroids.Asteroid.prototype.collideWith = function(otherObject){
//   if (otherObject instanceof Ship){
//     distance = Math.sqrt((Math.pow((this.pos[0] - otherObject.pos[0]), 2)) + (Math.pow((this.pos[1] - otherObject.pos[1]), 2)));
//     if (distance < (this.radius + otherObject.radius)){
//       // return true;
//       otherObject.relocate();
//       return true;
//     }
//     else
//       return false;
//     }
//     else {
//       return false;
//     }
// };


})();
