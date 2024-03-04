/* eslint-disable @next/next/no-img-element */
import { useState, useEffect, useRef } from "react";

interface ItemProps {
  name: string;
  place: string;
  id: number;
  img: string;
  sound: string;
  setBoard: Function; // Update this with the actual type of setBoard if possible
}

export default function Item({
  name,
  place,
  id,
  img,
  sound,
  setBoard,
}: ItemProps) {
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
          <img
            src={"/assets/" + img}
            alt="Img"
            className="inline max-w-20 h-11 mb-1 mt-1"
          />
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
