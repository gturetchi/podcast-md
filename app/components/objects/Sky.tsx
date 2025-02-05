import * as THREE from "three";
import { Cloud } from "app/components/objects/cloud";

export class Sky {
  mesh: THREE.Object3D;

  constructor() {
    this.createSky();
  }

  private createSky(): void {
    this.mesh = new THREE.Object3D();
    const nClouds = 20;
    const stepAngle = (Math.PI * 2) / nClouds;

    for (let i = 0; i < nClouds; i++) {
      const c = new Cloud();
      const a = stepAngle * i;
      const h = 750 + Math.random() * 200;
      c.mesh.position.y = Math.sin(a) * h;
      c.mesh.position.x = Math.cos(a) * h;
      c.mesh.position.z = -400 - Math.random() * 400;
      c.mesh.rotation.z = a + Math.PI / 2;
      const s = 1 + Math.random() * 2;
      c.mesh.scale.set(s, s, s);
      this.mesh.add(c.mesh);
    }
  }
}
