import * as THREE from "three";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";

export class GlassObject {
  mesh: THREE.Object3D;

  constructor() {
    const geom = new THREE.IcosahedronGeometry(0.67, 24);

    const hdrEquirect = new RGBELoader().load(
      "/empty_warehouse.hdr",
      (texture: THREE.Texture) => {
        texture.mapping = THREE.EquirectangularReflectionMapping;
      },
    );

    const material = new THREE.MeshPhysicalMaterial({
      transmission: 1.0,
      thickness: 1.5,
      roughness: 0.07,
      envMap: hdrEquirect,
      envMapIntensity: 1.5,
    });
    this.mesh = new THREE.Mesh(geom, material);
  }
}
