(function () {

  var Asteroids = window.Asteroids = window.Asteroids || {};

  Asteroids.GameView = function(canvasEl, game){
  this.game = game;
  this.ctx = canvasEl.getContext("2d");
};

Asteroids.GameView.prototype.start = function(){
  this.bindKeyHandlers();
  this.lastTime = 0;
  requestAnimationFrame(this.animate.bind(this));
};

Asteroids.GameView.prototype.animate = function(time){
  var delta = time - this.lastTime;
  requestAnimationFrame(this.animate.bind(this));

  this.game.step(delta);
  this.game.draw(this.ctx);

  this.lastTime = time;

};

Asteroids.GameView.prototype.stop = function () {
   clearInterval(this.timerId);
 };

Asteroids.GameView.prototype.bindKeyHandlers = function(){
  key('up', function(){ this.game.ship.thrust = true; return false; }.bind(this));
  key('down', function(){ this.game.ship.thrust = false; return false; }.bind(this));
  key('left', function(){ this.game.ship.setAngle(-0.18); return false; }.bind(this));
  key('right', function(){ this.game.ship.setAngle(0.18); return false; }.bind(this));
  key('f', function(){ this.game.ship.fireBullet(); return false; }.bind(this));

};

})();
