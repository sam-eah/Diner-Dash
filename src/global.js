var GAME_LINK = 'http://always-three-match.herokuapp.com';
var FB_SHARE_LINK = "https://www.facebook.com/gamiphy/";
var FB_APP_ID = '1646291462059795';
var GA_KEY = 'UA-118770121-4';
var FB_SHARE_SUCCESS = "FB SHARE SUCCESS";
var FB_SHARE_FAILED = "FB SHARE FAILED";

var CANVAS_WIDTH = 1920;
var CANVAS_HEIGHT = 1080;

var COLX = [858, 1258, 1658];

var ROWY = [838, 1018];

var CNT_CANDIES = 6;

var CANDY_WIDTH = 124;
var CANDY_HEIGHT = 124;

var ROW = 5;
var COL = 8;

var POS_START_X = 93;
var POS_START_Y = 92;
var GAP_X = 123;
var GAP_Y = 125;

var MSG_AWESOME = 0;
var MSG_SWEET = 1;
var MSG_FANTASTIC = 2;
var MSG_GREAT_JOB = 3;

var TOTAL_MOVES = 30;
var TOTAL_GOALS = 20;

var s_aSounds;

var strMessages = ['awesome', 'sweet', 'fantastic', 'greatjob'];
var WIN_MESSAGE = 'رائع شاركيها الآن لتدخلي السحب';
var strGirlMessage = [
'امتصاص حتى 2X أكثر',
'ألويز ألترا رقيقة جدا و مرنة مصممة لتناسب شكل جسمك',
'تقنية جل فائقة الامتصاص, تمتص حتى مرتين أكثر',
'جوانب حماية توفر حتى 100% حماية'];


var convertToWorldSpace = function(pos_x, pos_y, parent) {
    
};

var convertToNodeSpace = function(pos_x, pos_y, parent) {
    // lc = left_corner
    let pos_lc = {x: parent.worldPosition.x - parent.anchor.x * parent.width, y: parent.worldPosition.y - parent.anchor.y * parent.height};
    pos_x = pos_x - pos_lc.x;
    pos_y = pos_y - pos_lc.y;
    return {x: pos_x, y: pos_y};
};

var newButton = function(asset_name, pos_x, pos_y, anchor_x, anchor_y, callback, cb_owner, game, is_child = false, parent = null) {
    var button;
    if (is_child) {
        let anchor = parent.anchor;
        button = game.make.button(pos_x - parent.width*anchor.x, pos_y - parent.height*anchor.y, asset_name, callback, cb_owner, 2, 1, 0);
        parent.addChild(button);
    } else {
        button = game.add.button(pos_x, pos_y, asset_name, callback, cb_owner, 2, 1, 0);
    }    
    button.onInputUp.add(() => { button.scale.setTo(1); }, cb_owner);
    button.onInputDown.add(() => { button.scale.setTo(0.9); }, cb_owner);

    button.anchor.x = anchor_x;
    button.anchor.y = anchor_y;

    return button;
};

var newSprite = function(asset_name, pos_x, pos_y, anchor_x, anchor_y, z_order, game, is_child = false, parent = null) {
    var sprite;
    // if child sprite
    if (is_child) {
        let anchor = parent.anchor;
        sprite = game.make.sprite(pos_x - parent.width*anchor.x, pos_y - parent.height*anchor.y, asset_name)
        parent.addChild(sprite);
    } else {
        sprite = game.add.sprite(pos_x, pos_y, asset_name);
    }    
    // Set anchor point
    sprite.anchor.x = anchor_x;
    sprite.anchor.y = anchor_y;
    // Set z-index
    sprite.z = z_order;
    
    return sprite;
};

var newLabel = function(text, font_size, font_name, color, pos_x, pos_y, anchor_x, anchor_y, z_order, game, shadow = false, is_child = false, parent = null) {
    var label;
    var style = {
        font: '' + font_size + 'px ' + font_name,
        fill: color,
        align: "center",
    }
    
    // if child sprite
    if (is_child) {
        let anchor = parent.anchor;
        label = game.make.text(pos_x - parent.width*anchor.x, pos_y - parent.height*anchor.y, text, style)
        parent.addChild(label);
    } else {
        label = game.add.text(pos_x, pos_y, text, style);
    }    
    
    // Set anchor point
    label.anchor.x = anchor_x;
    label.anchor.y = anchor_y;

    // Shadow
    if (shadow)
        label.setShadow(5, 5, 'rgba(0, 0, 0, 0.5', 5);

    // Set z-index
    label.z = z_order;
    
    return label;
}

var shareToFB = function() {
    // FB.ui(
    //     {
    //         method: 'share',
    //         href: GAME_LINK,
    //         picture: 'http://always-three-match.herokuapp.com/assets/sprites/firstscreen.png'

    //     }, function(response){
    //         if (!IS_PREVIEW) {
    //             if(response){
    //                 ga('send', {
    //                     hitType: 'event',
    //                     eventAction: FB_SHARE_SUCCESS,
    //                 });
    //             } else {
    //                 ga('send', {
    //                     hitType: 'event',
    //                     eventAction: FB_SHARE_FAILED
    //                 });
    //             }
    //         }
    //     }
    // );
    window.open("https://www.facebook.com/sharer/sharer.php?u=" + GAME_LINK, "pop", "width=600, height=400, scrollbars=no");
}

var playSound = function(szSound,iVolume,bLoop){
//    s_aSounds[szSound].play();
//    s_aSounds[szSound].volume(iVolume);
//
//    s_aSounds[szSound].loop(bLoop);

//    return s_aSounds[szSound];
}