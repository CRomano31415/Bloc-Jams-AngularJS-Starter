(function() {
     function AlbumCtrl() {
     	  this.albumData = [];
     	  this.songData = [];
          this.albumData.push(angular.copy(albumPicasso));

     for (var i=0; i < this.albumData[0].songs.length; i++) {
	    this.songData.push(this.albumData[0].songs[i]);
	   }
     }
 
     angular
         .module('blocJams')
         .controller('AlbumCtrl', AlbumCtrl);
 })();