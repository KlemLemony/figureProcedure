
var figureProcedure = (function() {
	var topLine = 0.1;
	var bottomLine = 0.1;
	var size = 0.1;
	var figure;
	var red = 0;
	var green = 0;
	var blue = 0;
	var borderRadius = 0;
	var fWidth = 0;
	var top = 0;
	var left = 0;


	function setSizeAndPosition() {
		var windowWidth = $(window).width();
		var windowHeight = $(window).height();
		var topLimit = windowHeight * topLine;
		var bottomLimit = windowHeight - windowHeight * bottomLine;
		fWidth = size * (windowWidth > windowHeight ? windowWidth : windowHeight);
		var k = Math.sqrt(Math.pow(fWidth, 2) + Math.pow(fWidth, 2)) - fWidth;
		top = top ? top : k/2;
		left = windowWidth/2 - fWidth/2;
		if (top < topLimit) {
			top = topLimit;
		} else if((top + fWidth) > bottomLimit) {
			top = bottomLimit - fWidth;
		}
		$(figure).css({
			top: top + 'px',
			width: fWidth + 'px',
			height: fWidth + 'px',
			left: left + 'px'
		});
	}
	function wheelEventHandler(event) {
		console.log(event);
		var dy = event.deltaY || (-1 * event.wheelDelta);
		var dy = dy < 0 ? -1 : 1;
		console.log(dy);
		top = top + dy*35;
		setSizeAndPosition();
		borderRadius = borderRadius + dy*4;
		borderRadius = borderRadius < 0 ? 0 : borderRadius;
		borderRadius = borderRadius > 50 ? 50 : borderRadius;
		red = red + dy*10;
		green = green + dy*30;
		var color = 'rgb(' + red + ',' + green + ',' + blue + ')';

		figure.css({
			backgroundColor: color,
			'borderRadius': borderRadius + '%'
		})
	}
	function start() {
		addWheelListener(wheelEventHandler);
		figure = $("<div id='figure'/>");
		$('body').append(figure);
		red = Math.round(Math.random() * 255);
		green = Math.round(Math.random() * 255);
		blue = Math.round(Math.random() * 255);
		var color = 'rgb(' + red + ',' + green + ',' + blue + ')';
		$(figure).css({
			backgroundColor: color,
			position: 'absolute',
			'-webkit-transform' : 'rotate(45deg)',
	    '-moz-transform' : 'rotate(45deg)',
	    '-ms-transform' : 'rotate(45deg)',
	    'transform' : 'rotate(45deg)'
		});
		setSizeAndPosition();
	}

	function addWheelListener(callback) {
		if (typeof callback !== 'function') {
			return console.error('Callback is not a function');
		}
		if ('onwheel' in document) {
	    window.addEventListener("wheel", callback);
	  } else if ('onmousewheel' in document) {
	    window.addEventListener("mousewheel", callback);
	  } else {
	    window.addEventListener("MozMousePixelScroll", callback);
	  }
	}

	return {
		start: start
	}
})();


$(document).ready(figureProcedure.start);


