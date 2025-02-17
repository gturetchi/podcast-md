import * as THREE from "three";

const Colors = {
  brown: 0x59332e,
  pink: 0xf5986e,
};

export class Pilot {
  mesh: THREE.Object3D;
  angleHairs: number;
  hairsTop: THREE.Object3D;

  constructor() {
    this.mesh = new THREE.Object3D();
    this.mesh.name = "pilot";
    this.angleHairs = 0;
    this.hairsTop = new THREE.Object3D();

    this.createPilot();
  }

  private createPilot(): void {
    const bodyGeom = new THREE.BoxGeometry(15, 15, 15);
    const bodyMat = new THREE.MeshPhongMaterial({
      color: Colors.brown,
      flatShading: true,
    });
    const body = new THREE.Mesh(bodyGeom, bodyMat);
    body.position.set(2, -12, 0);
    this.mesh.add(body);

    // FACE
    const faceGeom = new THREE.BoxGeometry(10, 10, 10);
    const faceMat = new THREE.MeshLambertMaterial({ color: Colors.pink });
    const face = new THREE.Mesh(faceGeom, faceMat);
    this.mesh.add(face);

    // HAIR ELEMENT
    const hairGeom = new THREE.BoxGeometry(4, 4, 4);
    hairGeom.applyMatrix4(new THREE.Matrix4().makeTranslation(0, 2, 0));
    const hairMat = new THREE.MeshLambertMaterial({ color: Colors.brown });

    // Container for all hair parts
    const hairs = new THREE.Object3D();

    // Top hair pieces (animated)
    for (let i = 0; i < 12; i++) {
      const h = new THREE.Mesh(hairGeom, hairMat);
      const col = i % 3; // columns
      const row = Math.floor(i / 3); // rows
      const startPosZ = -4;
      const startPosX = -4;
      h.position.set(startPosX + row * 4, 0, startPosZ + col * 4);
      this.hairsTop.add(h);
    }
    hairs.add(this.hairsTop);

    // Hair at the sides
    const hairSideGeom = new THREE.BoxGeometry(12, 4, 2);
    hairSideGeom.applyMatrix4(new THREE.Matrix4().makeTranslation(-6, 0, 0));
    const hairSideR = new THREE.Mesh(hairSideGeom, hairMat);
    const hairSideL = hairSideR.clone();
    hairSideR.position.set(8, -2, 6);
    hairSideL.position.set(8, -2, -6);
    hairs.add(hairSideR);
    hairs.add(hairSideL);

    // Hair at the back
    const hairBackGeom = new THREE.BoxGeometry(2, 8, 10);
    const hairBack = new THREE.Mesh(hairBackGeom, hairMat);
    hairBack.position.set(-1, -4, 0);
    hairs.add(hairBack);

    hairs.position.set(-5, 5, 0);
    this.mesh.add(hairs);

    // GLASSES
    const glassGeom = new THREE.BoxGeometry(5, 5, 5);
    const glassMat = new THREE.MeshLambertMaterial({ color: Colors.brown });
    const glassR = new THREE.Mesh(glassGeom, glassMat);
    glassR.position.set(6, 0, 3);
    const glassL = glassR.clone();
    glassL.position.z = -glassR.position.z;

    const glassAGeom = new THREE.BoxGeometry(11, 1, 11);
    const glassA = new THREE.Mesh(glassAGeom, glassMat);

    this.mesh.add(glassR);
    this.mesh.add(glassL);
    this.mesh.add(glassA);

    // EARS
    const earGeom = new THREE.BoxGeometry(2, 3, 2);
    const earL = new THREE.Mesh(earGeom, faceMat);
    earL.position.set(0, 0, -6);
    const earR = earL.clone();
    earR.position.set(0, 0, 6);

    this.mesh.add(earL);
    this.mesh.add(earR);
  }

  public updateHairs(): void {
    const hairs = this.hairsTop.children;

    for (let i = 0; i < hairs.length; i++) {
      const h = hairs[i] as THREE.Mesh;
      h.scale.y = 0.75 + Math.cos(this.angleHairs + i / 3) * 0.25;
    }

    this.angleHairs += 0.16;
  }
}
