"use client";

import {
  Box,
  ChevronRight,
  DollarSign,
  Image,
  Pencil,
  Tag,
  TextAlignStart,
} from "lucide-react";
import { useState } from "react";
import axios from "axios";

export default function Cadastro({ setPaginaAtiva }) {
  const [form, setForm] = useState({
    nome: "",
    categoria: "",
    preco: "",
    descricao: "",
    imagem: "",
  });

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
      imagem: "",
    });
  };

  const CadastroProduto = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://fakestoreapi.com/products", {
        title: form.nome,
        price: form.preco,
        description: form.descricao,
        category: form.categoria,
        image: form.imagem,
      });
      console.log("Cadastrado com sucesso:", response.data);
      setPaginaAtiva("Vendas");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col flex-1 bg-gray-100 py-20 px-30 flex-wrap gap-5">
      <div className="flex flex-row gap-2 items-center">
        <span
          className="text-[14px] cursor-pointer hover:text-blue-400"
          onClick={(e) => setPaginaAtiva("Vendas")}
        >
          Vendas
        </span>
        <ChevronRight className="w-4 h-4 text-gray-500" />
        <span className="text-[14px] text-blue-400">Cadastro</span>
      </div>
      <div className="flex flex-col gap-2 w-full max-w-2xl">
        <h1 className="text-[22px] font-bold ">Cadastro de Produto</h1>
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
              <label className="text-sm text-gray-500 items-center flex gap-2">
                <Pencil className="text-blue-400" />
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
              <label className="text-sm text-gray-500 items-center flex gap-2">
                <Tag className="text-blue-400" />
                Categoria
              </label>
              <select
                className="px-4 py-2 rounded-lg border border-gray-300 outline-none focus:border-blue-500 text-sm w-full bg-white"
                name="categoria"
                value={form.categoria}
                onChange={handleChange}
              >
                <option value="">Selecione...</option>
                <option value="electronics">Electronics</option>
                <option value="jewelery">Jewelery</option>
                <option value="men's clothing">Men's clothing</option>
                <option value="women's clothing">Women's clothing</option>
              </select>
            </div>
          </div>

          <div className="flex flex-row gap-5 items-center">
            <div className="flex flex-col gap-2 flex-1 ">
              <label className="text-sm text-gray-500 flex items-center gap-2">
                <DollarSign className="text-blue-400" />
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

            <div className="flex flex-col gap-2 flex-1">
              <label className="text-sm text-gray-500 flex gap-2 items-center">
                <Image className="text-blue-400" />
                URL da imagem
              </label>
              <input
                type="url"
                placeholder="https://example.com/img.jpg"
                className="px-4 py-2 rounded-lg border border-gray-300 outline-none focus:border-blue-500 text-sm w-full"
                name="imagem"
                value={form.imagem}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <label className="text-sm text-gray-500 items-center flex gap-2">
              <TextAlignStart className="text-blue-400" />
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
