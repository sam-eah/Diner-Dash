class pause_state extends Phaser.Scene{
    constructor(){
        super({key:"pause_state"});
    }
    
    preload() {
        this.load.image('background2', 'assets/backgrounds/main_bg.png');
    }
    
    create(){
        this.background = this.add.image(0, 0, 'background2').setOrigin(0, 0);
        this.text = this.add.text(0, 0, "Pause", {font: "40px Impact"});
    }
    
    
    update(){
        this.input.keyboard.on('keyup', function(e){
            console.log(e.key);
            if (e.keyCode == 32) {
                this.scene.resume("game_state");
                this.scene.stop();
            }
        }, this);
    }
}