import * as THREE from "three";

export class Airplane {
  mesh: THREE.Object3D = new THREE.Object3D();
  propeller: THREE.Mesh;

  constructor() {
    this.createAirplane();
  }

  private createAirplane(): void {
    let geomCockpit = new THREE.BoxGeometry(60, 50, 50, 1, 1, 1);
    geomCockpit = geomCockpit.toNonIndexed();

    const positionAttribute = geomCockpit.attributes.position;

    for (let i = 0; i < positionAttribute.count; i++) {
      const x = positionAttribute.getX(i);
      let y = positionAttribute.getY(i);
      let z = positionAttribute.getZ(i);
      if (y > 0) y -= 10;
      if (z > 0) z += 20;

      positionAttribute.setXYZ(i, x, y, z);
    }

    positionAttribute.needsUpdate = true;
    geomCockpit.computeVertexNormals();
    const matCockpit = new THREE.MeshPhongMaterial({
      color: 0xf25346,
      shading: THREE.FlatShading,
    });
    const cockpit = new THREE.Mesh(geomCockpit, matCockpit);
    cockpit.castShadow = true;
    cockpit.receiveShadow = true;
    this.mesh.add(cockpit);

    const geomEngine = new THREE.BoxGeometry(20, 50, 50, 1, 1, 1);
    const matEngine = new THREE.MeshPhongMaterial({
      color: 0xd8d0d1,
      shading: THREE.FlatShading,
    });
    const engine = new THREE.Mesh(geomEngine, matEngine);
    engine.position.x = 40;
    engine.castShadow = true;
    engine.receiveShadow = true;
    this.mesh.add(engine);

    const geomTailPlane = new THREE.BoxGeometry(15, 20, 5, 1, 1, 1);
    const matTailPlane = new THREE.MeshPhongMaterial({
      color: 0xf25346,
      shading: THREE.FlatShading,
    });
    const tailPlane = new THREE.Mesh(geomTailPlane, matTailPlane);
    tailPlane.position.set(-35, 25, 0);
    tailPlane.castShadow = true;
    tailPlane.receiveShadow = true;
    this.mesh.add(tailPlane);

    const geomSideWing = new THREE.BoxGeometry(40, 8, 150, 1, 1, 1);
    const matSideWing = new THREE.MeshPhongMaterial({
      color: 0xf25346,
      shading: THREE.FlatShading,
    });
    const sideWing = new THREE.Mesh(geomSideWing, matSideWing);
    sideWing.castShadow = true;
    sideWing.receiveShadow = true;
    this.mesh.add(sideWing);

    // propeller
    const geomPropeller = new THREE.BoxGeometry(20, 10, 10, 1, 1, 1);
    const matPropeller = new THREE.MeshPhongMaterial({
      color: 0x23190f,
      shading: THREE.FlatShading,
    });

    this.propeller = new THREE.Mesh(geomPropeller, matPropeller);
    this.propeller.castShadow = true;
    this.propeller.receiveShadow = true;

    // blades
    const geomBlade = new THREE.BoxGeometry(1, 100, 20, 1, 1, 1);
    const matBlade = new THREE.MeshPhongMaterial({
      color: 0x23190f,
      shading: THREE.FlatShading,
    });

    const blade = new THREE.Mesh(geomBlade, matBlade);
    blade.position.set(8, 0, 0);
    blade.castShadow = true;
    blade.receiveShadow = true;
    this.propeller.add(blade);
    this.propeller.position.set(50, 0, 0);
    this.mesh.add(this.propeller);
  }
}
