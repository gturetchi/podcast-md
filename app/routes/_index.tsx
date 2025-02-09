import type { MetaFunction } from "@remix-run/node";
import { useEffect, useRef } from "react";
import "public/styles.css";

import * as THREE from "three";
import { Sky } from "app/components/objects/sky";
import { Sea } from "app/components/objects/sea";
import { Airplane } from "~/components/objects/Airplane";

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

    const sea = new Sea();
    sea.mesh.receiveShadow = true;
    sea.mesh.position.y = -600;

    scene.add(sea.mesh);

    const sky = new Sky();
    sky.mesh.position.y = -600;
    scene.add(sky.mesh);

    const plane = new Airplane();
    plane.mesh.scale.set(0.25, 0.25, 0.25);
    plane.mesh.position.y = 100;
    scene.add(plane.mesh);

    let mousePos = { x: 0, y: 0 };

    function handleMouseMove(event: MouseEvent) {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -((event.clientY / window.innerHeight) * 2 - 1);
      mousePos = { x, y };
    }

    function normalize(
      v: number,
      vmin: number,
      vmax: number,
      tmin: number,
      tmax: number
    ) {
      const nv = Math.max(Math.min(v, vmax), vmin);
      const dv = vmax - vmin;
      const pc = (nv - vmin) / dv;
      const dt = tmax - tmin;
      const tv = tmin + pc * dt;
      return tv;
    }

    function updatePlane() {
      const targetX = normalize(mousePos.x, -1, 1, -100, 100);
      const targetY = normalize(mousePos.y, -1, 1, 25, 175);

      plane.mesh.position.y = targetY;
      plane.mesh.position.x = targetX;
      plane.propeller.rotation.x += 0.3;
    }

    window.addEventListener("mousemove", handleMouseMove);

    function loop() {
      plane.propeller.rotation.x += 0.3;
      sea.mesh.rotation.z += 0.005;
      sky.mesh.rotation.z += 0.003;

      updatePlane();
      sea.moveWaves();

      renderer.render(scene, camera);
      requestAnimationFrame(loop);
    }

    loop();

    return () => {
      renderer.dispose();
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="box h-screen w-screen"></div>;
}
