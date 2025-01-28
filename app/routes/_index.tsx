import type { MetaFunction } from "@remix-run/node";
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
  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <button className="download-button box p-2 text-cyan-50">
          {ArrowDown}
          {ArrowDown}
        </button>
      </div>
    </>
  );
}

const ArrowDown = (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="arrow"
  >
    <path
      d="M18.25 14L12 20.25L5.75 14M12 19.5V3.75"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
