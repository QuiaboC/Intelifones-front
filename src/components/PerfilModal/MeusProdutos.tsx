"use client";

import api from "@/services/api";
import { Plus, SquarePen, Store, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";

const IMG_BASE = "http://localhost:8080/uploads/produtos";

export default function MeusProdutos({ setPaginaAtiva, setProdutoId }) {
  const [buscar, setBuscar] = useState("");
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    // Usa o endpoint correto: apenas os produtos do vendedor logado
    api.get("/produtos/meus")
      .then((res) => setProdutos(res.data))
      .catch((error) => console.error("Erro ao buscar meus produtos:", error));
  }, []);

  const deletarProduto = async (id) => {
    if (!confirm("Tem certeza que deseja remover este produto?")) return;
    try {
      await api.delete(`/produtos/${id}`);
      setProdutos((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Erro ao deletar produto:", error);
    }
  };

  const filtrados = buscar
    ? produtos.filter((p) => p.nome.toLowerCase().includes(buscar.toLowerCase()))
    : produtos;

  return (
    <div className="flex flex-col flex-1 bg-gray-100 py-20 px-10 gap-5">
      <h1 className="text-[22px] font-bold flex items-center gap-2 text-blue-400">
        <Store />Meus Produtos
      </h1>
      <div className="flex flex-wrap gap-5 w-full items-center justify-between">
        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Buscar nos meus produtos"
            value={buscar}
            onChange={(e) => setBuscar(e.target.value)}
            className="px-5 py-2 rounded-lg text-sm border bg-white border-gray-200 w-full max-w-md outline-none focus:border-blue-500 h-10"
          />
          <button
            className="flex gap-1 px-5 rounded-md bg-emerald-500 text-white font-medium hover:bg-emerald-600 transition cursor-pointer text-sm items-center h-10"
            onClick={() => setPaginaAtiva("Cadastro")}
          >
            <Plus className="w-4" />Cadastrar
          </button>
        </div>
        <span className="font-medium text-slate-900">{filtrados.length} produtos</span>
      </div>

      <div className="w-full flex flex-col bg-white rounded-sm overflow-hidden shadow-sm">
        <div className="p-5 border-b border-gray-200">
          <span className="font-medium text-gray-700">Seus anúncios</span>
        </div>
        <div className="flex flex-col w-full">
          {filtrados.length === 0 ? (
            <div className="p-10 text-center text-gray-400 text-sm">
              {buscar ? `Nenhum produto encontrado para "${buscar}"` : "Você ainda não cadastrou nenhum produto."}
            </div>
          ) : filtrados.map((item) => (
            <div key={item.id} className="flex flex-col lg:flex-row justify-between gap-5 items-start lg:items-center p-5 border-b border-gray-200 hover:bg-gray-50 transition last:border-none">
              <div className="flex gap-5 items-center min-w-0 flex-1">
                <img
                  src={item.imagem ? `${IMG_BASE}/${item.imagem}` : "/vetorProduto.png"}
                  className="w-20 h-20 rounded-xl bg-gray-100 object-contain shrink-0"
                />
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-[16px] truncate">{item.nome}</span>
                    <span className={`text-xs px-2 py-1 rounded-full shrink-0 ${item.usado ? "bg-red-500 text-white" : "bg-emerald-500 text-white"}`}>
                      {item.usado ? "Usado" : "Novo"}
                    </span>
                  </div>
                  <span className="text-blue-500 font-medium">R$ {Number(item.preco).toFixed(2)}</span>
                  <span className="text-gray-500 text-sm">Em estoque: {item.quantidade}</span>
                </div>
              </div>
              <div className="flex gap-2 shrink-0">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition cursor-pointer flex gap-2 items-center text-sm"
                  onClick={() => { setPaginaAtiva("Editar"); setProdutoId(item.id); }}
                >
                  <SquarePen className="w-4" />Editar
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition cursor-pointer flex gap-2 items-center text-sm"
                  onClick={() => deletarProduto(item.id)}
                >
                  <Trash2 className="w-4" />Remover
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}