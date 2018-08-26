var GamePlay = {
    game: controller.game,
    
    centerX: 1920 / 2,
    centerY: 1080 / 2,
    speed: 500,
    wscale: 0.4,
    tolerance: 10,
//    image_path: '',
//    with_food: false,
//    direction: 2,
    preload: function () {
        
    },
    create: function () {
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        
        this.physics.startSystem(Phaser.Physics.ARCADE);
        
        // BG
        this.add.sprite(0, 0, 'background');
        
        // UI 
        this.add.sprite(140, 20, 'hud_base');
        this.add.sprite(1550, 20, 'hud_base').scale.setTo(0.8, 1);
        this.add.sprite(110, 10, 'uiface');
        this.add.sprite(1830, 10, 'pause');
        
        // COOK
        this.cook1 = this.add.sprite(1250, 300, 'cook_front');
        this.cook1.scale.setTo(0.9);
        
        this.cook2 = this.add.sprite(1000, 180, 'cook_back');
        this.cook2.scale.setTo(0.9);
        
        // COUNTER
        this.add.sprite(450, 350, 'counter');
        this.add.sprite(720, 430, 'foodcover');
        this.add.sprite(860, 430, 'foodcover');
        
        // CUSTOMERS
        this.girlGroup = this.add.group();
        this.girl1 = this.add.sprite(40, 760, 'girl1');
        this.girl1.anchor.setTo(0.5, 1);
        this.girl2 = this.add.sprite(120, 760, 'girl2');
        this.girl2.anchor.setTo(0.5, 1);
        this.girlGroup.add(this.girl1);
        this.girlGroup.add(this.girl2);
        
        this.manGroup = this.add.group();
        this.man1 = this.add.sprite(200, 700, 'man1');
        this.man2 = this.add.sprite(280, 700, 'man2');
        this.manGroup.add(this.man1);
        this.manGroup.add(this.man2);
        
//        this.tableGroup = []
        this.tableList = [];
        this.priorityGroup = [];
        
        for  (var y = 0; y < 2; y++){
            newgroup = this.add.group();
            
            for (var x = 0; x < 3; x++) {
                newgroup.enableBody = true;
                newgroup.physicsBodyType = Phaser.Physics.ARCADE;
                
                var chair1 = this.add.sprite(COLX[x] , ROWY[y] -20, 'chair')
                chair1.scale.setTo(-1, 1);
                var chair2 = this.add.sprite(COLX[x] +140, ROWY[y] -20, 'chair');
                var table = this.add.sprite(COLX[x], ROWY[y], 'table');
                
                var tableSet = {
                    table: table,
                    chair1: chair1,
                    chair2: chair2
                };
                
                newgroup.add( chair1 );
                newgroup.add( chair2 );
                newgroup.add( table );
                
                this.tableList.push(tableSet);
                
            }
//            this.tableGroup[0].moveAll(newgroup);
//            this.tableGroup[1].moveAll(newgroup);
//            this.tableGroup[2].moveAll(newgroup);
            
            this.priorityGroup.push(newgroup);
            
        }
        
        
        this.podium = this.add.sprite(430, 850, 'podium');
        this.closeSign = this.add.sprite(220, 920, 'close');
        
        this.priorityGroup[1].add(this.podium);
        this.priorityGroup[1].add(this.closeSign);
        
        console.log(this.priorityGroup);
        
        this.waitress = this.add.sprite(600, 680, 'waitress_ideal');
        this.destination = this.add.sprite(0, 0, 'destination');
        
        this.waitress.direction = 2;
        
        this.physics.arcade.enable([this.waitress, this.destination]);
        
        this.waitress.body.collideWorldBounds = true;
        this.destination.body.enable = false;
        
//        this.waitress.enableBody = true;
        this.waitress.anchor.setTo(0.5, 1);
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
            if (this.waitress.direction != 6) {
                this.waitress.direction = 6;
                this.animRight();
            }
            this.waitress.x += 2;
        } else if (this.input.keyboard.isDown(Phaser.Keyboard.LEFT)){
            if (this.waitress.direction != 4) {
                this.waitress.direction = 4;
                this.animLeft();
            }
            this.waitress.x -= 2;
        } else if (this.input.keyboard.isDown(Phaser.Keyboard.UP)){
            if (this.waitress.direction != 2) {
                this.waitress.direction = 2;
                this.animUp();
            }
            this.waitress.y -= 2;
        } else if (this.input.keyboard.isDown(Phaser.Keyboard.DOWN)){
            if (this.waitress.direction != 8) {
                this.waitress.direction = 8;
                this.animDown();
            }
            this.waitress.y += 2;
        } else {
            if (this.waitress.direction != 0) {
                this.waitress.direction = 0;
                this.animStop();
            }
        }
        
        
        this.input.onDown.addOnce(this.tpWaitress, this);
        

        
        
        if (this.destination.body.enable) {
            this.physics.arcade.overlap(this.waitress, this.destination, this.arriveDestination(this));
        }
        
    },
    
    render: function() {
//        this.debug.body(this.waitress);
//        this.debug.body(this.destination);        
    },
    
    clicked: function() {
        this.animStop();
        this.setDestination();   

    },
    animLeft: function() {
//        this.waitress = this.add.sprite(this.waitress.x, this.waitress.y, 'waitress_side');
        this.waitress.loadTexture('waitress_side', 0, false);
//        this.waitress.animations.add('waitress_side', this.foo, 10, true);
//        this.waitress.animations.play('waitress_side');
        this.waitress.scale.setTo(- this.wscale, this.wscale); 
        
    },
    animRight: function() {
        this.waitress.loadTexture('waitress_side', 0, false);
//        this.waitress.animations.add('waitress_side', this.foo, 10, true);
//        this.waitress.animations.play('waitress_side');
        this.waitress.scale.setTo(this.wscale); 
    },
    animUp: function() {
        this.waitress.loadTexture('waitress_back', 0, false);
    },
    animDown: function() {
        this.waitress.loadTexture('waitress_front', 0, false);
    },
    animStop: function() {
        this.waitress.loadTexture('waitress_ideal', 0, false);
    },
    
    setDestination: function() {
        var x = this.input.mousePointer.x;
        var y = this.input.mousePointer.y;
        var dx = x - this.waitress.x;
        var dy = y - this.waitress.y;

        if (Math.abs(dx) > Math.abs(dy)) {
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
            this.destination.kill()
        }
    },
    
    tpWaitress: function() {
        this.waitress.x = this.input.mousePointer.x;
        this.waitress.y = this.input.mousePointer.y;
        console.log(this.waitress.y);
        
        this.world.bringToTop(this.waitress);
        if (this.waitress.y <= 870) {
            this.world.bringToTop(this.priorityGroup[0]);
            
        } else if (this.waitress.y <= 1000) {
            
            this.world.bringToTop(this.waitress);
            this.world.bringToTop(this.priorityGroup[1]);
        } else {
            this.world.bringToTop(this.waitress);
        }
    }
};

