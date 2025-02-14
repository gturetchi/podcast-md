import * as THREE from "three";

export class GlassObject {
  mesh: THREE.Object3D;

  constructor() {
    const geom = new THREE.IcosahedronGeometry(1, 0);

    const materials = new THREE.MeshPhysicalMaterial({
      roughness: 0.2,
      transmission: 1,
      thickness: 0.5,
    });
    this.mesh = new THREE.Mesh(geom, materials);
  }
}
