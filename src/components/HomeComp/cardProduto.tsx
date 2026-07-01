"use client";

import api from "@/services/api";
import { useEffect, useState } from "react";

const IMG_BASE = "http://localhost:8080/uploads/produtos";

export default function CardProduto() {
  const [produto, setProduto] = useState([]);

  useEffect(() => {
    api.get("/produtos")
      .then((response) => setProduto(response.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="w-full flex justify-center bg-white py-10">
      <div className="max-w-[1200px] w-full px-5 flex flex-col gap-5">
        <h1 className="text-[18px] font-medium">Produtos em oferta</h1>
        <div className="flex gap-5 justify-around flex-wrap">
          {produto.slice(0, 5).map((item) => (
            <a
              key={item.id}
              href={`/Detalhes/${item.id}`}
              className="flex flex-col w-48 items-start justify-between cursor-pointer gap-4 group"
            >
              <div className="flex justify-center w-full p-4 bg-gray-100 rounded-lg overflow-hidden h-40">
                <img
                  src={item.imagem ? `${IMG_BASE}/${item.imagem}` : "/vetorProduto.png"}
                  alt={item.nome}
                  className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <label className="text-[16px] truncate w-full font-medium group-hover:text-blue-400 cursor-pointer">
                {item.nome}
              </label>
              <span className="text-blue-500 font-semibold">
                R$ {Number(item.preco).toFixed(2).replace(".", ",")}
              </span>
              <span className="text-sm text-gray-400 w-full line-clamp-2">{item.descricao}</span>
              <span className={`text-xs px-2 py-1 rounded-full shrink-0 ${item.usado ? "bg-red-500 text-white" : "bg-emerald-500 text-white"}`}>
                {item.usado ? "Usado" : "Novo"}
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}