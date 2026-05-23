"use client";

import Footer from "@/components/Header/Footer";
import Header from "@/components/Header/Header";
import Compras from "@/components/PerfilModal/Compras";
import Vendas from "@/components/PerfilModal/Vendas";
import Carrinho from "@/components/PerfilModal/Carrinho";
import Informacao from "@/components/PerfilModal/Informacao";
import {
  Info,
  List,
  LogOut,
  ShoppingCart,
  Handbag,
  UserRoundPen,
  Tag,
  Shield,
  MapPin,
  LockKeyhole,
  CreditCard,
  MessageSquare,
  Store,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Cadastro from "@/components/PerfilModal/Cadastro";
import Editar from "@/components/PerfilModal/Editar";
import PerfilUsuario from "@/components/PerfilModal/PerfilUsuario";

export default function Perfil() {
  const [paginaAtiva, setPaginaAtiva] = useState("PerfilUsuario");
  const aba = useSearchParams().get("aba");
  const [ProdutoId, setProdutoId] = useState(null);

  useEffect(() => {
    if (aba) {
      setPaginaAtiva(aba);
    }
  }, [aba]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="bg-gray-200 min-h-screen flex flex-row ">
        <div className="w-[250px] h-auto flex gap-5 flex-col bg-white items-center py-20">
          <span className="flex gap-2 items-center font-bold text-[17px] mb-8 w-full py-3 px-4">
            <List className="w-5 h-5" />
            Minha conta
          </span>
          <div className="flex flex-col gap-1 w-full">
            <span
              className={`flex gap-2 items-center py-3 px-4 cursor-pointer w-full border-l-4 transition text-[15px]
        ${paginaAtiva === "Perfil" ? "border-blue-500 text-blue-500 bg-blue-50" : "border-transparent text-gray-500 hover:border-blue-300 hover:bg-gray-50"}`}
              onClick={() => setPaginaAtiva("PerfilUsuario")}
            >
              <UserRoundPen className="w-4 h-4" />
              Perfil
            </span>
            <span
              className={`flex gap-2 items-center py-3 px-4 cursor-pointer w-full border-l-4 transition text-[15px]
        ${paginaAtiva === "Compras" ? "border-blue-500 text-blue-500 bg-blue-50" : "border-transparent text-gray-500 hover:border-blue-300 hover:bg-gray-50"}`}
              onClick={() => setPaginaAtiva("Compras")}
            >
              <Handbag className="w-4 h-4" />
              Compras
            </span>
            <span
              className={`flex gap-2 items-center py-3 px-4 cursor-pointer w-full border-l-4 transition text-[15px]
        ${paginaAtiva === "Carrinho" ? "border-blue-500 text-blue-500 bg-blue-50" : "border-transparent text-gray-500 hover:border-blue-300 hover:bg-gray-50"}`}
              onClick={() => setPaginaAtiva("Carrinho")}
            >
              <ShoppingCart className="w-4 h-4" />
              Carrinho
            </span>
            <span
              className={`flex gap-2 items-center py-3 px-4 cursor-pointer w-full border-l-4 transition text-[15px]
        ${paginaAtiva === "Vendas" ? "border-blue-500 text-blue-500 bg-blue-50" : "border-transparent text-gray-500 hover:border-blue-300 hover:bg-gray-50"}`}
              onClick={() => setPaginaAtiva("Vendas")}
            >
              <Store className="w-4 h-4" />
              Vendas
            </span>
            <span
              className={`flex gap-2 items-center py-3 px-4 cursor-pointer w-full border-l-4 transition text-[15px]
        ${paginaAtiva === "Informacao" ? "border-blue-500 text-blue-500 bg-blue-50" : "border-transparent text-gray-500 hover:border-blue-300 hover:bg-gray-50"}`}
              onClick={() => setPaginaAtiva("Informacao")}
            >
              <Info className="w-4 h-4" />
              Informações
            </span>
            <span className="flex gap-2 items-center py-3 px-4 cursor-pointer w-full border-l-4 border-transparent text-gray-500 hover:border-red-300 hover:text-red-500 hover:bg-red-50 transition text-[15px]">
              <LogOut className="w-4 h-4" />
              Sair
            </span>
          </div>
        </div>
        {paginaAtiva === "Carrinho" && <Carrinho />}
        {paginaAtiva === "Compras" && <Compras />}
        {paginaAtiva === "Vendas" && (
          <Vendas setPaginaAtiva={setPaginaAtiva} setProdutoId={setProdutoId} />
        )}
        {paginaAtiva === "Informacao" && (
          <Informacao setPaginaAtiva={setPaginaAtiva} />
        )}
        {paginaAtiva === "Cadastro" && (
          <Cadastro setPaginaAtiva={setPaginaAtiva} />
        )}
        {paginaAtiva === "Editar" && (
          <Editar setPaginaAtiva={setPaginaAtiva} id={ProdutoId} />
        )}
        {paginaAtiva === "PerfilUsuario" && (<PerfilUsuario setPaginaAtiva={setPaginaAtiva}/>)}
      </div>
      <Footer />
    </div>
  );
}