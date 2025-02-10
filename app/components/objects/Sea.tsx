import * as THREE from "three";

export class Sea {
  mesh: THREE.Mesh;
  geom: THREE.BufferGeometry;
  mat: THREE.MeshPhongMaterial;
  waves: Wave[] = [];

  constructor() {
    this.geom = new THREE.CylinderGeometry(600, 600, 800, 40, 10);
    this.mat = new THREE.MeshPhongMaterial({
      color: 0x68c3c0,
      transparent: true,
      opacity: 0.8,
      flatShading: true,
    });

    this.createSea();
  }

  private createSea(): void {
    this.geom.applyMatrix4(new THREE.Matrix4().makeRotationX(-Math.PI / 2));

    const positionAttribute = this.geom.getAttribute("position");
    const vertexCount = positionAttribute.count;

    for (let i = 0; i < vertexCount; i++) {
      const x = positionAttribute.getX(i);
      const y = positionAttribute.getY(i);
      const z = positionAttribute.getZ(i);

      this.waves.push({
        x,
        y,
        z,
        ang: Math.random() * Math.PI * 2,
        amp: 5 + Math.random() * 15,
        speed: 0.016 + Math.random() * 0.032,
      });
    }

    this.mesh = new THREE.Mesh(this.geom, this.mat);
    this.mesh.receiveShadow = true;
  }

  public moveWaves(): void {
    const positionAttribute = this.mesh.geometry.getAttribute("position");

    for (let i = 0; i < this.waves.length; i++) {
      const vprops = this.waves[i];

      const x = vprops.x + Math.cos(vprops.ang) * vprops.amp;
      const y = vprops.y + Math.sin(vprops.ang) * vprops.amp;

      positionAttribute.setX(i, x);
      positionAttribute.setY(i, y);

      vprops.ang += vprops.speed;
    }

    positionAttribute.needsUpdate = true;
    this.mesh.rotation.z += 0.005;
  }
}

interface Wave {
  x: number;
  y: number;
  z: number;
  ang: number;
  amp: number;
  speed: number;
}
