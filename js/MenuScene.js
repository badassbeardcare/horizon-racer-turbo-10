/* ==========================================================
   js/scenes/MenuScene.js – title & car / player select
==========================================================*/
export default class MenuScene extends Phaser.Scene {
  constructor(){ super('MenuScene'); }
  create(){
    const { width, height } = this.cameras.main;
    this.add.image(width/2, height/2-120, 'logo').setScale(1.8).setTint(0xff6600);
    this.add.text(width/2, height/2-40, 'HORIZON RACER TURBO', {fontFamily:'Press Start 2P',fontSize:'20px'}).setOrigin(0.5);
    this.add.text(width/2, height/2+10, '1 ‑ Single Player\n2 ‑ Split‑Screen Multiplayer', {fontSize:'14px',align:'center'}).setOrigin(0.5);

    this.input.keyboard.once('keydown-ONE', ()=>{ this.startGame(1); });
    this.input.keyboard.once('keydown-TWO', ()=>{ this.startGame(2); });
  }
  startGame(players){
    this.registry.set('players', players);
    this.scene.start('RaceScene');
    this.scene.launch('UIScene');
  }
}