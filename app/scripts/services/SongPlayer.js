(function() {
     function SongPlayer($rootScope, Fixtures) {
          var SongPlayer = {};

          var currentAlbum = Fixtures.getAlbum();
		/**
		 * @desc Buzz object audio file
		 * @type {Object}
		 */
          var currentBuzzObject = null;


		  /**
		 * @function stopSong
		 * @desc stops song as set by setSong
		 * @param {Object} song
		 */
	    	var stopSong = function(song) {
		        song = song || SongPlayer.currentSong;
	        	currentBuzzObject.stop();
	    		song.playing = null;
	    	};

		  /**
		 * @function setSong
		 * @desc Stops currently playing song and loads new audio file as currentBuzzObject
		 * @param {Object} song
		 */
          var setSong = function(song) {
          	if (currentBuzzObject) {
          		stopSong();
 			}
          	currentBuzzObject = new buzz.sound(song.audioUrl, {
          		formats: ['mp3'],
          		preload: true
          	});

          	currentBuzzObject.bind('timeupdate', function() {
          		$rootScope.$apply(function() {
          			SongPlayer.currentTime = currentBuzzObject.getTime();
          		});
          	});
          	
          	SongPlayer.currentSong = song; 
          };

		  /**
		 * @function playSong
		 * @desc Plays song as set by setSong
		 * @param {Object} song
		 */

          var playSong = function(song) {
          	currentBuzzObject.play();
          	song.playing = true;
          };

		  /**
		 * @function getSongIndex
		 * @desc returns song index
		 * @param {Object} song
		 */

         var getSongIndex = function(song) {
             return currentAlbum.songs.indexOf(song);
         };

          SongPlayer.currentSong = null;

		  /**
		 * @desc Current playback time (in seconds) of currently playing song
		 * @type {Number}
		 */
		  SongPlayer.currentTime = null;
		  /**
		 * @method .play
		 * @desc gets song index and plays song
		 */

	    SongPlayer.play = function(song){
          song = song || SongPlayer.currentSong;
        	if (SongPlayer.currentSong !== song){
 			setSong(song);
			playSong(song);			  
          } else if (SongPlayer.currentSong === song) {
          		if (currentBuzzObject.isPaused()) {
          			playSong(song);
          		}
          }

	    };
		  /**
		 * @method .pause
		 * @desc gets song index and pauses play
		 */

    	SongPlayer.pause = function(song) {
        song = song || SongPlayer.currentSong;
    		currentBuzzObject.pause();
    		song.playing = false;
    	};


		  /**
		 * @method .previous
		 * @desc gets song index and decreases song index count by one
		 */

       SongPlayer.previous = function() {
       var currentSongIndex = getSongIndex(SongPlayer.currentSong);
       currentSongIndex--;

         if (currentSongIndex < 0) {
		 stopSong(song);
         } else {
	     var song = currentAlbum.songs[currentSongIndex];
         setSong(song);
         playSong(song);
         }
       };

	  /**
	 * @method .next
	 * @desc gets song index and increases song index count by one
	 */

       SongPlayer.next = function() {
       var currentSongIndex = getSongIndex(SongPlayer.currentSong);
       currentSongIndex++;


         if (currentSongIndex >= currentAlbum.songs.length) {
         stopSong(song);
         } else {
	     var song = currentAlbum.songs[currentSongIndex];
         setSong(song);
         playSong(song);
         }
       };

       /**
        * @function setCurrentTime
        * @desc Set current time (in seconds) of currently playing song
        * @param {Number} time
        */
        SongPlayer.setCurrentTime = function(time) {
        	if (currentBuzzObject){
        		currentBuzzObject.setTime(time);
        	}
        };

          return SongPlayer;
     }
 
     angular
         .module('blocJams')
         .factory('SongPlayer',['$rootScope', 'Fixtures', SongPlayer]);
 })();
