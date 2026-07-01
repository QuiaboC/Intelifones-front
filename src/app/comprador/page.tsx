"use client";

import { User, Lock } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import HeaderCadastro from "@/components/Header/HeaderCadastro";
import api from "@/services/api";

export default function Comprador() {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    telefone: "",
    senha: "",
    confirmarSenha: "",
    role: "COMPRADOR",
  });
  const [erro, setErro] = useState("");
  const router = useRouter();

  const handleChange = (e) => {
    let { name, value } = e.target;
    if (name === "nome") value = value.replace(/[0-9]/g, "");
    if (name === "telefone") {
      value = value.replace(/\D/g, "");
      if (value.length <= 11)
        value = value.replace(/^(\d{2})(\d{5})(\d{0,4})$/, "($1) $2-$3");
    }
    setForm({ ...form, [name]: value });
  };

  const cadastrarComprador = async () => {
    if (form.senha !== form.confirmarSenha) {
      setErro("As senhas não coincidem");
      return;
    }
    try {
      const response = await api.post("/auth/register", {
        nome: form.nome,
        email: form.email,
        telefone: form.telefone,
        senha: form.senha,
        role: form.role,
      });
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("nome", response.data.nome);
      localStorage.setItem("role", response.data.role);
      localStorage.setItem("email", response.data.email);
      router.push("/home");
    } catch (error: any) {
      setErro(error?.response?.data?.message || "Erro ao cadastrar. Tente novamente.");
    }
  };

  return (
    <div className="bg-slate-100 min-h-screen flex flex-col">
      <HeaderCadastro />
      <div className="flex justify-center items-center flex-1 py-10">
        <div className="bg-white shadow-xl max-w-[1000px] w-full rounded-2xl p-4 flex items-center gap-5">
          <img src="/vetor.png" alt="Cadastro" className="w-[400px] h-auto object-contain hidden md:block" />
          <form onSubmit={(e) => { e.preventDefault(); cadastrarComprador(); }} className="flex flex-col gap-4 flex-1">
            <h1 className="text-[22px] font-semibold text-center m-4">
              Crie sua <span className="text-blue-400">conta</span>
            </h1>
            <p className="text-sm text-gray-500">Cadastre-se e aproveite as melhores ofertas em peças e acessórios para celular.</p>
            <p className="flex gap-2 text-blue-400 text-[15px] items-center"><User className="w-4 h-4" />Dados pessoais</p>

            <input type="text" placeholder="Nome completo" name="nome" required value={form.nome} maxLength={100} onChange={handleChange}
              className="w-full rounded-sm p-2 outline-0 focus:ring-2 focus:ring-blue-500 border border-gray-200 text-sm" />
            <input type="email" placeholder="E-mail" name="email" required value={form.email} maxLength={150} onChange={handleChange}
              className="w-full rounded-sm p-2 outline-0 focus:ring-2 focus:ring-blue-500 border border-gray-200 text-sm" />
            <input type="text" placeholder="Telefone" required name="telefone" value={form.telefone} maxLength={15} onChange={handleChange}
              className="w-full rounded-sm p-2 outline-0 focus:ring-2 focus:ring-blue-500 border border-gray-200 text-sm" />

            <p className="flex gap-2 text-blue-400 text-[15px] items-center"><Lock className="w-4 h-4" />Segurança</p>
            <input type="password" required placeholder="Senha (mínimo 6 caracteres)" name="senha" value={form.senha} minLength={6} maxLength={50} onChange={handleChange}
              className="w-full rounded-sm p-2 outline-0 focus:ring-2 focus:ring-blue-500 border border-gray-200 text-sm" />
            <input type="password" required placeholder="Confirmar senha" name="confirmarSenha" value={form.confirmarSenha} onChange={handleChange}
              className="w-full rounded-sm p-2 outline-0 focus:ring-2 focus:ring-blue-500 border border-gray-200 text-sm" />

            {erro && <p className="text-red-500 text-sm">{erro}</p>}

            <div className="flex gap-3 justify-center">
              <input type="checkbox" required />
              <p className="text-sm text-gray-400">Aceito os termos de uso e a política de privacidade.</p>
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white p-3 rounded-sm hover:bg-blue-600 transition cursor-pointer mt-2">
              Cadastrar
            </button>
            <p className="text-center text-sm text-gray-400">
              Já tem uma conta?{" "}
              <Link href="/" className="text-blue-500 cursor-pointer hover:underline">Entrar</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}