var controller = { 
    game: {},

    createGame : function() {
        this.game = new Phaser.Game(CANVAS_WIDTH, CANVAS_HEIGHT, Phaser.AUTO, 'game');
        this.game.state.add('Preload', Preload);
        this.game.state.add('Menu', Menu);
        this.game.state.add('GamePlay', GamePlay);
//        this.game.state.add('GameOver', GameOver);
//        this.game.state.add('GameWin', GameWin);

        this.goToPreload();
        sizeHandler();
    },

    goToScene : function(sceneName) {
        this.game.state.start(sceneName);
    },

    goToPreload :   function() { this.goToScene('Preload'); },
    goToMenu    :   function() { this.goToScene('Menu'); },
    goToGamePlay:   function() { this.goToScene('GamePlay'); },
    goToGameOver:   function() { this.goToScene('GameOver'); },
    goToGameWin :   function() { this.goToScene('GameWin'); }
}