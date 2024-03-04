import { useState } from "react";
import { Button } from "@mui/material";
import { Input } from "@nextui-org/react";

interface LoginProps {
  user: any;
  setUser: any;
}

export default function Login({ user, setUser }: LoginProps) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3333/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Login bem-sucedido!");
        console.log("userId:", data.userId);
        setUser(data.userId);
        localStorage.setItem("user", JSON.stringify(data.userId));
      } else {
        console.error("Login falhou.");
      }
    } catch (error) {
      console.error("Erro ao enviar requisição:", error);
    }
  };

  const logout = async (e: React.MouseEvent<HTMLButtonElement>) => {
    setUser(null);
    localStorage.setItem("user", "");
    window.location.reload();
  };

  if (user == null) {
    return (
      <div className="absolute w-80 top-5 right-5 p-8">
        <form className="flex flex-col items-center" onSubmit={handleSubmit}>
          <Input
            isRequired
            placeholder="Login"
            className="bg-transparent ring-1 ring-slate-200 rounded-xl pl-3 mb-3"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            isRequired
            placeholder="Password"
            type="password"
            className="bg-transparent ring-1 ring-slate-200 rounded-xl pl-3 mb-3 focus:ring-0"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button variant="outlined" color="inherit" type="submit" className="m-3">
            Login
          </Button>
          <a
            href="/newAccount"
            className="hover:font-semibold hover:text-stone-400"
          >
            Create Account
          </a>
        </form>
      </div>
    );
  } else {
    return (
      <div className="absolute top-5 right-5 p-3">
        <Button variant="outlined" color="error" type="submit" onClick={logout}>
          Logout
        </Button>
      </div>
    );
  }
}
