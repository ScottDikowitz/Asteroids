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
    ctx.save();
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(
      this.pos[0],
      this.pos[1],
      this.radius,
      0,
      2 * Math.PI,
      true
    );
    ctx.fill();
    ctx.restore();
  };

  Asteroids.MovingObject.prototype.move = function (delta) {
    // delta = 1;
    this.pos[0] += this.vel[0] * delta / 20;
    this.pos[1] += this.vel[1] * delta / 20;

    if (this.game.isOutOfBounds(this.pos)){
      if (this.isWrappable()){
          this.pos = this.game.wrap(this.pos);
      }
      else{
        this.game.remove(this);
      }
    }
  };

  Asteroids.MovingObject.prototype.isWrappable = function(){
    return true;
  };

  Asteroids.MovingObject.prototype.collideWith = function(otherObject){
    // debugger;
    this.game.remove(this);
    this.game.remove(otherObject);
  };

  Asteroids.MovingObject.prototype.isCollidedWith = function (otherObject) {
    distance = Math.sqrt((Math.pow((this.pos[0] - otherObject.pos[0]), 2)) + (Math.pow((this.pos[1] - otherObject.pos[1]), 2)));
    if (distance < (this.radius + otherObject.radius))
      return true;
    else
      return false;

  };

})();
