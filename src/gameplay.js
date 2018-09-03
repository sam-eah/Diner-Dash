var GamePlay = {
    game: controller.game,
    
    centerX: 1920 / 2,
    centerY: 1080 / 2,
    speed: 500,
    wscale: 0.4,
    tolerance: 10,
    selecter: 'waitress',
    dragging: false,
    foo: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
    customerAnim: {
        eating: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
        ideal: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
        order: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33]
    },
    tablePos: [ [ {x: COLX[0], y: ROWY[0]}, {x: COLX[1], y: ROWY[0]}, {x: COLX[2], y: ROWY[0]} ], 
                [ {x: COLX[0], y: ROWY[1]}, {x: COLX[1], y: ROWY[1]}, {x: COLX[2], y: ROWY[1]} ] ],
//    image_path: '',
//    with_food: false,
//    direction: 2,
    foodPos: [650, 750, 850, 950, 1050, 1150],
    withFood: '',
    
    preload: function () {
        
    },
    create: function () {
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        
        this.physics.startSystem(Phaser.Physics.ARCADE);
        
        // BG
        this.background = this.add.sprite(0, 0, 'background');
        this.background.enableBody = true;
        this.background.physicsBodyType = Phaser.Physics.ARCADE;
        this.background.inputEnabled = true;
        
        // UI 
        this.add.sprite(140, 20, 'hud_base');
        this.add.sprite(1550, 20, 'hud_base').scale.setTo(0.8, 1);
        this.add.sprite(110, 10, 'uiface');
        this.add.sprite(1830, 10, 'pause');
        
        // COOK
        this.cook1 = this.add.sprite(1250, 580, 'cook_front');
        this.cook1.scale.setTo(0.9);
        this.cook1.anchor.setTo(0.5, 1);
        this.cook1.enableBody = true;
        this.cook1.physicsBodyType = Phaser.Physics.ARCADE;
        this.cook1.inputEnabled = true;
        
        this.cook2 = this.add.sprite(1000, 180, 'cook_back');
        this.cook2.scale.setTo(0.9);
        this.cook2.enableBody = true;
        this.cook2.physicsBodyType = Phaser.Physics.ARCADE;
        this.cook2.inputEnabled = true;
        
        // COUNTER
        this.add.sprite(450, 350, 'counter');
        
        // FOOD
        this.foods = [];
        
        for (var i = 0; i < 6; i++){
            this.foods.push(
                this.add.sprite(700 + i*100, 500, 'foodcover')
            );
        }
        
        for (var i = 0; i < this.foods.length; i++){
            this.foods[i].enableBody = true;
            this.foods[i].physicsBodyType = Phaser.Physics.ARCADE;
            this.foods[i].inputEnabled = true;
            this.foods[i].anchor.setTo(0.5, 1);
            this.foods[i].visible = false;
        }
        
//        this.foods.enableBody = true;
//        this.foods.physicsBodyType = Phaser.Physics.ARCADE;
//        this.foods.inputEnabled = true;
        
        console.log(this.foods);
        
        // CUSTOMERS
        this.customers = [];
        
        for (var i = 2; i > 0; i--){
//            var isBoy = true;
            var isBoy = (Math.floor(Math.random() * 2) == 1);
            if (isBoy) {
                this.customers.push( [
                    this.add.sprite(200, 900 - i*100, 'boy1'),
                    this.add.sprite(280, 900 - i*100, 'boy2')
                ]);
            } else {
                this.customers.push( [
                    this.add.sprite(200, 900 - i*100, 'girl1'),
                    this.add.sprite(280, 900 - i*100, 'girl2')
                ]);
            }
        }
        
        for (var i = 0; i < this.customers.length; i++){
            this.customers[i][0].enableBody = true;
            this.customers[i][0].physicsBodyType = Phaser.Physics.ARCADE;
            this.customers[i][0].inputEnabled = true;
            this.customers[i][0].anchor.setTo(0.5, 0.5);
            
            this.customers[i][1].enableBody = true;
            this.customers[i][1].physicsBodyType = Phaser.Physics.ARCADE;
            this.customers[i][1].inputEnabled = true;
            this.customers[i][1].anchor.setTo(0.5, 0.5);
        }
        
        
//        this.customers.enableBody = true;
//        this.customers.physicsBodyType = Phaser.Physics.ARCADE;
//        this.customers.inputEnabled = true;

        
        this.priorityGroup = [this.add.group(), this.add.group()];
        this.priorityGroup.enableBody = true;
        this.priorityGroup.physicsBodyType = Phaser.Physics.ARCADE;
        
        
        // TABLES
        this.tables = [];
        
        for (var y = 0; y < 2; y++){
            this.priorityGroup[y].enableBody = true;
            this.priorityGroup[y].physicsBodyType = Phaser.Physics.ARCADE;
            
            for (var x = 0; x < 3; x++) {
                
                this.tables.push([
                    this.add.sprite(COLX[x] - 110, ROWY[y], 'chair'),
                    this.add.sprite(COLX[x] + 110, ROWY[y], 'chair'),
                    this.add.sprite(COLX[x], ROWY[y], 'table')
                ]);
                
                var i = this.tables.length - 1;
                this.tables[i][0].anchor.setTo(0.5, 1);
                this.tables[i][1].anchor.setTo(0.5, 1);
                this.tables[i][2].anchor.setTo(0.5, 1);
                this.tables[i][0].scale.setTo(-1, 1);
                
                this.priorityGroup[y].add( this.tables[i][0] );
                this.priorityGroup[y].add( this.tables[i][1] );
                this.priorityGroup[y].add( this.tables[i][2] );
                
            }
        
            this.priorityGroup[y].inputEnableChildren = true;
            this.priorityGroup[y].setAll('inputEnabled', true);
            
        }
        
//        for (var i = 0; i < this.tables.length; i++){
//            this.tables[i][0].enableBody = true;
//            this.tables[i][0].physicsBodyType = Phaser.Physics.ARCADE;
//            this.tables[i][0].inputEnabled = true;
//            
//            this.tables[i][1].enableBody = true;
//            this.tables[i][1].physicsBodyType = Phaser.Physics.ARCADE;
//            this.tables[i][1].inputEnabled = true;
//            
//            this.tables[i][2].enableBody = true;
//            this.tables[i][2].physicsBodyType = Phaser.Physics.ARCADE;
//            this.tables[i][2].inputEnabled = true;
//        }
        
        
        this.podium = this.add.sprite(430, 850, 'podium');
        this.closeSign = this.add.sprite(220, 920, 'close');
        
        this.priorityGroup[1].add(this.podium);
        this.priorityGroup[1].add(this.closeSign);
        
        // destination
        this.destination = this.add.sprite(0, 0, 'destination');
//        this.destination.body.enable = false;
//        this.destination.anchor.setTo(0.5, 0.5);
        
        
        // Waitress
        this.waitress = this.add.sprite(600, 680, 'waitress_ideal');
        this.waitress.direction = 2;
        
        this.physics.arcade.enable([this.waitress, this.destination]);
        this.waitress.body.collideWorldBounds = true;
        
//        this.waitress.enableBody = true;
        this.waitress.anchor.setTo(0.5, 1);
        this.waitress.scale.setTo(this.wscale);
        
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
            this.doPriority();
        } else if (this.input.keyboard.isDown(Phaser.Keyboard.LEFT)){
            if (this.waitress.direction != 4) {
                this.waitress.direction = 4;
                this.animLeft();
            }
            this.waitress.x -= 2;
            this.doPriority();
        } else if (this.input.keyboard.isDown(Phaser.Keyboard.UP)){
            if (this.waitress.direction != 2) {
                this.waitress.direction = 2;
                this.animUp();
            }
            this.waitress.y -= 2;
            this.doPriority();
        } else if (this.input.keyboard.isDown(Phaser.Keyboard.DOWN)){
            if (this.waitress.direction != 8) {
                this.waitress.direction = 8;
                this.animDown();
            }
            this.waitress.y += 2;
            this.doPriority();
        } else {
            if (this.waitress.direction != 0) {
                this.waitress.direction = 0;
                this.animStop();
            }
        }
        
