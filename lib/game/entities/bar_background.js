ig.module(
	'game.entities.bar_background'
)
.requires(
	'impact.entity'
)
.defines(function(){

	EntityBar_background = ig.Entity.extend({
		size:{x:35,y:227},
		gravityFactor:0,
		type:"speedbar",
		margin_to_screen_left:33,
		animSheet: new ig.AnimationSheet('media/animation/pink_bar.png',35,227),
		init:function(x,y,settings){
			this.parent(x,y,settings);
			this.addAnim( 'idle', 1, [0] );
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