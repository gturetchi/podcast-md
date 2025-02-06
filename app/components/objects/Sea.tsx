import * as THREE from "three";

export class Sea {
  mesh: THREE.Object3D;
  geom = new THREE.CylinderGeometry(600, 600, 800, 40, 10);
  mat = new THREE.MeshPhongMaterial({
    color: 0x68c3c0,
    transparent: true,
    opacity: 0.6,
    shading: THREE.FlatShading,
  });

  constructor() {
    this.createSea();
  }

  private createSea(): void {
    this.mesh = new THREE.Mesh(this.geom, this.mat);
  }
}
