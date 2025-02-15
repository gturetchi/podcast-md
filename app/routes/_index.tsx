import type { MetaFunction } from "@remix-run/node";
import { useEffect, useRef } from "react";
import "public/styles.css";

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
  return <div className="box h-screen w-screen">PodcaST</div>;
}
