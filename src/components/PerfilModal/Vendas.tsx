import { Plus } from "lucide-react";

export default function Vendas() {
  return (
    <div className="flex flex-col flex-1 bg-gray-100 py-10 px-10 gap-8">
      <h1 className="text-[25px] font-bold">Vendas</h1>
      <div className="flex flex-wrap gap-5 w-full items-center justify-between">
        <div className="flex items-center gap-5 w-300">
          <input
            type="text"
            placeholder="Buscar produtos cadastrados"
            className="px-5 py-2 rounded-lg border border-gray-300 w-full max-w-md outline-none focus:border-blue-500"
          />
          <button className=" flex gap-1 px-5 py-2 rounded-md bg-green-500 text-white font-medium hover:bg-green-600 transition cursor-pointer shadow-md">
            <Plus />
            Adicionar
          </button>
        </div>

        <div className="flex items-center gap-5 text-gray-600">
          <span className="font-medium">9 produtos</span>
        </div>
      </div>
      <div className="w-full flex flex-col bg-white rounded-sm overflow-hidden">
        <div className="p-5 border-b border-gray-200">
          <span className="font-semibold text-gray-700">Últimas vendas</span>
        </div>
        <div className="flex flex-col w-full">
          {[1, 2, 3, 4, 5].map((item) => (
            <div
              key={item}
              className="flex flex-col lg:flex-row justify-between gap-5 items-start lg:items-center p-5 border-b border-gray-200 hover:bg-gray-50 transition"
            >
              <div className="flex gap-5 items-center">
                <img
                  src="vetor.png"
                  className="w-20 h-20 rounded-xl bg-amber-100 object-cover"
                />
                <div className="flex flex-col gap-1">
                  <span className="font-semibold text-[16px]">Produto A</span>
                  <span className="text-blue-500 font-medium">R$ 100,00</span>
                  <span className="text-gray-500 text-sm">
                    Produto feito para venda
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-2 w-full lg:w-[240px]">
                <button className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition cursor-pointer">
                  Editar
                </button>
                <button className="bg-red-500 text-white p-2 rounded-lg hover:bg-green-600 transition cursor-pointer">
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
