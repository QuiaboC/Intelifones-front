"use client";

import api from "@/services/api";
import { ChevronLeft, ChevronRight, Pencil } from "lucide-react";
import { useEffect, useState } from "react";

export default function Detalhes({ setPaginaAtiva, id }) {
  const [detalhe, setDetalhe] = useState([]);

  useEffect(() => {
    api
      .get("/pedidos/vendas")
      .then((response) => {
        const listaDeVendas = response.data;
        const vendaEncontrada = listaDeVendas.find(
          (venda) => venda.id === Number(id),
        );

        setDetalhe(vendaEncontrada || null);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  return (
    <div className="flex flex-col flex-1 bg-gray-100 py-10 px-6 md:px-12 gap-5 min-h-screen">
      <div className="flex flex-row gap-2 items-center text-sm">
        <span
          className="cursor-pointer text-gray-500 hover:text-blue-500 font-medium transition"
          onClick={() => setPaginaAtiva("Vendas")}
        >
          Vendas
        </span>
        <ChevronRight className="w-4 h-4 text-gray-400" />
        <span className="text-blue-500 font-medium">Detalhes</span>
      </div>

      <div className="flex flex-col gap-1">
        <h1 className="font-bold text-2xl text-slate-800">
          Detalhes da Compra
        </h1>
      </div>

      <div className="w-full flex flex-col bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden max-w-5xl">
        <div className="p-5 border-b border-gray-100 bg-slate-50 flex items-center gap-2">
          <Pencil className="text-blue-500 w-5 h-5" />
          <span className="font-semibold text-base text-slate-700">
            Informações Gerais do Pedido
          </span>
        </div>

        {detalhe ? (
          <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col gap-3 p-4 bg-blue-50/50 rounded-lg border border-blue-100">
              <span className="text-sm font-bold uppercase tracking-wider text-blue-600">
                Detalhes do Comprador
              </span>
              <div className="space-y-1.5 text-sm text-slate-600">
                <p>
                  <strong className="text-slate-800">Nome:</strong>{" "}
                  {detalhe.pedido?.comprador?.nome || "Não informado"}
                </p>
                <p>
                  <strong className="text-slate-800">Email:</strong>{" "}
                  {detalhe.pedido?.comprador?.email || "Não informado"}
                </p>
                <p>
                  <strong className="text-slate-800">Telefone:</strong>{" "}
                  {detalhe.pedido?.comprador?.telefone || "Não informado"}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <span className="text-sm font-bold uppercase tracking-wider text-slate-700">
                Endereço de Entrega
              </span>
              <div className="space-y-1.5 text-sm text-slate-600">
                <p>
                  <strong className="text-slate-800">Rua/Av:</strong>{" "}
                  {detalhe.pedido?.endereco}
                </p>
                <p>
                  <strong className="text-slate-800">Número:</strong>{" "}
                  {detalhe.pedido?.numero}
                </p>
                <p>
                  <strong className="text-slate-800">CEP:</strong>{" "}
                  {detalhe.pedido?.cep}
                </p>
                <p>
                  <strong className="text-slate-800">Contato:</strong>{" "}
                  {detalhe.pedido?.telefoneContato || "-"}
                </p>
                <p>
                  <strong className="text-slate-800">Complemento:</strong>{" "}
                  {detalhe.pedido?.complemento || "-"}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <span className="text-sm font-bold uppercase tracking-wider text-slate-700">
                Pagamento
              </span>
              <div className="space-y-1.5 text-sm text-slate-600">
                <p>
                  <strong className="text-slate-800">Valor Unitário:</strong> R${" "}
                  {detalhe.produto?.preco}
                </p>
                <p>
                  <strong className="text-slate-800">Quantidade:</strong>{" "}
                  {detalhe.quantidade}x
                </p>
                <p>
                  <strong className="text-slate-800">Forma:</strong>{" "}
                  {detalhe.pedido?.formaPagamento}
                </p>
                <p>
                  <strong className="text-slate-800">Status: </strong>
                  <span
                    className={`px-2 py-0.5 rounded text-xs font-semibold ${
                      detalhe.pedido?.status === "PAGO"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {detalhe.pedido?.status}
                  </span>
                </p>
                <div className="pt-2 border-t border-gray-200 mt-2">
                  <p className="text-base font-bold text-slate-900">
                    Total: R$ {detalhe.pedido?.valorTotal}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-10 text-center text-gray-500">
            Carregando informações do pedido...
          </div>
        )}
        <div className="flex justify-end p-4 border-t border-gray-200 bg-slate-50">
          <button
            onClick={() => setPaginaAtiva("Vendas")}
            className="flex items-center gap-2 px-5 py-2 rounded-lg bg-gray-200 text-gray-500 font-medium hover:bg-gray-500  hover:text-white transition cursor-pointer"
          >
            Voltar para Vendas
          </button>
        </div>
      </div>
    </div>
  );
}
