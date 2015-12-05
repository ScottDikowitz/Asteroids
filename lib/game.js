(function () {

  var Asteroids = window.Asteroids = window.Asteroids || {};

  var DIM_X = 800;
  var DIM_Y = 600;
  var NUM_ASTEROIDS = 15;

  Asteroids.Game = function(){
    this.DIM_X = DIM_X;
    this.DIM_Y = DIM_Y;
    this.asteroids = [];
    this.bullets = [];
    this.addAsteroids(3);
    this.score = 0;
    this.lives = 4;
    this.ship = new Asteroids.Ship(this.randomPosition(), this);
    // setTimeout(function(){ debugger; }.bind(this), 5000);
  };

  Asteroids.Game.prototype.addAsteroids = function(num){
    if (typeof num === "undefined"){
      num = NUM_ASTEROIDS;
    }
    for (var i = 0; i < num; i++){
      // var asteroid = Asteroids.Asteroid()
      this.asteroids.push(
        new Asteroids.Asteroid({ pos: [(DIM_X * Math.random()),
                                      (DIM_Y * Math.random())],
                                game: this
                                      }));
                                }
  };

  Asteroids.Game.prototype.add = function(){

  };

  Asteroids.Game.prototype.draw = function (ctx) {
    ctx.clearRect(0,0,DIM_X, DIM_Y);
    // debugger;
    ctx.font="20px Arial";
    ctx.fillText("Score: " + this.score,640,20);
    ctx.fillText("Lives:  " + this.lives, 640,50);
    this.allObjects().forEach(function(obj){
      obj.draw(ctx);
    });
  };

  Asteroids.Game.prototype.moveObjects = function(delta){
    // debugger;
    this.allObjects().forEach(function(obj){
      obj.move(delta);
    });

  };

  Asteroids.Game.prototype.wrap = function(pos){
    var new_pos = pos;

    if (pos[0] > DIM_X + 25) {
      new_pos[0] = -25;
    }
    else if (pos[0] < -25) {
      new_pos[0] = DIM_X + 25;
    }

    if (pos[1] < -25) {
      new_pos[1] = DIM_Y;
    }
    else if (pos[1] > DIM_Y) {
      new_pos[1] = -25;
    }

    return new_pos;
  };

  Asteroids.Game.prototype.isOutOfBounds = function(pos){
    if ((pos[0] > DIM_X + 25) || (pos[0] < -25)) {
      return true;
    }
    else if ((pos[1] < -25 || (pos[1] > DIM_Y))) {
      return true;
    }
    else{
      return false;
    }
  };

  Asteroids.Game.prototype.checkCollisions = function(){

    for(var i = 0; i < this.allObjects().length - 1; i++){
      for (var j = (i + 1); j < this.allObjects().length; j++){
        if (this.allObjects()[i].isCollidedWith(this.allObjects()[j])) {
          // if (instanceof this.allObjects()[i] === "Ship" )
          // debugger;

          this.allObjects()[i].collideWith(this.allObjects()[j]);
          if (this.allObjects()[j]){
          this.allObjects()[j].collideWith(this.allObjects()[i]);
        }
          // this.allObjects()[i].collideWith(this.allObjects()[j]);
        }
      }
    }
  };

  Asteroids.Game.prototype.randomPosition = function(){
    var pos = [];
    pos[0] = DIM_X * Math.random();
    pos[1] = DIM_Y * Math.random();

    return pos;
  };

  Asteroids.Game.prototype.step = function(delta){
    this.moveObjects(delta);
    this.checkCollisions();
  };

  Asteroids.Game.prototype.checkAsteroids = function(){
    if (this.asteroids.length === 0){
      this.ship.setInvulnerable();
      this.addAsteroids(30);
    }
  };

  Asteroids.Game.prototype.remove = function(mvgObj){
    var idx;

    if (mvgObj instanceof Asteroids.Asteroid){
       idx = this.asteroids.indexOf(mvgObj);
       this.asteroids.splice(idx, 1);
       this.checkAsteroids();
    }
    else if (mvgObj instanceof Asteroids.Bullet){
      idx = this.bullets.indexOf(mvgObj);
      this.bullets.splice(idx, 1);
    }
  };

  Asteroids.Game.prototype.allObjects = function(){
    var allObs = this.asteroids.slice();
    allObs.push(this.ship);
    // debugger;
    allObs = allObs.concat(this.bullets);
    return allObs;

  };
})();
