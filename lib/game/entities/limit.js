ig.module(
	'game.entities.limit'
)
.requires(
	'impact.entity',
	'game.entities.bar',
	'game.entities.ball',
	'game.entities.monster'
)
.defines(function(){

	EntityLimit = ig.Entity.extend({
		size:{x:60,y:31},
		gravityFactor:0,
		type:"speedbar",
		margin_to_screen_left:20,
		animSheet: new ig.AnimationSheet('media/animation/limit.png',60,31),
		init:function(x,y,settings){
			this.parent(x,y,settings);
			this.addAnim( 'idle', 1, [0] );

			if( !ig.global.wm ) {
				this.bar = ig.game.getEntitiesByType(EntityBar)[0];
				this.monster = ig.game.getEntitiesByType(EntityMonster)[0];
				this.ball = ig.game.getEntitiesByType(EntityBall)[0];
				this.bottomPos = this.bar.pos.y + this.bar.size.y - this.size.y;
				this.pos.y = this.bottomPos;
				baseline = this.bottomPos;
			}
			
			// this.currentAnim.pivot = {x:29/2,y:87};
		},
		update:function(){
			this.parent();	
			var vel = Math.abs(this.monster.vel.x);
			var velMap = vel/this.monster.maxVel.x;

			if(velMap || !this.monster.reachEnd){
				
				var dist = this.bar.size.y*velMap;

				this.pos.y = this.bottomPos - dist;
				if(this.pos.y < this.bar.pos.y){
					this.pos.y = this.bar.pos.y;
				}
			} else {
				
			}
		},
		draw:function(){
			console.log("haha");
			this.updatePosition();
			this.parent();
		},
		updatePosition:function(){
			this.pos.x = ig.game.screen.x + this.margin_to_screen_left;
		},

	});

});