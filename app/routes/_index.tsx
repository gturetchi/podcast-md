import type { MetaFunction } from "@remix-run/node";
import { useEffect, useRef } from "react";
import "public/styles.css";
import { renderer } from "react-dom";

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
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    camera.position.set(0, 0, 100);
    camera.lookAt(0, 0, 0);

    const materialLine = new THREE.LineBasicMaterial({ color: 0x0000ff });

    const points = [];
    points.push(new THREE.Vector3(-10, 0, 0));
    points.push(new THREE.Vector3(0, 10, 0));
    points.push(new THREE.Vector3(10, 0, 0));

    const geometryLine = new THREE.BufferGeometry().setFromPoints(points);

    const line = new THREE.Line(geometryLine, materialLine);

    scene.add(line);

    renderer.render(scene, camera);

    return () => {
      renderer.dispose();
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <div ref={mountRef} className="absolute top-0 left-0 w-full h-full" />
    </div>
  );
}
