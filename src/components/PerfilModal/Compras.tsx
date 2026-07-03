import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import { ChevronDown, ShoppingCart, Store } from "lucide-react";
import api from "@/services/api";

export default function Compras({setPaginaAtiva}) {
  const [busca, setBusca] = useState("");
  const [produtoFiltrado, setProdutoFiltrado] = useState([]);
  const [modal, setModal] = useState(false);
  const [categorias, setCategorias] = useState([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("Todos");
  const router = useRouter();

  useEffect(() => {
    const Produto = async () => {
      try {
        const response = await api.get("/pedidos/historico");
        const categoriasResponse = await api.get("/categorias");
        setCategorias(["Todos", ...categoriasResponse.data]);
        setProdutoFiltrado(response.data);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    };
    Produto();
  }, []);
  console.log(produtoFiltrado);

  const filtro = busca
    ? produtoFiltrado.filter((filtro) =>
        filtro.pedidos?.produto?.nome?.toLowerCase().includes(busca.toLowerCase()),
      )
    : produtoFiltrado;

  const filtroCategoria = async (categoria) => {
    try {
      const response = await api.get("/pedidos/historico");

      const dados =
        categoria === "Todos"
          ? response.data
          : response.data.filter(
              (item) => item.pedidos.produto.categoria.nome === categoria.nome,
            );

      setProdutoFiltrado(dados);
      setCategoriaSelecionada(categoria === "Todos" ? "Todos" : categoria.nome);
      setModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  const CompraProduto = async (produtoId) => {
    try {
      await api.post("/carrinho", {
        produtoId,
        quantidade: 1,
      });
      setPaginaAtiva("Carrinho")
    } catch (error) {
      console.log(error.response?.data || error);
    }
  };

  return (
    <div className="flex flex-col flex-1 bg-gray-100 py-20 px-30 flex-wrap gap-5">
      <h1 className="text-[22px] font-bold text-blue-400 flex gap-2 items-center">
        <ShoppingCart />
        Minhas Compras
      </h1>
      <div className="flex flex-wrap gap-5 w-full items-center justify-between">
        <input
          type="text"
          placeholder="Buscar compras"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className="px-5 py-2 rounded-lg text-sm border bg-white border-gray-200 w-full max-w-md outline-none focus:border-blue-500 h-10"
        />
        <div className="flex items-center gap-5 text-gray-600">
          <div className="relative border-r border-gray-300 pr-5">
            <span
              className="w-[180px] text-[16px] cursor-pointer hover:text-blue-400 transition flex items-center justify-between"
              onClick={() => setModal(!modal)}
            >
              <p className="truncate">{categoriaSelecionada}</p>
              <ChevronDown />
            </span>

            {modal && (
              <div className="absolute top-full left-0 mt-2 w-[200px] bg-white rounded-sm shadow-lg p-2 z-50 flex flex-col gap-1">
                {categorias.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => filtroCategoria(item)}
                    className="cursor-pointer text-left text-[15px] text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md transition"
                  >
                    {item === "Todos" ? "Todos" : item.nome}
                  </button>
                ))}
              </div>
            )}
          </div>
          <span className="font-medium">{produtoFiltrado.length} compras</span>
        </div>
      </div>
      <div className="w-full flex flex-col bg-white rounded-sm overflow-hidden shadow-sm">
        <div className="p-5 border-b border-gray-200">
          <span className="font-medium text-gray-700">Últimas compras</span>
        </div>
        <div className="flex flex-col w-full">
          {filtro
            .filter((item) => item?.produto)
            .map((item) => {
              const produto = item.produto;
              return (
                <div
                  key={item.itemId}
                  className="flex flex-col lg:flex-row justify-between gap-5 items-start lg:items-center p-5 border-b border-gray-200 hover:bg-gray-50 transition"
                >
                  <div className="flex gap-5 items-center">
                    <img
                      src={`http://localhost:8080/uploads/produtos/${produto.imagem}`}
                      className="w-20 h-20 rounded-xl bg-amber-100 object-cover"
                    />
                    <div className="flex flex-col gap-1">
                      <span className="font-semibold text-[16px]">
                        {produto.nome}
                      </span>
                      <span className="text-blue-500 font-medium">
                        R$ {Number(item.precoUnitario ?? 0).toFixed(2)}
                      </span>
                      <span className="text-gray-500 text-sm">
                        Quantidade: {item.quantidade}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 w-full lg:w-[200px]">
                    <a
                      className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition cursor-pointer text-center text-sm"
                      href={`/Detalhes/${produto.id}`}
                    >
                      Ver compra
                    </a>
                    <button
                      className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 transition cursor-pointer text-sm"
                      onClick={() => CompraProduto(produto.id)}
                    >
                      Comprar novamente
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
