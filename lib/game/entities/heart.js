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
		margin_to_bottom_bar:20,
		margin_to_top_limit:20,
		vel:{y:-80,x:0},
		zIndex:2,
		animSheet: new ig.AnimationSheet('media/animation/heart.png',15,12),
		init:function(x,y,settings){
			this.parent(x,y,settings);
			this.addAnim( 'idle', 1, [0] );
			this.addAnim( 'empty', 1,[1] ); //empty image
			this.currentAnim = this.anims.idle;
		},
		update:function(){
			this.bar = ig.game.getEntitiesByType(EntityBar)[0];
			this.limit = ig.game.getEntitiesByType(EntityLimit)[0];
			this.zIndex = this.is_below_limit() ? 2 : -1;
			ig.game.sortEntitiesDeferred();
			if(this.is_exceed_bar()){
				this.pos.y += this.bar.size.y - this.margin_to_bottom_bar;
			}
			this.parent();
		},
		is_below_limit:function(){
			return this.pos.y > this.limit.pos.y + this.margin_to_top_limit;
		},
		is_exceed_bar:function(){
			return this.pos.y < this.bar.pos.y;

		}
	});

});