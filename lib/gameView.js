(function () {

  var Asteroids = window.Asteroids = window.Asteroids || {};

  Asteroids.GameView = function(canvasEl, obj){
  this.dims = obj;
  this.game = new Asteroids.Game(this.dims);
  this.ctx = canvasEl.getContext("2d");
  this.ctx.fillStyle = "white";
  this.stop = false;
};

Asteroids.GameView.prototype.start = function(){
  this.bindKeyHandlers();
  this.lastTime = 0;
  requestAnimationFrame(this.animate.bind(this));
};

Asteroids.GameView.prototype.animate = function(time){
  if (this.game.gameOver){
    this.gameOver();
  }
  var delta = time - this.lastTime;
  if (this.stop === false){
    requestAnimationFrame(this.animate.bind(this));
    this.game.minerals(this.ctx);
    if (!this.game.paused){
      this.game.step(delta);
      this.game.draw(this.ctx);
    }
    this.lastTime = time;
  }

};

Asteroids.GameView.prototype.stop = function () {
  //  clearInterval(this.timerId);

 };

 Asteroids.GameView.prototype.gameOver = function(){
  //  this.game.paused = true;
  this.stop = true;
   $(".game-over").addClass("is-active");
   this.game = new Asteroids.Game(this.dims);
 };



Asteroids.GameView.prototype.bindKeyHandlers = function(){

  // var ship = this.game.ship;
  // var game = this.game;
  var gv = this;
  var ctx = this.ctx;

  $(document).on('keydown', function (e) {
    var char = String.fromCharCode(e.keyCode);
   //  KeyActions.addKey(char);
    if (char === "%" || char.toLowerCase() === "a")
      gv.game.ship.leftTurn = true;
    else if (char === "'" || char.toLowerCase() === "d")
      gv.game.ship.rightTurn = true;

    if (char === "&" || char.toLowerCase() === "w")
      gv.game.ship.thrust = true;

    if (char.toLowerCase() === "f" || char === " ")
    gv.game.ship.fireBullet();

    if (char.toLowerCase() === "p"){
      gv.game.paused = !gv.game.paused;
      if (gv.game.paused){
        $(".modal").addClass("is-active");
      }
      else{
        $(".modal").removeClass("is-active");
      }
    }
  });
  $(function() {
  $( ".bullet" ).click(function() {
    if (gv.game.scoreWindow >= 150){
      gv.game.ship.weaponUpgrade();
      gv.game.scoreWindow -= 150;
    }
  });

  $( ".shields" ).click(function() {
    if (gv.game.scoreWindow >= 75){
      gv.game.ship.setInvulnerable();
      gv.game.scoreWindow -= 75;
      // $( ".modal-close" ).trigger( "click" );

      gv.game.paused = false;
      $(".modal-controls").removeClass("is-active");
      $(".modal").removeClass("is-active");
    }
  });

  $( ".reload" ).click(function() {
    if (gv.game.scoreWindow >= 150){
      gv.game.ship.fireSpeed += 1;
      gv.game.scoreWindow -= 150;
    }
  });

  $( ".speed" ).click(function() {
    if (gv.game.scoreWindow >= 150){
      gv.game.ship.speed += 0.2;
      gv.game.scoreWindow -= 150;
  }
  });

  $( ".modal-close" ).click(function() {
    gv.game.paused = false;
    $(".modal-controls").removeClass("is-active");
    $(".modal").removeClass("is-active");

  });

  $( ".modal-close-gameover" ).click(function() {
        $(".game-over").removeClass("is-active");
        gv.lastTime = 0;
        gv.stop = false;
        requestAnimationFrame(gv.animate.bind(gv));
  });
});


  $(document).on('keyup', function (e) {
    var reset = true;
    var char = String.fromCharCode(e.keyCode);
   //  KeyActions.removeKey(char);
   if (char === "%" || char.toLowerCase() === "a")
      gv.game.ship.leftTurn = false;
    else if (char === "'" || char.toLowerCase() === "d")
      gv.game.ship.rightTurn = false;

    if (char === "&" || char.toLowerCase() === "w")
      gv.game.ship.thrust = false;

      // if (char.toLowerCase() === "p"){
      //   game.paused = false;
      // }

  });

  $( window ).resize(function() {
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    gv.game.DIM_X = window.innerWidth;
    gv.game.DIM_Y = window.innerHeight;
    gv.dims = {DIM_X: window.innerWidth, DIM_Y: window.innerHeight};
  });



};

})();
