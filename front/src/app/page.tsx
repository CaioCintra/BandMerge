"use client";
import Item from "@/components/Item";
import ItemList from "@/components/itemList";
import { useState } from "react";

export default function Home() {
  const [items, setItems] = useState([
    { id: "0", name: "blank", img: "noimg", sound: "nosound" },
    { id: "0", name: "blank", img: "noimg", sound: "nosound" },
  ]);

  function waitOneSecond(): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 500);
    });
  }

  async function handleBoard(id: any, name: any, img: any, sound: any) {
    const newItem = {
      id: id,
      name: name,
      img: img,
      sound: sound,
    };
    var index = 2;

    if (items[0].name == "blank") {
      index = 0;
    } else {
      if (items[1].name == "blank") index = 1;
    }

    const updatedItems = items.map((item, i) => {
      if (i === index) {
        return newItem;
      } else {
        return item;
      }
    });
    setItems(updatedItems);

    if (index == 1) {
      const item1 = updatedItems[0].id;
      const item2 = updatedItems[1].id;
      console.log(item1);
      console.log(item2);
      try {
        const response = await fetch(
          `http://localhost:3333/merge/${item1}/${item2}`
        );
        if (!response.ok) {
          throw new Error("API Error");
        }
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error("No Merges");
      }
      await waitOneSecond();
      setItems([
        { id: "0", name: "blank", img: "noimg", sound: "nosound" },
        { id: "0", name: "blank", img: "noimg", sound: "nosound" },
      ]);
    }
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
          setBoard={handleBoard}
        />
        <p className="font-black text-4xl">+</p>
        <Item
          id={items[1].id}
          name={items[1].name}
          img={items[1].img}
          sound={items[1].sound}
          place="board"
          setBoard={handleBoard}
        />
      </div>
      <ItemList board={handleBoard}></ItemList>
    </>
  );
}
