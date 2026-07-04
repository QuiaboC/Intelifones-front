import { ShoppingCart } from "lucide-react";
import Link from "next/link";

export default function HeaderLogin(){
    return(
      <div className="flex gap-3 items-center">
        <Link href="/">
          <div className="flex gap-2 items-center bg-white px-4 py-2 rounded-lg hover:bg-blue-50 transition cursor-pointer">
            <img src="vetor.png" className="w-5 h-5 rounded-full bg-amber-200"/>
            <p className="text-sm text-blue-500 font-medium">Cleiton</p>
          </div>
        </Link>
        <Link href="/Perfil">
          <button className="text-sm bg-white px-4 py-2 rounded-lg text-blue-500 font-medium hover:bg-blue-50 transition cursor-pointer">
            Vendas
          </button>
        </Link>
        <button className="text-[13px] bg-white px-4 py-2 rounded-lg text-blue-500 font-medium hover:bg-blue-50 transition cursor-pointer">
          Compras
        </button>
        <Link href="/Perfil?aba=Carrinho">
          <ShoppingCart className="text-white cursor-pointer hover:text-gray-300 transition" />
        </Link>
      </div>
    );
}