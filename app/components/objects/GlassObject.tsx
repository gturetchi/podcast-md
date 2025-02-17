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
      metalness: 0.9,
      roughness: 0.05,
      envMapIntensity: 0.9,
      clearcoat: 1,
      transparent: true,
      opacity: 0.5,
      reflectivity: 0.2,
      refractionRatio: 0.985,
      ior: 0.9,
      side: THREE.BackSide,
    });
    this.mesh = new THREE.Mesh(geom, material);
  }
}
