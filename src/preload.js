var cnt_files = 0;
var cnt_loaded_files = 0;

var Preload = {
    game: controller.game,
    lblProgress: {},
    loadingLogo: true,

    init: function() {
        this.game.renderer.renderSession.roundPixels = true;
        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.game.scale.pageAlignHorizontally = true;
    },

    preload: function() {

    },
    
    create: function() {
        this.game.stage.backgroundColor = 'white';
        
        this.lblProgress = newLabel('Loading...', 50, 'Arial', 'white', CANVAS_WIDTH/2, CANVAS_HEIGHT-100, 0.5, 0.5, 1, this.game);
        
        this.game.load.onLoadStart.add(this.loadStart, this);
        this.game.load.onFileComplete.add(this.fileComplete, this);
        this.game.load.onLoadComplete.add(this.loadComplete, this);

        this.loadingLogo = true;
        this.loadImage('logo',    './assets/sprites/logo.png');
        this.game.load.start();
    },
    
    start: function() {
        cnt_files = 0;
        this.loadImage('main_bg',       './assets/backgrounds/main_bg.png');
        
        this.load.image('background',   'assets/backgrounds/game_play_bg.png');
        this.loadImage('counter',       './assets/sprites/counter.png');
        this.loadImage('chair',         './assets/sprites/chair.png');
        this.loadImage('table',         './assets/sprites/table.png');
        this.loadImage('podium',        './assets/sprites/podium.png');
        this.loadImage('close',         './assets/sprites/close.png');
        
        
        this.loadImage('food1',         './assets/sprites/food1.png');
        this.loadImage('food2',         './assets/sprites/food2.png');
        this.loadImage('food3',         './assets/sprites/food3.png');
        this.loadImage('food4',         './assets/sprites/food4.png');
        this.loadImage('food5',         './assets/sprites/food5.png');
        this.loadImage('food6',         './assets/sprites/food6.png');
        this.loadImage('foodcover',     './assets/sprites/foodcover.png');
        
        this.loadImage('hud_base',      './assets/sprites/hud_base.png');
        this.loadImage('uiface',        './assets/sprites/uiface.png');
        this.loadImage('pause',         './assets/sprites/pause.png');
        this.loadImage('wood_board',    './assets/sprites/wood_board.png');
        
        
        this.load.image('destination',  'assets/sprites/destination.png');
        
        // COOK
        this.loadImage('cook_back',     './assets/sprites/cook_back.png');
        this.loadImage('cook_front',    './assets/sprites/cook_front.png');
        
        // CUSTOMERS 
        this.loadImage('man1',          './assets/sprites/man1.png');
        this.loadImage('man1_sit',      './assets/sprites/man1_sit.png');
        
        this.loadImage('man2',          './assets/sprites/man2.png');
        this.loadImage('man2_sit',      './assets/sprites/man2_sit.png');
        
        this.loadImage('girl1',         './assets/sprites/girl1.png');
        this.loadImage('girl1_sit',     './assets/sprites/girl1_sit.png');
        
        this.loadImage('girl2',         './assets/sprites/girl2.png');
        this.loadImage('girl2_sit',     './assets/sprites/girl2_sit.png');
        
        
        // WAITRESS
        this.load.spritesheet('waitress_back',
                              'assets/spitesheets/waitress/back.png', 300, 775);
        this.load.spritesheet('waitress_front',
                              'assets/spitesheets/waitress/front.png', 300, 775);
        this.load.spritesheet('waitress_ideal',
                              'assets/spitesheets/waitress/ideal.png', 300, 775);
        this.load.spritesheet('waitress_side',
                              'assets/spitesheets/waitress/side.png', 512, 775);
        
        // BOY 1
        this.load.spritesheet('boy1_eating',
                              'assets/spitesheets/boy1/eating.png', 180, 281);
        this.load.spritesheet('boy1_ideal',
                              'assets/spitesheets/boy1/ideal.png', 180, 281);
        this.load.spritesheet('boy1_order',
                              'assets/spitesheets/boy1/order.png', 180, 281);
        
//        this.loadImage('second_bg',   './assets/sprites/bg.png');
//        this.loadImage('btn',         './assets/sprites/btn.png');
//        this.loadImage('cloud1',      './assets/sprites/cloud1.png');
//        this.loadImage('cloud2',      './assets/sprites/cloud2.png');
//        this.loadImage('cloud3',      './assets/sprites/cloud3.png');
//        this.loadImage('candy_back',  './assets/sprites/candy_back.png');
//        this.loadImage('candy_big',   './assets/sprites/candy_big.png');
//        this.loadImage('name',        './assets/sprites/name.png');
//        this.loadImage('name_line',   './assets/sprites/name_line.png');
//        this.loadImage('green',       './assets/sprites/green.png');
//        this.loadImage('rays',        './assets/sprites/rays.png');
//
//        this.loadImage('gameover_bg', './assets/sprites/gameover_bg.png');
//        this.loadImage('gameover_bg_1', './assets/sprites/gameover_bg_1.png');
//        this.loadImage('blank-star',  './assets/sprites/blank-star.png');
//        this.loadImage('star',        './assets/sprites/star.png');
//        this.loadImage('circle',      './assets/sprites/circle.png');
//        this.loadImage('home',        './assets/sprites/home.png');
//        this.loadImage('restart',     './assets/sprites/restart.png');
//        this.loadImage('share',       './assets/sprites/share.png');
//        this.loadImage('text_box',    './assets/sprites/text_box.png');
//        this.loadImage('btn2',        './assets/sprites/btn2.png');
//        this.loadImage('popup_base',  './assets/sprites/popup_base.png');
//
//        this.loadImage('timer',       './assets/sprites/timer.png');
//        this.loadImage('top_bar',     './assets/sprites/top_bar.png');
//        this.loadImage('grid',        './assets/sprites/grid.png');
//        this.loadImage('boarder',     './assets/sprites/boarder.png');
//        this.loadImage('name2',       './assets/sprites/name2.png');
//        this.loadImage('popup',       './assets/sprites/popup.png');
//        this.loadImage('header',    './assets/sprites/Header.png');
//
//        this.loadImage('awesome',     './assets/sprites/awesome.png');
//        this.loadImage('sweet',       './assets/sprites/sweet.png');
//        this.loadImage('fantastic',   './assets/sprites/fantastic.png');
//        this.loadImage('greatjob',    './assets/sprites/greatjob.png');

        

//        for (let i = 0 ; i < CNT_CANDIES ; i++) {
//            this.loadImage('c'+(i+1),   './assets/sprites/c'+(i+1)+'.png');
//            this.loadImage('c'+(i+1)+'_1',   './assets/sprites/c'+(i+1)+'_1.png');
//            this.game.load.spritesheet('blast'+(i+1), './assets/sprites/blast'+(i+1)+'.png', 200, 200, 8); cnt_files++;
//        }
//
//        this.game.load.spritesheet('girl_anim_1', './assets/sprites/ani1.png', 800, 797, 15); cnt_files++;
//        this.game.load.spritesheet('girl_anim_2', './assets/sprites/ani2.png', 800, 797, 25); cnt_files++;
//        this.game.load.spritesheet('girl_anim_3', './assets/sprites/ani3.png', 800, 797, 25); cnt_files++;
//        this.game.load.spritesheet('girl_anim_4', './assets/sprites/ani4.png', 800, 797, 25); cnt_files++;
//        
//        var aSoundsInfo = new Array();
//        aSoundsInfo.push({path: "./assets/sounds/", filename:"music", 	    loop:true,  volume:1, ingamename: "music"});
//        aSoundsInfo.push({path: "./assets/sounds/", filename:"click", 		loop:false, volume:1, ingamename: "click"});
//        aSoundsInfo.push({path: "./assets/sounds/", filename:"blast", 		loop:false, volume:1, ingamename: "blast"});
//        
//        cnt_files += aSoundsInfo.length;
//
//        s_aSounds = new Array();
//        for(var i=0; i<aSoundsInfo.length; i++){
//            s_aSounds[aSoundsInfo[i].ingamename] = new Howl({ 
//                                                            src: [aSoundsInfo[i].path+aSoundsInfo[i].filename+'.mp3', aSoundsInfo[i].path+aSoundsInfo[i].filename+'.ogg'],
//                                                            autoplay: false,
//                                                            preload: true,
//                                                            loop: aSoundsInfo[i].loop, 
//                                                            volume: aSoundsInfo[i].volume,
//                                                            onload: this.fileComplete()
//                                                        });
//        }

        cnt_loaded_files = 0;
    },

    loadSound: function(name, path) {
        cnt_files++;
        this.game.load.audio(name, [path]);
    },

    loadImage: function(name, path) {
        cnt_files++;
        this.game.load.image(name, path);
    },

    loadStart: function() {
        this.lblProgress.text = 'Loading: 0%';
    },

    fileComplete: function() {
        if (this.loadingLogo) {
            this.loadingLogo = false;
            newLabel('Powered By', 50, 'Arial', 'white', CANVAS_WIDTH/2, CANVAS_HEIGHT/2-100, 0.5, 0.5, 1, this.game);
            newSprite('logo',  CANVAS_WIDTH/2, CANVAS_HEIGHT/2+60, 0.5, 0.5, 1, this.game).scale.setTo(0.3);

            cnt_files = 0;
            this.start();
        } else {
            cnt_loaded_files++;
            this.lblProgress.text = 'Loading: ' + Math.floor(cnt_loaded_files/cnt_files * 100) + '%';
        }
    },
    
    loadComplete: function() {
//        playSound("music", 1, true);
        controller.goToScene('Menu');
    },
};
