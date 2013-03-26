ig.module(
	'game.entities.monster'
)
.requires(
	'impact.entity'
)
.defines(function(){

	EntityMonster = ig.Entity.extend({
		name:'name',
		size:{x:150,y:134},
		collides: ig.Entity.COLLIDES.ACTIVE,
		reachEnd: false,
		gravityFactor: 0,
		finalVel:0,
		thrown:false,
		animSheet: new ig.AnimationSheet('media/animation/girl.png',150,134),
		init:function(x,y,settings){
			this.parent(x,y,settings);
			this.minWalkingSpeed = 0;
			this.addAnim( 'idle', 1, [5] );
			this.addAnim( 'run', 0.2, [0,1,2,3,4,3,2,1] );
			this.addAnim( 'hang', 1, [3] );
			this.addAnim( 'throwing', 0.2, [5,6,7,8]);
			this.currentAnim = this.anims.run;
			this.vel.x = 0;
			this.vel.y = 0;
			this.maxVel.x = 500;
		},
		update:function(){

			this.parent();

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

			

			

			
		}

	});

});