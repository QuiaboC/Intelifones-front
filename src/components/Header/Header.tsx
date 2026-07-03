"use client";

import { ChevronDown, MapPin, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import FiltroBuscar from "./FiltroBuscar";
import { useRouter } from "next/navigation";
import api from "@/services/api";

export default function Header() {
  const [modal, setModal] = useState(false);
  const [categorias, setCategorias] = useState([]);
  const [endereco, setEndereco] = useState([]);
  const router = useRouter();
  const [logado, setLogado] = useState(false);
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const categoriaData = async () => {
      try {
        const response = await api.get("/categorias");
        setCategorias(response.data);
      } catch (error) {
        console.error("error no response", error);
      }
    };

    const verificarLogin = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLogado(false);
        setUsuario(null);
        return;
      }
      try {
        const response = await api.get("/usuarios/me");
        setUsuario(response.data);
        setLogado(true);
      } catch (error) {
        console.error("Sessão inválida ou expirada", error);
        localStorage.removeItem("token");
        setLogado(false);
        setUsuario(null);
      }
    };

    const Endereco = async () => {
      try {
        const res = await api.get("/usuarios/enderecos");
        setEndereco(res.data);
      } catch (error) {
        console.error("Erro ao buscar endereço", error);
      }
    };
    Endereco();
    categoriaData();
    verificarLogin();
  }, []);
  console.log("Endereços:", endereco);

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
        <p
          className="flex gap-1 items-center text-blue-100 text-[12px] cursor-pointer"
          onClick={() => router.push("/Perfil?aba=Localizacao")}
        >
          <MapPin size={12} />
          {endereco.length > 0
            ? `${(endereco.find((e) => e.principal) || endereco[0]).cidade}, ${(endereco.find((e) => e.principal) || endereco[0]).bairro}`
            : "Localização não definida"}
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
          <Link href="/Perfil?aba=Compras">
            <span className="text-[15px] text-blue-100 cursor-pointer hover:text-white transition">
              Compras
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
            <div className="flex gap-2 items-center cursor-pointer" onClick={() => router.push("/Perfil")}>
              <img
                src={
                  usuario?.imagem
                    ? `http://localhost:8080/uploads/usuarios/${usuario.imagem}`
                    : "/vetorHome.png"
                }
                alt="Imagem do usuário"
                className="w-10 h-10 rounded-full"
              />
              <h1 className="text-white truncate max-w-[120px]">
                {usuario?.nome}
              </h1>
            </div>

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
