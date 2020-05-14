// Init
var container = document.querySelector('.logo');
var inner = document.querySelector('.hexagon-container');
// Mouse 
var mouse = {
  _x: 0,
  _y: 0,
  x: 0,
  y: 0,
  updatePosition: function(event) {
    console.log('#updatePosition');
    var e = event || window.event;
    this.x = e.clientX - this._x;
    this.y = (e.clientY - this._y) * -1;
  },
  setOrigin: function(e) {
      console.log('#setOrigin');
    this._x = e.offsetLeft + Math.floor(e.offsetWidth/2);
    this._y = e.offsetTop + Math.floor(e.offsetHeight/2);
  },
  show: function() { return '(' + this.x + ', ' + this.y + ')'; }
}
// Track the mouse position relative to the center of the container.
mouse.setOrigin(container);

var counter = 0;
var updateRate = 1;
var isTimeToUpdate = function() {
  return counter++ % updateRate === 0;
};

var onMouseMoveHandler = function(event) {
    if (isTimeToUpdate()) {
      update(event);
    }
  };

document.querySelector('body').onmousemove = onMouseMoveHandler;

var update = function(event) {
    mouse.updatePosition(event);
    updateTransformStyle(
        (mouse.y / inner.offsetHeight/2).toFixed(2),
        (mouse.x / inner.offsetWidth/2).toFixed(2)
    );
};

var updateTransformStyle = function(x, y) {
    var style = "rotateX(" + x + "deg) rotateY(" + y + "deg)";
    inner.style.transform = style;
    inner.style.webkitTransform = style;
    inner.style.mozTransform = style;
    inner.style.msTransform = style;
    inner.style.oTransform = style;
};