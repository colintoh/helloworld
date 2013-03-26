ig.module(
	'game.entities.heart'
)
.requires(
	'impact.entity',
	'game.entities.limit',
	'game.entities.bar'
)
.defines(function(){

	EntityHeart = ig.Entity.extend({
		size:{x:15,y:12},
		gravityFactor:0,
		zIndex:3,
		animSheet: new ig.AnimationSheet('media/animation/heart.png',15,12),
		init:function(x,y,settings){
			this.parent(x,y,settings);
			this.addAnim( 'idle', 1, [0] );
			this.addAnim( 'empty', 1,[1] ); //empty image
			this.vel.y = -80;
		},
		update:function(){
			this.bar = ig.game.getEntitiesByType(EntityBar)[0];
			this.limit = ig.game.getEntitiesByType(EntityLimit)[0];
			if(this.pos.y < this.limit.pos.y) this.currentAnim = this.anims.empty;
			else this.currentAnim = this.anims.idle;
		    if(this.pos.y < this.bar.pos.y - 12) this.pos.y = (this.pos.y + this.bar.size.y);
			console.log(this.zIndex);
			this.parent();
		}

	});

});