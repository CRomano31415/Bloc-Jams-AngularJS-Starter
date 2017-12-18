(function() {
// 	Keep track of its current value.
// Have a maximum value.
// Calculate the ratio between the current value and max value and convert it into a percent string.
// Update the DOM element with an appropriate value so that it is visible to the user.
	function seekBar($document) {
	  	/**
		 * @function calculatePercent
		 * @desc called when user clicks on bar
		 		 calculates horizontal percent of bar where even occurred
		 */
        
		 var calculatePercent = function(seekBar, event) {
		     var offsetX = event.pageX - seekBar.offset().left;
		     var seekBarWidth = seekBar.width();
		     var offsetXPercent = offsetX / seekBarWidth;
		     offsetXPercent = Math.max(0, offsetXPercent);
		     offsetXPercent = Math.min(1, offsetXPercent);
		     return offsetXPercent;
		 };

		return {
			templateUrl: '/templates/directives/seek_bar.html',
			replace: true, //replace element <seek-bar> with seek_bar.html
			restrict: 'E', //this is an element
			scope: { }, //new scope be created solely for this directive
			link: function(scope, element, attributes) { //updates DOM
				//directive Logic to return
				//set default values
			 scope.value = 0; //holds value of seek bar
             scope.max = 100; //holds max value of song and volume seek bar
 
 			 var seekBar = $(element); //holds element as jQuery object
	 		  /**
			 * @function percentString
			 * @desc calculates a percent based on value & max value of seek bar
			 */
             var percentString = function () {
                 var value = scope.value;
                 var max = scope.max;
                 var percent = value / max * 100;
                 return percent + "%";
             };
 
	 		  /**
			 * @method fillStyle
			 * @desc returns width of seek bar fill based on %
			 */
             scope.fillStyle = function() {
                 return {width: percentString()};
             };

	 		  /**
			 * @method thumbStyle
			 * @desc 
			 */
             scope.thumbStyle = function() {
                 return {width: percentString()};
             };

	 		  /**
			 * @method onClickSeekBar
			 * @desc updates seek bar value based on width and location of click
			 */

             scope.onClickSeekBar = function(event) {
             	var percent = calculatePercent(seekBar, event);
             	scope.value = percent * scope.max;
             };
			
			  /**
			 * @method trackThumb
			 * @desc is triggered when user drags seek bar
			 		 binds new event handler and updates bar value
			 */

			scope.trackThumb = function() {
			     $document.bind('mousemove.thumb', function(event) {
			         var percent = calculatePercent(seekBar, event);
			         scope.$apply(function() {
			             scope.value = percent * scope.max;
			         });
			     });
			 
			     $document.bind('mouseup.thumb', function() {
			         $document.unbind('mousemove.thumb');
			         $document.unbind('mouseup.thumb');
			     });
			 };


			}
		};
	}

	angular
		.module('blocJams')
		.directive('seekBar', ['$document', seekBar]);
})();