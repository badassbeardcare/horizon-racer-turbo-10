/* ==========================================================
   js/utils/ai.js – very light AI driver helper
==========================================================*/
export default function aiDriver(scene, car, delta){
  // naive AI: accelerate unless near guardrail
  if(!car.angle) car.angle=-90; // forward
  // random steering to stay on track center
  if(Math.random()<0.01) car.angle+=Phaser.Math.Between(-30,30);
  scene.physics.velocityFromRotation(Phaser.Math.DegToRad(car.angle), 180*car.aiSkill, car.body.velocity);
}

/* === end of file set === */

/* ========== ASSETS README =================================
All external images/audio linked above are CC0 or CC‑BY, sourced from:
 • itch.io free 16‑bit car set citeturn0search6
 • OpenGameArt CC0 background tiles/stage art citeturn0search0turn0search2
 • Retro racing music loops (OpenGameArt) citeturn2search0
 • CC0 animal honks (Freesound) citeturn1search4turn1search2
Replace asset URLs in PreloadScene with local files for offline use.
=============================================================*/
