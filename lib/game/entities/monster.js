ig.module(
	'game.entities.monster'
)
.requires(
	'impact.entity'
)
.defines(function(){

	EntityMonster = ig.Entity.extend({
		size:{x:75,y:72},
		collides: ig.Entity.COLLIDES.ACTIVE,
		reachEnd: false,
		gravityFactor: 0,
		finalVel:0,
		animSheet: new ig.AnimationSheet('media/animation/monster2.png',75,67),
		init:function(x,y,settings){
			this.parent(x,y,settings);
			this.minWalkingSpeed = 0;
			this.addAnim( 'idle', 1, [2] );
			this.addAnim( 'run', 0.2, [0,1,2,3,4,3,2,1] );
			this.vel.x = 0;
			this.vel.y = 0;
			this.maxVel.x = 500;
		},
		update:function(){

			var monster = this;

			if(!monster.reachEnd){
				if(ig.input.pressed('tap')){
					monster.currentAnim = monster.anims.run;
					monster.accel.x = 0;
					if(monster.vel.x > -monster.maxVel.x){
						monster.vel.x -= 10;
						if(monster.currentAnim.frameTime < 0.05){
							monster.currentAnim.frameTime = 0.05;
						}
					}
				} else {
					if(monster.vel.x >= monster.minWalkingSpeed){
						monster.vel.x = 0;
						monster.accel.x = 0;
						//monster.currentAnim.frameTime = 0.2;
						monster.currentAnim = monster.anims.idle;
					} else {
						if(monster.vel.x < -350){
							monster.currentAnim.frameTime = 0.05;
						} else if(monster.vel.x < -250){
							monster.currentAnim.frameTime = 0.08;
						} else if(monster.vel.x < -100){
							monster.currentAnim.frameTime = 0.1;
						} else if(monster.vel.x < -80){
							monster.currentAnim.frameTime = 0.2;
						}
							
						//monster.currentAnim.frameTime += 0.001;
						monster.accel.x += 1.5;
					}
				}
			}

			

			

			this.parent();
		}

	});

});