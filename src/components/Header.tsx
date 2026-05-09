"use client";

import { ChevronDown, MapPin, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import FiltroBuscar from "./FiltroBuscar";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Header() {
  const [modal, setModal] = useState(false);
  const [categorias, setCategorias] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const categoriaData = async () => {
      try {
        const response = await axios.get(
          "https://fakestoreapi.com/products/categories",
        );
        setCategorias(response.data);
      } catch (error) {
        console.error("error no response", error);
      }
    };
    categoriaData();
  }, []);
  console.log(categorias);

  return (
    <div className="sticky top-0 z-50 bg-blue-500 flex justify-around w-full px-10 py-4 items-center shadow-md">
      <div>
        <Link href="/home">
          <h1 className="text-white text-[30px] font-semibold cursor-pointer hover:text-gray-300 transition">
            Intelifones
          </h1>
        </Link>
        <p className="flex gap-2 font">
          <MapPin size={20} className="text-white" /> localizacao
        </p>
      </div>
      <div className="flex-1 mx-12 ">
        <FiltroBuscar />
        <div className="mt-2 flex gap-7 items-center">
          <div className="relative border-r border-gray-300 pr-5">
            <span
              className="text-[16px] cursor-pointer hover:text-white transition flex gap-1"
              onClick={() => setModal(!modal)}
            >
              Categorias <ChevronDown />
            </span>
            {modal && (
              <div className="absolute top-full left-0 mt-1 w-[200px] bg-white rounded-sm shadow-lg p-2 z-50 flex flex-col gap-2">
                {categorias.map((item, index) => (
                  <button
                    key={index}
                    className="cursor-pointer text-left hover:bg-gray-100 p-2 rounded"
                    onClick={() => {
                      router.push(`/produtos?categoria=${item}`);
                      setModal(false);
                    }}
                  >
                    {item}
                  </button>
                ))}
              </div>
            )}
          </div>
          <span className="text-[16px] cursor-pointer hover:text-white transition">
            Ofertas
          </span>
          <span className="text-[16px] cursor-pointer hover:text-white transition">
            Cupons
          </span>
          <span className="text-[16px] cursor-pointer hover:text-white transition">
            Vender
          </span>
          <span className="text-[16px] cursor-pointer hover:text-white transition">
            Contato
          </span>
          <Link href="/produtos">
            <span className="text-[16px] cursor-pointer hover:text-white transition">
              Produtos
            </span>
          </Link>
        </div>
      </div>
      <div className="flex gap-3 items-center">
        <Link href="/">
          <button className="bg-white p-2 px-5 rounded-xl text-blue-500 hover:bg-gray-300 transition cursor-pointer">
            Entrar
          </button>
        </Link>
        <Link href="/Perfil">
          <button className="bg-white p-2 px-5 rounded-xl text-blue-500 hover:bg-gray-300 transition cursor-pointer">
            Criar conta
          </button>
        </Link>
        <button className="bg-white p-2 px-5 rounded-xl text-blue-500 hover:bg-gray-300 transition cursor-pointer">
          Compras
        </button>
        <Link href="/Perfil?aba=Carrinho">
          <ShoppingCart className="text-white cursor-pointer hover:text-gray-300 transition" />
        </Link>
      </div>
    </div>
  );
}
