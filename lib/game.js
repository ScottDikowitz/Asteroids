(function () {

  var Asteroids = window.Asteroids = window.Asteroids || {};
  //
  // var DIM_X = 800;
  // var DIM_Y = 600;
  var NUM_ASTEROIDS = 1;

  Asteroids.Game = function(dims){
    this.DIM_X = dims.DIM_X;
    this.DIM_Y = dims.DIM_Y;
    this.durability = 2;
    this.resetAstroids = false;
    this.asteroids = [];
    this.bullets = [];
    this.explosions = [];
    this.numAsteroids = NUM_ASTEROIDS || 1;
    this.addAsteroids(this.numAsteroids);
    this.score = 0;
    this.paused = true;
    this.lives = 3;
    this.level = 1;
    this.scoreWindow = 0;
    this.powerups = [];
    this.gameOver = false;
    this.lastRemovedAsteroid = null;
    this.ship = new Asteroids.Ship(this.randomPosition(), this);
    // setTimeout(function(){ debugger; }.bind(this), 5000);
  };

  Asteroids.Game.prototype.addAsteroids = function(num){
    for (var i = 0; i < num; i++){
      // var asteroid = Asteroids.Asteroid()
      this.asteroids.push(
        new Asteroids.Asteroid({ pos: [(this.DIM_X * Math.random()),
                                      (this.DIM_Y * Math.random())],
                                game: this,
                                durability: this.durability
                                      }));
    }
  };

  Asteroids.Game.prototype.minerals = function(ctx){
      ctx.clearRect(0,0,this.DIM_X, this.DIM_Y);
      ctx.fillStyle = "#fff";
      ctx.font="20px Arial";
      ctx.fillText("minerals: " + this.scoreWindow, 30,50);
  };

  Asteroids.Game.prototype.draw = function (ctx) {
    ctx.save();
      ctx.fillStyle = "#fff";
      ctx.font="20px Arial";
      ctx.fillText("Level: " + this.level,(ctx.canvas.width / 2) - 50,20);
      ctx.fillText("Asteroids remaining: " + this.asteroids.length,30,20);
      ctx.fillText("Score: " + this.score,ctx.canvas.width - 200,20);
      ctx.fillText("Lives:  " + this.lives, ctx.canvas.width - 200,50);
      ctx.fillText("Accuracy:  " + this.ship.accuracy(), ctx.canvas.width - 200,80);
      ctx.fillText("Shields:  " + this.ship.shields / 10, ctx.canvas.width - 200,110);
    ctx.restore();
    this.allObjects().concat(this.explosions).forEach(function(obj){
      obj.draw(ctx);
    });
  };

  Asteroids.Game.prototype.checkScore = function(){

    if (this.scoreWindow >= 100){
      // this.ship.fireSpeed += 1;
      // this.ship.fireSpeed = this.game.score1;
    }
  };

  Asteroids.Game.prototype.moveObjects = function(delta){
    // debugger;
    this.allObjects().forEach(function(obj){
      obj.move(delta);
    });

  };

  Asteroids.Game.prototype.wrap = function(pos){
    var new_pos = pos;

    if (pos[0] > this.DIM_X + 25) {
      new_pos[0] = -25;
    }
    else if (pos[0] < -25) {
      new_pos[0] = this.DIM_X + 25;
    }

    if (pos[1] < -25) {
      new_pos[1] = this.DIM_Y;
    }
    else if (pos[1] > this.DIM_Y) {
      new_pos[1] = -25;
    }

    return new_pos;
  };

  Asteroids.Game.prototype.isOutOfBounds = function(pos){
    if ((pos[0] > this.DIM_X + 25) || (pos[0] < -25)) {
      return true;
    }
    else if ((pos[1] < -25 || (pos[1] > this.DIM_Y))) {
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
    pos[0] = this.DIM_X * Math.random();
    pos[1] = this.DIM_Y * Math.random();

    return pos;
  };

  Asteroids.Game.prototype.step = function(delta){
    this.moveObjects(delta);
    this.checkCollisions();
  };

  Asteroids.Game.prototype.removeLife = function(){
    if (this.lives !== 0){
      this.lives -= 1;
      this.ship.relocate();
      this.ship.shields = 1000;
    }
    else{
      this.gameOver = true;
    }
  };

  // Asteroids.Game.prototype.gameOver = function(){
  //   this.paused = true;
  //   $(".game-over").addClass("is-active");
  //   this.asteroids = [];
  //   this.addAsteroids();
  // };

  Asteroids.Game.prototype.checkAsteroids = function(){
    if (this.asteroids.length === 0 && this.lastRemovedAsteroid.durability < 1){
      this.ship.setInvulnerable();

      // add powerup within 5 seconds
      this.powerups = [];
      setTimeout(
      function(){
        this.powerups.push(
          new Asteroids.Powerup({
          pos: [(this.DIM_X * Math.random()), (this.DIM_Y * Math.random())],
          game: this
        })); }.bind(this), Math.random () * 5000);
      this.level += 1;
      if (this.level <= 3){
        this.numAsteroids += 5;
        // this.durability = 2;
      }
      else {
        this.numAsteroids += 1;
        // this.durability = 2;
      }
      this.addAsteroids(this.numAsteroids);
    }
  };

  Asteroids.Game.prototype.remove = function(mvgObj){
    var idx;

    if (mvgObj instanceof Asteroids.Asteroid){
      if (mvgObj === this.lastRemovedAsteroid){
        return;
      }
       idx = this.asteroids.indexOf(mvgObj);
       this.lastRemovedAsteroid = mvgObj;
       this.asteroids.splice(idx, 1);
       this.checkAsteroids();
    }
    else if (mvgObj instanceof Asteroids.Bullet){
      idx = this.bullets.indexOf(mvgObj);
      this.bullets.splice(idx, 1);
    }
    else if (mvgObj instanceof Asteroids.Powerup){
      idx = this.powerups.indexOf(mvgObj);
      this.powerups.splice(idx, 1);
    }

    else if (mvgObj instanceof Asteroids.Explosion){
      idx = this.explosions.indexOf(mvgObj);
      this.explosions.splice(idx, 1);
    }
  };

  Asteroids.Game.prototype.allObjects = function(){
    var allObs = this.asteroids.slice();
    allObs.push(this.ship);
    // debugger;
    allObs = allObs.concat(this.bullets).concat(this.powerups);
    return allObs;

  };
})();
