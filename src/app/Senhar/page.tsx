"use client";

import HeaderCadastro from "@/components/Header/HeaderCadastro";
import api from "@/services/api";
import { Mail, Lock } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function Senhar() {
  const router = useRouter();
  const [form, setForm] = useState({
    token: "",
    novaSenha: "",
    confirmarNovaSenha: "",
  });
  const [loading, setLoading] = useState(false);

  const handleRedefinirSenha = async () => {
    if (!form.token || !form.novaSenha || !form.confirmarNovaSenha) {
      toast.warning("Preencha todos os campos.");
      return;
    }

    if (form.novaSenha !== form.confirmarNovaSenha) {
      toast.warning("As senhas não coincidem.");
      return;
    }

    setLoading(true);
    try {
      const res = await api.post("/auth/resetar-senha", {
        token: form.token,
        novaSenha: form.novaSenha,
      });
      toast.success("Senha redefinida com sucesso!");
      router.push("/");
    } catch (err) {
      console.log(err);
      toast.error("Token inválido ou expirado. Tente novamente.");
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
              Redefinir sua <span className="text-blue-400">Senha</span>
            </h1>
            <p className="text-center text-[15px]">
              Insira o token recebido por e-mail e defina sua nova senha.
            </p>
            <p className="flex flex-row gap-2 text-blue-400 text-[15px] items-center">
              <Mail className="w-4 h-4" />
              Token de recuperação
            </p>
            <input
              type="text"
              placeholder="Token"
              value={form.token}
              onChange={(e) => setForm({ ...form, token: e.target.value })}
              className="w-full rounded-sm p-2 outline-0 focus:ring-2 focus:ring-blue-500 border border-gray-200 text-sm"
            />
            <p className="flex flex-row gap-2 text-blue-400 text-[15px] items-center">
              <Lock className="w-4 h-4" />
              Nova senha
            </p>
            <input
              type="password"
              placeholder="Nova senha"
              value={form.novaSenha}
              onChange={(e) => setForm({ ...form, novaSenha: e.target.value })}
              className="w-full shadow-sm rounded-sm p-2 outline-0 focus:ring-2 focus:ring-blue-500 border border-gray-200 text-sm"
            />
            <p className="flex flex-row gap-2 text-blue-400 text-[15px] items-center">
              <Lock className="w-4 h-4" />
              Confirme a nova senha
            </p>
            <input
              type="password"
              placeholder="Confirme a nova senha"
              value={form.confirmarNovaSenha}
              onChange={(e) =>
                setForm({ ...form, confirmarNovaSenha: e.target.value })
              }
              className="w-full shadow-sm rounded-sm p-2 outline-0 focus:ring-2 focus:ring-blue-500 border border-gray-200 text-sm"
            />
            <button
              onClick={handleRedefinirSenha}
              disabled={loading}
              className="w-full bg-blue-500 text-white p-3 rounded-sm hover:bg-blue-600 transition cursor-pointer mt-2 disabled:opacity-60"
            >
              {loading ? "Redefinindo..." : "Redefinir senha"}
            </button>
            <p className="text-center text-sm text-gray-400">
              Voltar para login?{" "}
              <Link
                href="/"
                className="text-blue-500 cursor-pointer hover:underline"
              >
                Faça login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
