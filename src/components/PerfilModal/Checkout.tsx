"use client";

import api from "@/services/api";
import { ChevronRight, Truck, CheckCircle, Clock } from "lucide-react";
import { useState, useEffect } from "react";

export default function Checkout({ setPaginaAtiva, dados }) {
  const [form, setForm] = useState({ cep: "", endereco: "", numero: "", complemento: "", telefoneContato: "", formaPagamento: "" });
  const [frete, setFrete] = useState<{ valorFrete: number; distanciaTexto: string; duracaoEstimada: string; nomeVendedor?: string } | null>(null);
  const [calculandoFrete, setCalculandoFrete] = useState(false);
  const [erroFrete, setErroFrete] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [pedidoCriado, setPedidoCriado] = useState<any>(null);
  const [confirmandoPagamento, setConfirmandoPagamento] = useState(false);
  // Pega o primeiro produto do carrinho para calcular o frete do vendedor correto
  const [primeiroProdutoId, setPrimeiroProdutoId] = useState<number | null>(null);

  useEffect(() => {
    // Busca o carrinho para pegar o produtoId do primeiro item
    api.get("/carrinho").then((res) => {
      if (res.data.length > 0) setPrimeiroProdutoId(res.data[0].produto.id);
    }).catch(console.log);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (["cep", "endereco", "numero"].includes(name)) { setFrete(null); setErroFrete(""); }
  };

  const calcularFrete = async () => {
    if (!form.endereco || !form.numero || !form.cep) {
      setErroFrete("Preencha CEP, endereço e número antes de calcular.");
      return;
    }
    setCalculandoFrete(true);
    setErroFrete("");
    try {
      const enderecoCompleto = `${form.endereco}, ${form.numero}${form.complemento ? ", " + form.complemento : ""}, ${form.cep}, Brasil`;
      const payload: any = { endereco: enderecoCompleto };
      if (primeiroProdutoId) payload.produtoId = String(primeiroProdutoId);

      const response = await api.post("/frete/calcular", payload);
      setFrete({
        valorFrete: response.data.valorFrete,
        distanciaTexto: response.data.distanciaTexto,
        duracaoEstimada: response.data.duracaoEstimada,
        nomeVendedor: response.data.nomeVendedor,
      });
    } catch (error: any) {
      setErroFrete(error?.response?.data?.message || "Não foi possível calcular o frete. Verifique o endereço.");
      setFrete(null);
    } finally {
      setCalculandoFrete(false);
    }
  };

  const finalizarCompra = async (e) => {
    e.preventDefault();
    if (!form.cep || !form.endereco || !form.numero || !form.telefoneContato || !form.formaPagamento) {
      alert("Preencha todos os campos obrigatórios.");
      return;
    }
    if (!frete) { alert("Calcule o frete antes de finalizar."); return; }
    setEnviando(true);
    try {
      const response = await api.post("/pedidos/finalizar", {
        endereco: form.endereco, cep: form.cep, numero: form.numero,
        complemento: form.complemento, telefoneContato: form.telefoneContato,
        formaPagamento: form.formaPagamento, valorFrete: frete.valorFrete,
      });
      setPedidoCriado(response.data);
    } catch (error: any) {
      alert(error?.response?.data?.message || "Erro ao finalizar a compra. Tente novamente.");
    } finally {
      setEnviando(false);
    }
  };

  const confirmarPagamento = async () => {
    if (!pedidoCriado) return;
    setConfirmandoPagamento(true);
    try {
      await api.post(`/pedidos/${pedidoCriado.id}/confirmar-pagamento`);
      setPaginaAtiva("Compras");
    } catch (error: any) {
      alert(error?.response?.data?.message || "Erro ao confirmar pagamento.");
    } finally {
      setConfirmandoPagamento(false);
    }
  };

  // Tela de confirmação de pagamento
  if (pedidoCriado) {
    return (
      <div className="flex flex-col flex-1 bg-gray-100 py-20 px-10 items-center gap-6">
        <div className="bg-white rounded-xl shadow-sm p-8 max-w-md w-full flex flex-col gap-5 items-center text-center">
          <Clock className="w-12 h-12 text-amber-500" />
          <h1 className="text-xl font-bold">Pedido #{pedidoCriado.id} criado!</h1>
          <p className="text-gray-500 text-sm">
            Seu estoque foi reservado por <strong>30 minutos</strong>. Confirme o pagamento abaixo para garantir sua compra.
          </p>
          <div className="bg-gray-50 rounded-lg p-4 w-full text-left text-sm flex flex-col gap-2">
            <div className="flex justify-between"><span className="text-gray-500">Subtotal</span><span>R$ {(pedidoCriado.valorTotal - pedidoCriado.valorFrete).toFixed(2)}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Frete</span><span>R$ {pedidoCriado.valorFrete.toFixed(2)}</span></div>
            <div className="flex justify-between font-bold text-base pt-1 border-t border-gray-200"><span>Total</span><span className="text-blue-600">R$ {pedidoCriado.valorTotal.toFixed(2)}</span></div>
          </div>
          <div className="flex gap-3 w-full">
            <button onClick={() => setPaginaAtiva("Compras")} className="flex-1 px-4 py-3 rounded-lg border border-gray-300 text-gray-500 hover:bg-gray-100 cursor-pointer text-sm transition">Ver pedidos</button>
            <button onClick={confirmarPagamento} disabled={confirmandoPagamento} className="flex-1 px-4 py-3 rounded-lg bg-green-500 text-white hover:bg-green-600 cursor-pointer text-sm transition disabled:opacity-50 flex items-center justify-center gap-2">
              <CheckCircle className="w-4 h-4" />{confirmandoPagamento ? "Confirmando..." : "Confirmar pagamento"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 bg-gray-100 py-20 px-10 gap-5">
      <div className="flex flex-row gap-2 items-center">
        <span className="text-[14px] cursor-pointer hover:text-blue-400" onClick={() => setPaginaAtiva("Carrinho")}>Carrinho</span>
        <ChevronRight className="w-4 h-4 text-gray-500" />
        <span className="text-[14px] text-blue-400">Checkout</span>
      </div>
      <div className="flex flex-col gap-2 w-full max-w-2xl">
        <h1 className="text-[22px] font-bold">Finalizar sua compra</h1>
        <p className="text-gray-500 text-sm">Preencha os dados de entrega e calcule o frete antes de finalizar.</p>
      </div>

      <form className="w-full flex flex-col bg-white rounded-sm overflow-hidden shadow-sm max-w-2xl" onSubmit={finalizarCompra}>
        <div className="p-4 border-b border-gray-200">
          <span className="font-semibold text-[17px]">Endereço de entrega</span>
        </div>
        <div className="flex flex-col p-5 gap-4">
          <div className="flex gap-4">
            <div className="flex flex-col gap-2 flex-1">
              <label className="text-sm text-gray-500">CEP *</label>
              <input type="text" placeholder="00000-000" name="cep" value={form.cep} onChange={handleChange} className="px-4 py-2 rounded-lg border border-gray-300 outline-none focus:border-blue-500 text-sm" />
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <label className="text-sm text-gray-500">Endereço (Rua/Av) *</label>
              <input type="text" placeholder="Nome da rua ou avenida" name="endereco" value={form.endereco} onChange={handleChange} className="px-4 py-2 rounded-lg border border-gray-300 outline-none focus:border-blue-500 text-sm" />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex flex-col gap-2 w-32">
              <label className="text-sm text-gray-500">Número *</label>
              <input type="text" placeholder="Nº" name="numero" value={form.numero} onChange={handleChange} className="px-4 py-2 rounded-lg border border-gray-300 outline-none focus:border-blue-500 text-sm" />
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <label className="text-sm text-gray-500">Complemento</label>
              <input type="text" placeholder="Apto, Bloco..." name="complemento" value={form.complemento} onChange={handleChange} className="px-4 py-2 rounded-lg border border-gray-300 outline-none focus:border-blue-500 text-sm" />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex flex-col gap-2 flex-1">
              <label className="text-sm text-gray-500">Telefone de contato *</label>
              <input type="text" placeholder="(00) 00000-0000" name="telefoneContato" value={form.telefoneContato} onChange={handleChange} className="px-4 py-2 rounded-lg border border-gray-300 outline-none focus:border-blue-500 text-sm" />
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <label className="text-sm text-gray-500 font-medium">Forma de pagamento *</label>
              <select name="formaPagamento" value={form.formaPagamento} onChange={handleChange} className="px-4 py-2 rounded-lg border border-gray-300 outline-none focus:border-blue-500 text-sm bg-gray-50 cursor-pointer">
                <option value="">Selecione...</option>
                <option value="PIX">PIX</option>
                <option value="BOLETO">Boleto</option>
                <option value="CARTAO_CREDITO">Cartão de crédito</option>
              </select>
            </div>
          </div>

          {/* Frete */}
          <div className="flex flex-col gap-3 bg-gray-50 border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Truck className="w-4 h-4 text-blue-400" />Frete
              </span>
              <button type="button" onClick={calcularFrete} disabled={calculandoFrete} className="px-3 py-1.5 text-xs rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 transition cursor-pointer disabled:opacity-50">
                {calculandoFrete ? "Calculando..." : "Calcular frete"}
              </button>
            </div>
            {erroFrete && <p className="text-xs text-red-500">{erroFrete}</p>}
            {frete && (
              <div className="flex flex-col gap-1 text-sm bg-white rounded-md p-3 border border-gray-100">
                <div className="flex justify-between">
                  <span className="text-gray-500">{frete.distanciaTexto} · {frete.duracaoEstimada}</span>
                  <span className="font-semibold text-gray-800">R$ {frete.valorFrete.toFixed(2)}</span>
                </div>
                {frete.nomeVendedor && <span className="text-xs text-gray-400">Enviado por: {frete.nomeVendedor}</span>}
              </div>
            )}
            {!frete && !erroFrete && <p className="text-xs text-gray-400">Preencha o endereço e clique em "Calcular frete".</p>}
          </div>

          {/* Resumo total */}
          {frete && dados && (
            <div className="flex flex-col gap-1 text-sm border-t border-gray-100 pt-3">
              <div className="flex justify-between text-gray-500"><span>Produtos</span><span>R$ {Number(dados.total).toFixed(2)}</span></div>
              <div className="flex justify-between text-gray-500"><span>Frete</span><span>R$ {frete.valorFrete.toFixed(2)}</span></div>
              <div className="flex justify-between font-bold text-gray-800 text-[15px] pt-1"><span>Total</span><span>R$ {(Number(dados.total) + frete.valorFrete).toFixed(2)}</span></div>
            </div>
          )}

          <div className="flex justify-end gap-3 pt-1">
            <button type="button" onClick={() => setPaginaAtiva("Carrinho")} className="px-4 py-2 text-sm rounded-lg border border-gray-300 text-gray-500 hover:bg-gray-100 cursor-pointer">Cancelar</button>
            <button type="submit" disabled={!frete || enviando} className="px-4 py-2 text-sm rounded-lg bg-blue-500 text-white hover:bg-blue-600 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
              {enviando ? "Finalizando..." : "Finalizar compra"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}