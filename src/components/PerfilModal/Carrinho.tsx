import { ShoppingBag } from "lucide-react";
import Link from "next/link";

export default function Carrinho() {
  return (
    <div className="flex flex-col flex-1 bg-gray-100 py-20 px-30 flex-wrap gap-5">
      <div className="w-full max-w-[1200px] flex flex-col lg:flex-row gap-6 items-start">
        <div className="bg-white flex-1 rounded-sm shadow-sm p-8 flex gap-5 items-start">
          <div className="bg-blue-100 p-4 rounded-full">
            <ShoppingBag className="w-8 h-8 text-blue-500" />
          </div>
          <div className="flex flex-col gap-3">
            <h1 className="text-xl font-bold">Seu carrinho</h1>
            <p className="text-gray-500 text-[15px] max-w-[500px]">
              Você ainda não adicionou nenhum produto ao carrinho.
            </p>
            <Link
              href="/produtos"
              className="text-blue-500 font-medium hover:underline text-[15px]"
            >
              Voltar para produtos
            </Link>
          </div>
        </div>
        <div className="bg-white w-full lg:w-[320px] min-h-[220px] rounded-sm shadow-sm p-5 flex flex-col gap-5">
          <div className="border-b border-gray-200 pb-3">
            <h1 className="font-semibold text-lg">Resumo da compra</h1>
          </div>
          <span className="text-gray-500 text-[15px]">
            Aqui você pode ver o resumo da sua compra.
          </span>
          <div className="flex flex-col gap-2 text-[15px]">
            <div className="flex justify-between">
              <span>Produtos</span>
              <span>0</span>
            </div>
            <div className="flex justify-between">
              <span>Total</span>
              <span className="font-semibold">R$ 0,00</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
