/* ==========================================================
   js/scenes/PauseScene.js – ESC menu
==========================================================*/
export default class PauseScene extends Phaser.Scene {
  constructor(){ super('PauseScene'); }
  create(){
    const txt=this.add.text(this.scale.width/2,this.scale.height/2,'PAUSED\n1 – Exit to Menu\n2 – Return', {fontSize:'18px',align:'center'}).setOrigin(0.5);
    this.input.keyboard.once('keydown-ONE', ()=>{ this.scene.stop('RaceScene'); this.scene.stop('UIScene'); this.scene.stop(); this.scene.start('MenuScene'); });
    this.input.keyboard.once('keydown-TWO', ()=>{ this.scene.stop(); this.scene.resume('RaceScene'); this.scene.resume('UIScene'); });
  }
}