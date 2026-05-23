import axios from "axios";
import { use, useEffect, useState } from "react";
import { ChevronDown, ShoppingCart, Store } from "lucide-react";

export default function Compras() {
  const [busca, setBusca] = useState("");
  const [produtoFiltrado, setProdutoFiltrado] = useState([]);
  const [modal, setModal] = useState(false);
  const [categorias, setCategorias] = useState([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("Todos");

  useEffect(() => {
    const Produto = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        const categoriasResponse = await axios.get(
          "https://fakestoreapi.com/products/categories",
        );
        setCategorias(["Todos", ...categoriasResponse.data]);
        setProdutoFiltrado(response.data);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    };
    Produto();
  }, []);

  const filtro = busca
    ? produtoFiltrado.filter((filtro) =>
        filtro.title.toLowerCase().includes(busca.toLowerCase()),
      )
    : produtoFiltrado;

  const filtroCategoria = async (categoria) => {
    try {
      const response =
        categoria === "Todos"
          ? await axios.get("https://fakestoreapi.com/products")
          : await axios.get(
              `https://fakestoreapi.com/products/category/${categoria}`,
            );

      setProdutoFiltrado(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col flex-1 bg-gray-100 py-20 px-30 flex-wrap gap-5">
      <h1 className="text-[22px] font-bold text-blue-400 flex gap-2 items-center">
        <ShoppingCart />
        Compras
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
                    className="cursor-pointer text-left text-[15px] text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md transition"
                    onClick={() => {
                      filtroCategoria(item);
                      setCategoriaSelecionada(item);
                    }}
                  >
                    {item}
                  </button>
                ))}
              </div>
            )}
          </div>
          <span className="font-medium">9 compras</span>
        </div>
      </div>
      <div className="w-full flex flex-col bg-white rounded-sm overflow-hidden shadow-sm">
        <div className="p-5 border-b border-gray-200">
          <span className="font-medium text-gray-700">Últimas compras</span>
        </div>
        <div className="flex flex-col w-full">
          {filtro.map((item) => (
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
                    {item.title}
                  </span>
                  <span className="text-blue-500 font-medium">
                    R$ {item.price.toFixed(2)}
                  </span>
                  <span className="text-gray-500 text-sm">
                    Produto feito para compra
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-2 w-full lg:w-[200px]">
                <a
                  className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition cursor-pointer text-center text-sm"
                  href={`/Detalhes/${item.id}`}
                >
                  Ver compra
                </a>
                <button className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 transition cursor-pointer text-sm">
                  Comprar novamente
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
