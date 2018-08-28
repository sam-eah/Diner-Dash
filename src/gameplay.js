var GamePlay = {
    game: controller.game,
    
    centerX: 1920 / 2,
    centerY: 1080 / 2,
    speed: 500,
    wscale: 0.4,
    tolerance: 10,
    selecter: 'waitress',
    dragging: false,
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
        this.customers = [];
        
        for (var i = 2; i > 0; i--){
            this.customers.push( [
                this.add.sprite(200, 800 - i*100, 'man1'),
                this.add.sprite(280, 800 - i*100, 'man2')
            ]);
        }
        
        for (var i = 0; i < this.customers.length; i++){
            this.customers[i][0].enableBody = true;
            this.customers[i][0].physicsBodyType = Phaser.Physics.ARCADE;
            this.customers[i][0].inputEnabled = true;
            
            this.customers[i][1].enableBody = true;
            this.customers[i][1].physicsBodyType = Phaser.Physics.ARCADE;
            this.customers[i][1].inputEnabled = true;
        }
        
        this.girlGroup = this.add.group();
//        this.girlGroup.create(40, 760, 'girl1');
//        this.girlGroup.create(120, 760, 'girl2');
        
        this.girlGroup.inputEnableChildren = true;
        this.girlGroup.setAll('inputEnabled', true);
        
        this.manGroup = this.add.group();
//        this.manGroup.create(200, 700, 'man1');
//        this.manGroup.create(280, 700, 'man2');
        
        this.manGroup.inputEnableChildren = true;
        this.manGroup.setAll('inputEnabled', true);
        
//        this.customers = this.add.group();
//        this.customers.add(this.manGroup);
//        this.customers.add(this.girlGroup);
//        this.customers.create(100, 100, 'man1', null, false);
        
        this.customers.enableBody = true;
        this.customers.physicsBodyType = Phaser.Physics.ARCADE;
        this.customers.inputEnabled = true;

        
//        this.tableGroup = []
        this.tableList = [];
        this.priorityGroup = [this.add.group(), this.add.group()];
        
        this.tableGroup = this.add.group();
        this.tableGroup.enableBody = true;
        this.tableGroup.physicsBodyType = Phaser.Physics.ARCADE;
        
        
        this.tables = [];
        
        
        for (var y = 0; y < 2; y++){
            this.priorityGroup[y].enableBody = true;
            this.priorityGroup[y].physicsBodyType = Phaser.Physics.ARCADE;
            
            for (var x = 0; x < 3; x++) {
                var newgroup = this.add.group();
                newgroup.enableBody = true;
                newgroup.physicsBodyType = Phaser.Physics.ARCADE;
                
                this.tables.push([
                    this.add.sprite(COLX[x] + 150, ROWY[y] -20, 'chair'),
                    this.add.sprite(COLX[x], ROWY[y] -20, 'chair'),
                    this.add.sprite(COLX[x], ROWY[y], 'table')
                ]);
                this.tables[this.tables.length - 1][1].scale.setTo(-1, 1);
                
                newgroup.add( this.tables[this.tables.length - 1][0] );
                newgroup.add( this.tables[this.tables.length - 1][1] );
                newgroup.add( this.tables[this.tables.length - 1][2] );
                
                newgroup.moveAll(this.priorityGroup[y]);
                
                this.tableGroup.add(newgroup);
                
            }
        
            this.priorityGroup[y].inputEnableChildren = true;
            this.priorityGroup[y].setAll('inputEnabled', true);            
            
            this.priorityGroup.push(this.priorityGroup[y]);
            
        }
        
        for (var i = 0; i < this.tables.length; i++){
            this.tables[i][0].enableBody = true;
            this.tables[i][0].physicsBodyType = Phaser.Physics.ARCADE;
            this.tables[i][0].inputEnabled = true;
            
            this.tables[i][1].enableBody = true;
            this.tables[i][1].physicsBodyType = Phaser.Physics.ARCADE;
            this.tables[i][1].inputEnabled = true;
            
            this.tables[i][2].enableBody = true;
            this.tables[i][2].physicsBodyType = Phaser.Physics.ARCADE;
            this.tables[i][2].inputEnabled = true;
        }
        
        
        this.priorityGroup[0].moveAll(this.tableGroup);
        this.priorityGroup[1].moveAll(this.tableGroup);
        
        this.podium = this.add.sprite(430, 850, 'podium');
        this.closeSign = this.add.sprite(220, 920, 'close');
        
        this.priorityGroup[1].add(this.podium);
        this.priorityGroup[1].add(this.closeSign);
        
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
        
        
//        this.man1.events.onInputDown.add(this.manMove, this);
        
//        this.customers.setAll('inputEnabled', true);
//        this.customers.onChildInputDown.add(this.dragStart, this);
//        this.customers.onChildInputUp.add(this.dragStop, this);
        
//        this.customers.forEach(function(item) {
//            item.onChildInputDown.add(this.dragStart, this);
//            item.onChildInputUp.add(this.dragStop, this);
//        }, this);
        
//        this.manGroup.input.enableDrag();
//        this.manGroup.callAll('input.enableDrag');
        
//        this.game.debug.body(this.man1, 'rgba(255,0,0,0.5)');
        this.game.debug.reset();
//        console.log(this);

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
        
        
//        this.input.onDown.addOnce(this.tpWaitress, this);
        
        
//        for (var i = 0; i < 6; i++){
        
        
        if (this.destination.body.enable) {
            this.physics.arcade.overlap(this.waitress, this.destination, this.arriveDestination(this));
        }
        
        if (this.dragging) {
            this.customerSelected[0].x = this.input.mousePointer.x - 40;
            this.customerSelected[0].y = this.input.mousePointer.y ;
            
            this.customerSelected[1].x = this.input.mousePointer.x + 40;
            this.customerSelected[1].y = this.input.mousePointer.y ;
        }
        
        
        for (var i = 0; i < this.customers.length; i++){
            var customerSelected = this.customers[i];
            if (customerSelected[0].input.pointerDown()) {
                this.dragStart(customerSelected);
            }
            if (customerSelected[0].input.pointerUp()) {
                this.dragStop(customerSelected);
            }
            
            if (customerSelected[1].input.pointerDown()) {
                this.dragStart(customerSelected);
            }
            if (customerSelected[1].input.pointerUp()) {
                this.dragStop(customerSelected);
            }
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
        
        this.world.bringToTop(this.waitress);
        if (this.waitress.y <= 870) {
            this.world.bringToTop(this.priorityGroup[0]);
            
        } else if (this.waitress.y <= 1000) {
            
            this.world.bringToTop(this.waitress);
            this.world.bringToTop(this.priorityGroup[1]);
        } else {
            this.world.bringToTop(this.waitress);
        }
    },
    
    manMove: function(sprite) {
        console.log(sprite.name);
    },
    
    dragStart: function(customerSelected) {
//        console.log(sprite);
        console.log('drag');
        this.dragging = true;
//        this.selecter = 'man1';
        this.dragOrigin = {
            x: this.input.mousePointer.x,
            y: this.input.mousePointer.y
        };
        
        this.customerSelected = customerSelected;
        if (this.customerSelected){
            this.customerSelected[0].anchor.setTo(0.5, 0.5);
            this.customerSelected[1].anchor.setTo(0.5, 0.5);
            this.world.bringToTop(this.customerSelected[0]);
            this.world.bringToTop(this.customerSelected[1]);
//            this.customerSelected1.oldx = this.customerSelected1.x;
//            this.customerSelected1.oldy = this.customerSelected1.y;
//            this.customerSelected2.oldx = this.customerSelected2.x;
//            this.customerSelected2.oldy = this.customerSelected2.y;
        }

//        this.result = "Dragging " + sprite.key;
    },
    
    dragStop: function(customerSelected) {
        console.log("drop");
        console.log(this);

        for (var i = 0; i < this.tables.length; i++){
            this.tableSelected = i;
//            this.tables[i][2].events.onInputOver.add(this.placeClient, this);
            if (this.tables[i][2].input.pointerOver()) {
                this.placeClient();
            }
        }
        
        
//        this.tableGroup.onChildInputOver.add(this.placeClient, this); 

//        this.tableGroup.forEach(function(item) {
//            this.tableSelected = item;
//            if (item.input.pointerOver()) {
//                console.log('oui');
//            }
//        }, this);
        
        this.dragging = false;
        
//        this.result = sprite.key + " dropped at x:" + pointer.x + " y: " + pointer.y;
//
//        if (pointer.y > 400)
//        {
//            console.log('input disabled on', sprite.key);
//            sprite.input.enabled = false;
//
//            sprite.sendToBack();
//        }
//        console.log(this.tableList[0].table)
//        if (this.tableList[0].table.input.pointerOver()) {
//            console.log('oui');
//        } else {
//        //events.onInputOver.add(this.placeClient, this);
//            console.log('non');
//            this.customerSelected1.x = this.customerSelected1.oldx;
//            this.customerSelected1.y = this.customerSelected1.oldy;
//        }
    },
    
    placeClient: function(customerSelected) {
        
        if (this.dragging) {
            console.log('oui');
//            sprite.parent.forEach(function(item) {
//                item.visible = false;
//            }, this);
            this.tables[this.tableSelected][0].visible = false;
            this.tables[this.tableSelected][1].visible = false;
            this.customerSelected[0].visible = false;
            this.customerSelected[1].visible = false;

        }
//        this.customerSelected1.kill();
    },
    
    lineDisplay: function() {
        this.customerList
    }
};

