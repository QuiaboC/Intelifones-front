"use client";

import api from "@/services/api";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function FiltroBuscar() {
  const [busca, setBusca] = useState("");
  const [sugestoes, setSugestoes] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  // Mantém o termo pesquisado na barra ao carregar a página de produtos
  useEffect(() => {
    const termoBusca = searchParams.get("busca");
    if (termoBusca) setBusca(termoBusca);
  }, [searchParams]);

  // Carrega sugestões enquanto digita
  useEffect(() => {
    if (!busca.trim()) {
      setSugestoes([]);
      setModalOpen(false);
      return;
    }
    const timeout = setTimeout(() => {
      api.get(`/produtos/buscar?nome=${busca}`)
        .then((res) => {
          setSugestoes(res.data.slice(0, 6));
          setModalOpen(res.data.length > 0);
        })
        .catch(() => setSugestoes([]));
    }, 300); // debounce de 300ms
    return () => clearTimeout(timeout);
  }, [busca]);

  const executarBusca = () => {
    if (!busca.trim()) return;
    setModalOpen(false);
    router.push(`/produtos?busca=${encodeURIComponent(busca.trim())}`);
  };

  return (
    <div className="relative flex gap-2">
      <div className="relative flex-1">
        <input
          type="text"
          placeholder="Digite aqui para buscar produtos..."
          className="w-full rounded-sm text-sm bg-white p-2 outline-none pr-8"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") executarBusca(); }}
          onBlur={() => setTimeout(() => setModalOpen(false), 200)}
          onFocus={() => sugestoes.length > 0 && setModalOpen(true)}
        />
        {modalOpen && sugestoes.length > 0 && (
          <div className="absolute top-full left-0 mt-1 w-full bg-white rounded-sm shadow-lg p-2 z-50">
            {sugestoes.map((item) => (
              <a
                key={item.id}
                href={`/Detalhes/${item.id}`}
                className="flex items-center gap-3 p-2 hover:bg-gray-100 cursor-pointer rounded transition"
              >
                <img
                  src={item.imagem ? `http://localhost:8080/uploads/produtos/${item.imagem}` : "/vetorProduto.png"}
                  className="w-8 h-8 object-contain rounded"
                />
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{item.nome}</span>
                  <span className="text-xs text-blue-500">R$ {Number(item.preco).toFixed(2).replace(".", ",")}</span>
                </div>
              </a>
            ))}
            <button
              className="w-full text-center text-xs text-blue-500 hover:underline pt-2 cursor-pointer"
              onMouseDown={executarBusca}
            >
              Ver todos os resultados para "{busca}"
            </button>
          </div>
        )}
      </div>
      <button
        onClick={executarBusca}
        className="bg-white px-3 rounded-sm hover:bg-gray-100 transition cursor-pointer"
      >
        <Search className="w-4 h-4 text-gray-500" />
      </button>
    </div>
  );
}