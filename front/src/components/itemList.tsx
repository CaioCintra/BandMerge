import { useEffect, useState } from "react";
import Item from "./Item";
import { Chip } from "@mui/material";

interface ItemListProps {
  board: any;
  user: any;
  reload: any;
  setReload: any;
}

interface ItemData {
  id: number;
  name: string;
  img: string;
  sound: string;
}

export default function ItemList({
  board,
  user,
  reload,
  setReload,
}: ItemListProps) {
  const [genres, setGenres] = useState<ItemData[]>([]);
  const [bands, setBands] = useState<ItemData[]>([]);
  const [items, setItems] = useState<ItemData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3333/user/${user}/genre/items`
        );
        if (!response.ok) {
          throw new Error("API Error");
        }
        const data = await response.json();
        setGenres(data);
      } catch (error) {
        console.error("Err:", error);
      }
      try {
        const response = await fetch(
          `http://localhost:3333/user/${user}/band/items`
        );
        if (!response.ok) {
          throw new Error("API Error");
        }
        const data = await response.json();
        setBands(data);
      } catch (error) {
        console.error("Err:", error);
      }
      setReload(false);
    };

    fetchData();
  }, [reload, user]);

  return (
    <div className="bg-slate-800 fixed bottom-0 left-0 w-[35%] h-full pl-3 p-3 overflow-y-auto">
      <Chip label="Genres" color="error" className="mt-3" />
      <br />
      {genres.length > 0 ? (
        genres.map((item) => (
          <Item
            key={item.id}
            id={item.id}
            name={item.name}
            img={item.img}
            sound={item.sound}
            place={"list"}
            setBoard={board}
          />
        ))
      ) : (
        <></>
      )}
      <br />
      <Chip label="Artists" color="info" className="mt-3" />
      <br />
      {bands.length > 0 ? (
        bands.map((item) => (
          <Item
            key={item.id}
            id={item.id}
            name={item.name}
            img={item.img}
            sound={item.sound}
            place={"list"}
            setBoard={board}
          />
        ))
      ) : (
        <></>
      )}
    </div>
  );
}
