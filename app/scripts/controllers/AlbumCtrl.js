(function() {
     function AlbumCtrl(Fixtures) {
     	  this.albumData = {};
     	  this.songData = [];
  		  this.albumData = Fixtures.getAlbum();

     for (var i=0; i < this.albumData[0].songs.length; i++) {
	    this.songData.push(this.albumData[0].songs[i]);
	   }
     }
 
     angular
         .module('blocJams')
         .controller('AlbumCtrl', ['Fixtures', AlbumCtrl]);
 })();