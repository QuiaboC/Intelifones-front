"use client";

import FiltroCategoria from "@/components/Header/FiltroCategoria";
import Footer from "@/components/Header/Footer";
import Header from "@/components/Header/Header";
import api from "@/services/api";
import { ChevronDown, ChevronRight, ChevronsUpDown } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

const IMG_BASE = "http://localhost:8080/uploads/produtos";

export default function Produto() {
  const [produto, setProduto] = useState([]);
  const [produtosTodos, setProdutosTodos] = useState([]);
  const [modalOpen, setModalOpen] = useState(null);
  const buscaParams = useSearchParams();
  const busca = buscaParams.get("busca");
  const categoria = buscaParams.get("categoria");
  const [precoMin, setPrecoMin] = useState("");
  const [precoMax, setPrecoMax] = useState("");

  useEffect(() => {
    api.get("/produtos").then((response) => {
      let produtos = response.data;
      if (busca) {
        produtos = produtos.filter((item) =>
          item.nome.toLowerCase().includes(busca.toLowerCase())
        );
      }
      if (categoria) {
        produtos = produtos.filter(
          (item) => item.categoria?.id === Number(categoria)
        );
      }
      setProduto(produtos);
      setProdutosTodos(produtos);
    }).catch((error) => console.log(error));
  }, [busca, categoria]);

  const menorPreco = () => setProduto([...produtosTodos].sort((a, b) => a.preco - b.preco));
  const maiorPreco = () => setProduto([...produtosTodos].sort((a, b) => b.preco - a.preco));

  const filtrarPreco = () => {
    const min = Number(precoMin) || 0;
    const max = Number(precoMax) || Infinity;
    setProduto(produtosTodos.filter((item) => item.preco >= min && item.preco <= max));
  };

  const filtroPreco = (min, max) => {
    setProduto(produtosTodos.filter((item) =>
      max ? item.preco >= min && item.preco <= max : item.preco >= min
    ));
  };

  const filtroCondicao = (usado) =>
    setProduto(produtosTodos.filter((item) => item.usado === usado));

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="bg-gray-200 min-h-screen flex flex-row p-5">
        {/* Sidebar filtros */}
        <div className="w-[220px] h-full p-2 flex flex-col gap-5">
          <span className="font-semibold text-[16px]">Categorias relacionadas</span>
          <div className="w-full bg-white p-5 flex flex-col gap-3">
            <h1 className="font-medium text-[15px]">Condição</h1>
            <span className="text-[14px] cursor-pointer hover:text-blue-500" onClick={() => filtroCondicao(false)}>Novo</span>
            <span className="text-[14px] cursor-pointer hover:text-blue-500" onClick={() => filtroCondicao(true)}>Usado</span>
          </div>
          <div className="w-full bg-white p-5 flex flex-col gap-4">
            <h1 className="font-medium text-[15px]">Preço</h1>
            <div className="flex flex-col gap-3">
              <span onClick={() => filtroPreco(0, 200)} className="text-[14px] cursor-pointer hover:text-blue-500 transition">Até R$ 200</span>
              <span onClick={() => filtroPreco(200, 350)} className="text-[14px] cursor-pointer hover:text-blue-500 transition">R$ 200 a R$ 350</span>
              <span onClick={() => filtroPreco(350, null)} className="text-[14px] cursor-pointer hover:text-blue-500 transition">Mais de R$ 350</span>
              <div className="flex gap-2 mt-2">
                <input type="number" placeholder="Mín" className="border border-gray-300 p-1 rounded-md outline-none w-full focus:border-blue-500 text-[14px]" onChange={(e) => setPrecoMin(e.target.value)} />
                <input type="number" placeholder="Máx" className="border border-gray-300 p-1 rounded-md outline-none w-full focus:border-blue-500 text-[14px]" onChange={(e) => setPrecoMax(e.target.value)} />
                <button onClick={filtrarPreco} className="bg-blue-500 rounded-full p-1 cursor-pointer hover:bg-blue-600">
                  <ChevronRight className="text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Lista de produtos */}
        <div className="flex flex-col flex-1">
          <div className="w-full h-[70px] flex flex-row justify-start gap-5 p-5 items-center">
            <span className="flex font-medium"><ChevronsUpDown />Ordenar:</span>
            <div className="relative inline-block">
              <button className="p-2 text-left w-[200px] bg-white rounded-sm cursor-pointer flex justify-between text-[15px]" onClick={() => setModalOpen(modalOpen === "ord" ? null : "ord")}>
                <span>Ordenar por</span><ChevronDown />
              </button>
              {modalOpen === "ord" && (
                <div className="absolute top-full left-0 w-[200px] mt-1 bg-white rounded-sm shadow-lg p-2 z-50">
                  <button className="w-full text-left p-2 hover:bg-gray-100 rounded-sm cursor-pointer text-[15px]" onClick={() => { menorPreco(); setModalOpen(null); }}>Menor preço</button>
                  <button className="w-full text-left p-2 hover:bg-gray-100 rounded-sm cursor-pointer text-[15px]" onClick={() => { maiorPreco(); setModalOpen(null); }}>Maior preço</button>
                </div>
              )}
            </div>
            <span className="ml-10 font-medium text-[15px]">{produto.length} Produtos</span>
          </div>

          <FiltroCategoria setProdutos={setProduto} setProdutosTodos={setProdutosTodos} categoria={categoria} />

          {/* Exibe o termo de busca ativo */}
          {busca && (
            <div className="px-5 pb-2 text-sm text-gray-500">
              Resultados para: <strong className="text-gray-800">"{busca}"</strong>
              <span className="ml-2 text-blue-500 cursor-pointer hover:underline" onClick={() => window.location.href = "/produtos"}>Limpar busca</span>
            </div>
          )}

          <div className="flex gap-6 flex-wrap justify-start flex-1 p-5">
            {produto.length === 0 ? (
              <div className="w-full text-center py-20 text-gray-400">
                {busca ? `Nenhum produto encontrado para "${busca}"` : "Nenhum produto disponível"}
              </div>
            ) : produto.map((item) => (
              <a key={item.id} className="bg-white w-[230px] h-[350px] p-5 flex flex-col justify-around gap-2 rounded-xl group hover:shadow-xl" href={`/Detalhes/${item.id}`}>
                <div className="w-full h-[180px] justify-center flex overflow-hidden rounded-lg bg-gray-50">
                  <img
                    src={item.imagem ? `${IMG_BASE}/${item.imagem}` : "/vetorProduto.png"}
                    alt={item.nome}
                    className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <span className="truncate font-medium">{item.nome}</span>
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-blue-500">R$ {item.preco.toFixed(2).replace(".", ",")}</span>
                    <span className={`text-xs px-2 py-1 rounded-full shrink-0 ${item.usado ? "bg-red-500 text-white" : "bg-emerald-500 text-white"}`}>
                      {item.usado ? "Usado" : "Novo"}
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}