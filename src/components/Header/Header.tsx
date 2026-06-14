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
  const [logado, setLogado] = useState(false);
  const [nome, setNome] = useState("")


  useEffect(() => {
    const categoriaData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/categorias",
        );
        setCategorias(response.data);
      } catch (error) {
        console.error("error no response", error);
      }
    };
    const token = localStorage.getItem("token");
    setNome(localStorage.getItem("nome") || "");
    setLogado(!!token);
    categoriaData();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

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
                {categorias.map((item) => (
                  <button
                    key={item.id}
                    className="cursor-pointer text-left text-[15px] text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md transition"
                    onClick={() => {
                      router.push(`/produtos?categoria=${item.id}`);
                      setModal(false);
                    }}
                  >
                    {item.nome}
                  </button>
                ))}
              </div>
            )}
          </div>
          <Link href="/produtos">
            <span className="text-[15px] text-blue-100 cursor-pointer hover:text-white transition">
              Ofertas
            </span>
          </Link>
          <Link href="/produtos">
            <span className="text-[15px] text-blue-100 cursor-pointer hover:text-white transition">
              Cupons
            </span>
          </Link>

          <Link href="/vendedor">
            <span className="text-[15px] text-blue-100 cursor-pointer hover:text-white transition">
              Vender
            </span>
          </Link>
          <a href="#contato">
            <span className="text-[15px] text-blue-100 cursor-pointer hover:text-white transition">
              Contato
            </span>
          </a>
          <Link href="/produtos">
            <span className="text-[15px] text-blue-100 cursor-pointer hover:text-white transition">
              Produtos
            </span>
          </Link>
        </div>
      </div>
      <div className="flex gap-3 items-center">
        {logado ? (
          <>
          <h1 className="text-white">olá, {nome}</h1>
            <Link href="/Perfil">
              <button className="text-[13px] bg-white px-4 py-2 rounded-lg text-blue-500 font-medium hover:bg-gray-300 transition cursor-pointer">
                Meu Perfil
              </button>
            </Link>

            <button
              onClick={logout}
              className="text-[13px] bg-red-500 px-4 py-2 rounded-lg text-white font-medium cursor-pointer hover:bg-red-600 transition cursor-pointer"
            >
              Sair
            </button>
            <Link href="/Perfil?aba=Carrinho">
              <ShoppingCart className="text-white cursor-pointer hover:text-gray-300 transition" />
            </Link>
          </>
        ) : (
          <>
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
          </>
        )}
      </div>
    </div>
  );
}
