(function () {

  var Asteroids = window.Asteroids = window.Asteroids || {};

  Asteroids.GameView = function(canvasEl, game){
  this.game = game;
  this.ctx = canvasEl.getContext("2d");
};

Asteroids.GameView.prototype.start = function(){
  window.setInterval((function (){
    game.step();
    game.draw(this.ctx);
  }.bind(this)),  5);
};

})();
