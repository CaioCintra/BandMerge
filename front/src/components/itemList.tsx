"use client";
import { useEffect, useState } from "react";
import Item from "./Item";

export default function ItemList() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3333/items");
        if (!response.ok) {
          throw new Error("API Error");
        }
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error("Erro na requisição:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-slate-800 fixed bottom-0 left-0 w-1/3 h-full flex justify-center items-center">
      {data ? (
        data.map((item: any) => (
          <Item
            key={item.id}
            id={item.id}
            name={item.name}
            img={item.img}
            sound={item.sound}
            place={"list"}
          />
        ))
      ) : (
        <></>
      )}
    </div>
  );
}
