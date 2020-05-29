	
/*
* https://gist.github.com/trentmwillis/2199d6d191000b8d8f40#gistcomment-2749653
* Modified javascript to make rain of corianders... the effect is very amazing!
* This version has colors that you can choose, you can use your favorite colors
*/

(function() {
    var corianders = [], moveAngle = 0, animationInterval;
    var browserWidth = document.body.clientWidth;
    var browserHeight = window.innerHeight;
    /**
     * Generates a random color.
     * @method getRandomColor
     * @return {Color}
     */
    function getRandomColor() {
      var colors = ['red','yellow', 'violet', 'indigo', 'blue','green', 'orange', 'white', 'black', 'pink']; // favorite colors
      var color = colors[Math.floor(Math.random() * colors.length)];
      return color;
    }
    /**
     * Generates a random number between the min and max (inclusive).
     * @method getRandomNumber
     * @param {Number} min
     * @param {Number} max
     * @return {Number}
     */
    function getRandomNumber(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    /**
     * Creates a new coriander div and returns it.
     * @method createCoriander
     * @return {HTMLElement}
     */
    function createCoriander() {
      var el = document.createElement('div'), style = el.style;
      style.borderRadius = '0px';
      style.border = getRandomNumber(4, 8) + 'px solid ' + getRandomColor();
      var degrees = getRandomNumber(1, 360);
      style.WebkitTransform = 'rotate(' + degrees + 'deg)';
      style.msTransform = 'rotate(' + degrees + 'deg)'; 
      style.transform = 'rotate(' + degrees + 'deg)';
      style.position = 'fixed';
      style.zIndex = '999999';
      style.opacity = '0.9';
      style.filter = 'alpha(opacity=90)';
      style.boxShadow = '0 0 2px rgba(255,255,255,0.8)';
      style.top = getRandomNumber(0, browserHeight) + 'px';
      style.left = getRandomNumber(0, browserWidth) + 'px';
      return el;
    }
    /**
     * Calls the moveCoriander method for each of the corianders in the cache.
     * @method moveCorianders
     * @return {Void}
     */
    function moveCorianders() {
      var l = corianders.length, i;
      moveAngle += 0.01;
      for (i=0; i<l; i++) {
        moveCoriander(corianders[i]);
      }
    }
    /**
     * Moves an individual coriander element using some simple math.
     * @method moveCoriander
     * @param {HTMLElement} el
     * @return {Void}
     */
    function moveCoriander(el) {
      var style = el.style, height = browserHeight, radius, top;
      radius = parseInt(style.border, 10);
      top = parseInt(style.top, 10);
      top += Math.cos(moveAngle) + 1 + radius/2;
      if (top > height) {
        resetCoriander(el);
      } else {
        style.top = top + 'px';
      }
    }
    /**
     * Puts the coriander back at the top in a random horizontal start position.
     * @method resetCoriander
     * @param {HTMLElement} el
     * @return {Void}
     */
    function resetCoriander(el) {
      var style = el.style;
      style.top = '0px';
      style.left = getRandomNumber(0, browserWidth) + 'px';
    }
    /**
     * The kick-off method. Asks how many corianders to make and then makes them!
     * @method setup
     * @return {Void}
     */
    function setup() {
     // var number = prompt('How many corianders would you like?'), particle, i;
      var number = 100, particle, i;
      // Setup snow particles
      for (i=0; i<number; i++) {
        particle = corianders[i] = createCoriander();
        document.body.appendChild(particle);
      }
      // Set animation intervals
      animationInterval = setInterval(moveCorianders, 33);
    }
    setup();
  }());