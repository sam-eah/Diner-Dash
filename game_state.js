//var demo = {};
//demo.game_state = function () {};
//demo.game_state.prototype = {
//    centerX: 1920 / 2,
//    centerY: 1080 / 2,
////    image_path: '',
////    with_food: false,
////    direction: 2,
//    preload: function () {
//        game.load.image('background', 'assets/backgrounds/game_play_bg.png');
//        var waitress = game.load.image('waitress', 'assets/sprites/Waiterss/Ideal/00001.png');
//        waitress.anchor.setTo(0.5, 0.5);
//    },
//    create: function () {
//        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
//        
//        game.add.sprite(0, 0, 'background');
//        game.add.sprite(this.centerX, this.centerY, 'waitress');
//    },
//    update: function () {}
//};

class game_state extends Phaser.Scene {
    constructor() {
        super({key:"game_state"});
        this.centerX = 1920 / 2;
        this.centerY = 1080 / 2;
        this.speed = 500;
        this.scale = 0.3;
        this.tolerance = 10;
    }
    
    preload() {
        this.load.image('background', 'assets/backgrounds/game_play_bg.png');
        this.load.image('destination', 'assets/sprites/destination.png');
        
        this.load.spritesheet('waitress_back', 
            'assets/spitesheets/waitress/back.png',
            { frameWidth: 300, frameHeight: 775 }
        );
        this.load.spritesheet('waitress_front', 
            'assets/spitesheets/waitress/front.png',
            { frameWidth: 300, frameHeight: 775 }
        );
        this.load.spritesheet('waitress_ideal', 
            'assets/spitesheets/waitress/ideal.png',
            { frameWidth: 300, frameHeight: 775 }
        );
        this.load.spritesheet('waitress_side', 
            'assets/spitesheets/waitress/side.png',
            { frameWidth: 512, frameHeight: 775 }
        );
    }
    
    create(){
//        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.background = this.add.image(0, 0, 'background').setOrigin(0, 0);
        
        this.waitress = this.physics.add.sprite(this.centerX, this.centerY, 'waitress_ideal');
        this.waitress.setScale(this.scale);
        this.waitress.setOrigin(0.5, 1);
//        this.waitress.anchor.setTo(0.5, 0.5);
//        this.waitress.setBounce(0.2);
        this.waitress.setCollideWorldBounds(true);
//        this.waitress.setSize(1, 1, true);
        this.waitress;
        
        this.anims.create({
            key: 'back',
            frames: this.anims.generateFrameNumbers('waitress_back', { start: 0, end: 18 }),
            frameRate: 20,
            repeat: -1
        });

        this.anims.create({
            key: 'front',
            frames: this.anims.generateFrameNumbers('waitress_front', { start: 0, end: 18 }),
            frameRate: 20
        });

        this.anims.create({
            key: 'ideal',
            frames: this.anims.generateFrameNumbers('waitress_ideal', { start: 0, end: 18 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'side',
            frames: this.anims.generateFrameNumbers('waitress_side', { start: 0, end: 18 }),
            frameRate: 10,
            repeat: -1
        });

        
//        this.input.on('pointerdown', function(event) {
////            this.waitress.x = event.x;
////            this.waitress.y = event.y;
////            this.waitress.moveToPointer();
//            this.physics.moveTo(this.waitress, this.input.x, this.input.y, null, 750);
//        }, this);
        
        this.key_Z = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
        this.key_Q = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        this.key_S = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.key_D = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        
        this.cursors = this.input.keyboard.createCursorKeys();
          
        this.input.keyboard.on('keyup', function(e){
            if (e.keyCode == 32) {
                this.scene.launch("pause_state");
                this.scene.pause();

            }
        }, this);
    }
    
    update(){
//        if (this.key_Q.isDown) {
//            this.moveLeft();
//        } else if (this.key_D.isDown) {
//            this.moveRight();
//        } else if (this.key_Z.isDown) {
//            this.moveUp();
//        } else if (this.key_S.isDown) {
//            this.moveDown();
//        } else {
////            this.waitress.setVelocityX(0);
////            this.waitress.setVelocityY(0);
////            this.waitress.anims.play('ideal', true);
//        };
        
        this.setDestination = function(x, y) {
            var dx = x - this.waitress.x;
            var dy = y - this.waitress.y;
            var d = Math.abs(dx) + Math.abs(dy);
            var vx = this.speed*dx/d;
            var vy = this.speed*dy/d;
            
            if (this.img) this.img.destroy();
            this.img = this.add.image(x, y, 'destination').setOrigin(0.5, 0.5);
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
        
        if (this.cursors.left.isDown){
            this.setDestination(this.waitress.x - 2 * this.tolerance, this.waitress.y);
        } else if (this.cursors.right.isDown){
            this.setDestination(this.waitress.x + 2 * this.tolerance, this.waitress.y);
        } else if (this.cursors.up.isDown) {
            this.setDestination(this.waitress.x, this.waitress.y - 2 * this.tolerance);
        } else if (this.cursors.down.isDown) {
            this.setDestination(this.waitress.x, this.waitress.y + 2 * this.tolerance);
        }
        
        this.moveLeft = function(){
            this.waitress.anims.play('side', true);
            this.waitress.setScale(- this.scale, this.scale); 
        }
        this.moveRight = function() {
            this.waitress.anims.play('side', true);
            this.waitress.setScale(this.scale);
        }
        this.moveUp = function() {
            this.waitress.anims.play('back', true);
        } 
        this.moveDown = function () {
            this.waitress.anims.play('front', true);
        }
        this.stop = function () {
            this.waitress.anims.play('ideal', true);
        }
        
        this.input.on('pointerdown', function(event) {
            this.stop();
            this.setDestination(this.input.x, this.input.y);            
        }, this);
        
        
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
            
//            if (this.waitress.x + this.tolerance < this.destination.x) {
//                this.moveRight();
//            } else if (this.waitress.x - this.tolerance > this.destination.x) {
//                this.moveLeft();
//            } else { 
//                this.waitress.setVelocityX(0);
//                if (this.waitress.y + this.tolerance < this. destination.y) {
//                    this.moveDown();
//                } else if (this.waitress.y - this.tolerance > this.destination.y) {
//                    this.moveUp();
//                } else {
//                    this.stop();
//                    this.clearDestination();
//                }
//            }
        }
    }
}