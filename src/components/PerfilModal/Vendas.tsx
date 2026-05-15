import axios from "axios";
import { Plus, SquarePen, Store, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";

export default function Vendas({ setPaginaAtiva, setProdutoId }) {
  const [buscar, setBuscar] = useState("");
  const [filtros, setFiltros] = useState([]);

  useEffect(() => {
    const Produto = async () => {
      try {
        const response = await axios.get("http://localhost:8080/produtos");
        setFiltros(response.data);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    };
    Produto();
  }, []);

  console.log(filtros);

  const deletarProduto = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/produtos/${id}`);
      setFiltros((prevFiltros) => prevFiltros.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Erro ao deletar produto:", error);
    }
  };

  const filtrosFiltrados = buscar
    ? filtros.filter((filtro) =>
        filtro.nome.toLowerCase().includes(buscar.toLowerCase()),
      )
    : filtros;

  return (
    <div className="flex flex-col flex-1 bg-gray-100 py-20 px-30 flex-wrap gap-5">
      <h1 className="text-[22px] font-bold flex items-center gap-2 text-blue-400">
        <Store />
        Vendas
      </h1>
      <div className="flex flex-wrap gap-5 w-full items-center justify-between">
        <div className="flex items-center gap-5 w-300">
          <input
            type="text"
            placeholder="Buscar produtos cadastrados"
            value={buscar}
            onChange={(e) => setBuscar(e.target.value)}
            className="px-5 py-2 rounded-lg text-sm border bg-white border-gray-200 w-full max-w-md outline-none focus:border-blue-500 h-10"
          />
          <button
            className="flex gap-1 px-5 rounded-md bg-emerald-500 text-white font-medium hover:bg-emerald-600 transition cursor-pointer text-sm items-center h-10"
            onClick={() => setPaginaAtiva("Cadastro")}
          >
            <Plus className="w-4" />
            Cadastrar
          </button>
        </div>

        <div className="flex items-center gap-5 text-gray-600">
          <span className="font-medium text-slate-900">
            {filtros.length} produtos
          </span>
        </div>
      </div>
      <div className="w-full flex flex-col bg-white rounded-sm overflow-hidden">
        <div className="p-5 border-b border-gray-200">
          <span className="font-medium text-gray-700">Últimas vendas</span>
        </div>
        <div className="flex flex-col w-full">
          {filtrosFiltrados.map((item) => (
            <div
              key={item.id}
              className="flex flex-col lg:flex-row justify-between gap-5 items-start lg:items-center p-5 border-b border-gray-200 hover:bg-gray-50 transition"
            >
              <div className="flex gap-5 items-center">
                <img
                  src={item.image}
                  className="w-20 h-20 rounded-xl bg-amber-100 object-cover"
                />
                <div className="flex flex-col gap-1">
                  <span className="font-semibold text-[16px]">
                    {item.nome}
                  </span>
                  <span className="text-blue-500 font-medium">
                    R$ {Number(item.preco).toFixed(2)}
                  </span>
                  <span className="text-gray-500 text-sm">
                    Produto feito para venda
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-2 w-full lg:w-[200px]">
                <button className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition cursor-pointer flex gap-2 justify-center items-center text-sm"
                onClick={() => {setPaginaAtiva("Editar"), setProdutoId(item.id)}}>
                  <SquarePen className="w-4" />
                  Editar
                </button>
                <button
                  className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition cursor-pointer flex gap-2 justify-center text-sm items-center"
                  onClick={() => deletarProduto(item.id)}
                >
                  <Trash2 className="w-4" />
                  Deletar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
