// console.log('hi');

;(function(){

	var Game = function(canvasId){
		var canvas = document.getElementById(canvasId);
		var screen = canvas.getContext('2d');
		var gameSize = {x: canvas.width, y: canvas.height};

		this.bodies = [new Player(this, gameSize)];
		
		var self = this;
		//GameLogic
		var tick = function(){
			self.update();
			self.draw(screen, gameSize);
			requestAnimationFrame(tick);
		};

		tick();
	};

	Game.prototype = {
		update: function(){
			for (var i = 0; i < this.bodies.length; i++){
				this.bodies[i].update();
			}
		},

		draw: function(screen, gameSize){
			screen.clearRect(0, 0, gameSize.x, gameSize.y);
			for (var i = 0; i < this.bodies.length; i++){
				drawRect(screen, this.bodies[i]);
			}
		},

		addBody: function(body){
			this.bodies.push(body);
		}
	};

// ===============================================

	var Player = function(game, gameSize){
		this.game = game;
		this.size = { x: 15, y: 15 };
		this.center = { x: gameSize.x/2, y: gameSize.y - this.size.y };
		this.keyboarder = new Keyboarder();
	};

	Player.prototype = {
		update: function() {
			if(this.keyboarder.isDown(this.keyboarder.KEYS.LEFT)){
				this.center.x -= 2;
			}else if(this.keyboarder.isDown(this.keyboarder.KEYS.RIGHT)){
				this.center.x += 2;
			}
			if (this.keyboarder.isDown(this.keyboarder.KEYS.SPACE)){
				var bullet = new Bullet({ x: this.center.x, y: this.center.y - this.size.y }, { x: 0, y: -6 });
				this.game.addBody(bullet);
			}

		}
	};

// ===============================================
	
	var Invader = function(game, gameSize){
		
	}

// ===============================================
	var Bullet = function(center, velocity){
		this.size = { x: 3, y: 3};
		this.center = center;
		this.velocity = velocity;
	};

	Bullet.prototype = {
		update: function() {
			this.center.x += this.velocity.x;
			this.center.y += this.velocity.y;
		}
	}

// ===============================================

	var drawRect = function(screen, body){
		screen.fillRect(body.center.x - body.size.x/2,
						body.center.y - body.size.y/2,
						body.size.x, body.size.y);
	};

	var Keyboarder = function(){
		var keyState = {};

		window.onkeydown = function(e){
			keyState[e.keyCode] = true;
		};
		
		window.onkeyup = function(e){
			keyState[e.keyCode] = false;
		};

		this.isDown = function(keyCode){
			return keyState[keyCode] === true;
		};

		this.KEYS = { LEFT: 37, RIGHT: 39, SPACE: 32 };
		// window.onkeyup = function(e){
		// 	keyState[e.keyCode] = false;
		// };
	};

	window.onload = function(){
		new Game("screen");
	};
})();