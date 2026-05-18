"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function FiltroBuscar() {
  const [busca, setBusca] = useState("");
  const [filtros, setFiltros] = useState([]);
  const [modal, setModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchFiltros = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");

        setFiltros(response.data);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    };

    fetchFiltros();
  }, []);

  const filtrosFiltrados = busca
    ? filtros.filter((filtro) =>
        filtro.title.toLowerCase().includes(busca.toLowerCase()),
      )
    : [];

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Digite aqui para buscar produtos..."
        className=" w-full rounded-sm text-sm bg-white p-2 outline-none"
        value={busca}
        onChange={(e) => {
          setBusca(e.target.value);
          setModal(e.target.value.length > 0);
        }}
        onKeyDown={(e) =>{
          if (e.key === "Enter" ){
            router.push(`/produtos?busca=${busca}`);
          }
        }}
      />

      {modal && (
        <div className="absolute top-full left-0 mt-1 w-full bg-white rounded-sm shadow-lg p-2 z-50">
          {filtrosFiltrados.length > 0 ? (
            filtrosFiltrados.slice(0, 6).map((filtro) => (
              <a
                key={filtro.id}
                href={`/Detalhes/${filtro.id}`}
                className="block p-2 hover:bg-gray-100 cursor-pointer rounded transition"
              >
                {filtro.title}
              </a>
            ))
          ) : (
            <div className="text-gray-500 p-2">Nenhum resultado encontrado</div>
          )}
        </div>
      )}
    </div>
  );
}
