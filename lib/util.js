(function () {

  var Asteroids = window.Asteroids = window.Asteroids || {};
  var Util = Asteroids.Util = {};

  Util.inherits = function (ChildClass, ParentClass) {
    var Surrogate = function() {};
    Surrogate.prototype = ParentClass.prototype;
    ChildClass.prototype = new Surrogate();
  };

  Util.calcVec = function(speed, angle) {
   var x = speed * Math.cos(angle/180 * Math.PI);
   var y = speed * Math.sin(angle/180 * Math.PI);
   return [x,y];
 };

  Util.randomVec = function (length) {
    var vec = [];
    vec.push(Math.random() * length);
    vec.push(Math.sqrt((length * length) - (vec[0] * vec[0])));
    return vec;
  };


})();
