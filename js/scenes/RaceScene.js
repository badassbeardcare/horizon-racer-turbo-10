/* ==========================================================
   js/scenes/RaceScene.js  – core gameplay
==========================================================*/
import aiDriver from '../utils/ai.js';

export default class RaceScene extends Phaser.Scene {
  constructor(){ super('RaceScene'); }

  create(){
    const players = this.registry.get('players');
    this.track = this.createTrack();
    this.cars = [];

    // player 1 setup
    this.createPlayer(0, players>=1 ? 'P1' : null, {
      keys:this.input.keyboard.addKeys({left:'LEFT',right:'RIGHT',up:'W',down:'S',honk:'SPACE'}),
      camera:{x:0,y:0,width:0.5,height:1}
    });

    if(players===2){
      this.createPlayer(1,'P2',{
        keys:this.input.keyboard.addKeys({left:'J',right:'L',up:'I',down:'K',honk:'SHIFT'}),
        camera:{x:0.5,y:0,width:0.5,height:1}
      });
    }

    // AI opponents
    for(let i=0;i<3;i++) this.createAI(i+players);

    // collisions with guardrails
    this.physics.add.collider(this.cars, this.guardrails, (car)=>{ this.flipCar(car); });
  }

  createTrack(){
    // very simplified rectangular track placeholder
    const g = this.add.graphics();
    g.lineStyle(80,0x444444);
    g.strokeRoundedRect(100,100, this.scale.width-200, this.scale.height-200, 40);
    // guardrails as physics group around edges
    this.guardrails = this.physics.add.staticGroup();
    const rects=[
      new Phaser.Geom.Rectangle(60,90,this.scale.width-120,20), // top
      new Phaser.Geom.Rectangle(60,this.scale.height-110,this.scale.width-120,20), // bottom
      new Phaser.Geom.Rectangle(90,110,20,this.scale.height-220), // left
      new Phaser.Geom.Rectangle(this.scale.width-110,110,20,this.scale.height-220) // right
    ];
    rects.forEach(r=>{
      const rail=this.add.rectangle(r.x+r.width/2,r.y+r.height/2,r.width,r.height,0xff0000).setAlpha(0);
      this.physics.add.existing(rail,true);
      this.guardrails.add(rail);
    });
    return g;
  }

  createPlayer(index,label,{keys,camera}){
    const carSprite = this.physics.add.sprite(150+index*50, this.scale.height/2, 'truck');
    carSprite.playerLabel = label;
    carSprite.speed = 0;
    carSprite.fuel = 6; // cans
    carSprite.lap = 0;
    carSprite.controls = keys;
    this.cars.push(carSprite);

    // camera
    const cam = this.cameras.add(this.scale.width*camera.x, this.scale.height*camera.y, this.scale.width*camera.width, this.scale.height*camera.height);
    cam.startFollow(carSprite);
  }

  createAI(index){
    const aiCar = this.physics.add.sprite(200+index*60, this.scale.height/2+50, 'mustang');
    aiCar.isAI=true;
    aiCar.aiSkill = Phaser.Math.FloatBetween(0.9,1);
    this.cars.push(aiCar);
  }

  flipCar(car){
    // flip animation
    this.tweens.add({targets:car,angle:'+=360',duration:500,ease:'Power2'});
    // reduce speed
    car.body.velocity.scale(0.5);
  }

  update(time,delta){
    this.cars.forEach(car=>{
      if(car.isAI){
        aiDriver(this,car,delta);
      }else{
        const c=car.controls;
        if(c.left.isDown) car.angle -= car.body.speed>0?car.registry.values.handling*delta/1000:0;
        if(c.right.isDown) car.angle += car.body.speed>0?car.registry.values.handling*delta/1000:0;
        if(c.up.isDown){
          this.physics.velocityFromRotation(Phaser.Math.DegToRad(car.angle-90), 200, car.body.acceleration);
        }else if(c.down.isDown){
          car.body.velocity.scale(0.9);
        }else{
          car.body.setAcceleration(0);
        }
        if(Phaser.Input.Keyboard.JustDown(c.honk)){
          this.sound.play(Math.random()>0.5?'quack':'hawk');
        }
      }
    });
  }
}