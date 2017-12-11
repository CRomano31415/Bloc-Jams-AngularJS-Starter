(function() {
     function SongPlayer(Fixtures) {
          var SongPlayer = {};


          var currentAlbum = Fixtures.getAlbum();
/**
 * @desc Buzz object audio file
 * @type {Object}
 */
          var currentBuzzObject = null;
 
  /**
 * @function setSong
 * @desc Stops currently playing song and loads new audio file as currentBuzzObject
 * @param {Object} song
 */
          var setSong = function(song) {
          	if (currentBuzzObject) {
          		currentBuzzObject.stop();
          		SongPlayer.currentSong.playing = null;
 			}
          	currentBuzzObject = new buzz.sound(song.audioUrl, {
          		formats: ['mp3'],
          		preload: true
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

    	SongPlayer.pause = function(song) {
        song = song || SongPlayer.currentSong;
    		currentBuzzObject.pause();
    		song.playing = false;
    	};

  /**
 * @function .previous
 * @desc gets song index and decreases song index count by one
 */

       SongPlayer.previous = function() {
       var currentSongIndex = getSongIndex(SongPlayer.currentSong);
       currentSongIndex--;

         if (currentSongIndex < 0) {
         currentBuzzObject.stop();
         SongPlayer.currentSong.playing = null;
         } else {
         var song = currentAlbum.songs[currentSongIndex];
         setSong(song);
         playSong(song);
         }
       };

          return SongPlayer;
     }
 
     angular
         .module('blocJams')
         .factory('SongPlayer',['Fixtures', SongPlayer]);
 })();
