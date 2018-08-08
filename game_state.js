var demo = {};
demo.game_state = function () {};
demo.game_state.prototype = {
    centerX: 1920 / 2,
    centerY: 1080 / 2,
    speed: 500,
    wscale: 0.3,
    tolerance: 10,
//    image_path: '',
//    with_food: false,
//    direction: 2,
    preload: function () {
        this.load.image('background', 'assets/backgrounds/game_play_bg.png');
        this.load.image('destination', 'assets/sprites/destination.png');
        
        this.load.spritesheet('waitress_back',
                              'assets/spitesheets/waitress/back.png', 300, 775);
        this.load.spritesheet('waitress_front',
                              'assets/spitesheets/waitress/front.png', 300, 775);
        this.load.spritesheet('waitress_ideal',
                              'assets/spitesheets/waitress/ideal.png', 300, 775);
        this.load.spritesheet('waitress_side',
                              'assets/spitesheets/waitress/side.png', 512, 775);
        
    },
    create: function () {
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        
        this.add.sprite(0, 0, 'background');
        this.waitress = this.add.sprite(this.centerX, this.centerY, 'waitress_ideal');
        this.waitress.anchor.setTo(0.5, 0.5);
        this.waitress.scale.setTo(this.wscale); 
        this.waitress.frame = 1;
        
        this.foo = [];
        for (var i = 0; i <= 17; i++) {
           this.foo.push(i);
        }

        this.waitress.animations.add('ideal', this.foo, 10, true);
        this.waitress.animations.play('ideal');
    },
    update: function () {
        this.setDestination = function(x, y) {
            var dx = x - this.waitress.x;
            var dy = y - this.waitress.y;
            var d = Math.abs(dx) + Math.abs(dy);
            var vx = this.speed*dx/d;
            var vy = this.speed*dy/d;
            
            if (this.img) this.img.destroy();
            this.img = this.add.sprite(x, y, 'destination').anchor.setTo(0.5, 0.5);
            this.destination =  {
                x: x,
                y: y,
                vx: vx,
                vy: vy
            }
            this.waitress.setVelocityX(this.destination.vx);
            this.waitress.setVelocityY(this.destination.vy);
        }
        
        this.clearDestination = function() {
            this.img.destroy();
            this.destination = null;
            
        }
        
//        if (this.cursors.left.isDown){
//            this.setDestination(this.waitress.x - 2 * this.tolerance, this.waitress.y);
//        } else if (this.cursors.right.isDown){
//            this.setDestination(this.waitress.x + 2 * this.tolerance, this.waitress.y);
//        } else if (this.cursors.up.isDown) {
//            this.setDestination(this.waitress.x, this.waitress.y - 2 * this.tolerance);
//        } else if (this.cursors.down.isDown) {
//            this.setDestination(this.waitress.x, this.waitress.y + 2 * this.tolerance);
//        }
        
        this.moveLeft = function(){
        this.waitress.loadTexture('waitress_side', 0, false);
            this.waitress.scale.setTo(- this.scale, this.scale); 
        }
        this.moveRight = function() {
        this.waitress.loadTexture('waitress_side', 0, false);
            this.waitress.scale.setTo(this.scale);
        }
        this.moveUp = function() {
        this.waitress.loadTexture('waitress_back', 0, false);
        } 
        this.moveDown = function () {
        this.waitress.loadTexture('waitress_up', 0, false);
        }
        this.stop = function () {
        this.waitress.loadTexture('waitress_ideal', 0, false);
        }
        
        this.input.onDown.addOnce(this.clicked, this);
        

        
        
        if (this.destination) {
            
            if (Math.abs(this.destination.vx) > Math.abs(this.destination.vy)){
                if (this.destination.vx > 0) {
                    this.moveRight();
                } else {
                    this.moveLeft();
                }
            } else {
                if (this.destination.vy > 0) {
                    this.moveDown();
                } else {
                    this.moveUp();
                }
            }
            
            if (Math.abs(this.waitress.x - this.destination.x) < this.tolerance  &&
                Math.abs(this.waitress.y - this.destination.y) < this.tolerance) {
                this.waitress.setVelocityX(0);
                this.waitress.setVelocityY(0);              
                this.stop();
                this.clearDestination();
            }
            

        }
    },
    clicked: function() {
        this.stop();
        this.setDestination(this.input.x, this.input.y);   

    }
};

