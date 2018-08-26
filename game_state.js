'use strict';

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
        
        this.physics.startSystem(Phaser.Physics.ARCADE);
        
        this.add.sprite(0, 0, 'background');
        this.waitress = this.add.sprite(this.centerX, this.centerY, 'waitress_ideal');
        this.destination = this.add.sprite(0, 0, 'destination');
        
        this.waitress.direction = 2;
        
        this.physics.arcade.enable([this.waitress, this.destination]);
        
        this.waitress.body.collideWorldBounds = true;
        this.destination.body.enable = false;
        
//        this.waitress.enableBody = true;
        this.waitress.anchor.setTo(0.5, 0.5);
        this.waitress.scale.setTo(this.wscale); 
        this.waitress.frame = 1;
        
        
        this.destination.anchor.setTo(0.5, 0.5);
        
        this.foo = [];
        for (var i = 0; i <= 17; i++) {
           this.foo.push(i);
        }

        this.waitress.animations.add('ideal', this.foo, 10, true);
        this.waitress.animations.play('ideal');
        
    },
    update: function () {        
        
        if (this.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
            console.log("right");
            this.animRight();
            this.waitress.x += 2;
//            this.setDestination(this.waitress.x - 2 * this.tolerance, this.waitress.y);
        } //else if (this.cursors.right.isDown){
//            this.setDestination(this.waitress.x + 2 * this.tolerance, this.waitress.y);
//        } else if (this.cursors.up.isDown) {
//            this.setDestination(this.waitress.x, this.waitress.y - 2 * this.tolerance);
//        } else if (this.cursors.down.isDown) {
//            this.setDestination(this.waitress.x, this.waitress.y + 2 * this.tolerance);
//        }
        
        
        this.input.onDown.addOnce(this.clicked, this);
        

        
        
        if (this.destination) {
            this.physics.arcade.overlap(this.waitress, this.destination, this.arriveDestination(this));
        }
        
    },
    
    render: function() {
        demo.debug.body(this.waitress);
        demo.debug.body(this.destination);        
    },
    
    clicked: function() {
        this.animStop();
        this.setDestination();   

    },
    animLeft: function() {
//        this.waitress = this.add.sprite(this.waitress.x, this.waitress.y, 'waitress_side');
//        this.waitress.loadTexture('waitress_side', 0, false);
//        this.waitress.animations.add('waitress_side', this.foo, 10, true);
//        this.waitress.animations.play('waitress_side');
//        this.waitress.scale.setTo(- this.scale, this.scale); 
        
    },
    animRight: function() {
//        this.waitress.loadTexture('waitress_side', 0, false);
//        this.waitress.animations.add('waitress_side', this.foo, 10, true);
//        this.waitress.animations.play('waitress_side');
//        this.waitress.scale.setTo(this.scale); 
    },
    animUp: function() {
//        this.waitress.loadTexture('waitress_back', 0, false);
    },
    animDown: function() {
//        this.waitress.loadTexture('waitress_up', 0, false);
    },
    animStop: function() {
//        this.waitress.loadTexture('waitress_ideal', 0, false);
    },
    
    setDestination: function() {
        var x = this.input.mousePointer.x;
        var y = this.input.mousePointer.y;
        var dx = x - this.waitress.x;
        var dy = y - this.waitress.y;

        if (dx > dy) {
            if (dx > 0) {
                this.waitress.direction = 6;
            } else {
                this.waitress.direction = 4;
            }
        } else {
            if (dy > 0) {
                this.waitress.direction = 2;
            } else {
                this.waitress.direction = 8;
            }
        }

        switch (this.waitress.direction) {
            case 6:
                this.animRight();
                break;
            case 4:
                this.animLeft();
                break;
            case 2:
                this.animDown();
                break;
            case 8:
                this.animUp();
                break;
        }

        this.clearDestination();
        this.destination.x = x;
        this.destination.y = y;
        this.destination.body.enable = true;
        console.log(this.destination.x);
        this.physics.arcade.moveToPointer(this.waitress, this.speed);
    },
    
    arriveDestination: function(that) {
        console.log(that.waitress.x, that.destination.x);
        that.waitress.body.velocity.x = 0;
        that.waitress.body.velocity.y = 0;              
        that.animStop();
        that.clearDestination();
    },
    
    clearDestination: function() {
        if (this.destination.body.enable) {
            this.destination.body.enable = false;
        }
    }   
};

