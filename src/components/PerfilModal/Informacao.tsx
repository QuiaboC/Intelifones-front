"use client";

import api from "@/services/api";
import { ChevronRight, User, Phone, MapPin, Pencil, Plus, Trash, Star } from "lucide-react";
import { useEffect, useState } from "react";

type Endereco = {
  id: number; logradouro: string; numero: string; complemento?: string;
  bairro: string; cidade: string; uf: string; cep: string; principal: boolean;
};

export default function Informacao({ setPaginaAtiva }) {
  const [form, setForm] = useState({ nome: "", telefone: "", cpf: "" });
  const [enderecos, setEnderecos] = useState<Endereco[]>([]);
  const [mostrarForm, setMostrarForm] = useState(false);
  const [novoEnd, setNovoEnd] = useState({ logradouro: "", numero: "", complemento: "", bairro: "", cidade: "", uf: "", cep: "" });

  useEffect(() => {
    api.get("/usuarios/me").then((res) => setForm({ nome: res.data.nome || "", telefone: res.data.telefone || "", cpf: res.data.cpf || "" })).catch(console.log);
    carregarEnderecos();
  }, []);

  const carregarEnderecos = () => api.get("/usuarios/enderecos").then((res) => setEnderecos(res.data)).catch(console.log);

  const atualizarUsuario = async () => {
    try { await api.put("/usuarios/me", form); setPaginaAtiva("PerfilUsuario"); }
    catch (error) { console.log(error); }
  };

  const adicionarEndereco = async (e) => {
    e.preventDefault();
    try {
      await api.post("/usuarios/enderecos", novoEnd);
      setNovoEnd({ logradouro: "", numero: "", complemento: "", bairro: "", cidade: "", uf: "", cep: "" });
      setMostrarForm(false);
      carregarEnderecos();
    } catch (error: any) { alert(error?.response?.data?.message || "Erro ao adicionar endereço."); }
  };

  return (
    <div className="flex flex-col flex-1 bg-gray-100 py-20 px-10 gap-5">
      <div className="flex flex-row gap-2 items-center">
        <span className="text-[14px] cursor-pointer hover:text-blue-400" onClick={() => setPaginaAtiva("PerfilUsuario")}>Perfil</span>
        <ChevronRight className="w-4 h-4 text-gray-500" />
        <span className="text-[14px] text-blue-400">Informações</span>
      </div>

      <div className="flex flex-col gap-5 w-full max-w-2xl">
        <div className="flex gap-3 flex-col">
          <h1 className="font-bold text-[22px]">Informações do seu perfil</h1>
          <p>Adicione, altere ou corrija suas informações pessoais e endereços.</p>
        </div>

        {/* Dados pessoais */}
        <div className="w-full flex flex-col bg-white rounded-sm overflow-hidden shadow-sm">
          <div className="p-5 border-b border-gray-200">
            <span className="font-semibold text-[17px] flex gap-2"><Pencil className="text-blue-400" />Informações pessoais</span>
          </div>
          <div className="flex flex-col w-full p-5 gap-4">
            {[{ label: "Nome", name: "nome", type: "text", icon: User }, { label: "Telefone", name: "telefone", type: "tel", icon: Phone }, { label: "CPF", name: "cpf", type: "text", icon: User }].map(({ label, name, type, icon: Icon }) => (
              <div key={name} className="flex flex-row items-center gap-5 p-3 border-b border-gray-200">
                <div className="flex gap-2 items-center w-28 text-gray-500">
                  <Icon className="w-4 h-4 shrink-0 text-blue-400" />
                  <span className="text-[15px] text-blue-400">{label}</span>
                </div>
                <input type={type} value={form[name]} name={name} onChange={(e) => setForm({ ...form, [name]: e.target.value })}
                  className="px-4 py-2 rounded-lg border border-gray-300 w-full outline-none focus:border-blue-500 text-sm" />
              </div>
            ))}
            <div className="flex justify-end gap-2 pt-2">
              <button className="bg-gray-300 text-gray-700 text-sm py-2 px-5 rounded-lg hover:bg-gray-400 cursor-pointer transition" onClick={() => setPaginaAtiva("PerfilUsuario")}>Cancelar</button>
              <button className="bg-blue-500 text-white text-sm py-2 px-5 rounded-lg hover:bg-blue-600 cursor-pointer transition" onClick={atualizarUsuario}>Salvar</button>
            </div>
          </div>
        </div>

        {/* Endereços */}
        <div className="w-full flex flex-col bg-white rounded-sm overflow-hidden shadow-sm">
          <div className="p-5 border-b border-gray-200 flex items-center justify-between">
            <span className="font-semibold text-[17px] flex gap-2"><MapPin className="text-blue-400" />Meus endereços</span>
            <button type="button" onClick={() => setMostrarForm(!mostrarForm)} className="flex items-center gap-1 text-sm text-blue-500 hover:underline cursor-pointer">
              <Plus className="w-4 h-4" />Adicionar
            </button>
          </div>
          <div className="flex flex-col p-5 gap-3">
            {enderecos.length === 0 && !mostrarForm && (
              <p className="text-gray-500 text-sm">Nenhum endereço cadastrado. Adicione um para calcular o frete e receber encomendas.</p>
            )}
            {enderecos.map((end) => (
              <div key={end.id} className="flex items-center justify-between border border-gray-200 rounded-lg p-4">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{end.logradouro}, {end.numero}{end.complemento ? ` - ${end.complemento}` : ""}</span>
                    {end.principal && <span className="flex items-center gap-1 text-[11px] bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full font-medium"><Star className="w-3 h-3" />Principal</span>}
                  </div>
                  <span className="text-xs text-gray-500">{end.bairro}, {end.cidade} - {end.uf}, {end.cep}</span>
                </div>
                <div className="flex items-center gap-2">
                  {!end.principal && (
                    <button type="button" onClick={() => api.patch(`/usuarios/enderecos/${end.id}/principal`).then(carregarEnderecos)} className="text-xs text-blue-500 hover:underline cursor-pointer">Tornar principal</button>
                  )}
                  <button type="button" onClick={() => api.delete(`/usuarios/enderecos/${end.id}`).then(carregarEnderecos)} className="p-2 rounded-lg hover:bg-red-50 transition cursor-pointer">
                    <Trash className="w-4 h-4 text-red-400" />
                  </button>
                </div>
              </div>
            ))}
            {mostrarForm && (
              <form onSubmit={adicionarEndereco} className="flex flex-col gap-3 border border-gray-200 rounded-lg p-4 bg-gray-50">
                <div className="flex gap-3">
                  <input required name="logradouro" placeholder="Logradouro (Rua, Av...)" value={novoEnd.logradouro} onChange={(e) => setNovoEnd({ ...novoEnd, logradouro: e.target.value })}
                    className="px-4 py-2 rounded-lg border border-gray-300 outline-none focus:border-blue-500 text-sm flex-1" />
                  <input required name="numero" placeholder="Número" value={novoEnd.numero} onChange={(e) => setNovoEnd({ ...novoEnd, numero: e.target.value })}
                    className="px-4 py-2 rounded-lg border border-gray-300 outline-none focus:border-blue-500 text-sm w-24" />
                </div>
                <input name="complemento" placeholder="Complemento (opcional)" value={novoEnd.complemento} onChange={(e) => setNovoEnd({ ...novoEnd, complemento: e.target.value })}
                  className="px-4 py-2 rounded-lg border border-gray-300 outline-none focus:border-blue-500 text-sm" />
                <div className="flex gap-3">
                  <input required name="bairro" placeholder="Bairro" value={novoEnd.bairro} onChange={(e) => setNovoEnd({ ...novoEnd, bairro: e.target.value })}
                    className="px-4 py-2 rounded-lg border border-gray-300 outline-none focus:border-blue-500 text-sm flex-1" />
                  <input required name="cidade" placeholder="Cidade" value={novoEnd.cidade} onChange={(e) => setNovoEnd({ ...novoEnd, cidade: e.target.value })}
                    className="px-4 py-2 rounded-lg border border-gray-300 outline-none focus:border-blue-500 text-sm flex-1" />
                </div>
                <div className="flex gap-3">
                  <input required name="uf" placeholder="UF" maxLength={2} value={novoEnd.uf} onChange={(e) => setNovoEnd({ ...novoEnd, uf: e.target.value.toUpperCase() })}
                    className="px-4 py-2 rounded-lg border border-gray-300 outline-none focus:border-blue-500 text-sm w-20 uppercase" />
                  <input required name="cep" placeholder="00000-000" value={novoEnd.cep} onChange={(e) => setNovoEnd({ ...novoEnd, cep: e.target.value })}
                    className="px-4 py-2 rounded-lg border border-gray-300 outline-none focus:border-blue-500 text-sm flex-1" />
                </div>
                <div className="flex justify-end gap-2">
                  <button type="button" onClick={() => setMostrarForm(false)} className="px-4 py-2 text-sm rounded-lg border border-gray-300 text-gray-500 hover:bg-gray-100 cursor-pointer">Cancelar</button>
                  <button type="submit" className="px-4 py-2 text-sm rounded-lg bg-blue-500 text-white hover:bg-blue-600 cursor-pointer">Salvar endereço</button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}