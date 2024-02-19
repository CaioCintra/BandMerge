import { useState, useEffect, useRef } from "react";

export default function Item(props: any) {
  const name = props.name;
  const [fontSize, setFontSize] = useState(20);
  const divRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const calculateFontSize = () => {
      if (divRef.current) {
        const divWidth = divRef.current.offsetWidth;
        const textLength = name.length;
        const newFontSize = Math.max(Math.floor(divWidth / textLength), 10);

        setFontSize(newFontSize);
      }
    };

    calculateFontSize();
    window.addEventListener("resize", calculateFontSize);

    return () => {
      window.removeEventListener("resize", calculateFontSize);
    };
  }, [name]);

  return (
    <div
      ref={divRef}
      className="bg-transparent ring-2 ring-slate-700 rounded-md h-20 w-20 m-5 flex flex-col justify-center items-center text-center"
    >
      <img src={props.img} alt="NoImg" className="h-10 w-10" />
      <p
        style={{ fontSize: `${fontSize}px`, margin: 0 }}
        className="h-8 flex justify-center items-center"
      >
        {name}
      </p>
    </div>
  );
}
