ig.module(
	'game.entities.arrow'
)
.requires(
	'impact.entity'
)
.defines(function(){

	EntityArrow = ig.Entity.extend({
		size:{x:29,y:87},
		gravityFactor: 0,
		arrowAngle:-20,
		arrowSpeed:1.8,
		alpha:0,
		delayOver:false,
		delayTime:500,
		arrowStop:false,
		arrowDirection: "up",
		animSheet: new ig.AnimationSheet('media/animation/arrow.png',29,87),
		init:function(x,y,settings){
			this.parent(x,y,settings);
			this.addAnim( 'idle', 1, [0] );
			this.currentAnim.pivot = {x:29/2,y:87};
			if( !ig.global.wm ) {
				this.pos.x = ig.game.stopDist;
			}
		},
		update:function(){
			this.parent();
			var monster = ig.game.getEntitiesByType(EntityMonster)[0];

			this.currentAnim.alpha = this.alpha;
			if(ig.input.pressed('tap') && monster.reachEnd && this.delayOver){
				this.arrowStop = true;
			}

			if(this.alpha == 1){
				var that =this;
				setTimeout(function(){
					that.delayOver = true;
				},this.delayTime);
			}
		},
		degToRad:function(deg){
			return Math.PI/180 *deg;
		},
		arrowMove:function(){
			if(this.arrowDirection == "up"){
				if(this.currentAnim.angle < this.degToRad(0)){
					this.arrowAngle += this.arrowSpeed;
				} else {
					this.arrowDirection = "down";
				}
			} else if(this.arrowDirection == "down"){
				if(this.currentAnim.angle > this.degToRad(-90)){
					this.arrowAngle -= this.arrowSpeed;
				} else {
					this.arrowDirection = "up";
				}
			}
			this.currentAnim.angle = this.degToRad(this.arrowAngle);
		},
		arrowAppear:function(){
			if(this.alpha >= 1){
				this.alpha = 1;
			} else {
				this.alpha += 0.05;
			}
			if(!this.arrowStop){
				this.arrowMove();
			}
		}
	});

});