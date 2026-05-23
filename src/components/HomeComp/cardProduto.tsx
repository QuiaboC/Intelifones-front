import axios from "axios";
import { useEffect, useState } from "react";

export default function CardProduto() {
  const [produto, setProduto] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/produtos")
      .then((response) => setProduto(response.data))
      .catch((error) => console.log(error));
  }, []);


  return (
    <div className="w-full flex justify-center bg-white">
      <div className="w-290 h-130 p-5 flex flex-col gap-5 rounded-sm shadow border border-gray-200 items-center">
        <h1 className="text-[18px] font-medium w-full">Produtos em orfetas</h1>
        <div className="flex gap-5 justify-around">
          {produto.slice(0, 5).map((item) => (
            <a
              key={item.id}
              href={`/Detalhes/${item.id}`}
              className="flex flex-col w-50 h-full items-start justify-between cursor-pointer gap-4 group"
            >
              <div className="flex justify-center w-full p-4 bg-gray-100">
                <img
                  src={item.image}
                  alt={item.nome}
                  className="w-40 h-40 object-contain"
                />
              </div>
              <label className="text-[18px] truncate w-full font-medium group-hover:text-blue-400">
                {item.nome}
              </label>
              <span className="text-blue-500 font-semibold">
                R$ {item.preco}
              </span>
              <span className="text-sm text-gray-400  w-full">
                {item.descricao}
              </span>
              <span
                className={`text-xs px-2 py-1 rounded-full 
                ${
                  item.estadoConservacao === "novo"
                    ? "bg-green-100 text-green-600"
                    : item.estadoConservacao === "seminovo"
                      ? "bg-yellow-100 text-yellow-600"
                      : "bg-red-100 text-red-600"
                }`}
              >
                {item.estadoConservacao}
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
