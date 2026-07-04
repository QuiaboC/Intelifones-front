import api from "@/services/api";
import { ChevronRight, MapPin, Pencil } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

export default function CadastrarEndereco({ setPaginaAtiva }) {
  const [form, setForm] = useState({
    logradouro: "",
    numero: "",
    complemento: "",
    bairro: "",
    cidade: "",
    uf: "",
    cep: "",
    principal: true,
  });
  const handleLimpar = () => {
    setForm({
      logradouro: "",
      numero: "",
      complemento: "",
      bairro: "",
      cidade: "",
      uf: "",
      cep: "",
      principal: true,
    });
  };
  const handleChange = (e) => {
    const { name } = e.target;
    let { value } = e.target;

    if (name === "cep") {
      value = value
        .replace(/\D/g, "")
        .slice(0, 8)
        .replace(/(\d{5})(\d)/, "$1-$2");
    }

    if (name === "uf") {
      value = value.toUpperCase().slice(0, 2);
    }

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const cadastrarEndereco = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/usuarios/enderecos", {
        logradouro: form.logradouro,
        numero: form.numero,
        complemento: form.complemento,
        bairro: form.bairro,
        cidade: form.cidade,
        uf: form.uf,
        cep: form.cep,
        principal: form.principal,
      });

      toast.success("Endereço cadastrado com sucesso!");
      setPaginaAtiva("Localizacao");
    } catch (error) {
      toast.error("Erro ao cadastrar endereço!");
    }
  };
  return (
    <div className="flex flex-col flex-1 bg-gray-100 py-20 px-30 flex-wrap gap-5">
      <div className="flex flex-row gap-2 items-center">
        <span
          className="text-[14px] cursor-pointer hover:text-blue-400"
          onClick={() => setPaginaAtiva("Localizacao")}
        >
          Localizacao
        </span>
        <ChevronRight className="w-4 h-4 text-gray-500" />
        <span className="text-[14px] text-blue-400">Cadastro</span>
      </div>
      <div className="flex flex-col gap-2 w-full max-w-2xl">
        <h1 className="text-[22px] font-bold">Cadastro de Endereço</h1>
        <p>Cadastre novos endereços em nossa loja</p>
      </div>
      <form
        className="w-full flex flex-col bg-white rounded-sm overflow-hidden shadow-sm max-w-5xl"
        onSubmit={cadastrarEndereco}
      >
        <div className="p-4 border-b border-gray-200">
          <span className="font-semibold text-[17px] flex gap-2">
            <MapPin className="text-blue-400" />
            Novo endereço
          </span>

          <div className="flex flex-col p-5 gap-5">
            <div className="flex flex-row gap-5">
              <div className="flex flex-col gap-2 flex-1">
                <label className="text-sm text-gray-500 flex gap-2 items-center font-medium">
                  Logadouro
                </label>
                <input
                  type="text"
                  placeholder="Nome do Logradouro"
                  className="px-4 py-2 rounded-lg border border-gray-300 outline-none focus:border-blue-500 text-sm w-full"
                  name="logradouro"
                  value={form.logradouro}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col gap-2 flex-1">
                <label className="text-sm text-gray-500 flex gap-2 items-center font-medium">
                  numero
                </label>
                <input
                  type="text"
                  placeholder="Número"
                  className="px-4 py-2 rounded-lg border border-gray-300 outline-none focus:border-blue-500 text-sm w-full"
                  name="numero"
                  value={form.numero}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex flex-row gap-5">
              <div className="flex flex-col gap-2 flex-1">
                <label className="text-sm text-gray-500 flex gap-2 items-center font-medium">
                  Complemento
                </label>
                <input
                  type="text"
                  placeholder="Complemento"
                  className="px-4 py-2 rounded-lg border border-gray-300 outline-none focus:border-blue-500 text-sm w-full"
                  name="complemento"
                  value={form.complemento}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col gap-2 flex-1">
                <label className="text-sm text-gray-500 flex gap-2 items-center font-medium">
                  Bairro
                </label>
                <input
                  type="text"
                  placeholder="Bairro"
                  className="px-4 py-2 rounded-lg border border-gray-300 outline-none focus:border-blue-500 text-sm w-full"
                  name="bairro"
                  value={form.bairro}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex flex-row gap-5">
              <div className="flex flex-col gap-2 flex-1">
                <label className="text-sm text-gray-500 flex gap-2 items-center font-medium">
                  Cidade
                </label>
                <input
                  type="text"
                  placeholder="Cidade"
                  className="px-4 py-2 rounded-lg border border-gray-300 outline-none focus:border-blue-500 text-sm w-full"
                  name="cidade"
                  value={form.cidade}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col gap-2 flex-1">
                <label className="text-sm text-gray-500 flex gap-2 items-center font-medium">
                  Uf
                </label>
                <input
                  type="text"
                  placeholder="Uf"
                  className="px-4 py-2 rounded-lg border border-gray-300 outline-none focus:border-blue-500 text-sm w-full"
                  name="uf"
                  value={form.uf}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col gap-2 flex-1">
                <label className="text-sm text-gray-500 flex gap-2 items-center font-medium">
                  Cep
                </label>
                <input
                  type="text"
                  placeholder="Cep"
                  className="px-4 py-2 rounded-lg border border-gray-300 outline-none focus:border-blue-500 text-sm w-full"
                  name="cep"
                  value={form.cep}
                  onChange={handleChange}
                />
              </div>
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
        </div>
      </form>
    </div>
  );
}
