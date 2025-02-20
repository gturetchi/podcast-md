import type { MetaFunction } from "@remix-run/node";
import { useEffect, useRef } from "react";
import "public/styles.css";

import * as THREE from "three";
import { GlassObject } from "app/components/objects/GlassObject";

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
      10000,
    );

    camera.position.z = 200;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    const bgTexture = new THREE.TextureLoader().load("/podcaST2.jpg");
    bgTexture.colorSpace = THREE.SRGBColorSpace;

    const distance = 199;
    const height = 2 * Math.tan((camera.fov * Math.PI) / 360) * distance;
    const width = height * camera.aspect;

    const bgGeometry = new THREE.PlaneGeometry(width, height);
    const bgMaterial = new THREE.MeshBasicMaterial({ map: bgTexture });
    const bgMesh = new THREE.Mesh(bgGeometry, bgMaterial);

    bgMesh.position.set(0, 0, -1);

    const glassObject = new GlassObject();
    glassObject.mesh.position.set(0, 0, 0);
    glassObject.mesh.scale.set(50, 50, 50);
    scene.add(glassObject.mesh);

    scene.background = new THREE.Color(0x615767);
    const loader = new THREE.TextureLoader();
    loader.load("/podcaST2.jpg", (texture) => {
      texture.colorSpace = THREE.SRGBColorSpace;
      scene.background = texture; // Set the scene background
    });

    function loop() {
      renderer.render(scene, camera);
      requestAnimationFrame(loop);
    }

    loop();

    return () => {
      renderer.dispose();
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div className="h-screen w-screen">
      <div ref={mountRef} className="h-screen w-screen"></div>
    </div>
  );
}
