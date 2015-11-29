(function () {

  var Asteroids = window.Asteroids = window.Asteroids || {};

  var DIM_X = 800;
  var DIM_Y = 600;
  var NUM_ASTEROIDS = 3;

  Asteroids.Game = function(){
    this.DIM_X = DIM_X;
    this.DIM_Y = DIM_Y;
    this.asteroids = [];
    this.addAsteroids();
    this.ship = new Asteroids.Ship(this.randomPosition(), this);
  };

  Asteroids.Game.prototype.addAsteroids = function(){
    for (var i = 0; i < NUM_ASTEROIDS; i++){
      // var asteroid = Asteroids.Asteroid()
      this.asteroids.push(
        new Asteroids.Asteroid({ pos: [(DIM_X * Math.random()),
                                      (DIM_Y * Math.random())],
                                game: this
                                      }));
                                }
  };

  Asteroids.Game.prototype.draw = function (ctx) {
    ctx.clearRect(0,0,DIM_X, DIM_Y);
    // debugger;
    this.allObjects().forEach(function(obj){
      obj.draw(ctx);
    });
  };

  Asteroids.Game.prototype.moveObjects = function(){
    // debugger;
    this.allObjects().forEach(function(obj){
      obj.move();
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

  Asteroids.Game.prototype.checkCollisions = function(){

    for(var i = 0; i < this.allObjects().length - 1; i++){
      for (var j = (i + 1); j < this.allObjects().length; j++){
        if (this.allObjects()[i].isCollidedWith(this.allObjects()[j])) {
          // if (instanceof this.allObjects()[i] === "Ship" )
          // debugger;
          this.allObjects()[i].collideWith(this.allObjects()[j]);
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

  Asteroids.Game.prototype.step = function(){
    this.moveObjects();
    this.checkCollisions();
  };

  Asteroids.Game.prototype.remove = function(mvgObj){
    var idx = this.asteroids.indexOf(mvgObj);
    if (idx >= 0){
      this.asteroids.splice(idx, 1);
    }
  };

  Asteroids.Game.prototype.allObjects = function(){
    var allObs = this.asteroids.slice();
    allObs.push(this.ship);
    return allObs;

  };
})();
