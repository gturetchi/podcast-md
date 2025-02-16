import * as THREE from "three";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";

export class GlassObject {
  mesh: THREE.Object3D;

  constructor() {
    const hdrEquirect = new RGBELoader().load(
      "https://picsum.photos/id/11/1920/1080",
      () => {
        hdrEquirect.mapping = THREE.EquirectangularReflectionMapping;
      },
    );
    const geom = new THREE.IcosahedronGeometry(1, 0);

    const material = new THREE.MeshPhysicalMaterial({
      roughness: 0,
      transmission: 1,
      thickness: 0.5,
      envMap: hdrEquirect,
    });
    this.mesh = new THREE.Mesh(geom, material);
  }
}
