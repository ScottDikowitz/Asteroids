(function () {

  var Asteroids = window.Asteroids = window.Asteroids || {};

  Asteroids.GameView = function(canvasEl, game){
  this.game = game;
  this.ctx = canvasEl.getContext("2d");
  this.ctx.fillStyle = "white";
};

Asteroids.GameView.prototype.start = function(){
  this.bindKeyHandlers();
  this.lastTime = 0;
  requestAnimationFrame(this.animate.bind(this));
};

Asteroids.GameView.prototype.animate = function(time){
  var delta = time - this.lastTime;
  requestAnimationFrame(this.animate.bind(this));
  this.game.minerals(this.ctx);
  if (!this.game.paused){
    this.game.step(delta);
    this.game.draw(this.ctx);
  }
  this.lastTime = time;

};

Asteroids.GameView.prototype.stop = function () {
   clearInterval(this.timerId);
 };



Asteroids.GameView.prototype.bindKeyHandlers = function(){

  var ship = this.game.ship;
  var game = this.game;

  $(document).on('keydown', function (e) {
    var char = String.fromCharCode(e.keyCode);
   //  KeyActions.addKey(char);
    if (char === "%" || char.toLowerCase() === "a")
      ship.leftTurn = true;
    else if (char === "'" || char.toLowerCase() === "d")
      ship.rightTurn = true;

    if (char === "&" || char.toLowerCase() === "w")
      ship.thrust = true;

    if (char.toLowerCase() === "f" || char === " ")
    ship.fireBullet();

    if (char.toLowerCase() === "p"){
      game.paused = !game.paused;
      if (game.paused){
        $(".modal").addClass("is-active");
      }
      else{
        $(".modal").removeClass("is-active");
      }
    }
  });
  $(function() {
  $( ".bullet" ).click(function() {
    if (game.scoreWindow > 150){
      ship.weaponUpgrade();
      game.scoreWindow -= 150;
    }
  });

  $( ".shields" ).click(function() {
    if (game.scoreWindow > 75){
      ship.setInvulnerable();
      game.scoreWindow -= 75;
    }
  });

  $( ".reload" ).click(function() {
    if (game.scoreWindow > 150){
      ship.fireSpeed += 1;
      game.scoreWindow -= 150;
    }
  });

  $( ".speed" ).click(function() {
    if (game.scoreWindow > 150){
      ship.speed += 0.2;
      game.scoreWindow -= 150;
  }
  });
});


  $(document).on('keyup', function (e) {
    var reset = true;
    var char = String.fromCharCode(e.keyCode);
   //  KeyActions.removeKey(char);
   if (char === "%" || char.toLowerCase() === "a")
      ship.leftTurn = false;
    else if (char === "'" || char.toLowerCase() === "d")
      ship.rightTurn = false;

    if (char === "&" || char.toLowerCase() === "w")
      ship.thrust = false;

      // if (char.toLowerCase() === "p"){
      //   game.paused = false;
      // }

  });



};

})();
