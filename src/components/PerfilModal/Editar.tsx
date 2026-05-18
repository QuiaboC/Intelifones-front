"use client";

import {
  Box,
  Pencil,
  Tag,
  DollarSign,
  Image,
  AlignLeft,
  PackageCheck,
  ToggleRight,
  ChevronRight,
  Hash,
} from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Editar({ setPaginaAtiva, id }) {
  const [categorias, setCategorias] = useState([]);
  const [form, setForm] = useState({
    nome: "",
    categoria_id: "",
    preco: "",
    descricao: "",
    image: "",
    usado: "",
    estadoConservacao: "",
    quantidade: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8080/produtos/${id}`)
      .then((res) => setForm(res.data));

    axios
      .get("http://localhost:8080/categorias")
      .then((res) => setCategorias(res.data));
  }, [id]);

  const editarProduto = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:8080/produtos/${id}`, {
        nome: form.nome,
        descricao: form.descricao,
        preco: Number(form.preco),
        categoria_id: Number(form.categoria_id),
        image: form.image,
        usado: form.usado === "true",
        estadoConservacao: form.estadoConservacao,
        quantidade: Number(form.quantidade),
        ativo: true,
      });
      console.log("Produto editado com sucesso:", response.data);
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
          onClick={() => setPaginaAtiva("Vendas")}
        >
          Vendas
        </span>
        <ChevronRight className="w-4 h-4 text-gray-500" />
        <span className="text-[14px] text-blue-400">Editar</span>
      </div>

      <div className="flex flex-col gap-2 w-full max-w-2xl">
        <h1 className="text-[22px] font-bold">Editar Produto</h1>
        <p>Atualize as informações do produto</p>
      </div>

      <form
        className="w-full flex flex-col bg-white rounded-sm overflow-hidden shadow-sm max-w-5xl"
        onSubmit={editarProduto}
      >
        <div className="p-4 border-b border-gray-200">
          <span className="font-semibold text-[17px] flex gap-2">
            <Box className="text-blue-400" />
            Editar produto
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
                name="categoria_id"
                value={form.categoria_id}
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

            <div className="flex flex-col gap-2 flex-1">
              <label className="text-sm text-gray-500 flex gap-2 items-center">
                <Image className="text-blue-400 w-4 h-4" />
                URL da imagem
              </label>
              <input
                type="url"
                placeholder="https://example.com/img.jpg"
                className="px-4 py-2 rounded-lg border border-gray-300 outline-none focus:border-blue-500 text-sm w-full"
                name="image"
                value={form.image}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex flex-row gap-5">
            <div className="flex flex-col gap-2 flex-1">
              <label className="text-sm text-gray-500 flex gap-2 items-center">
                <PackageCheck className="text-blue-400 w-4 h-4" />
                Estado de conservação
              </label>
              <select
                className="px-4 py-2 rounded-lg border border-gray-300 outline-none focus:border-blue-500 text-sm w-full bg-white"
                name="estadoConservacao"
                value={form.estadoConservacao}
                onChange={handleChange}
              >
                <option value="">Selecione...</option>
                <option value="novo">Novo</option>
                <option value="seminovo">Seminovo</option>
                <option value="usado">Usado</option>
              </select>
            </div>

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
              onClick={() => setPaginaAtiva("Vendas")}
              className="px-4 py-2 text-sm rounded-lg border border-gray-300 text-gray-500 hover:bg-gray-100 transition cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition cursor-pointer"
            >
              Salvar Alterações
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
