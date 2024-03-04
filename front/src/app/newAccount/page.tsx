"use client"
import { useState } from "react";
import { Button } from "@mui/material";
import { Input } from "@nextui-org/react";

export default function NewAccount() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const urlBack = process.env.URL_BACK;

  const handleSubmit = (event:any) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      console.log("A senha e a confirmação da senha não correspondem.");
      return;
    }

    fetch(`${urlBack}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: login,
        password: password,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao criar conta");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Conta criada com sucesso!");
        console.log(data);
        localStorage.setItem("user", JSON.stringify(data.id));
        window.location.href = '/';
      })
      .catch((error) => {
        console.error("Erro ao criar conta:", error);
      });
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-transparent ring-4 ring-white rounded-xl h-96 w-2/5 shadow-md shadow-white flex flex-col items-center p-16">
        <p className="text-4xl font-bold mb-6">Create account</p>
        <div className="w-9/12 border-b-2 border-white mb-6"></div>
        <form className="flex flex-col items-center" onSubmit={handleSubmit}>
          <Input
            isRequired
            placeholder="Login"
            className="bg-transparent ring-1 ring-slate-200 rounded-xl pl-3 mb-3"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />
          <Input
            isRequired
            placeholder="Password"
            type="password"
            className="bg-transparent ring-1 ring-slate-200 rounded-xl pl-3 mb-3 focus:ring-0"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            isRequired
            placeholder="Confirm your password"
            type="password"
            className="bg-transparent ring-1 ring-slate-200 rounded-xl pl-3 mb-3 focus:ring-0"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button
            variant="outlined"
            color="inherit"
            type="submit"
            className="m-3"
          >
            Create
          </Button>
        </form>
      </div>
    </div>
  );
}
