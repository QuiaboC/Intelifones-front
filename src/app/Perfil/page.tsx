import Footer from "@/components/Footer";
import Header from "@/components/Header";
import {
  Info,
  List,
  LogOut,
  ShoppingCart,
  Handbag,
  UserRoundPen,
} from "lucide-react";

export default function Perfil() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="bg-gray-200 min-h-screen flex flex-row ">
        <div className="w-[250px] h-auto flex gap-5 flex-col bg-white items-center py-20">
          <span className="flex gap-2 items-center font-bold text-[18px] mb-8 w-full py-3 px-4">
            <List className="w-5 h-5" />
            Minha conta
          </span>
          <div className="flex flex-col gap-5 w-full">
            <span className="flex gap-2 items-center py-3 px-4 cursor-pointer w-full border-l-4 border-transparent hover:border-blue-500 transition text-gray-400 text-[15px]">
              <Handbag />
              Compras
            </span>
            <span className="flex gap-2 items-center py-3 px-4 cursor-pointer w-full border-l-4 border-transparent hover:border-blue-500 transition text-gray-400 text-[15px]">
              <ShoppingCart />
              Vendas
            </span>
            <span className="flex gap-2 items-center py-3 px-4 cursor-pointer w-full border-l-4 border-transparent hover:border-blue-500 transition text-gray-400 text-[15px]">
              <Info />
              Informações
            </span>
            <span className="flex gap-2 items-center py-3 px-4 cursor-pointer w-full border-l-4 border-transparent hover:border-blue-500 transition text-gray-400 text-[15px]">
              <LogOut />
              Sair
            </span>
          </div>
        </div>
        <div className="flex flex-col flex-1 bg-gray-100 items-center py-10 px-12">
          <div className="w-full p-5 flex flex-row items-center">
            <img
              src="vetor.png"
              className="w-20 h-20 rounded-full bg-amber-100 object-cover"
            />
            <div className="flex flex-col gap-2 ml-5">
              <h1 className="font-bold text-[25px]">Cleiton Souza Paixao</h1>
              <p className="text-gray-500 text-[16px]">email@example.com</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-5 w-full mt-5">
            <div className="w-[260px] bg-white p-6 rounded-xl hover:bg-gray-100 hover:shadow-md transition cursor-pointer flex flex-col gap-2">
              <UserRoundPen className="w-6 h-6 text-blue-500" />
              <h1 className="font-semibold text-[17px]">
                Informações da Conta
              </h1>
              <p className="text-gray-500 text-sm">Dados pessoais e da conta</p>
            </div>

            <div className="w-[260px] bg-white p-6 rounded-xl hover:bg-gray-100 hover:shadow-md transition cursor-pointer flex flex-col gap-2">
              <UserRoundPen className="w-6 h-6 text-blue-500" />
              <h1 className="font-semibold text-[17px]">
                Informações da Conta
              </h1>
              <p className="text-gray-500 text-sm">Dados pessoais e da conta</p>
            </div>

             <div className="w-[260px] bg-white p-6 rounded-xl hover:bg-gray-100 hover:shadow-md transition cursor-pointer flex flex-col gap-2">
              <UserRoundPen className="w-6 h-6 text-blue-500" />
              <h1 className="font-semibold text-[17px]">
                Informações da Conta
              </h1>
              <p className="text-gray-500 text-sm">Dados pessoais e da conta</p>
            </div>
             <div className="w-[260px] bg-white p-6 rounded-xl hover:bg-gray-100 hover:shadow-md transition cursor-pointer flex flex-col gap-2">
              <UserRoundPen className="w-6 h-6 text-blue-500" />
              <h1 className="font-semibold text-[17px]">
                Informações da Conta
              </h1>
              <p className="text-gray-500 text-sm">Dados pessoais e da conta</p>
            </div>
             <div className="w-[260px] bg-white p-6 rounded-xl hover:bg-gray-100 hover:shadow-md transition cursor-pointer flex flex-col gap-2">
              <UserRoundPen className="w-6 h-6 text-blue-500" />
              <h1 className="font-semibold text-[17px]">
                Informações da Conta
              </h1>
              <p className="text-gray-500 text-sm">Dados pessoais e da conta</p>
            </div>
             <div className="w-[260px] bg-white p-6 rounded-xl hover:bg-gray-100 hover:shadow-md transition cursor-pointer flex flex-col gap-2">
              <UserRoundPen className="w-6 h-6 text-blue-500" />
              <h1 className="font-semibold text-[17px]">
                Informações da Conta
              </h1>
              <p className="text-gray-500 text-sm">Dados pessoais e da conta</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
