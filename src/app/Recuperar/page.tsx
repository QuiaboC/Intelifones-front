"use client";

import HeaderCadastro from "@/components/Header/HeaderCadastro";
import api from "@/services/api";
import { Mail } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function Recuperar() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  const handleRecuperarSenha = async () => {
    if (!email) {
      toast.warning("Informe seu e-mail.");
      return;
    }

    setLoading(true);
    setErro("");

    try {
      const res = await api.post("/auth/recuperar-senha", { email });
      console.log("Deu tudo certo!", res.data);
      toast.success("Link de recuperação enviado com sucesso!");
      router.push("/Senhar");
    } catch (err) {
      console.log(err);
      toast.error("Erro ao enviar link de recuperação. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

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
              Recupere sua <span className="text-blue-400">Senha</span>
            </h1>
            <p className="text-center text-[15px]">
              Digite seu e-mail e enviaremos um link para redefinir sua senha.
            </p>
            <p className="flex flex-row gap-2 text-blue-400 text-[15px] items-center">
              <Mail className="w-4 h-4" />
              Dados de acesso
            </p>
            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-sm p-2 outline-0 focus:ring-2 focus:ring-blue-500 border border-gray-200 text-sm"
            />
            {erro && <p className="text-red-500 text-sm">{erro}</p>}
            <button
              onClick={handleRecuperarSenha}
              disabled={loading}
              className="w-full bg-blue-500 text-white p-3 rounded-sm hover:bg-blue-600 transition cursor-pointer mt-2 disabled:opacity-60"
            >
              {loading ? "Enviando..." : "Enviar Link de Recuperação"}
            </button>
            <p className="text-center text-sm text-gray-400">
              Ainda não possui uma conta?{" "}
              <Link
                href="/comprador"
                className="text-blue-500 cursor-pointer hover:underline"
              >
                Cadastre-se como Comprador
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}