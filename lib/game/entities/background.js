ig.module(
	'game.entities.background'
)
.requires(
	'impact.entity'
)
.defines(function(){

	EntityBackground = ig.Entity.extend({
		size:{x:2500,y:640},
		gravityFactor:0,
		alpha:0,
		animSheet: new ig.AnimationSheet('media/animation/bg.jpg',2500,640),
		init:function(x,y,settings){
			this.parent(x,y,settings);
			this.addAnim( 'idle', 1, [0] );
		},
		update:function(){
			this.parent();
		}
	});

});