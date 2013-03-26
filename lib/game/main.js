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
	//'impact.debug.debug',

	'game.entities.background',
	'game.entities.monster',
	'game.entities.ball',
	'game.entities.arrow',
	'game.entities.bar',
	'game.entities.bar_background',
	'game.entities.limit',
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
	gravity:330,
	stopDist:2500,

	
	
	init: function() {
		// Initialize your game here; bind keys etc.

		ig.input.bind(ig.KEY.MOUSE1,'tap');
		//ig.input.bindTouch('#canvas','tap');
		this.loadLevel(LevelJoytruck2);
		this.generateHearts();
	},
	
	update: function() {
		// Update all entities and backgroundMaps
		var monster = ig.game.getEntitiesByType(EntityMonster)[0];
		var ball = ig.game.getEntitiesByType(EntityBall)[0];
		var bg = ig.game.getEntitiesByType(EntityBackground)[0];
		var arrow = ig.game.getEntitiesByType(EntityArrow)[0];
		var bar = ig.game.getEntitiesByType(EntityBar)[0];
		var bar_background = ig.game.getEntitiesByType(EntityBar_background)[0];
		var limit = ig.game.getEntitiesByType(EntityLimit)[0];
		var hearts = ig.game.getEntitiesByType(EntityHeart);
		this.parent();

		if(monster){

			if(!monster.reachEnd || !arrow.arrowStop){
				
				this.screen.x = monster.pos.x - ig.system.width/2;
				this.screen.y = monster.pos.y - ig.system.height/2 - 50;
				bar.pos.x = this.screen.x + 30;
				bar_background.pos.x = bar.pos.x + 2;
				limit.pos.x = bar.pos.x - 10;
				for(var i=0;i<hearts.length;i++){
					hearts[i].pos.x = this.screen.x + 42;
				}

			} else {
				monster.currentAnim = monster.anims.throwing;

				if(monster.thrown){
					this.screen.x = ball.pos.x - ig.system.width/2 - 80 ;
					this.screen.y = ball.pos.y - ig.system.height/2 -90;
					if(this.screen.y > (ig.system.height - 20)){
						this.screen.y = (ig.system.height - 20);
					} else if(this.screen.y < 0){
						this.screen.y = 0;
					}
				}
			}
		

			if(monster.pos.x - 10 <= this.stopDist) {
				if(!monster.reachEnd){
					monster.pos.x = this.stopDist;
					monster.reachEnd = true;
					monster.accel.x = 0;
					monster.finalX = Math.ceil(Math.abs(monster.vel.x));
					monster.vel.x = 0;
					monster.currentAnim = monster.anims.hang;

					ball.alpha = 1;
				} else if(!ball.fly) { //monster stopped and ball haven't fly
					arrow.arrowAppear();
					if(!arrow.arrowStop){
						arrow.arrowMove();
					} else { //arrow stopped
						console.log(arrow.arrowAngle+90);
						console.log("Angle: "+ (arrow.arrowAngle+90)); //Add 90 to normalize the rotation scale
						console.log("Velocity: "+ monster.finalX);


						//ball.vel.x = -475;
						
						//Wait for throw animation to finish before the camera follow the ball
						ball.fly = true;
						var ballFlight = ball.calculateBallFlight(-monster.finalX,arrow.arrowAngle+90);
						setTimeout(function(){
							
							console.log(ballFlight);
							ball.vel.x = -ballFlight.x;
							ball.vel.y = -ballFlight.y;
							ball.gravityFactor = 1;
							
							setTimeout(function(){
								monster.thrown = true;
							},200);
						},600);


					}
				}
			}
		}

		if(ball) {
			//this.screen.x = ball.pos.x - ig.system.width/2;
			//console.log(ball.pos.x);
		}

		

		/*if(monster){
			if(!monster.reachEnd || !arrow.arrowStop){
				this.screen.x = monster.pos.x - ig.system.width/2;
				this.screen.y = monster.pos.y - ig.system.height/2 - 50;
			}
		}

		if(monster.pos.x - 10 <= this.stopDist) {
			console.log('123');
		}*/
		
		// Add your own, additional update code here
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
		//this.moveSpeedBar();
	},
	moveSpeedBar:function(){
		//$("#speedbar").clearCanvas();

		var bar = ig.game.getEntitiesByType(EntityBar)[0];
		//console.log(bar.pos.x);

	    for(var i = baseline; i>topLimit;i-=jump){
	        $("#canvas").drawArc({
	          fillStyle: "green",
	          x: 100, y: i,
	          radius: 25
	        });
	    }
	    
	    //console.log(baseline);
	    
	    if(baseline - 1 < botLimit){
	        baseline = 270;
	        //window.clearInterval(intv);
	        //draw();
	    } 
	        baseline -= 5.5;
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
