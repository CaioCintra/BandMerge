"use client";
import Item from "@/components/Item";
import ItemList from "@/components/itemList";
import { useState } from "react";

export default function Home() {
  const [items, setItems] = useState([
    { id: "0", name: "blank", img: "item1.img", sound: "item1.sound" },
    { id: "0", name: "blank", img: "item1.img", sound: "item1.sound" },
  ]);

  function handleBoard(index: any) {
    const newItem = {
      id: "1",
      name: "newName",
      img: "newImg",
      sound: "newSound",
    };

    const updatedItems = items.map((item, i) => {
      if (i === index) {
        return newItem;
      } else {
        return item;
      }
    });
    setItems(updatedItems);
  }

  return (
    <>
      <div className="fixed bottom-0 left-0 w-full h-full flex justify-center items-center">
        <Item
          id={items[0].id}
          name={items[0].name}
          img={items[0].img}
          sound={items[0].sound}
          place="board"
        />
        <p className="font-black text-4xl">+</p>
        <Item
          id={items[1].id}
          name={items[1].name}
          img={items[1].img}
          sound={items[1].sound}
          place="board"
        />
      <button className="bg-red-700" onClick={() => handleBoard(1)}>Clique aqui</button>
      </div>
      <ItemList></ItemList>
    </>
  );
}


// Acabei de fazer uma função para trocar por um botão

// - passar cada item por parametro
// - fazer ser acessada no componente de items
// - fazer lógica de qual bloco colocar