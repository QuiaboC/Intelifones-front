"use client";

import Footer from "@/components/Header/Footer";
import Header from "@/components/Header/Header";
import api from "@/services/api";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ShoppingCart } from "lucide-react";

export default function Testando() {
  const params = useParams();
  const [produto, setProduto] = useState([]);

  useEffect(() => {
    const ProdutoId = async () => {
      try {
        const response = await api.get(`/produtos/${params.id}`);
        setProduto(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    ProdutoId();
  }, []);


  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <div className="flex justify-center items-center bg-gray-100 p-10">
        <div className="bg-white rounded-2xl shadow-lg p-8 flex gap-10 min-h-[700px] w-full max-w-[1400px]">
          <div className="flex justify-center items-center flex-1 bg-gray-100">
            <img
              src={produto.image}
              alt=""
              className="w-[300px] h-[300px] object-contain"
            />
          </div>
          <div className="flex flex-col flex-1 gap-5 justify-around">
            <div className="flex flex-col gap-5">
              <h1 className="font-semibold text-[24px]">{produto.nome}</h1>
              <p className="font-medium text-[20px]">Categoria: Celular</p>
              <p className="text-gray-600">{produto.descricao}</p>
              <p className="text-[32px] font-bold text-blue-500">
                R$ {produto.preco?.toFixed(2)}
              </p>
              <div className="flex gap-1 flex-col ">
                <span className="flex gap-2 items-center">
                  Estado do produto:
                  <span
                    className={`text-xs px-2 py-1 rounded-full shrink-0 ${
                      produto.usado
                        ? "bg-red-500 text-white"
                        : "bg-emerald-500 text-white"
                    }`}
                  >
                    {produto.usado ? "Usado" : "Novo"}
                  </span>
                </span>
                <span className="flex items-center">
                  Quantidade no estoque: {produto.quantidade}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-4 max-w-[250px]">
              <button className="bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 transition cursor-pointer">
                Comprar agora
              </button>
              <button className="flex gap-2 bg-gray-200 text-gray-800 py-3 px-4 rounded-lg justify-center hover:bg-gray-300 transition cursor-pointer">
                Adicionar ao carrinho
                <ShoppingCart />
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
