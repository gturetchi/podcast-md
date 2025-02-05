import * as THREE from "three";

export class Cloud {
  mesh: THREE.Object3D;

  constructor() {
    this.createCloud();
  }

  private createCloud(): void {
    this.mesh = new THREE.Object3D();
    const geom = new THREE.BoxGeometry(20, 20, 20);
    const mat = new THREE.MeshPhongMaterial({
      color: 0xffffff,
    });

    const nBlocs = 3 + Math.floor(Math.random() * 3);
    for (let i = 0; i < nBlocs; i++) {
      const m = new THREE.Mesh(geom, mat);
      m.position.x = i * 15;
      m.position.y = Math.random() * 10;
      m.position.z = Math.random() * 10;
      m.rotation.z = Math.random() * Math.PI * 2;
      m.rotation.y = Math.random() * Math.PI * 2;
      const s = 0.1 + Math.random() * 0.9;
      m.scale.set(s, s, s);
      m.castShadow = true;
      m.receiveShadow = true;
      this.mesh.add(m);
    }
  }
}
