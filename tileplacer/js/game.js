var gameCanvas = document.getElementById('gameCanvas');
gameCanvas.getContext('2d').oImageSmoothingEnabled = false;
gameCanvas.getContext('2d').mozImageSmoothingEnabled = false;
gameCanvas.getContext('2d').imageSmoothingEnabled = false;
var gameContext = gameCanvas.getContext('2d');


tilesClass = function() {
	var self = this;
	var stoneTileSprite;
	var emptyTile;
	var wallTiles;
	var fogTile;
	var context;
	
	self.assignTiles = function() {
		self.stoneTileSprite = new Image();
		self.stoneTileSprite.src = "assets/tiles.png";

		self.emptyTile = new Image();
		self.emptyTile.src = "assets/square.png";

		self.wallTiles = new Image();
		self.wallTiles.src = "assets/walls.png";

		self.fogTile = new Image();
		self.fogTile.src = "assets/fog.png";
	}

	self.setContext = function(context) {
		self.context = context;
	}
/*
	self.drawStoneTile = function(x, y) {
		self.context.drawImage(stoneTileSprite, 0, 0, 16, 16, x, y, 32, 32);
	}

	self.drawFogTile = function(x, y) {
		self.context.drawImage(stoneTileSprite, 16, 0, 16, 16, x, y, 32, 32);
	}
*/
}

var tiles = new tilesClass();
tiles.assignTiles();

var fog = {
	passable: false,
	clip: {
		x:32, 
		y:0, 
		xo:32, 
		yo:32
	},
	spriteSheet: tiles.stoneTileSprite
}

var sf = { // stone floor
	passable: true,
	clip: {
		x:0, 
		y:0, 
		xo:32, 
		yo:32
	},
	spriteSheet: tiles.stoneTileSprite
}

/*
var map = [[fog, fog, fog, fog, fog],
		   [fog, sf, sf, sf, fog],
		   [fog, sf, sf, sf, fog],
		   [fog, sf, sf, sf, fog],
		   [fog, fog, fog, fog, fog]];
*/

		var map = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				   [0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0],
				   [0, 1, 1, 1, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0],
				   [0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
				   [0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0],
				   [0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0],
				   [0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0],
				   [0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0],
				   [0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0],
				   [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
				   [0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0],
				   [0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
				   [0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0],
				   [0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
				   [0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0],
				   [0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
				   [0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0],
				   [0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0],
				   [0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0],
				   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];

var objectMap = [  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				   [0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
				   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				   [0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0],
				   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				   [0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];

drawMap = function() {

	// Draw empty background
	for (var x = 0; x < 255; x++) {
		for (var y = 0; y < 255; y++) {
			gameContext.drawImage(tiles.emptyTile, x*32, y*32);
		}
	}

	// Draw the tiles
	for (var x = 0; x < map.length; x++) {
		for (var y = 0; y < map[x].length; y++) {
			if (typeof map[x][y] != 'undefined' && map[x][y] != 1) {
				try {
					if (map[x][y] == 0) {
						gameContext.drawImage(tiles.fogTile, x*32, y*32);
					}
				} catch(err) {}

				try {
					if (typeof map[x][y-1] != 'undefined' && map[x][y-1] == 1) {
						gameContext.drawImage(tiles.wallTiles, 0, 0, 32, 32, x*32, y*32, 32, 32);
					}
				} catch(err) {}

				try {
					if (typeof map[x][y+1] != 'undefined' && map[x][y+1] == 1) {
						gameContext.drawImage(tiles.wallTiles, 32, 0, 32, 32, x*32, y*32, 32, 32);
					}
				} catch(err) {}

				try {
					if (typeof map[x-1][y] != 'undefined' && map[x-1][y] == 1) {
						gameContext.drawImage(tiles.wallTiles, 0, 32, 32, 32, x*32, y*32, 32, 32);
					}
				} catch(err) {}

				try {
					if (typeof map[x+1][y] != 'undefined' && map[x+1][y] == 1) {
						gameContext.drawImage(tiles.wallTiles, 32, 32, 32, 32, x*32, y*32, 32, 32);
					}	
				} catch(err) {}

				try {
					if (typeof map[x+1][y+1] != 'undefined' && map[x+1][y+1] == 1) {
						gameContext.drawImage(tiles.wallTiles, 64, 64, 32, 32, x*32, y*32, 32, 32);
					}	
				} catch(err) {}

				try {
					if (typeof map[x+1][y-1] != 'undefined' && map[x+1][y-1] == 1) {
						gameContext.drawImage(tiles.wallTiles, 96, 64, 32, 32, x*32, y*32, 32, 32);
					}	
				} catch(err) {}

				try {
					if (typeof map[x-1][y-1] != 'undefined' && map[x-1][y-1] == 1) {
						gameContext.drawImage(tiles.wallTiles, 0, 64, 32, 32, x*32, y*32, 32, 32);
					}	
				} catch(err) {}

				try {
					if (typeof map[x-1][y+1] != 'undefined' && map[x-1][y+1] == 1) {
						gameContext.drawImage(tiles.wallTiles, 32, 64, 32, 32, x*32, y*32, 32, 32);
					}	
				} catch(err) {}
			}
			try {
				if (objectMap[x][y] == 2 && map[x-1][y] == 1) {
					console.log("asdf");
					gameContext.drawImage(tiles.wallTiles, 96, 0, 32, 32, x*32, y*32, 32, 32);
				}	
			} catch(err) {}

			try {
				if (objectMap[x][y] == 2 && map[x][y-1] == 1) {
					console.log("asdf");
					gameContext.drawImage(tiles.wallTiles, 64, 0, 32, 32, x*32, y*32, 32, 32);
				}	
			} catch(err) {}

			/*
			if (typeof map[x][y] != 'undefined') {
				if (map[x][y] != 1){
					
				}
			}
				// left
			
				if (map[x][y] != 1){
					
				}
			}

			// right
			if (typeof map[x+1][y] != 'undefined') {
				if (map[x][y] != 1){
					
				}
			}

			// bottom
			if (typeof map[x][y+1] != 'undefined') {
				if (map[x][y] != 1){
					
				}
			}
			*/
			/*
			gameContext.drawImage(map[x][y].spriteSheet, 
								  map[x][y].clip.x, 
								  map[x][y].clip.y, 
								  map[x][y].clip.xo, 
								  map[x][y].clip.yo, 
								  x*32, 
								  y*32, 
								  32, 
								  32);
			*/
		}	
	}
}

update = function() {
	
}

render = function() {
	drawMap();
}

startGameLoop = function() {
	setTimeout( function() {
		update();
		render();
		requestAnimationFrame( startGameLoop );
	}, 1000 / 30);
}


window.onload = function() {
	tiles.setContext(gameContext);
	startGameLoop();

	$('#gameCanvas').on('click', function(e) {
		event = e;
		event = event || window.event;
		var canvas = $('#gameCanvas');
		x = event.pageX - canvas[0].offsetLeft;
		y = event.pageY - canvas[0].offsetTop;
		
		console.log(y);
	});
}

