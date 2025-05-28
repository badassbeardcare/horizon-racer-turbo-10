/* ==========================================================
   js/scenes/PreloadScene.js  – load assets   (placeholder links)
==========================================================*/
export default class PreloadScene extends Phaser.Scene {
  constructor() { super('PreloadScene'); }
  preload() {
    // --- IMAGES --- (CC0 placeholders)
    this.load.image('logo','https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Generic-video-game-controller.svg/128px-Generic-video-game-controller.svg.png');
    this.load.image('bg_sunset','https://opengameart.org/sites/default/files/pixelartbackground_0.png');
    this.load.image('bg_snow','https://opengameart.org/sites/default/files/snowy-landscape.png');
    this.load.image('bg_sand','https://opengameart.org/sites/default/files/desert-landscape.png');
    this.load.image('bg_volcano','https://opengameart.org/sites/default/files/volcano-background.png');
    // track tile
    this.load.image('road','https://opengameart.org/sites/default/files/road_tile.png');
    this.load.image('guardrail','https://opengameart.org/sites/default/files/guardrail.png');
    // cars (64x64 sprites)
    this.load.spritesheet('truck','https://opengameart.org/sites/default/files/truck_spritesheet_64x64.png',{frameWidth:64,frameHeight:64});
    this.load.spritesheet('mustang','https://opengameart.org/sites/default/files/mustang_spritesheet_64x64.png',{frameWidth:64,frameHeight:64});
    this.load.spritesheet('electric','https://opengameart.org/sites/default/files/electric_spritesheet_64x64.png',{frameWidth:64,frameHeight:64});
    // fuel icon
    this.load.image('fuel','https://opengameart.org/sites/default/files/fuel_can_16.png');

    // --- AUDIO ---
    const music = this.registry.get('music');
    Object.keys(music).forEach(key=>{ this.load.audio(key,music[key]); });
    this.load.audio('quack','https://freesound.org/data/previews/445/445960_7037-lq.mp3');
    this.load.audio('hawk','https://freesound.org/data/previews/556/556976_1396581-lq.mp3');

    // loading bar
    const bar = this.add.rectangle(this.cameras.main.width/2, this.cameras.main.height/2+40, 0, 20, 0x00ff88);
    this.load.on('progress', p=>{ bar.width = p*300; });
  }
  create() { this.scene.start('MenuScene'); }
}