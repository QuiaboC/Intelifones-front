"use client";

import FiltroCategoria from "@/components/Header/FiltroCategoria";
import Footer from "@/components/Header/Footer";
import Header from "@/components/Header/Header";
import axios from "axios";
import { ChevronDown, ChevronRight, ChevronsUpDown, List } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

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
    axios
      .get("http://localhost:8080/produtos")
      .then((response) => {
        let produtos = response.data;
        if (busca) {
          produtos = produtos.filter((item) =>
            item.nome.toLowerCase().includes(busca.toLowerCase()),
          );
        }
        if (categoria) {
          produtos = produtos.filter(
            (item) => item.categoria_id === Number(categoria),
          ); 
        }
        setProduto(produtos);
        setProdutosTodos(produtos);
      })
      .catch((error) => console.log(error));
  }, [busca, categoria]);

  const menorPreco = () => {
    const produtosOrdenados = [...produtosTodos].sort(
      (a, b) => a.preco - b.preco,
    );
    setProduto(produtosOrdenados);
  };
  const maiorPreco = () => {
    const produtosOrdenados = [...produtosTodos].sort(
      (a, b) => b.preco - a.preco,
    );
    setProduto(produtosOrdenados);
  };
  const filtrarPreco = () => {
    const produtosFiltrados = produtosTodos.filter((item) => {
      return item.preco >= precoMin && item.preco <= precoMax;
    });

    setProduto(produtosFiltrados);
  };
  const filtroPreco = (min, max) => {
    const produtosFiltrados = produtosTodos.filter((item) => {
      if (max) {
        return item.preco >= min && item.preco <= max;
      }

      return item.preco >= min;
    });

    setProduto(produtosFiltrados);
  };

  const filtroCondicao = (condicaoSelecionada) => {
    const produtosFiltrados = produtosTodos.filter((item) => {
      return item.estadoConservacao === condicaoSelecionada;
    });

    setProduto(produtosFiltrados);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="bg-gray-200 min-h-screen flex flex-row p-5">
        <div className="w-[220px] h-full p-2 flex flex-col gap-5">
          <span className="font-semibold text-[16px]">
            Categorias relacionadas
          </span>
          <div className="w-full h-[150px] bg-white p-5 justify-around flex flex-col gap-2">
            <h1 className="font-medium text-[15px]">Condição</h1>
            <div className="flex flex-col gap-1">
              <span
                className="text-[14px] cursor-pointer hover:text-blue-500"
                onClick={() => filtroCondicao("novo")}
              >
                Novo
              </span>
              <span
                className="text-[14px] cursor-pointer hover:text-blue-500"
                onClick={() => filtroCondicao("usado")}
              >
                Usado
              </span>
              <span
                className="text-[14px] cursor-pointer hover:text-blue-500"
                onClick={() => filtroCondicao("seminovo")}
              >
                Semi Novo
              </span>
            </div>
          </div>
          <div className="w-full bg-white p-5 flex flex-col gap-4">
            <h1 className="font-medium text-[15px]">Preço</h1>

            <div className="flex flex-col gap-3">
              <span
                onClick={() => filtroPreco(0, 200)}
                className="text-[14px] cursor-pointer hover:text-blue-500 transition"
              >
                Até R$ 200
              </span>

              <span
                onClick={() => filtroPreco(200, 350)}
                className="text-[14px] cursor-pointer hover:text-blue-500 transition"
              >
                R$ 200 a R$ 350
              </span>

              <span
                onClick={() => filtroPreco(350, null)}
                className="text-[14px] cursor-pointer hover:text-blue-500 transition"
              >
                Mais de R$ 350
              </span>

              <div className="flex gap-2 mt-2">
                <input
                  type="number"
                  placeholder="Mín"
                  className="border border-gray-300 p-1 rounded-md outline-none w-full focus:border-blue-500 text-[14px]"
                  onChange={(e) => setPrecoMin(e.target.value)}
                />
                <input
                  type="number"
                  placeholder="Máx"
                  className="border border-gray-300 p-1 rounded-md outline-none w-full focus:border-blue-500 text-[14px]"
                  onChange={(e) => setPrecoMax(e.target.value)}
                />
                <button
                  onClick={filtrarPreco}
                  className="bg-blue-500 rounded-full p-1 cursor-pointer hover:bg-blue-600"
                >
                  <ChevronRight className="text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <div className=" w-full h-[70px] flex flex-row justify-start gap-5 p-5 items-center">
            <span className="flex font-medium">
              <ChevronsUpDown />
              Ordenar:
            </span>
            <div className="relative inline-block">
              <button
                className="p-2 text-left w-[200px] bg-white rounded-sm cursor-pointer flex justify-between text-[15px]"
                onClick={() =>
                  setModalOpen(
                    modalOpen === "mais produtos" ? null : "mais produtos",
                  )
                }
              >
                <span>mais produtos</span>
                <ChevronDown />
              </button>
              {modalOpen === "mais produtos" && (
                <div className="absolute top-full left-0 w-[200px] mt-1 bg-white rounded-sm shadow-lg p-2 z-50">
                  <button
                    className="w-full text-left p-2 hover:bg-gray-100 rounded-sm cursor-pointer text-[15px]"
                    onClick={menorPreco}
                  >
                    Menor preço
                  </button>
                  <button
                    className="w-full text-left p-2 hover:bg-gray-100 rounded-sm cursor-pointer text-[15px]"
                    onClick={maiorPreco}
                  >
                    Maior preço
                  </button>
                </div>
              )}
            </div>

            <span className="font-medium text-[15px]">Exibir</span>
            <div className="relative inline-block">
              <button
                className="bg-white p-2 text-left w-[200px] rounded-sm cursor-pointer flex justify-between text-[15px]"
                onClick={() =>
                  setModalOpen(modalOpen === "60 paginas" ? null : "60 paginas")
                }
              >
                <span>60 paginas</span>
                <ChevronDown />
              </button>

              {modalOpen === "60 paginas" && (
                <div className="absolute top-full left-0 mt-1 w-[200px] bg-white rounded-sm shadow-lg p-2 z-50">
                  <button
                    onClick={() => setModalOpen(null)}
                    className="w-full text-left p-2 hover:bg-gray-100 rounded-sm text-[15px]"
                  >
                    60 páginas
                  </button>
                </div>
              )}
            </div>

            <span className="m-10 ">
              <span className="font-medium text-[15px]">{produto.length}</span>{" "}
              Produtos
            </span>
          </div>
          <FiltroCategoria setProdutos={setProduto} categoria={categoria} />
          <div className="flex gap-10 flex-wrap justify-start flex-1 p-5">
            {produto.map((item) => (
              <a
                key={item.id}
                className="bg-white w-[230px] h-[350px] p-5 flex flex-col justify-around gap-2 rounded-xl group hover:shadow-xl"
                href={`/Detalhes/${item.id}`}
              >
                <div className="w-full h-[180px] justify-center flex">
                  <img
                    src={item.image}
                    alt=""
                    className="w-full h-full transition-transform duration-300 group-hover:scale-110"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <span className="truncate font-medium">{item.nome}</span>
                  <div className="flex justify-between">
                    <span className="font-medium text-blue-500">
                      R$ {item.preco.toFixed(2).replace(".", ",")}
                    </span>
                    <span
                      className={`text-xs px-2 py-1 rounded-full 
                ${
                  item.estadoConservacao === "novo"
                    ? "bg-green-100 text-green-600"
                    : item.estadoConservacao === "seminovo"
                      ? "bg-yellow-100 text-yellow-600"
                      : "bg-red-100 text-red-600"
                }`}
                    >
                      {item.estadoConservacao}
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
