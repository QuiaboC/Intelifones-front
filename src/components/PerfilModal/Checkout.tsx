"use client";

import api from "@/services/api";
import { ChevronRight, Loader2, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface Endereco {
  id: string | number;
  logradouro: string;
  numero: string;
  bairro: string;
  cidade: string;
  cep: string;
  complemento?: string;
  principal?: boolean;
}

const FRETE_SIMULADO: Record<string, number> = {
  PIX: 0,
  CARTAO_CREDITO: 9.9,
  BOLETO: 4.9,
};

export default function Checkout({ setPaginaAtiva, dados }) {
  const [enderecos, setEnderecos] = useState<Endereco[]>([]);
  const [enderecoSelecionadoId, setEnderecoSelecionadoId] = useState("");
  const [formaPagamento, setFormaPagamento] = useState("");
  const [telefoneContato, setTelefoneContato] = useState("");
  const [loading, setLoading] = useState(true);
  const [enviando, setEnviando] = useState(false);

  useEffect(() => {
    api
      .get("/usuarios/enderecos")
      .then((res) => {
        setEnderecos(res.data);
        const principal = res.data.find((e: Endereco) => e.principal);
        if (principal) {
          setEnderecoSelecionadoId(String(principal.id));
        } else if (res.data.length > 0) {
          setEnderecoSelecionadoId(String(res.data[0].id));
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const enderecoSelecionado = enderecos.find(
    (e) => String(e.id) === enderecoSelecionadoId,
  );

  const frete = formaPagamento ? (FRETE_SIMULADO[formaPagamento] ?? 0) : null;

  const camposInvalidos =
    !enderecoSelecionado || !formaPagamento || !telefoneContato;

  const finalizarCompra = async (e: React.FormEvent) => {
    e.preventDefault();
    if (camposInvalidos) {
      alert("Por favor, preencha todos os campos obrigatórios!");
      return;
    }

    setEnviando(true);
    try {
      const response = await api.post("/pedidos/finalizar", {
        endereco: enderecoSelecionado!.logradouro,
        cep: enderecoSelecionado!.cep,
        numero: enderecoSelecionado!.numero,
        complemento: enderecoSelecionado!.complemento || "",
        telefoneContato,
        formaPagamento,
        valorFrete: frete,
      });

      toast.success("Compra finalizada com sucesso!");
      setPaginaAtiva("Compras");
    } catch (error: any) {
      console.error(error);
      toast.error("Ocorreu um erro ao finalizar a compra. Tente novamente.");
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col flex-1 bg-gray-100 py-20 px-30 items-center justify-center">
        <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
      </div>
    );
  }

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

      <form
        className="w-full flex flex-col bg-white rounded-sm overflow-hidden shadow-sm max-w-5xl"
        onSubmit={finalizarCompra}
      >
        <div className="p-4 border-b border-gray-200">
          <span className="font-semibold text-[17px] flex gap-2">
            Forma de pagamento
          </span>
        </div>
        <div className="flex flex-col p-5 gap-5">
          {/* Endereço */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-500 font-medium">
              Endereço de entrega
            </label>

            {enderecos.length === 0 ? (
              <button
                type="button"
                className="flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-lg px-4 py-3 text-blue-600 text-sm font-medium hover:bg-blue-100 transition cursor-pointer w-full"
                onClick={() => setPaginaAtiva("CadastrarEndereco")}
              >
                <MapPin className="w-4 h-4 shrink-0" />
                Nenhum endereço cadastrado. Clique para adicionar.
              </button>
            ) : (
              <select
                className="px-4 py-2 rounded-lg border border-gray-300 outline-none focus:border-blue-500 text-sm w-full bg-gray-50 cursor-pointer"
                value={enderecoSelecionadoId}
                onChange={(e) => setEnderecoSelecionadoId(e.target.value)}
              >
                {enderecos.map((end) => (
                  <option key={end.id} value={end.id}>
                    {end.logradouro}, {end.numero} - {end.bairro}, {end.cidade}
                  </option>
                ))}
              </select>
            )}
          </div>

          <div className="flex flex-row gap-5">
            <div className="flex flex-col gap-2 flex-1">
              <label className="text-sm text-gray-500 flex gap-2 items-center">
                Telefone de contato
              </label>
              <input
                type="text"
                placeholder="Digite seu telefone"
                className="px-4 py-2 rounded-lg border border-gray-300 outline-none focus:border-blue-500 text-sm w-full"
                name="telefoneContato"
                value={telefoneContato}
                onChange={(e) => setTelefoneContato(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <label className="text-sm text-gray-500 font-medium">
                Forma de pagamento
              </label>
              <select
                className="px-4 py-2 rounded-lg border border-gray-300 outline-none focus:border-blue-500 text-sm w-full bg-gray-50 cursor-pointer"
                name="formaPagamento"
                value={formaPagamento}
                onChange={(e) => setFormaPagamento(e.target.value)}
              >
                <option value="">Selecione...</option>
                <option value="BOLETO">Boleto</option>
                <option value="PIX">Pix</option>
                <option value="CARTAO_CREDITO">Cartão de crédito</option>
              </select>
            </div>
          </div>

          {frete !== null && (
            <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-3 flex flex-col gap-1">
              <span className="text-xs text-gray-500 font-medium">
                Frete estimado
              </span>
              <span className="text-lg font-bold text-green-600">
                {frete === 0 ? "Grátis" : `R$ ${frete.toFixed(2)}`}
              </span>
              {frete === 0 && (
                <span className="text-xs text-green-600">
                  Pix sem custo de entrega!
                </span>
              )}
            </div>
          )}

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
              disabled={camposInvalidos || enviando}
              className="px-4 py-2 text-sm rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition cursor-pointer disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {enviando ? "Finalizando..." : "Finalizar compra"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
