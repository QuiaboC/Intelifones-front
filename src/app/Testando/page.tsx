"use client";

import { ChevronDown, MapPin, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Testando() {
  const [modal, setModal] = useState(false);

  return (
    <div className="sticky top-0 z-50 bg-white flex justify-around px-10 py-4 items-center shadow-md border-b border-gray-100">
      <div>
        <Link href="/home">
          <h1 className="text-blue-400 text-[30px] font-semibold cursor-pointer">
            Intelifones
          </h1>
        </Link>
        <p className="flex gap-2 font">
          <MapPin size={20} className="text-blue-400" /> localizacao
        </p>
      </div>
      <div className="flex-1 mx-12 ">
        <input
          type="text"
          placeholder="Digite aqui"
          className="border w-full rounded-xl border-blue-400 p-2 outline-none focus:border-blue-500 transition"
        />
        <div className="mt-2 flex gap-7 items-center">
          <div className="relative border-r border-gray-300 pr-5">
            <span
              className="text-[16px] cursor-pointer hover:text-blue-400 transition flex gap-1"
              onClick={() => setModal(!modal)}
            >
              Categorias <ChevronDown />
            </span>
            {modal && (
              <div className="absolute top-full left-0 mt-1 w-[200px] bg-white rounded-sm shadow-lg p-2 z-50">
                <button className="cursor-pointer">Subcategoria 1</button>
              </div>
            )}
          </div>
          <span className="text-[16px] cursor-pointer hover:text-blue-400 transition">
            Ofertas
          </span>
          <span className="text-[16px] cursor-pointer hover:text-blue-400 transition">
            Cupons
          </span>
          <span className="text-[16px] cursor-pointer hover:text-blue-400 transition">
            Vender
          </span>
          <span className="text-[16px] cursor-pointer hover:text-blue-400 transition">
            Contato
          </span>
          <Link href="/produtos">
            <span className="text-[16px] cursor-pointer hover:text-blue-400 transition">
              Produtos
            </span>
          </Link>
        </div>
      </div>
      <div className="flex gap-3 items-center">
        <Link href="/">
          <button className="bg-blue-500 p-2 px-5 rounded-xl text-white hover:bg-blue-600 transition cursor-pointer">
            Entrar
          </button>
        </Link>
        <Link href="/comprador">
          <button className="bg-gray-200 p-2 px-5 rounded-xl text-gray-700 hover:bg-gray-300 transition cursor-pointer">
            Criar conta
          </button>
        </Link>
        <button className="bg-gray-200 p-2 px-5 rounded-xl text-gray-700 hover:bg-gray-300 transition cursor-pointer">
          Compras
        </button>
        <ShoppingCart className="text-gray-700 cursor-pointer" />
      </div>
    </div>
  );
}
