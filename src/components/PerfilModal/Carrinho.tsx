"use client";

import api from "@/services/api";
import { ShoppingBag, Trash } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Carrinho({ setPaginaAtiva, setDadosCheckout }) {
  const [carrinho, setCarrinho] = useState([]);
  const router = useRouter();
  useEffect(() => {
    api
      .get("/carrinho")
      .then((response) => setCarrinho(response.data))
      .catch((error) => console.log(error));
  }, []);

  const qTotal = carrinho.length;
  const total = carrinho.reduce((acc, item) => {
    return acc + item.quantidade * item.produto.preco;
  }, 0);

  const irParaCheckout = () => {
    setDadosCheckout({ total, qTotal });
    setPaginaAtiva("Checkout");
  };

  const atualizarQuantidade = async (itemId, novaQuantidade) => {
    if (novaQuantidade < 1) return;
    try {
      await api.put(`/carrinho/item/${itemId}`, null, {
        params: { quantidade: novaQuantidade },
      });
      setCarrinho((prev) =>
        prev.map((item) =>
          item.id === itemId ? { ...item, quantidade: novaQuantidade } : item,
        ),
      );
    } catch (error) {
      console.log(error?.response?.data);
    }
  };

  const removerItem = async (itemId) => {
    try {
      await api.delete(`/carrinho/item/${itemId}`);
      setCarrinho((prev) => prev.filter((item) => item.id !== itemId));
    } catch (error) {
      console.log(error?.response?.data);
    }
  };

  return (
    <div className="flex flex-col flex-1 bg-gray-100 py-20 px-30 flex-wrap gap-5">
      <div className="w-full max-w-[1200px] flex flex-col lg:flex-row gap-6 items-start">
        {qTotal == 0 ? (
          <div className="bg-white flex-1 rounded-sm shadow-sm p-8 flex gap-5 items-start">
            <div className="bg-blue-100 p-4 rounded-full">
              <ShoppingBag className="w-8 h-8 text-blue-500" />
            </div>

            <div className="flex flex-col gap-3">
              <h1 className="text-xl font-bold">Seu carrinho</h1>
              <p className="text-gray-500 text-[15px] max-w-[500px]">
                Você ainda não adicionou nenhum produto ao carrinho.
              </p>
              <Link
                href="/produtos"
                className="text-blue-500 font-medium hover:underline text-[15px]"
              >
                Voltar para produtos
              </Link>
            </div>
          </div>
        ) : (
          <div className="bg-white flex-1 rounded-sm shadow-sm flex flex-col w-full overflow-hidden">
            <div className="pt-8 pb-5 pl-5 border-b border-gray-200 flex flex-row items-center gap-2">
              <ShoppingBag className="w-8 h-7 text-blue-500" />

              <h1 className="text-xl font-bold text-gray-900">Seu carrinho</h1>
            </div>

            <div className="flex flex-col w-full">
              {carrinho.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col lg:flex-row justify-between gap-5 items-start lg:items-center p-5 border-b border-gray-200 hover:bg-gray-50 transition overflow-hidden w-full last:border-none"
                >
                  <div className="flex gap-5 items-center w-full lg:w-auto">
                    <Link
                      href={`/Detalhes/${item.produto.id}`}
                      className="hover:opacity-80 transition shrink-0 cursor-pointer"
                    >
                      <img
                        src={`http://localhost:8080/uploads/produtos/${item.produto.imagem}`}
                        alt={item.produto.nome}
                        className="w-20 h-20 rounded-xl bg-amber-100 object-cover"
                      />
                    </Link>

                    <div className="flex gap-1 flex-col">
                      <Link
                        href={`/produtos/${item.produto.id}`}
                        className="cursor-pointer"
                      >
                        <h1 className="text-[15px] font-bold text-gray-800 hover:text-blue-500 transition">
                          {item.produto.nome}
                        </h1>
                      </Link>
                      <p className="text-[13px] font-medium text-gray-800">
                        {item.produto.descricao}
                      </p>

                      <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden w-max bg-gray-50">
                        <button
                          className="px-3 py-1 bg-white hover:bg-gray-100 text-gray-600 font-semibold border-r border-gray-200 active:bg-gray-200 transition cursor-pointer"
                          onClick={() =>
                            atualizarQuantidade(item.id, item.quantidade - 1)
                          }
                        >
                          -
                        </button>
                        <span className="px-3 text-sm font-medium text-gray-700 min-w-[24px] text-center">
                          {item.quantidade}
                        </span>
                        <button
                          className="px-3 py-1 bg-white hover:bg-gray-100 text-gray-600 font-semibold border-l border-gray-200 active:bg-gray-200 transition cursor-pointer"
                          onClick={() =>
                            atualizarQuantidade(item.id, item.quantidade + 1)
                          }
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between lg:justify-end gap-6 w-full lg:w-auto border-t lg:border-t-0 border-gray-100 pt-3 lg:pt-0">
                    <p className="text-[18px] font-bold text-blue-400">
                      R$ {item.produto.preco * item.quantidade}
                    </p>

                    <button
                      className="bg-red-400 p-2 rounded-lg hover:bg-red-500 transition cursor-pointer active:scale-95"
                      onClick={() => removerItem(item.id)}
                    >
                      <Trash color="#ffff" size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="bg-white w-full lg:w-[320px] min-h-[220px] rounded-sm shadow-sm p-5 flex flex-col gap-5">
          <div className="border-b border-gray-200 pb-3">
            <h1 className="font-semibold text-lg">Resumo da compra</h1>
          </div>
          <span className="text-gray-500 text-[15px]">
            Aqui você pode ver o resumo da sua compra.
          </span>
          <div className="flex flex-col gap-2 text-[15px]">
            <div className="flex justify-between">
              <span>Produtos</span>
              <span>{qTotal}</span>
            </div>
            <div className="flex justify-between">
              <span>Total</span>
              <span className="font-semibold">R$ {total}</span>
            </div>
          </div>
          {qTotal > 0 && (
            <div className="flex w-full">
              <button
                className="flex w-full justify-center bg-blue-400 p-4 rounded-sm text-white font-bold cursor-pointer hover:bg-blue-500 transition active:scale-[0.98]"
                onClick={irParaCheckout}
              >
                Continuar ({qTotal})
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
