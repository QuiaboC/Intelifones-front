"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import Header from "@/components/Header/Header";
import Footer from "@/components/Header/Footer";
import { Plus } from "lucide-react";
import CardInfo from "@/components/HomeComp/cardInfo";
import CardProduto from "@/components/HomeComp/cardProduto";
import CardDefault from "@/components/HomeComp/cardDefault";

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
      .get("http://localhost:8080/produtos")
      .then((response) => setProduto(response.data))
      .catch((error) => console.log(error));
  }, []);

  const cadastrarProduto = async () => {
    try {
      const response = await axios.post("http://localhost:3001/produtos", {
        nome: form.nome,
        descricao: form.descricao,
        preco: Number(form.preco),
        usado: form.usado,
        estadoConservacao: form.estadoConservacao,
        ativo: form.ativo,
        categoria: {
          id: 1,
        },
      });
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
        "http://localhost:8080/produtos",
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
      <div className="flex w-full min-h-[600px] items-center justify-center gap-20 flex-wrap bg-gradient-to-b from-blue-500 via-blue-500 to-white px-10 py-20">
        <div className="m-2 flex flex-col gap-5">
          <h1 className="text-[30px] font-semibold text-white">
            <span className="text-white">Intelifones</span>, qualidade na hora
            de comprar
          </h1>
          <p className="max-w-md text-[20px] text-blue-50">
            A Intelifones é a melhor loja para a compra de produtos relacionados
            a smartphones, sempre perto da sua casa
          </p>
          <p className="cursor-pointer bg-white text-blue-500 font-medium p-2.5 hover:bg-blue-50 transition w-fit rounded-xl shadow-sm">
            Clique aqui!
          </p>
        </div>
        <img src="/vetorHome.png" alt="" width={420} height={120} />
      </div>
      <CardInfo />
      <CardProduto />
      <div className="w-full flex justify-center bg-white py-10">
        <div className="w-290 h-20 p-5 flex flex-row rounded-sm shadow border border-gray-200 bg-blue-500 items-center justify-between">
          <h1 className="text-white text-[26px] font-bold cursor-pointer hover:text-blue-100 transition ">
            Intelifones
          </h1>
          <div className="flex gap-5 items-center">
            <span className="text-white text-[22px] font-bold">Faça login para aproveita nossa melhores ofertas!</span>
            <a href="/" className="text-[15px] bg-white px-4 py-2 rounded-lg text-blue-500 font-bold hover:bg-blue-50 transition cursor-pointer">Entrar</a>
          </div>
        </div>
      </div>
      <CardDefault />
      <Footer />
    </div>
  );
}
