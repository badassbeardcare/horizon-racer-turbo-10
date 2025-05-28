/* ==========================================================
   js/scenes/UIScene.js – split HUD & countdown
==========================================================*/
export default class UIScene extends Phaser.Scene {
  constructor(){ super('UIScene'); }
  create(){
    this.gameScene = this.scene.get('RaceScene');
    this.countdown=3;
    this.timer=this.time.addEvent({delay:1000,repeat:3,callback:()=>{
      this.countdown--; if(this.countdown<=0){ this.timer.remove(); }
    }});
    // HUD text arrays
    this.speedTexts=[];
    this.lapTexts=[];
    this.fuelGroups=[];
    const players=this.registry.get('players');
    for(let i=0;i<players;i++){
      const offset = i===0?20:this.scale.width/2+20;
      this.speedTexts[i]=this.add.text(offset,20,'SPD 0',{fontSize:'14px'});
      this.lapTexts[i]=this.add.text(offset,40,'LAP 0/3',{fontSize:'14px'});
      this.fuelGroups[i]=this.add.group({key:'fuel',repeat:5,setXY:{x:offset,y:70,stepX:18}});
    }
  }
  update(){
    if(this.countdown>0){
      this.add.text(this.scale.width/2,this.scale.height/2,this.countdown,{fontSize:'64px'}).setOrigin(0.5);
      return;
    }
    const cars=this.gameScene.cars.filter(c=>c.playerLabel);
    cars.forEach((car,i)=>{
      this.speedTexts[i].setText('SPD '+Math.floor(car.body.speed));
      this.lapTexts[i].setText('LAP '+car.lap+'/3');
      // fuel icons visibility
      this.fuelGroups[i].getChildren().forEach((icon,idx)=>{ icon.setVisible(idx<car.fuel); });
    });
  }
}