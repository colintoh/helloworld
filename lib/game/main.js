var baseline = 275;
var topLimit = 80;
var botLimit = 200;
var padding = 20;
var jump = 50 + padding;


ig.module(
	'game.main'
)
.requires(
	'impact.game',
	'impact.font',

	'game.entities.background',
	'game.entities.monster',
	'game.entities.ball',
	'game.entities.arrow',
	'game.entities.bar',
	'game.entities.bar_background',
	'game.entities.heart',

	'game.levels.clean',
	'game.levels.clean2',
	'game.levels.nothing',
	'game.levels.joytruck',
	'game.levels.joytruck2'
)
.defines(function(){

MyGame = ig.Game.extend({
	
	// Load a font
	font: new ig.Font( 'media/04b03.font.png' ),
	gravity:600,
	stopDist:2500,

	init: function() {
		// Initialize your game here; bind keys etc.
		ig.input.bind(ig.KEY.MOUSE1,'tap');
		this.loadLevel(LevelJoytruck2);
		this.generateHearts();
	},
	update: function() {
		this.parent();
		ig.game.sortEntitiesDeferred();
		this.monster = monster = ig.game.getEntitiesByType(EntityMonster)[0];
		this.ball = ball = ig.game.getEntitiesByType(EntityBall)[0];
		arrow = ig.game.getEntitiesByType(EntityArrow)[0];

		monster.thrown ? this.moveScreenCenterBall() : this.moveScreenCenterMonster();
		this.boundScreen();

		if(monster.reachEnd && arrow.arrowStop){
				monster.currentAnim = monster.anims.throwing;
			}
		if(!monster.reachEnd && monster.is_reach_end() ) { // monster reach end and haven't stop
				monster.stopMonster();
		}
		if(!ball.fly && monster.reachEnd){ //monster stopped and ball haven't fly
			arrow.arrowAppear();
		}
		if(arrow.arrowStop && !ball.fly) { //arrow stop and ball haven't fly
			console.log(arrow.arrowAngle+90);
			console.log("Angle: "+ (arrow.arrowAngle+90)); //Add 90 to normalize the rotation scale
			console.log("Velocity: "+ monster.finalX);
			//ball.vel.x = -475;
			//Wait for throw animation to finish before the camera follow the ball
			setTimeout(function(){
				ball.setFly(-monster.finalX,arrow.arrowAngle+90,ball,monster);
			},500);
			//var ballFlight = ball.calculateBallFlight(-monster.finalX,arrow.arrowAngle+90);
			/*
			setTimeout(function(){
				
				console.log(ballFlight);
				ball.vel.x = -ballFlight.x;
				ball.vel.y = -ballFlight.y;
				ball.gravityFactor = 1;
				
				setTimeout(function(){
					monster.thrown = true;
				},200);
			},600);
			*/
		}
	},
	draw: function() {
		// Draw all entities and backgroundMaps
		this.parent();
		var monster = ig.game.getEntitiesByType(EntityMonster)[0];
		var ball = ig.game.getEntitiesByType(EntityBall)[0];
		
		if(monster){
			// Add your own drawing code here
			var x = ig.system.width/2,
				y = ig.system.height/2;
			this.font.draw( Math.abs(monster.vel.x), 10, 10, ig.Font.ALIGN.LEFT );
			if(monster.reachEnd){
				this.font.draw("Your final throw: "+Math.ceil(this.stopDist - Math.abs(ball.pos.x)), x, y, ig.Font.ALIGN.CENTER );
			}
		}
	},
	moveScreenCenterMonster:function(){
		this.screen.x = this.monster.pos.x - ig.system.width/2;
		this.screen.y = this.monster.pos.y - ig.system.height/2 - 50;
	},
	moveScreenCenterBall:function(){
		this.screen.x = ball.pos.x - ig.system.width/2 - 80 ;
		this.screen.y = ball.pos.y - ig.system.height/2 - 90;
	},
	boundScreen:function(){
		if(this.screen.x < 0){
				this.screen.x = 0;
		}
		if(this.screen.y < 0){
			this.screen.y = 0;
		}
		if(this.screen.y > ig.system.height - 20){
			this.screen.y = ig.system.height - 20;
		}
	},
	generateHearts:function(){
		bar = ig.game.getEntitiesByType(EntityBar)[0];
		for(var i=bar.pos.y;i<bar.pos.y+bar.size.y-10;i+=22){
			ig.game.spawnEntity(EntityHeart, bar.pos.x, i);
		}
		ig.game.sortEntitiesDeferred();
	}

});


// Start the Game with 60fps, a resolution of 320x240, scaled
// up by a factor of 2
if(ig.ua.android){
	var height = screen.width/window.devicePixelRatio *1.14;
	ig.main( '#canvas', MyGame, 60, screen.width/2, height, 1 );
	}
else if(ig.ua.iOS){
    var height1 = screen.width *1.14;
    ig.main( '#canvas', MyGame, 60, screen.width, height1, 1 );
}
else
{
    ig.main( '#canvas', MyGame, 60, 672, 766.5, 1 );
}

});
