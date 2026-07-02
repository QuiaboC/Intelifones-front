import api from "@/services/api";
import { MapPin, Plus, SquarePen, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

export default function Localizacao({ setPaginaAtiva }) {
  const [enderecos, setEnderecos] = useState([]);
  const [buscar, setBuscar] = useState("");

  useEffect(() => {
    api
      .get("/usuarios/enderecos")
      .then((res) => {
        setEnderecos(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const definirPrincipal = async (id) => {
  try {
    await api.patch(`/usuarios/enderecos/${id}/principal`);

    setEnderecos((prev) =>
      prev.map((endereco) => ({
        ...endereco,
        principal: endereco.id === id,
      }))
    );
  } catch (error) {
    console.error("Erro ao definir endereço principal:", error);
  }
};

  return (
    <div className="flex flex-col flex-1 bg-gray-100 py-20 px-30 flex-wrap gap-5">
      <h1 className="text-[22px] font-bold flex items-center gap-2 text-blue-400">
        <MapPin />
        Localização
      </h1>
      <div className="flex flex-wrap gap-5 w-full items-center justify-between">
        <div className="flex items-center gap-5 w-300">
          <input
            type="text"
            placeholder="Buscar produtos vendidos"
            value={buscar}
            onChange={(e) => setBuscar(e.target.value)}
            className="px-5 py-2 rounded-lg text-sm border bg-white border-gray-200 w-full max-w-md outline-none focus:border-blue-500 h-10"
          />
          <button
            className="flex gap-1 px-5 rounded-md bg-emerald-500 text-white font-medium hover:bg-emerald-600 transition cursor-pointer text-sm items-center h-10"
            onClick={() => setPaginaAtiva("CadastroEndereco")}
          >
            <Plus className="w-4" />
            Cadastrar
          </button>
        </div>

        <div className="flex items-center gap-5 text-gray-600">
          <span className="font-medium text-slate-900">
            {enderecos.length} Enderecos
          </span>
        </div>
      </div>

      <div className="w-full flex flex-col bg-white rounded-sm overflow-hidden">
        <div className="p-5 border-b border-gray-200">
          <span className="font-medium text-gray-700">Enderecos</span>
        </div>
        <div className="flex flex-col w-full overflow-hidden">
          {enderecos.map((item) => (
            <div
              key={item.id}
              className="flex flex-col lg:flex-row justify-between gap-5 items-start lg:items-center p-5 border-b border-gray-200 hover:bg-gray-50 transition overflow-hidden"
            >
              <div className="flex gap-5 items-center min-w-0 flex-1">
                <div className="w-20 h-20 rounded-xl bg-blue-100 flex items-center justify-center shrink-0">
                  <MapPin className="w-10 h-10 text-blue-500" />
                </div>

                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-[16px]">
                      {item.logradouro}, {item.numero}
                    </span>

                    {item.principal && (
                      <span className="text-xs px-2 py-1 rounded-full bg-emerald-500 text-white">
                        Principal
                      </span>
                    )}
                  </div>

                  <span className="text-gray-600 text-sm">{item.bairro}</span>

                  <span className="text-gray-600 text-sm">
                    {item.cidade} - {item.uf}
                  </span>

                  <span className="text-gray-500 text-sm">CEP: {item.cep}</span>

                  {item.complemento && (
                    <span className="text-gray-500 text-sm">
                      Complemento: {item.complemento}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-2 w-full lg:w-[220px] shrink-0">
                {!item.principal && (
                  <button className="bg-emerald-500 text-white p-2 rounded-lg hover:bg-emerald-600 transition cursor-pointer text-sm" onClick={() => definirPrincipal(item.id)}>
                    Tornar Principal
                  </button>
                )}

                <button className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition cursor-pointer flex justify-center items-center gap-2 text-sm">
                  <SquarePen className="w-4 h-4" />
                  Editar
                </button>

                <button className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition cursor-pointer flex justify-center items-center gap-2 text-sm">
                  <Trash2 className="w-4 h-4" />
                  Excluir
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
