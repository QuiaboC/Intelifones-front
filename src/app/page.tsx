import Link from "next/link";
import { Lock, Mail } from "lucide-react";
import HeaderCadastro from "@/components/Header/HeaderCadastro";

export default function Home() {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <HeaderCadastro />
      <div className="flex justify-center flex-1 items-center">
        <div className="bg-white shadow-xl w-[950px] rounded-2xl p-10 flex items-center gap-10">
          <img
            src="/vetorLogin.jpg"
            alt="Login"
            className="w-[400px] h-auto object-contain hidden md:block"
          />
          <div className="flex flex-col gap-5 flex-1">
            <h1 className="text-[22px] font-semibold text-center">
              Bem-vindo à <span className="text-blue-400">Intelifones</span>
            </h1>
            <p className="text-center text-[15px]">
              Faça login para acessar sua conta e aproveitar as melhores ofertas
              em peças e acessórios para celular.
            </p>
            <p className="flex flex-row gap-2 text-blue-400 text-[15px] items-center">
              <Mail className="w-4 h-4"/>
              Dados de acesso
            </p>
            <input
              type="email"
              placeholder="E-mail"
              className="w-full rounded-sm p-2 outline-0 focus:ring-2 focus:ring-blue-500 border border-gray-200 text-sm"
            />
            <p className="flex flex-row gap-2 text-blue-400 text-[15px] items-center">
              <Lock className="w-4 h-4"/>
              Segurança
            </p>
            <input
              type="password"
              placeholder="Senha"
              className="w-full shadow-sm rounded-sm p-2 outline-0 focus:ring-2 focus:ring-blue-500 border border-gray-200 text-sm"
            />
            <Link href="/home">
              <button className="w-full bg-blue-500 text-white p-3 rounded-sm hover:bg-blue-600 transition cursor-pointer mt-2">
                Entrar
              </button>
            </Link>
            <p className="text-center text-sm text-gray-400">
              Ainda não possui uma conta?{" "}
              <Link
                href="/comprador"
                className="text-blue-500 cursor-pointer hover:underline"
              >
                Cadastre-se como Comprador
              </Link>
              {" ou "}
              <Link
                href="/vendedor"
                className="text-blue-500 cursor-pointer hover:underline"
              >
                Cadastre-se como Vendedor
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
