(function () {

  var Asteroids = window.Asteroids = window.Asteroids || {};
  var Util = Asteroids.Util = {};

  Util.inherits = function (ChildClass, ParentClass) {
    var Surrogate = function() {};
    Surrogate.prototype = ParentClass.prototype;
    ChildClass.prototype = new Surrogate();
  };

  Util.calcVec = function(speed, angle, mul) {
    var x;
    var y;
    if (mul){
     x = speed * Math.cos(angle/180 * Math.PI) * mul;
     y = speed * Math.sin(angle/180 * Math.PI) * mul;
    }
    else {
      x = speed * Math.cos(angle/180 * Math.PI);
      y = speed * Math.sin(angle/180 * Math.PI);
    }
   return [x,y];
 };

  // Util.randomVec = function (length) {
  //   var vec = [];
  //   vec.push(Math.random() * length);
  //   vec.push(Math.sqrt((length * length) - (vec[0] * vec[0])));
  //   return vec;
  // };

  Util.scale = function (vec, m) {
  return [vec[0] * m, vec[1] * m];
};

  Util.randomVec = function (length) {
   var deg = 2 * Math.PI * Math.random();
   return this.scale([Math.sin(deg), Math.cos(deg)], length);
 };




})();
