"use client";

import axios from "axios";
import { List } from "lucide-react";
import { useEffect, useState } from "react";

export default function FiltroCategoria({ setProdutos, categoria }) {
  const [categorias, setCategorias] = useState([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("Todos");

  useEffect(() => {
  const filtro = async () => {
    try {
      const response = await axios.get("http://localhost:8080/categorias");
      const dados = response.data;
      setCategorias(["Todos", ...dados]);

      if (categoria) {
        const encontrada = dados.find((c) => String(c.id) === String(categoria));
        if (encontrada) {
          setCategoriaSelecionada(encontrada);
          const res = await axios.get("http://localhost:8080/produtos", {
            params: { categoria_id: encontrada.id },
          });
          setProdutos(res.data);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  filtro();
}, [categoria]);

  const filtroCategoria = async (item) => {
    setCategoriaSelecionada(item);
    try {
      const response =
        item === "Todos"
          ? await axios.get("http://localhost:8080/produtos")
          : await axios.get("http://localhost:8080/produtos", {
              params: { categoria_id: item.id },
            });

      setProdutos(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full h-[100px] flex flex-col justify-center gap-3 p-5">
      <div className="flex items-center gap-2">
        <List className="w-5 h-5" />
        <span className="font-medium text-lg">Categorias</span>
      </div>

      <div className="flex flex-row gap-5 flex-wrap">
        {categorias.map((item, index) => (
          <button
            key={index}
            className={`p-2.5 rounded-sm cursor-pointer border font-medium transition text-[15px]
              ${
                categoriaSelecionada === item
                  ? "bg-blue-500 text-white border-blue-500"
                  : "bg-white border-blue-400 hover:bg-blue-500 hover:text-white"
              }`}
            onClick={() => filtroCategoria(item)}
          >
            {item === "Todos" ? "Todos" : item.nome}
          </button>
        ))}
      </div>
    </div>
  );
}
