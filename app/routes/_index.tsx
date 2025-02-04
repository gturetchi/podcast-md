import type { MetaFunction } from "@remix-run/node";
import { useEffect, useRef } from "react";
import "public/styles.css";

import * as THREE from "three";

export const meta: MetaFunction = () => {
  return [
    { title: "podcaST" },
    {
      name: "description",
      content: "Bine ai venit la podcast-ul podcaST de Sergiu Tronciu",
    },
  ];
};

export default function Index() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0xf7d9aa, 100, 950);
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      1,
      10000
    );

    camera.position.x = 0;
    camera.position.z = 200;
    camera.position.y = 100;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    mountRef.current.appendChild(renderer.domElement);

    //LIGHT SETUP
    const hemisphereLight = new THREE.HemisphereLight(0xaaaaaa, 0x000000, 0.9);
    const shadowLight = new THREE.DirectionalLight(0xffffff, 0.9);
    shadowLight.position.set(150, 350, 350);
    shadowLight.castShadow = true;
    shadowLight.shadow.camera.left = -400;
    shadowLight.shadow.camera.right = 400;
    shadowLight.shadow.camera.top = 400;
    shadowLight.shadow.camera.bottom = -400;
    shadowLight.shadow.camera.near = 1;
    shadowLight.shadow.camera.far = 1000;

    shadowLight.shadow.mapSize.width = 2048;
    shadowLight.shadow.mapSize.height = 2048;

    scene.add(hemisphereLight);
    scene.add(shadowLight);

    const geom = new THREE.CylinderGeometry(600, 600, 800, 40, 10);
    geom.applyMatrix4(new THREE.Matrix4().makeRotationX(-Math.PI / 2));
    const mat = new THREE.MeshPhongMaterial({
      color: 0x68c3c0,
      transparent: true,
      opacity: 0.6,
      shading: THREE.FlatShading,
    });

    const ground = new THREE.Mesh(geom, mat);
    ground.receiveShadow = true;
    ground.position.y = -600;

    scene.add(ground);

    //RENDER CLOUDS
    const geomCloud = new THREE.BoxGeometry(20, 20, 20);
    const matCloud = new THREE.MeshPhongMaterial({ colors: 0xffffff });

    const nClouds = 3 + Math.floor(Math.random() * 3);

    for (let i = 0; i < nClouds; i++) {
      const m = new THREE.Mesh(geomCloud, matCloud);
      m.position.x = i * 15;
      m.position.y = Math.random() * 10;
      m.position.z = Math.random() * 10;
      m.rotation.z = Math.random() * Math.PI * 2;
      m.rotation.y = Math.random() * Math.PI * 2;

      const s = 0.1 + Math.random() * 0.9;
      m.scale.set(s, s, s);

      m.castShadow = true;
      m.receiveShadow = true;

      scene.add(m);
    }

    renderer.render(scene, camera);

    return () => {
      renderer.dispose();
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="box h-screen w-screen"></div>;
}
