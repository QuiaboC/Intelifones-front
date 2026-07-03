"use client";

import {
  Box,
  Pencil,
  Tag,
  DollarSign,
  AlignLeft,
  ToggleRight,
  ChevronRight,
  Hash,
} from "lucide-react";
import { useEffect, useState } from "react";
import api from "@/services/api";
import { toast } from "react-toastify/unstyled";

export default function Cadastro({ setPaginaAtiva }) {
  const [categorias, setCategorias] = useState([]);
  const [form, setForm] = useState({
    nome: "",
    categoria: "",
    preco: "",
    descricao: "",
    usado: "",
    quantidade: "",
  });
  const [imagem, setImagem] = useState<File | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLimpar = () => {
    setForm({
      nome: "",
      categoria: "",
      preco: "",
      descricao: "",
      usado: "",
      quantidade: "",
    });
  };

  const CadastroProduto = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const response = await api.post("/produtos", {
      nome: form.nome,
      descricao: form.descricao,
      preco: Number(form.preco),
      categoria_id: Number(form.categoria),
      usado: form.usado === "true",
      quantidade: Number(form.quantidade),
    });

    const produto = response.data;

    if (imagem) {
      const formData = new FormData();

      formData.append("arquivo", imagem);

      await api.post(
        `/produtos/${produto.id}/imagem`,
        formData,
      );
    }

    toast.success("Produto cadastrado com sucesso!");
    setPaginaAtiva("MeusProdutos");

  } catch (error) {
    toast.error("Erro ao cadastrar produto!");
    console.log(error);
  }
};

  useEffect(() => {
    const categorias = async () => {
      try {
        const response = await api.get("/categorias");
        setCategorias(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    categorias();
  }, []);

  return (
    <div className="flex flex-col flex-1 bg-gray-100 py-20 px-30 flex-wrap gap-5">
      <div className="flex flex-row gap-2 items-center">
        <span
          className="text-[14px] cursor-pointer hover:text-blue-400"
          onClick={() => setPaginaAtiva("MeusProdutos")}
        >
          Meus produtos
        </span>
        <ChevronRight className="w-4 h-4 text-gray-500" />
        <span className="text-[14px] text-blue-400">Cadastro</span>
      </div>

      <div className="flex flex-col gap-2 w-full max-w-2xl">
        <h1 className="text-[22px] font-bold">Cadastro de Produto</h1>
        <p>Cadastre novos produtos em nossa loja</p>
      </div>

      <form
        className="w-full flex flex-col bg-white rounded-sm overflow-hidden shadow-sm max-w-5xl"
        onSubmit={CadastroProduto}
      >
        <div className="p-4 border-b border-gray-200">
          <span className="font-semibold text-[17px] flex gap-2">
            <Box className="text-blue-400" />
            Novo produto
          </span>
        </div>

        <div className="flex flex-col p-5 gap-5">
          <div className="flex flex-row gap-5">
            <div className="flex flex-col gap-2 flex-1">
              <label className="text-sm text-gray-500 flex gap-2 items-center">
                <Pencil className="text-blue-400 w-4 h-4" />
                Título
              </label>
              <input
                type="text"
                placeholder="Nome do produto"
                className="px-4 py-2 rounded-lg border border-gray-300 outline-none focus:border-blue-500 text-sm w-full"
                name="nome"
                value={form.nome}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col gap-2 flex-1">
              <label className="text-sm text-gray-500 flex gap-2 items-center">
                <Tag className="text-blue-400 w-4 h-4" />
                Categoria
              </label>
              <select
                className="px-4 py-2 rounded-lg border border-gray-300 outline-none focus:border-blue-500 text-sm w-full bg-white"
                name="categoria"
                value={form.categoria}
                onChange={handleChange}
              >
                <option value="">Selecione...</option>
                {categorias.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.nome}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-row gap-5">
            <div className="flex flex-col gap-2 flex-1">
              <label className="text-sm text-gray-500 flex gap-2 items-center">
                <DollarSign className="text-blue-400 w-4 h-4" />
                Preço
              </label>
              <input
                type="number"
                placeholder="00.00"
                className="px-4 py-2 rounded-lg border border-gray-300 outline-none focus:border-blue-500 text-sm w-full"
                name="preco"
                value={form.preco}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-500">Imagem do produto</label>

              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImagem(e.target.files?.[0] || null)}
                className="px-4 py-2 rounded-lg border border-gray-300"
              />
            </div>
          </div>

          <div className="flex flex-row gap-5">
            <div className="flex flex-col gap-2 flex-1">
              <label className="text-sm text-gray-500 flex gap-2 items-center">
                <ToggleRight className="text-blue-400 w-4 h-4" />
                Produto usado?
              </label>
              <select
                className="px-4 py-2 rounded-lg border border-gray-300 outline-none focus:border-blue-500 text-sm w-full bg-white"
                name="usado"
                value={form.usado}
                onChange={handleChange}
              >
                <option value="">Selecione...</option>
                <option value="false">Não</option>
                <option value="true">Sim</option>
              </select>
            </div>

            <div className="flex flex-col gap-2 flex-1">
              <label className="text-sm text-gray-500 flex gap-2 items-center">
                <Hash className="w-4 h-4 text-blue-400" />
                Quantidade
              </label>
              <input
                type="number"
                name="quantidade"
                value={form.quantidade}
                onChange={handleChange}
                placeholder="0"
                min="0"
                className="px-4 py-2 rounded-lg border border-gray-300 outline-none focus:border-blue-500 text-sm w-full bg-white"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-500 flex gap-2 items-center">
              <AlignLeft className="text-blue-400 w-4 h-4" />
              Descrição
            </label>
            <textarea
              placeholder="Descreva o produto..."
              rows={3}
              className="px-4 py-2 rounded-lg border border-gray-300 outline-none focus:border-blue-500 text-sm w-full resize-none"
              name="descricao"
              value={form.descricao}
              onChange={handleChange}
            />
          </div>

          <div className="flex justify-end gap-3 pt-1">
            <button
              type="button"
              onClick={handleLimpar}
              className="px-4 py-2 text-sm rounded-lg border border-gray-300 text-gray-500 hover:bg-gray-100 transition cursor-pointer"
            >
              Limpar
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition cursor-pointer"
            >
              Cadastrar Produto
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
