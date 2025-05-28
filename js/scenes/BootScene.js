/* ==========================================================
   js/scenes/BootScene.js  – configure global constants
==========================================================*/
export default class BootScene extends Phaser.Scene {
  constructor() { super('BootScene'); }
  preload() {
    // minimal loader bar
    this.add.text(this.cameras.main.width/2, this.cameras.main.height/2, 'BOOTING...', {fontSize:'16px'}).setOrigin(0.5);
  }
  create() {
    // global data manager defaults
    this.registry.set({
      cars: [
        { key:'truck', name:'4x4 Mud Truck', accel:250, top:300, handling:180 },
        { key:'mustang', name:'Mustang GT', accel:230, top:320, handling:200 },
        { key:'electric', name:'Electric Lightning', accel:270, top:310, handling:220 }
      ],
      music:{
        title:'https://opengameart.org/sites/default/files/RetroRacing%20Menu.mp3',
        sunset:'https://opengameart.org/sites/default/files/Techno_Chiptale.mp3',
        snow:'https://opengameart.org/sites/default/files/Stargazer.mp3',
        sand:'https://opengameart.org/sites/default/files/Desert%20Theme.mp3',
        volcano:'https://opengameart.org/sites/default/files/Pushing%20Yourself.mp3'
      }
    });
    this.scene.start('PreloadScene');
  }
}
