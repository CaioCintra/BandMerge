"use client";
import { useEffect, useState } from "react";
import Item from "./Item";
import { Chip } from "@mui/material";

export default function ItemList({ board, user, reload, setReload }) {
  const [genres, setGenre] = useState(null);
  const [bands, setBand] = useState(null);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3333/user/${user}/genre/items`);
        if (!response.ok) {
          throw new Error("API Error");
        }
        const data = await response.json();
        setGenre(data);
      } catch (error) {
        console.error("Err:", error);
      }
      try {
        const response = await fetch(`http://localhost:3333/user/${user}/band/items`);
        if (!response.ok) {
          throw new Error("API Error");
        }
        const data = await response.json();
        setBand(data);
      } catch (error) {
        console.error("Err:", error);
      }
      setReload(false);
    };

    fetchData();
  }, [reload, user]);

  return (
    <div className="bg-slate-800 fixed bottom-0 left-0 w-1/3 h-full pl-3 p-3">
      <Chip label="Genres" color="error" className="mt-3" />
      <br />
      {genres ? (
        genres.map((item: any) => (
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
      <Chip label="Bands" color="info" className="mt-3" />
      <br />
      {bands ? (
        bands.map((item: any) => (
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
