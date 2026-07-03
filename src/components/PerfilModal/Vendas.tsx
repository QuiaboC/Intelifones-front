"use client";

import api from "@/services/api";
import { SquarePen, Store } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Vendas({ setPaginaAtiva, setPedidoId }) {
  const [buscar, setBuscar] = useState("");
  const [vendas, setVendas] = useState([]);

  useEffect(() => {
    api
      .get("/pedidos/vendas")
      .then((response) => setVendas(response.data))
      .catch((error) => console.log(error));
  }, []);


  const filtrosFiltrados = buscar
    ? vendas.filter((filtro) =>
        filtro.produto?.nome?.toLowerCase().includes(buscar.toLowerCase()),
      )
    : vendas;

  return (
    <div className="flex flex-col flex-1 bg-gray-100 py-20 px-30 flex-wrap gap-5">
      <h1 className="text-[22px] font-bold flex items-center gap-2 text-blue-400">
        <Store />
        Vendas
      </h1>
      <div className="flex flex-row w-full items-center justify-between gap-5 flex-wrap">
        <div className="flex items-center w-full max-w-md">
          <input
            type="text"
            placeholder="Buscar produtos Vendidos"
            value={buscar}
            onChange={(e) => setBuscar(e.target.value)}
            className="px-5 py-2 rounded-lg text-sm border bg-white border-gray-200 w-full outline-none focus:border-blue-500 h-10 shadow-sm"
          />
        </div>

        <div className="flex items-center text-gray-600 ">
          <span className="font-medium text-slate-700">
            {filtrosFiltrados.length} produtos vendidos
          </span>
        </div>
      </div>

      <div className="w-full flex flex-col bg-white rounded-lg overflow-hidden border border-gray-200 shadow-sm">
        <div className="p-5 border-b border-gray-100 bg-slate-50 shadow-sm">
          <span className="font-semibold text-gray-700">Últimas vendas</span>
        </div>

        <div className="flex flex-col w-full overflow-hidden">
          {filtrosFiltrados.map((item) => (
            <div
              key={item.id}
              className="flex flex-col lg:flex-row justify-between gap-5 items-start lg:items-center p-5 border-b border-gray-200 hover:bg-gray-50 transition overflow-hidden"
            >
              <div className="flex gap-5 items-center min-w-0 flex-1">
                <Link
                  href={`/Detalhes/${item.produto.id}`}
                  className="hover:opacity-80 transition shrink-0 cursor-pointer"
                >
                  <img
                    src={`http://localhost:8080/uploads/produtos/${item.produto.imagem}`}
                    className="w-20 h-20 rounded-xl bg-amber-100 object-cover shrink-0"
                  />
                </Link>

                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/Detalhes/${item.produto.id}`}
                      className="hover:opacity-80 transition shrink-0 cursor-pointer"
                    >
                      <span className="font-semibold text-[16px] truncate">
                        {item.produto.nome}
                      </span>
                    </Link>

                    <span
                      className={`text-xs px-2 py-1 rounded-full shrink-0 ${
                        item.produto.usado
                          ? "bg-red-500 text-white"
                          : "bg-emerald-500 text-white"
                      }`}
                    >
                      {item.produto.usado ? "Usado" : "Novo"}
                    </span>
                  </div>
                  <span className="text-blue-500 font-medium">
                    R$ {Number(item.produto.preco).toFixed(2)}
                  </span>
                  <span className="text-gray-500 text-sm truncate max-w-sm">
                    produtos vendidos: {item.quantidade}
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-2 w-full lg:w-[200px] shrink-0">
                <button
                  className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition cursor-pointer flex gap-2 justify-center items-center text-sm"
                  onClick={() => {
                    setPaginaAtiva("Detalhes");
                    setPedidoId(item.id);
                  }}
                >
                  <SquarePen className="w-4" />
                  Ver Detalhes
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
