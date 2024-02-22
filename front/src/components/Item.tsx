import Image from "next/image";
import { useState, useEffect, useRef } from "react";

export default function Item(props: any) {
  const name = props.name;
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

  async function clickItem() {
    if (props.place == "list") {
      console.log("botão clicado:", props.name);

    } else {
      console.log("botão desclicado:", props.name);
    }
  }

  return (
    <button
      ref={divRef}
      className="bg-transparent ring-4 ring-slate-700 rounded-md h-20 w-20 m-5 flex flex-col justify-center items-center text-center"
      onClick={clickItem}
      disabled={props.name === "blank"}
    >
      {props.name != "blank" ? (
        <div>
          <Image src={"/" + props.img} alt="Img" width={56} height={56} />
          <p
            style={{ fontSize: `${fontSize}px` }}
            className="h-6 flex justify-center items-center"
          >
            {name}
          </p>
        </div>
      ) : (
        <></>
      )}
    </button>
  );
}
