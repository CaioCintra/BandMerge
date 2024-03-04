"use client";
import Item from "@/components/Item";
import Login from "@/components/Login";
import ItemList from "@/components/itemList";
import { Alert, AlertTitle } from "@mui/material";
import { useEffect, useState } from "react";

export default function Home() {
  const [user, setUser] = useState(null);

  const [alert, setAlert] = useState(null);
  const [items, setItems] = useState([
    { id: "0", name: "blank", img: "noimg", sound: "nosound" },
    { id: "0", name: "blank", img: "noimg", sound: "nosound" },
  ]);
  const [reloadItemList, setReloadItemList] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

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
      try {
        const response = await fetch(
          `http://localhost:3333/merge/${item1}/${item2}`
        );
        if (!response.ok) {
          throw new Error("API Error");
        }
        const data = await response.json();
        addItem(data);
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

  useEffect(() => {
    if (alert) {
      const timeout = setTimeout(() => {
        setAlert(null);
      }, 2000);

      return () => clearTimeout(timeout);
    }
  }, [alert]);

  async function addItem(newItem: any) {
    console.log(newItem);
    const response = await fetch(
      `http://localhost:3333/users/${user}/collection/${newItem.id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      }
    );
    if (response.ok) {
      setAlert(newItem.name);
      setReloadItemList(true);
    }
  }

  return (
    <>
      <div className="z-0 fixed bottom-0 left-0 w-full h-full flex justify-center items-center">
        <Item
          id={Number(items[0].id)}
          name={items[0].name}
          img={items[0].img}
          sound={items[0].sound}
          place="board"
          setBoard={handleBoard}
        />
        <p className="font-black text-4xl">+</p>
        <Item
          id={Number(items[1].id)}
          name={items[1].name}
          img={items[1].img}
          sound={items[1].sound}
          place="board"
          setBoard={handleBoard}
        />
      </div>
      {alert && (
        <Alert
          className="z-0 absolute w-60 bottom-2 right-0"
          severity="info"
          variant="filled"
          onClose={() => setAlert(null)}
        >
          <AlertTitle className="font-bold">{alert}</AlertTitle>
          New item unlocked!
        </Alert>
      )}
      <Login user={user} setUser={setUser} />
      <ItemList
        user={user}
        board={handleBoard}
        reload={reloadItemList}
        setReload={setReloadItemList}
      ></ItemList>
    </>
  );
}
