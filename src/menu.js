var Menu = {
    game: controller.game,
    girl: null,
    sprTitle: null,
    sprRays: null,

    // init
    init: function() {
        this.game.renderer.renderSession.roundPixels = true;
        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.game.scale.pageAlignHorizontally = true;
    },

    // preload
    preload: function() {

    },

    // create
    create: function() {
        var sprMainBg   = newSprite('main_bg',  0, 0, 0, 0, 0, this.game);
        
        var btnPlay = newButton('btn', CANVAS_WIDTH/2, CANVAS_HEIGHT/2, 0.5, 0.5, this.startGame, this, this.game);
//        var lblPlay = newLabel('PLAY', 100, 'RifficFree', 'white', btnPlay.width/2, btnPlay.height/2, 0.5, 0.5, 1, this.game, true, true, btnPlay);
//        btnPlay.scale.setTo(0);

    },


    update: function() {
        
    },

    startGame: function() {
        playSound("click", 1, false);
        controller.goToGamePlay();
        // controller.goToGameWin();
    },
};