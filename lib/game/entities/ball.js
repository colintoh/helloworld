ig.module(
	'game.entities.ball'
)
.requires(
	'impact.entity'
)
.defines(function(){

	EntityBall = ig.Entity.extend({
		size:{x:30,y:30},
		gravityFactor:0,
		friction:{x:50},
		power:2,
		alpha:1,
		fly:false,
		animSheet: new ig.AnimationSheet('media/animation/ball.png',30,30),
		init:function(x,y,settings){
			this.parent(x,y,settings);
			this.addAnim( 'idle', 1, [0] );
			this.maxVel = {x:500,y:500};
			this.vel.x = 0;
			this.vel.y = 0;
			if( !ig.global.wm ) {
				this.pos.x = ig.game.stopDist;
			}
			this.currentAnim.alpha = this.alpha;
		},
		update:function(){
			this.parent();
			//console.log(this.vel.x+" "+this.vel.y);
			this.currentAnim.alpha = this.alpha;
			this.boundFloor();
		},
		calculateBallFlight:function(velocity,angle){
			var rad = Math.PI/180 * angle;


			var dist = Math.pow(velocity,2)*Math.sin(2*rad)/ig.game.gravity;

			return {x:dist,y:dist*Math.tan(rad)};
		},
		setFly:function(final_velocity,angle,ball,monster){
			var rad = Math.PI/180 * angle;
			this.vel.x = this.power*Math.cos(rad)*final_velocity;
			this.vel.y = this.power*Math.sin(rad)*final_velocity;
			this.gravityFactor = 1;
			ball.fly = true;
			monster.thrown = true;
		},
		boundFloor:function(){
			if(this.pos.y > 700 && this.fly){
				this.pos.y = 700;
				this.vel.x = 0;
				this.vel.y = 0;
				this.gravityFactor = 0;
			}
		}
	});

});