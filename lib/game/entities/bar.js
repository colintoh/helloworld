ig.module(
	'game.entities.bar'
)
.requires(
	'impact.entity'
)
.defines(function(){

	EntityBar = ig.Entity.extend({
		size:{x:39,y:238},
		gravityFactor:0,
		type:"speedbar",
		margin_to_screen_left:31,
		animSheet: new ig.AnimationSheet('media/animation/speedbar.png',39,238),
		init:function(x,y,settings){
			this.parent(x,y,settings);
			this.addAnim( 'idle', 1, [0] );
			// this.currentAnim.pivot = {x:29/2,y:87};
		},
		update:function(){
			this.parent();	
		},
		draw:function(){
			this.updatePosition();
			this.parent();
		},
		updatePosition:function(){
			this.pos.x = ig.game.screen.x + this.margin_to_screen_left;
		}

	});

});