(function () {

  var Asteroids = window.Asteroids = window.Asteroids || {};

  Asteroids.GameView = function(canvasEl, game){
  this.game = game;
  this.ctx = canvasEl.getContext("2d");
};

Asteroids.GameView.prototype.start = function(){
  this.bindKeyHandlers();
  window.setInterval((function (){
    game.step(this.ctx);
    game.draw(this.ctx);
  }.bind(this)),  5);
};

Asteroids.GameView.prototype.bindKeyHandlers = function(){
  key('up', function(){ this.game.ship.thrust = true; return false; }.bind(this));
  key('down', function(){ this.game.ship.thrust = false; return false; }.bind(this));
  key('left', function(){ this.game.ship.setAngle(-0.18); return false; }.bind(this));
  key('right', function(){ this.game.ship.setAngle(0.18); return false; }.bind(this));
  key('f', function(){ this.game.ship.fireBullet(); return false; }.bind(this));

};

})();
