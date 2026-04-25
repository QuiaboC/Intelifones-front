"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Home() {
  const [produto, setProduto] = useState([]);
  const [nome, setNome] = useState("");
  const [category, setCategory] = useState("");
  const [aberto, setAberto] = useState(false);

  useEffect(() => {
    axios
      .get("colocar api")
      .then((response) => setProduto(response.data))
      .catch((error) => console.log(error));
  }, []);

  console.log(produto);

  const produtosFiltrados = produto.filter((item) => {
    const matchNome = item.nome.toLowerCase().includes(nome.toLowerCase());

    const matchCategoria = category === "" || item.categoria.nome === category;

    return matchNome && matchCategoria;
  });

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex w-screen h-150 items-center justify-center gap-20 flex-wrap">
        <div className="m-2 flex flex-col gap-5">
          <h1 className="text-[30px] font-medium">Intefones, qualidade na hora de comprar</h1>
          <p className="max-w-md text-[20px]">
            A Intelifones é a melhor loja para a compra de produtos relacionados a smartphones, sempre perto da sua casa
          </p>
          <p className="cursor-pointer bg-black text-white p-2.5 rounded-2xl hover:bg-blue-400 hover:text-white transition -xl w-fit">
            Clique aqui!
          </p>
        </div>
        <img src="/vetor2.png" alt="" width={420} height={120} />
      </div>

      <div className="flex flex-col shadow p-5">
        <div className=" flex flex-row items-center gap-6 px-25">
          <input
            type="text"
            value={nome}
            onChange={(e) => {
              setNome(e.target.value);

              if (e.target.value === "") {
                setCategory("");
              }
            }}
            placeholder="Nome do produto"
            className="shadow p-2 rounded-2xl outline-none"
          />

          <div className="relative w-fit">
            <button
              onClick={() => setAberto(!aberto)}
              className="shadow p-2 rounded-2xl outline-none cursor-pointer"
            >
              Categorias
            </button>
            {aberto && (
              <div className="absolute top-full left-0 mt-2 w-[220px] bg-white shadow-xl rounded-xl p-4 z-50 flex flex-col gap-3">
                {[...new Set(produto.map((item) => item.categoria.nome))].map(
                  (categoria, index) => (
                    <span
                      key={index}
                      className="cursor-pointer"
                      onClick={() => setCategory(categoria)}
                    >
                      {categoria}
                    </span>
                  ),
                )}
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-8 p-10">
          {produto.map((item) => (
            <div
              key={item.id}
              className="w-[253px] h-[385px] flex flex-col justify-between p-8 rounded-2xl border"
            >
              <img
                src="/logo2.png"
                alt="Produto"
                className="w-full h-[120px] object-contain"
              />

              <h2 className="text-[19px] font-semibold truncate">
                {item.nome}
              </h2>

              <div className="flex flex-col gap-1">
                <p className="text-[17px] text-blue-400">R$ {item.preco}</p>
                <p>
                  {item.usado ? "Usado" : "Novo"} - {item.estadoConservacao}
                </p>
              </div>

              <button className="bg-black text-white text-center py-2 rounded-lg hover:bg-white hover:text-blue-400 border transition cursor-pointer">
                Ver mais
              </button>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
