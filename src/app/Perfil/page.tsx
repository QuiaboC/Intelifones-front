"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
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

export default function Perfil() {
  const [paginaAtiva, setPaginaAtiva] = useState("Perfil");
  const aba = useSearchParams().get("aba");
  const [ProdutoId, setProdutoId] = useState(null)

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
              onClick={() => setPaginaAtiva("Perfil")}
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
        {paginaAtiva === "Vendas" && <Vendas setPaginaAtiva={setPaginaAtiva} setProdutoId={setProdutoId}/>}
        {paginaAtiva === "Informacao" && (
          <Informacao setPaginaAtiva={setPaginaAtiva} />
        )}
        {paginaAtiva === "Cadastro" && (
          <Cadastro setPaginaAtiva={setPaginaAtiva} />
        )}
        {paginaAtiva === "Editar" && (<Editar setPaginaAtiva={setPaginaAtiva} id={ProdutoId}/>)}
        {paginaAtiva === "Perfil" && (
          <div className="flex flex-col flex-1 bg-gray-100 items-center py-10 px-30 flex-wrap">
            <div className="w-full p-5 flex flex-row items-center">
              <img
                src="vetor.png"
                className="w-20 h-20 rounded-full bg-amber-100 object-cover"
              />
              <div className="flex flex-col gap-2 ml-5">
                <h1 className="font-bold text-[22px]">Cleiton Souza Paixao</h1>
                <p className="text-gray-500 text-[15px]">email@example.com</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-5 w-full mt-5">
              <div
                className="w-[350px] bg-white p-6 rounded-sm hover:bg-gray-100 hover:shadow-md transition cursor-pointer flex flex-col gap-2"
                onClick={(e) => setPaginaAtiva("Informacao")}
              >
                <UserRoundPen className="w-6 h-6 text-blue-500" />
                <h1 className="font-semibold text-[15px]">
                  Informações da Conta
                </h1>
                <p className="text-gray-500 text-sm">
                  Dados pessoais e da conta
                </p>
              </div>

              <div className="w-[350px] bg-white p-6 rounded-sm hover:bg-gray-100 hover:shadow-md transition cursor-pointer flex flex-col gap-2">
                <Shield className="w-6 h-6 text-blue-500" />
                <h1 className="font-semibold text-[15px]">Segurança</h1>
                <p className="text-gray-500 text-sm">
                  Você configurou a segurança da sua conta
                </p>
              </div>

              <div className="w-[350px] bg-white p-6 rounded-sm hover:bg-gray-100 hover:shadow-md transition cursor-pointer flex flex-col gap-2">
                <MapPin className="w-6 h-6 text-blue-500" />
                <h1 className="font-semibold text-[15px]">Localização</h1>
                <p className="text-gray-500 text-sm">
                  Gerencie onde você pode ser encontrado
                </p>
              </div>
              <div className="w-[350px] bg-white p-6 rounded-sm hover:bg-gray-100 hover:shadow-md transition cursor-pointer flex flex-col gap-2">
                <LockKeyhole className="w-6 h-6 text-blue-500" />
                <h1 className="font-semibold text-[15px]">Privacidade</h1>
                <p className="text-gray-500 text-sm">
                  Gerencie suas preferências de privacidade
                </p>
              </div>
              <div className="w-[350px] bg-white p-6 rounded-sm hover:bg-gray-100 hover:shadow-md transition cursor-pointer flex flex-col gap-2">
                <CreditCard className="w-6 h-6 text-blue-500" />
                <h1 className="font-semibold text-[15px]">Cartões</h1>
                <p className="text-gray-500 text-sm">
                  Gerencie seus cartões de pagamento
                </p>
              </div>
              <div className="w-[350px] bg-white p-6 rounded-sm hover:bg-gray-100 hover:shadow-md transition cursor-pointer flex flex-col gap-2">
                <MessageSquare className="w-6 h-6 text-blue-500" />
                <h1 className="font-semibold text-[15px]">Comunicação</h1>
                <p className="text-gray-500 text-sm">
                  Gerencie suas preferências de comunicação
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
