//var config = {
//    type: Phaser.AUTO,
//    width: 1920,
//    height: 1080,
//    physics: {
//        default: 'arcade',
//        arcade: {
//            gravity: {y: 0}
//        }
//    },
//    scene: [game_state, pause_state]
//}


var game = new Phaser.Game(1920, 1080);

game.state.add('game_state', demo.game_state);
game.state.start('game_state');