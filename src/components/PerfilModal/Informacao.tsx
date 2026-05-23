import {
  ChevronRight,
  User,
  Mail,
  Phone,
  Building2,
  Pencil,
} from "lucide-react";
import Link from "next/link";

export default function Informacao({ setPaginaAtiva }) {
  return (
    <div className="flex flex-col flex-1 bg-gray-100 py-20 px-30 flex-wrap gap-5">
      <div className="flex flex-row gap-2 items-center">
        <span
          className="text-[14px] cursor-pointer hover:text-blue-400"
          onClick={(e) => setPaginaAtiva("PerfilUsuario")}
        >
          Perfil
        </span>
        <ChevronRight className="w-4 h-4 text-gray-500" />
        <span className="text-[14px] text-blue-400">Informações</span>
      </div>
      <div className="flex flex-col gap-5 w-full max-w-2xl">
        <div className="flex gap-3 flex-col">
          <h1 className="font-bold text-[22px]">
            Informações do seu perfil
          </h1>
          <p>
            Você pode adicionar, alterar ou corrigir suas informações pessoais e
            os dados da conta.
          </p>
        </div>
        <form className="w-full flex flex-col bg-white rounded-sm overflow-hidden shadow-sm max-w-5xl">
          <div className="p-5 border-b border-gray-200">
            <span className="font-semibold text-[17px] flex gap-2">
              <Pencil className="text-blue-400" />
              Informações pessoais
            </span>
          </div>

          <div className="flex flex-col w-full p-5 gap-0">
            <div className="flex flex-row items-center gap-5 p-3 border-b border-gray-200">
              <div className="flex flex-row gap-2 items-center w-32 text-gray-500">
                <User className="w-4 h-4 shrink-0 text-blue-400" />
                <span className="text-[16px] text-blue-400">Nome</span>
              </div>
              <input
                type="text"
                placeholder="Nome"
                className="px-4 py-2 rounded-lg border border-gray-300 w-full max-w-md outline-none focus:border-blue-500 text-sm"
              />
            </div>

            <div className="flex flex-row items-center gap-5 p-3 border-b border-gray-200">
              <div className="flex flex-row gap-2 items-center w-32 text-gray-500">
                <Mail className="w-4 h-4 shrink-0 text-blue-400" />
                <span className="text-[16px] text-blue-400">Email</span>
              </div>
              <input
                type="email"
                placeholder="Email"
                className="px-4 py-2 rounded-lg border border-gray-300 w-full max-w-md outline-none focus:border-blue-500 text-sm"
              />
            </div>

            <div className="flex flex-row items-center gap-5 p-3 border-b border-gray-200">
              <div className="flex flex-row gap-2 items-center w-32 text-gray-500">
                <Phone className="w-4 h-4 shrink-0 text-blue-400" />
                <span className="text-[16px] text-blue-400">Telefone</span>
              </div>
              <input
                type="text"
                placeholder="Telefone"
                className="px-4 py-2 rounded-lg border border-gray-300 w-full max-w-md outline-none focus:border-blue-500 text-sm"
              />
            </div>

            <div className="flex flex-row items-center gap-5 p-3 border-gray-200">
              <div className="flex flex-row gap-2 items-center w-32 text-gray-500">
                <Building2 className="w-4 h-4 shrink-0 text-blue-400" />
                <span className="text-[16px] text-blue-400">CNPJ</span>
              </div>
              <input
                type="text"
                placeholder="CNPJ"
                className="px-4 py-2 rounded-lg border border-gray-300 w-full max-w-md outline-none focus:border-blue-500 text-sm"
              />
            </div>

            <div className="flex justify-end pt-4">
              <button className="bg-gray-300 text-gray-700 text-sm py-2 px-6 rounded-lg hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 cursor-pointer transition mr-2">
                Cancelar
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white text-sm py-2 px-6 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer transition"
              >
                Salvar Alterações
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
