import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";

export default function Carrinho() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="bg-gray-200 min-h-screen flex justify-center gap-5 p-10">
        <div className="bg-white w-full max-w-[800px] h-[200px] rounded-sm shadow-sm p-8 flex gap-5 items-start">
          <div className="bg-blue-100 p-4 rounded-full">
            <ShoppingBag className="w-8 h-8 text-blue-500" />
          </div>
          <div className="flex flex-col gap-3">
            <h1 className="text-lg font-bold">Seu carrinho</h1>
            <p className="text-gray-500 text-[15px]">
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
        <div className="bg-white w-[300px] min-h-[200px] h-[200px] rounded-sm shadow-sm p-5 flex flex-col gap-5">
          <div className=" p-2 border-b-2 border-gray-200 w-full">
            <h1 className="font-semibold text-lg">Resumo da compra</h1>
          </div>
          <span className=" text-gray-500 text-[15px]">
            Aqui você pode ver o resumo da sua compra
          </span>
        </div>
      </div>
      <Footer />
    </div>
  );
}
