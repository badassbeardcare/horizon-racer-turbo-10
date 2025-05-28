/* ==========================================================
   js/scenes/LeaderboardScene.js – show scores stored in localStorage
==========================================================*/
export default class LeaderboardScene extends Phaser.Scene {
  constructor(){ super('LeaderboardScene'); }
  create(){
    const scores = JSON.parse(localStorage.getItem('hrt_scores')||'[]').slice(0,10);
    const list = scores.map((s,i)=>`${i+1}. ${s.name.padEnd(10)}  ${s.time}`).join('\n');
    this.add.text(this.cameras.main.centerX,100,'TOP 10', {fontSize:'24px'}).setOrigin(0.5);
    this.add.text(this.cameras.main.centerX,140,list,{fontSize:'16px',fontFamily:'monospace',align:'left'}).setOrigin(0.5,0);
    this.add.text(this.cameras.main.centerX,this.scale.height-80,'Press SPACE to return',{fontSize:'14px'}).setOrigin(0.5);
    this.input.keyboard.once('keydown-SPACE', ()=>{ this.scene.start('MenuScene'); });
  }
}