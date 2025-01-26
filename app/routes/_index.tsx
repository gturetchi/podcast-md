import type { MetaFunction } from "@remix-run/node";
import "public/styles.css";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <button className="box p-16">Hello World</button>
      </div>
    </>
  );
}
