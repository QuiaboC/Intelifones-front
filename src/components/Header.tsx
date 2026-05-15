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
    <div className="sticky top-0 z-50 bg-blue-500 flex justify-between w-full px-10 py-4 items-center gap-8">
      <div className="flex flex-col">
        <Link href="/home">
          <h1 className="text-white text-[26px] font-bold cursor-pointer hover:text-blue-100 transition">
            Intelifones
          </h1>
        </Link>
        <p className="flex gap-1 items-center text-blue-100 text-[12px]">
          <MapPin size={12} />
          Localização
        </p>
      </div>

      <div className="flex-1 mx-12 ">
        <FiltroBuscar />
        <div className="mt-2 flex gap-6 items-center">
          <div className="relative">
            <span
              className="text-[15px] text-blue-100 cursor-pointer hover:text-white transition flex gap-1 items-center"
              onClick={() => setModal(!modal)}
            >
              Categorias <ChevronDown className="w-4 h-4" />
            </span>
            {modal && (
              <div className="absolute top-full left-0 mt-2 w-[200px] bg-white rounded-sm shadow-lg p-2 z-50 flex flex-col gap-1">
                {categorias.map((item, index) => (
                  <button
                    key={index}
                    className="cursor-pointer text-left text-[15px] text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md transition"
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
          <span className="text-[15px] text-blue-100 cursor-pointer hover:text-white transition">
            Ofertas
          </span>
          <span className="text-[15px] text-blue-100 cursor-pointer hover:text-white transition">
            Cupons
          </span>
          <span className="text-[15px] text-blue-100 cursor-pointer hover:text-white transition">
            Vender
          </span>
          <span className="text-[15px] text-blue-100 cursor-pointer hover:text-white transition">
            Contato
          </span>
          <Link href="/produtos">
            <span className="text-[15px] text-blue-100 cursor-pointer hover:text-white transition">
              Produtos
            </span>
          </Link>
        </div>
      </div>
      <div className="flex gap-3 items-center">
        <Link href="/">
          <button className="text-[13px] bg-white px-4 py-2 rounded-lg text-blue-500 font-medium hover:bg-blue-50 transition cursor-pointer">
            Entrar
          </button>
        </Link>
        <Link href="/Perfil">
          <button className="text-[13px] bg-white px-4 py-2 rounded-lg text-blue-500 font-medium hover:bg-blue-50 transition cursor-pointer">
            Criar conta
          </button>
        </Link>
        <button className="text-[13px] bg-white px-4 py-2 rounded-lg text-blue-500 font-medium hover:bg-blue-50 transition cursor-pointer">
          Compras
        </button>
        <Link href="/Perfil?aba=Carrinho">
          <ShoppingCart className="text-white cursor-pointer hover:text-gray-300 transition" />
        </Link>
      </div>
    </div>
  );
}
