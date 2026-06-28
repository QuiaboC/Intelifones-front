"use client";

import api from "@/services/api";
import { ChevronRight } from "lucide-react";
import { useState } from "react";

export default function Checkout({ setPaginaAtiva, dados }) {
  const [form, setForm] = useState({
    cep: "",
    endereco: "",
    numero: "",
    complemento: "",
    telefoneContato: "",
    formaPagamento: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const finalizarCompra = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !form.cep ||
      !form.endereco ||
      !form.numero ||
      !form.telefoneContato ||
      !form.formaPagamento
    ) {
      alert("Por favor, preencha todos os campos obrigatórios!");
      return;
    }
    try {
      const response = await api.post("/pedidos/finalizar", {
        endereco: form.endereco,
        cep: form.cep,
        numero: form.numero,
        complemento: form.complemento,
        telefoneContato: form.telefoneContato,
        formaPagamento: form.formaPagamento,
      });

      console.log("Pedido realizado com sucesso:", response.data);
      setPaginaAtiva("Compras");
    } catch (error: any) {
      console.error(error);
    }
  };
  return (
    <div className="flex flex-col flex-1 bg-gray-100 py-20 px-30 flex-wrap gap-5">
      <div className="flex flex-row gap-2 items-center">
        <span
          className="text-[14px] cursor-pointer hover:text-blue-400"
          onClick={() => setPaginaAtiva("Carrinho")}
        >
          Carrinho
        </span>
        <ChevronRight className="w-4 h-4 text-gray-500" />
        <span className="text-[14px] text-blue-400">Checkout</span>
      </div>

      <div className="flex flex-col gap-2 w-full max-w-2xl">
        <h1 className="text-[22px] font-bold">finalizar sua compra</h1>
        <p>Adicione detalhes para finalizamos sua compra</p>
      </div>
      <form className="w-full flex flex-col bg-white rounded-sm overflow-hidden shadow-sm max-w-5xl">
        <div className="p-4 border-b border-gray-200">
          <span className="font-semibold text-[17px] flex gap-2">
            Forma de pagamento
          </span>
        </div>
        <div className="flex flex-col p-5 gap-5">
          <div className="flex flex-row gap-5">
            <div className="flex flex-col gap-2 flex-1">
              <label className="text-sm text-gray-500 flex gap-2 items-center">
                Cep
              </label>
              <input
                type="text"
                placeholder="Digite seu cep"
                className="px-4 py-2 rounded-lg border border-gray-300 outline-none focus:border-blue-500 text-sm w-full"
                name="cep"
                value={form.cep}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <label className="text-sm text-gray-500 flex gap-2 items-center">
                Endereço
              </label>
              <input
                type="text"
                placeholder="Digite seu endereco"
                className="px-4 py-2 rounded-lg border border-gray-300 outline-none focus:border-blue-500 text-sm w-full"
                name="endereco"
                value={form.endereco}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="flex flex-row gap-5">
            <div className="flex flex-col gap-2 flex-1">
              <label className="text-sm text-gray-500 flex gap-2 items-center">
                Numero da Casa
              </label>
              <input
                type="text"
                placeholder="Digite o numero da casa"
                className="px-4 py-2 rounded-lg border border-gray-300 outline-none focus:border-blue-500 text-sm w-full"
                name="numero"
                value={form.numero}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <label className="text-sm text-gray-500 flex gap-2 items-center">
                Complemento
              </label>
              <input
                type="text"
                placeholder="Digite seu endereco"
                className="px-4 py-2 rounded-lg border border-gray-300 outline-none focus:border-blue-500 text-sm w-full"
                name="complemento"
                value={form.complemento}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="flex flex-row gap-5">
            <div className="flex flex-col gap-2 flex-1">
              <label className="text-sm text-gray-500 flex gap-2 items-center">
                Telefone de contato
              </label>
              <input
                type="text"
                placeholder="Digite seu cep"
                className="px-4 py-2 rounded-lg border border-gray-300 outline-none focus:border-blue-500 text-sm w-full"
                name="telefoneContato"
                value={form.telefoneContato}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <label className="text-sm text-gray-500 font-medium">
                Forma de pagamento
              </label>
              <select
                className="px-4 py-2 rounded-lg border border-gray-300 outline-none focus:border-blue-500 text-sm w-full bg-gray-50 cursor-pointer"
                name="formaPagamento"
                value={form.formaPagamento}
                onChange={handleChange}
              >
                <option value="">Selecione...</option>
                <option value="BOLETO">Boleto</option>
                <option value="PIX">Pix</option>
                <option value="CARTAO_CREDITO">Cartão de crédito</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-1">
            <button
              type="button"
              className="px-4 py-2 text-sm rounded-lg border border-gray-300 text-gray-500 hover:bg-gray-100 transition cursor-pointer"
              onClick={() => setPaginaAtiva("Carrinho")}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition cursor-pointer"
              onClick={finalizarCompra}
            >
              Finalizar compra
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
