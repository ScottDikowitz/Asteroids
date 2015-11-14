(function(){

  var Asteroids = window.Asteroids = window.Asteroids || {};

  Asteroids.MovingObject = function(obj){
    this.pos = obj.pos;
    this.vel = obj.vel;
    this.radius = obj.radius;
    this.color = obj.color;
    this.game = obj.game;
  };

  Asteroids.MovingObject.prototype.draw = function(ctx){
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(
      this.pos[0],
      this.pos[1],
      this.radius,
      0,
      2 * Math.PI,
      false
    );
    ctx.fill();
  };

  Asteroids.MovingObject.prototype.move = function () {
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];
    // debugger;
    this.pos = this.game.wrap(this.pos);
  };

  Asteroids.MovingObject.prototype.isCollidedWith = function (otherObject) {
    distance = Math.sqrt((Math.pow((this.pos[0] - otherObject.pos[0]), 2)) + (Math.pow((this.pos[1] - otherObject.pos[1]), 2)));
    if (distance < (this.radius + otherObject.radius))
      return true;
    else
      return false;

  };

})();
