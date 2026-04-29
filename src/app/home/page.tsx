"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Plus } from "lucide-react";
import ModalCadastro from "@/components/modalCadastro";

export default function Home() {
  const [produto, setProduto] = useState([]);
  const [nome, setNome] = useState("");
  const [category, setCategory] = useState("");
  const [aberto, setAberto] = useState(false);
  const [modalCadastro, setModalCadastro] = useState(false);
  const [form, setForm] = useState({
    nome: "",
    descricao: "",
    preco: "",
    usado: false,
    estadoConservacao: "",
    ativo: true,
    categoria: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:3001/produtos")
      .then((response) => setProduto(response.data))
      .catch((error) => console.log(error));
  }, []);

  const cadastrarProduto = async () => {
  try {
    const response = await axios.post(
      "http://localhost:3001/produtos",
      {
        nome: form.nome,
        descricao: form.descricao,
        preco: Number(form.preco),
        usado: form.usado,
        estadoConservacao: form.estadoConservacao,
        ativo: form.ativo,
        categoria: {
          id: 1,
        },
      }
    );
    console.log(response.data);
    setForm({
      nome: "",
      descricao: "",
      preco: "",
      usado: false,
      estadoConservacao: "",
      ativo: true,
      categoria: "",
    });

    const produtosAtualizados = await axios.get(
      "http://localhost:3001/produtos"
    );

    setProduto(produtosAtualizados.data);

    setModalCadastro(false);

  } catch (error) {
    console.log(error);
  }
};

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
          <h1 className="text-[30px] font-semibold">
            <span className="text-blue-400">Intefones</span>, qualidade na hora de comprar
          </h1>
          <p className="max-w-md text-[20px]">
            A Intelifones é a melhor loja para a compra de produtos relacionados
            a smartphones, sempre perto da sua casa
          </p>
          <p className="cursor-pointer bg-blue-400 text-white p-2.5 hover:bg-blue-500 hover:text-white transition w-fit rounded-xl">
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
            className="shadow p-2 rounded-md outline-none"
          />

          <div className="relative w-fit">
            <button
              onClick={() => setAberto(!aberto)}
              className="shadow p-2 rounded-md outline-none cursor-pointer"
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
          <button
            onClick={() => setModalCadastro(true)}
            className=" flex gap-1 px-5 py-2 rounded-md bg-green-500 text-white font-medium hover:bg-green-600 transition cursor-pointer shadow-md"
          >
            <Plus />
            Cadastrar
          </button>
          <ModalCadastro
            modal={modalCadastro}
            setModal={setModalCadastro}
            form={form}
            setForm={setForm}
            cadastrarProduto={cadastrarProduto}
          />
        </div>

        <div className="flex flex-wrap justify-center gap-8 p-10">
          {produtosFiltrados.map((item) => (
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
