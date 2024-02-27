import Image from "next/image";
import { useState, useEffect, useRef } from "react";

export default function Item({ name, place, id, img, sound, setBoard }) {
  const [fontSize, setFontSize] = useState(18);
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const calculateFontSize = () => {
      if (divRef.current) {
        const divWidth = divRef.current.offsetWidth;
        const textLength = name?.length;
        const newFontSize = Math.max(Math.floor(divWidth / textLength), 10);

        if (newFontSize > 18) setFontSize(18);
        else setFontSize(newFontSize);
      }
    };

    calculateFontSize();
    window.addEventListener("resize", calculateFontSize);

    return () => {
      window.removeEventListener("resize", calculateFontSize);
    };
  }, [name]);

  function clickItem() {
    if (place === "list") {
      setBoard(id, name, img, sound);
    } else {
      setBoard(0, "blank", "noimg", "nosound");
    }
  }

  return (
    <button
      ref={divRef}
      className="bg-white ring-4 ring-slate-700 rounded-md h-20 w-20 m-5 transition ease-in-out hover:-translate-y-1 hover:bg-slate-300 hover:scale-110 duration-300"
      onClick={clickItem}
      disabled={name === "blank"}
    >
      {name !== "blank" && (
        <div>
          <Image src={"/assets/" + img} alt="Img" width={56} height={56} />
          <p
            style={{ fontSize: `${fontSize}px` }}
            className="h-6 text-black font-bold flex justify-center items-center"
          >
            {name}
          </p>
        </div>
      )}
    </button>
  );
}