//        if (this.destination.body.enable) {
//            this.physics.arcade.overlap(this.waitress, this.destination, this.arriveDestination(this));
//        }
        
        
        for (var i = 0; i < this.customers.length; i++){
            var customer = this.customers[i];
            if (customer[0].input.pointerDown() ||
                customer[1].input.pointerDown()) {
                this.drag(i);
            }
            if (customer[0].input.pointerUp() ||
                customer[1].input.pointerUp()) {
                this.drop(i);
            }
        }
            
        for (var i = 0; i < this.tables.length; i++){
            var table = this.tables[i];
            if (table[0].input.pointerDown() ||
                table[1].input.pointerDown() ||
                table[2].input.pointerDown()) {
                this.goToTable(i);
            }
            if (table.food) {
                if (table.food.input.pointerDown()) {
                    this.goToTable(i);
                }
            }
            if (table.customer) {
                if (table[0].hand.input.pointerDown() ||
                    table[1].hand.input.pointerDown()) {
                    this.goToTable(i);
                }
            }
        }    
        
        for (var i = 0; i < this.foods.length; i++){
            var food = this.foods[i];
            if (food.input.pointerDown()) {
                this.goToFood(food);
            }
        }    

        if (this.cook1.input.pointerDown()) {
            this.goToCook();
        }    

        if (this.background.input.pointerDown()) {
            if (Math.abs(1550 - this.input.mousePointer.x) < 50 &&
                Math.abs(470 - this.input.mousePointer.y) < 100) {
                this.goToBin();
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
        this.waitress.loadTexture('waitress_side', 0, false);
        this.waitress.scale.setTo(- this.wscale, this.wscale); 
        
    },
    animRight: function() {
        this.waitress.loadTexture('waitress_side' + this.withFood, 0, false);
        this.waitress.scale.setTo(this.wscale); 
    },
    animUp: function() {
        this.waitress.loadTexture('waitress_back' + this.withFood, 0, false);
    },
    animDown: function() {
        this.waitress.loadTexture('waitress_front' + this.withFood, 0, false);
    },
    animIdeal: function() {
        this.waitress.loadTexture('waitress_ideal', 0, false);
    },
    animStop: function() {
        this.waitress.animations.stop();
        this.waitress.animations.frame = 6;
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
    
    doPriority: function() {
        if (this.waitress.y <= 870) {
            this.world.bringToTop(this.priorityGroup[0]);
            this.world.bringToTop(this.priorityGroup[1]);
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
    
    drag: function(customerIndex) {
        
        if (!this.dragging) {
            this.customerSelectedIndex = customerIndex;
            this.dragStart();
            this.dragging = true;
        }
        if (this.dragging) {
            this.dragUpdate();
        }
    },
    
    drop: function(customerIndex) {
        if (customerIndex == this.customerSelectedIndex){
            if (this.dragging) {
                this.dragStop();
                this.dragging = false;
                this.customerSelectedIndex = null;
            }
        }
    },
    
    dragStart: function() {
        console.log('drag start');
        
        var customer = this.customers[this.customerSelectedIndex];
        if (customer){
            this.world.bringToTop(customer[0]);
            this.world.bringToTop(customer[1]);

            customer[0].oldx = customer[0].x;
            customer[0].oldy = customer[0].y;
            customer[1].oldx = customer[1].x;
            customer[1].oldy = customer[1].y;
        }
        
    },
    
    dragUpdate: function() {
        var customer = this.customers[this.customerSelectedIndex];
        customer[0].x = this.input.mousePointer.x - 40;
        customer[0].y = this.input.mousePointer.y ;

        customer[1].x = this.input.mousePointer.x + 40;
        customer[1].y = this.input.mousePointer.y ;
    },
    
    dragStop: function() {
        console.log('drag stop');
        var customer = this.customers[this.customerSelectedIndex];

        customer[0].x = customer[0].oldx;
        customer[0].y = customer[0].oldy;
        customer[1].x = customer[1].oldx;
        customer[1].y = customer[1].oldy;
        
        for (var i = 0; i < this.tables.length; i++){
            var table = this.tables[i];

            if (table[2].input.pointerOver()) {
                this.placeClient(i);
            }
        }
    },
    
    changeCustomerAnim: function(tableIndex, chair, animation){
        var table = this.tables[tableIndex];
        var key = table[chair].key.split('_')[0] ;
        table[chair].loadTexture(key + '_' + animation, 0, false);
        table[chair].animations.add(animation, this.customerAnim[animation], 10, true);
        table[chair].animations.play(animation);

        table[chair].hand.loadTexture(key + '_' + animation + '_hand', 0, false);
        table[chair].hand.animations.add(animation, this.customerAnim[animation], 10, true);
        table[chair].hand.animations.play(animation);
    },
    
    placeClient: function(tableIndex) {
        console.log('oui');
        var table = this.tables[tableIndex];
        var customer = this.customers[this.customerSelectedIndex];        
        
        table[0].loadTexture(customer[0].key + '_ideal' , 0, false);
        table[0].scale.setTo(1, 1);
        table[0].hand = this.add.sprite(table[0].x, table[0].y, table[0].key + '_hand');
        table[0].hand.anchor.setTo(0.5, 1);
        
        table[1].loadTexture(customer[1].key + '_ideal' , 0, false);
        table[1].scale.setTo(-1, 1);
        table[1].hand = this.add.sprite(table[1].x, table[1].y, table[0].key + '_hand');
        table[1].hand.anchor.setTo(0.5, 1);
        table[1].hand.scale.setTo(-1, 1);
        
        this.changeCustomerAnim(tableIndex, 0, 'ideal');
        this.changeCustomerAnim(tableIndex, 1, 'ideal');
        
        console.log(table[0].key);
        
        if (tableIndex < 3) {
            this.priorityGroup[0].add( table[0].hand );
            this.priorityGroup[0].add( table[1].hand );
        } else {
            this.priorityGroup[1].add( table[0].hand );
            this.priorityGroup[1].add( table[1].hand );
        }
        
        customer[0].visible = false;
        customer[1].visible = false;
        customer[0].enableBody = false;
        customer[1].enableBody = false;
        
        table.customer = true;
//        this.customers.splice(customerIndex);

        this.time.events.add(2000, this.createOrder, this, tableIndex);
    },
    
    goToTable: function(tableIndex) {
        var table = this.tables[tableIndex];
        this.waitress.x = table[2].x ;
        this.waitress.y = table[2].y - 50 ;
        
        if (table.orderReady) {
            this.takeOrder(tableIndex);
            table.orderReady = false;
        }
        
        if (table.finishEating) {
            this.takePlate(tableIndex);
            table.finishEating = false;
        }
        
        if (table.customer && this.withFood == '_food'){
            this.giveFood(tableIndex);
        }
        
        this.animDown();
        this.animStop();
        this.doPriority();
    },
    
    goToFood: function(food) {
        this.waitress.x = food.x ;
        this.waitress.y = food.y + 160 ;
        
        if (this.withFood == ''){
            this.takeFood(food);
        }
        
        this.animUp();
        this.animStop();
        this.doPriority();
        
    },
    
    goToCook: function() {
        this.waitress.x = this.cook1.x ;
        this.waitress.y = this.cook1.y + 100 ;
        
        this.animUp();
        this.animStop();
        this.doPriority();
        
        if (this.orderSelected >= 0){
            this.giveOrder();
            this.orderSelected = -1;
        }
        
    },
    
    goToBin: function() {
        this.waitress.x = 1550 ;
        this.waitress.y = 650 ;
                
        if (this.withFood) {
            this.givePlate();
        }
        
        this.animUp();
        this.animStop();
        this.doPriority();
        
    },
    
    createOrder: function(tableIndex) {
        console.log('order Ready');        
        
        this.changeCustomerAnim(tableIndex, 0, 'order');
        this.changeCustomerAnim(tableIndex, 1, 'order');
        
        var table = this.tables[tableIndex];
        table.orderReady = true;
    },
    
    takeOrder: function(tableIndex) {
        console.log('take Order');
        
        this.changeCustomerAnim(tableIndex, 0, 'ideal');
        this.changeCustomerAnim(tableIndex, 1, 'ideal');
        
        this.orderSelected = tableIndex;
        console.log(this.orderSelected);
    },
    
    giveOrder: function() {
        console.log('give Order');
        var tableIndex = this.orderSelected;
        this.time.events.add(2000, this.createFood, this, tableIndex);
    },
    
    createFood: function(tableIndex) {
        var food = this.foods[tableIndex];

        console.log('Food Created');
        console.log(tableIndex);
        food.visible = true;
    },
    
    takeFood: function(food){
        console.log('take food');
        this.withFood = '_food';
        food.visible = false;
        food.enableBody = false;
    },
    
    giveFood: function(tableIndex){
        console.log('give food');
        
        this.changeCustomerAnim(tableIndex, 0, 'eating');
        this.changeCustomerAnim(tableIndex, 1, 'eating');
        
        var key = (Math.floor(Math.random() * 6) + 1).toString();
        var table = this.tables[tableIndex];
        table.food = this.add.sprite(table[2].x, table[2].y - 80, 'food' + key);
        table.food.anchor.setTo(0.5, 1);
        if (tableIndex < 3) {
            this.priorityGroup[0].add( table.food );
        } else {
            this.priorityGroup[1].add( table.food );
        }
        this.withFood = '';
        
        this.time.events.add(2000, this.finishEating, this, tableIndex);
    },
    
    finishEating: function(tableIndex) {
        console.log('finish eating');
        
        this.changeCustomerAnim(tableIndex, 0, 'order');
        this.changeCustomerAnim(tableIndex, 1, 'order');
        
        var table = this.tables[tableIndex];
        
        table.food.loadTexture('foodcover', 0, false);
        table.finishEating = true;
    },
    
    takePlate: function(tableIndex){
        var table = this.tables[tableIndex];
        var food = table.food;

        console.log('take plate');
        this.withFood = '_food';
        food.visible = false;
        food.enableBody = false;
        
        table[0].loadTexture('chair', 0, false);
        table[0].scale.setTo(-1, 1);
        table[0].hand.visible = false;
        
        table[1].loadTexture('chair', 0, false);
        table[1].scale.setTo(1, 1);
        table[1].hand.visible = false;
        
        table.customer = false;
    },
    
    givePlate: function(){
        console.log('throw plate');

        this.withFood = '';
        
    }
};

